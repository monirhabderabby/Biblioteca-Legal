"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import {
  companySchema,
  CompanySchemaType,
  employeeAdd,
  EmployeeAddSchemaType,
} from "@/schemas/company";
import { revalidatePath } from "next/cache";

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

  const { name, location, contact_email, overview } = parsedData.data;

  try {
    // 1. Create the company
    const company = await prisma.company.create({
      data: {
        name,
        location,
        contact_email,
        overview,
      },
    });

    return {
      success: true,
      message: "Company Created",
      description: `The ${company.name} has been successfully created with the provided details.`,
      company,
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

export async function addEmployee(data: EmployeeAddSchemaType) {
  const cu = await auth();

  // Ensure user is admin
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  // Validate input
  const parsedData = employeeAdd.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors.map((e) => e.message).join(", "),
    };
  }

  const { email, companyId } = parsedData.data;

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        message: "User with the provided email does not exist.",
      };
    }

    // Update the user's companyId
    await prisma.user.update({
      where: { id: user.id },
      data: { companyId },
    });

    revalidatePath(`/dashboard/companies/${companyId}`);

    return {
      success: true,
      message: `User ${email} successfully added to the company.`,
    };
  } catch (error) {
    console.error("Error adding employee to company:", error);
    return {
      success: false,
      message: "An error occurred while adding the employee to the company.",
    };
  }
}
