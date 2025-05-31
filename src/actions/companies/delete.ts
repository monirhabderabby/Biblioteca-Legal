"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface Props {
  userId: string;
  companyId: string;
}

export async function removeEmployee({ userId, companyId }: Props) {
  const cu = await auth();

  // Ensure user is admin
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  try {
    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        company: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    // Check if the user belongs to the specified company
    if (user.companyId !== companyId) {
      return {
        success: false,
        message: "User is not part of the specified company.",
      };
    }

    // Remove the user from the company
    await prisma.user.update({
      where: { id: user.id },
      data: { companyId: null },
    });

    revalidatePath(`/dashboard/companies/${companyId}`);

    return {
      success: true,
      message: `User ${user.first_name} has been removed from company ${user.company?.name}.`,
    };
  } catch (error) {
    console.error("Error removing user from company:", error);
    return {
      success: false,
      message: "An error occurred while removing the user from the company.",
    };
  }
}

export async function deleteCompany(companyId: string) {
  const cu = await auth();

  // Ensure user is admin
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  try {
    // Check if company exists
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return {
        success: false,
        message: "Company not found.",
      };
    }

    // 1. Unassign all users from the company
    await prisma.user.updateMany({
      where: { companyId },
      data: { companyId: null },
    });

    // Find the company subscription by companyId
    const subscription = await prisma.companySubscription.findUnique({
      where: {
        companyId: company.id,
      },
    });

    if (subscription) {
      await prisma.companySubscription.delete({
        where: {
          id: subscription.id,
        },
      });
    }

    // 2. Delete the company
    await prisma.company.delete({
      where: { id: companyId },
    });

    return {
      success: true,
      message: `Company ${company.name} deleted and all users unassigned.`,
    };
  } catch (error) {
    console.error("Error deleting company:", error);
    return {
      success: false,
      message: "An error occurred while deleting the company.",
    };
  }
}
