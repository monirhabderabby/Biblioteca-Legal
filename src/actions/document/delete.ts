"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function deleteDocument(documentId: string) {
  const cu = await auth();
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  try {
    const existingDoc = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!existingDoc) {
      return {
        success: false,
        message: "Document not found.",
      };
    }

    await prisma.document.delete({
      where: { id: documentId },
    });

    return {
      success: true,
      message: "Document deleted successfully.",
    };
  } catch (error) {
    console.error("Delete error:", error);
    return {
      success: false,
      message: "An error occurred while deleting the document.",
    };
  }
}
