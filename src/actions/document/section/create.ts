"use server";

import { prisma } from "@/lib/db";
import { sectionTitleSchema, SectionTitleSchemaType } from "@/schemas/document";
import { revalidatePath } from "next/cache";

export async function createDocumentSectionTitle(data: SectionTitleSchemaType) {
  const parsedData = sectionTitleSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  try {
    // Create a new section in the database
    const section = await prisma.section.create({
      data: {
        title: parsedData.data.name,
        documentId: parsedData.data.documentId,
      },
    });

    revalidatePath(`/dashboard/documents/${parsedData.data.documentId}`);

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
