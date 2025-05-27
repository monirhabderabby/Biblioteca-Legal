"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteArticle(
  articleId: string,
  documentId: string,
  sectionId: string,
  chapterId: string
) {
  const cu = await auth();
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  try {
    await prisma.article.delete({
      where: { id: articleId },
    });

    // Optional: revalidate the path to reflect the deletion
    revalidatePath(
      `/dashboard/documents/${documentId}/${sectionId}/${chapterId}`
    );

    return {
      success: true,
      message: "Article deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting article:", error);
    return {
      success: false,
      message: "Failed to delete article",
    };
  }
}
