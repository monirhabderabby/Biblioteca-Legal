"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteCategory(id: string) {
  try {
    const cu = await auth();

    if (!cu || cu.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized access.",
      };
    }

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return {
        success: false,
        message: "Category not found.",
      };
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/dashboard/categories");

    return {
      success: true,
      message: "Category deleted successfully.",
    };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
