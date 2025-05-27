"use server";

import { prisma } from "@/lib/db";
import { chapterTitleSchema, ChapterTitleSchemaType } from "@/schemas/document";
import { revalidatePath } from "next/cache";

export async function createDocumentChapterTitle(
  data: ChapterTitleSchemaType,
  documentId: string
) {
  const parsedData = chapterTitleSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  try {
    // Create a new section in the database
    const section = await prisma.chapter.create({
      data: {
        title: parsedData.data.title,
        sectionId: parsedData.data.sectionId,
      },
    });

    revalidatePath(`/dashboard/documents/${documentId}`);
    return {
      success: true,
      message: "Section created successfully",
      section,
    };
  } catch (error) {
    console.error("Error creating section:", error);
    return {
      success: false,
      message: "Failed to create section",
    };
  }
}
