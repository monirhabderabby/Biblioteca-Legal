"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { chapterTitleSchema, ChapterTitleSchemaType } from "@/schemas/document";
import { revalidatePath } from "next/cache";

// Edit Document Chapter Title Server Action
export async function editDocumentChapterTitle(
  data: ChapterTitleSchemaType,
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

  const parsedData = chapterTitleSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  try {
    // Update the chapter in the database
    const updatedChapter = await prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        title: parsedData.data.title,
        sectionId: parsedData.data.sectionId,
      },
    });

    revalidatePath(`/dashboard/documents/${documentId}`);

    return {
      success: true,
      message: "Chapter updated successfully",
      chapter: updatedChapter,
    };
  } catch (error) {
    console.error("Error updating chapter:", error);
    return {
      success: false,
      message: "Failed to update chapter",
    };
  }
}
