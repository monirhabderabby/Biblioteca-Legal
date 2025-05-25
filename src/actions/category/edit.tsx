"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { categorySchema, CategorySchemaType } from "@/schemas/category";
import { revalidatePath } from "next/cache";

export async function editCategory(id: string, data: CategorySchemaType) {
  try {
    const cu = await auth();

    if (!cu || cu.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized access.",
      };
    }

    const parsedData = categorySchema.safeParse(data);

    if (!parsedData.success) {
      return {
        success: false,
        message: parsedData.error.errors.map((e) => e.message).join(", "),
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

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: parsedData.data.name,
      },
    });

    revalidatePath("/dashboard/categories");

    return {
      success: true,
      message: "Category updated successfully.",
      data: updatedCategory,
    };
  } catch (error) {
    console.error("Failed to update category:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
