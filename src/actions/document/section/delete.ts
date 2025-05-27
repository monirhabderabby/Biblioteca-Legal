"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteDocumentSection(
  sectionId: string,
  documentId: string
) {
  try {
    await prisma.section.delete({
      where: { id: sectionId },
    });

    revalidatePath(`/dashboard/documents/${documentId}`);

    return {
      success: true,
      message: "Section and its chapters deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting section:", error);
    return {
      success: false,
      message: "Failed to delete section",
    };
  }
}
