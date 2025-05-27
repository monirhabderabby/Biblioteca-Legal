"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Delete Document Chapter Server Action
export async function deleteDocumentChapter(
  chapterId: string,
  documentId: string
) {
  const cu = await auth();
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  try {
    // Delete the chapter from the database
    await prisma.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    revalidatePath(`/dashboard/documents/${documentId}`);

    return {
      success: true,
      message: "Chapter deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting chapter:", error);
    return {
      success: false,
      message: "Failed to delete chapter",
    };
  }
}
