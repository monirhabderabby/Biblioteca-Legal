"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { documentFormSchema, DocumentFormSchemaType } from "@/schemas/document";

export async function createDocument(data: DocumentFormSchemaType) {
  const cu = await auth();
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  const parsed = documentFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors.map((e) => e.message).join(", "),
    };
  }

  const categoryes = await prisma.category.findMany({
    where: {
      id: {
        in: parsed.data.categoryIds,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (categoryes.length !== categoryes.length) {
    return {
      success: false,
      message: "One or more categories do not exist.",
    };
  }

  const newDoc = await prisma.document.create({
    data: {
      name: parsed.data.name,
      short_description: parsed.data.short_description,
      law_number: parsed.data.law_number,
      createdAt: parsed.data.publishedDate,
      categories: categoryes,
    },
  });

  return {
    success: true,
    message: "Document created successfully.",
    data: newDoc,
  };
}

export async function editDocument(id: string, data: DocumentFormSchemaType) {
  const cu = await auth();
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  const parsed = documentFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors.map((e) => e.message).join(", "),
    };
  }

  // Check if categories exist
  const categories = await prisma.category.findMany({
    where: {
      id: {
        in: parsed.data.categoryIds,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (categories.length !== parsed.data.categoryIds.length) {
    return {
      success: false,
      message: "One or more categories do not exist.",
    };
  }

  // Update document
  const updatedDoc = await prisma.document.update({
    where: {
      id,
    },
    data: {
      name: parsed.data.name,
      short_description: parsed.data.short_description,
      law_number: parsed.data.law_number,
      createdAt: parsed.data.publishedDate,
      categories: categories,
    },
  });

  return {
    success: true,
    message: "Document updated successfully.",
    data: updatedDoc,
  };
}
