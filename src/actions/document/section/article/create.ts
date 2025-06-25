"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { extractTextFromTipTap } from "@/lib/utils";
import { articleSchema, articleSchemaType } from "@/schemas/document/index";
import { revalidatePath } from "next/cache";

export async function createArticle(
  data: articleSchemaType,
  documentId: string,
  sectionId: string
) {
  const cu = await auth();
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }
  const parsedData = articleSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  try {
    const article = await prisma.article.create({
      data: {
        content: parsedData.data.content,
        chapterId: parsedData.data.chapterId,
        articleNumber: parsedData.data.articleNumber,
        contentPlainText: extractTextFromTipTap(parsedData.data.content),
      },
    });

    // Optional: revalidate a path related to the chapter
    revalidatePath(
      `/dashboard/documents/${documentId}/${sectionId}/${parsedData.data.chapterId}`
    );

    return {
      success: true,
      message: "Article created successfully",
      article,
    };
  } catch (error) {
    console.error("Error creating article:", error);
    return {
      success: false,
      message: "Failed to create article",
    };
  }
}
