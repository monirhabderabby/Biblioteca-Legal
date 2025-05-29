"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { companySchema, CompanySchemaType } from "@/schemas/company";

export async function createCompanies(data: CompanySchemaType) {
  const cu = await auth();

  // Ensure user is admin
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  // Validate input
  const parsedData = companySchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors.map((e) => e.message).join(", "),
    };
  }

  const { name, location, employees } = parsedData.data;

  try {
    // 1. Create the company
    const company = await prisma.company.create({
      data: {
        name,
        location,
      },
    });

    // 2. Find users with matching emails
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: employees,
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    // 3. Assign each found user to the new company
    const updatePromises = users.map((user) =>
      prisma.user.update({
        where: { id: user.id },
        data: { companyId: company.id },
      })
    );

    await Promise.all(updatePromises);

    // 4. Identify emails that were not found
    const foundEmails = users.map((u) => u.email);
    const notFoundEmails = employees.filter(
      (email) => !foundEmails.includes(email)
    );

    return {
      success: true,
      message: "Company Created",
      description: `${users.length} user(s) assigned, ${notFoundEmails.length} email(s) skipped.`,
      company,
      skippedEmails: notFoundEmails, // Optional extra info
    };
  } catch (error) {
    console.error("Error creating company or assigning users:", error);
    return {
      success: false,
      message:
        "An error occurred while creating the company or assigning users.",
    };
  }
}
