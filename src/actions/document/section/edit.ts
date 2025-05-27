"use server";

import { prisma } from "@/lib/db";
import { sectionTitleSchema, SectionTitleSchemaType } from "@/schemas/document";
import { revalidatePath } from "next/cache";

export async function editDocumentSectionTitle(
  data: SectionTitleSchemaType,
  sectionId: string
) {
  const parsedData = sectionTitleSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  try {
    const updatedSection = await prisma.section.update({
      where: {
        id: sectionId,
      },
      data: {
        title: parsedData.data.name,
      },
    });

    revalidatePath(`/dashboard/documents/${parsedData.data.documentId}`);

    return {
      success: true,
      message: "Section updated successfully",
      section: updatedSection,
    };
  } catch (error) {
    console.error("Error updating section:", error);
    return {
      success: false,
      message: "Failed to update section",
    };
  }
}
