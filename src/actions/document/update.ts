"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function updateDocumentStatus(documentId: string) {
  const cu = await auth();
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  // Step 1: Get current value
  const doc = await prisma.document.findUnique({
    where: { id: documentId },
    select: { published: true },
  });

  // Step 2: Toggle the value
  const updatedDoc = await prisma.document.update({
    where: { id: documentId },
    data: { published: !doc?.published },
  });

  return {
    success: true,
    message: "Document created successfully.",
    data: updatedDoc,
  };
}
