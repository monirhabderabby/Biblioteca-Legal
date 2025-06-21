"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { articleSchema, articleSchemaType } from "@/schemas/document/index";
import { revalidatePath } from "next/cache";

interface Props {
  articleId: string;
  data: articleSchemaType;
  documentId: string;
  sectionId: string;
}

export async function editArticle({
  articleId,
  data,
  documentId,
  sectionId,
}: Props) {
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
    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        content: parsedData.data.content,
        chapterId: parsedData.data.chapterId,
        articleNumber: parsedData.data.articleNumber,
      },
    });

    // Optional: revalidate the path to reflect the updated article
    revalidatePath(
      `/dashboard/documents/${documentId}/${sectionId}/${parsedData.data.chapterId}`
    );

    return {
      success: true,
      message: "Article updated successfully",
      article: updatedArticle,
    };
  } catch (error) {
    console.error("Error updating article:", error);
    return {
      success: false,
      message: "Failed to update article",
    };
  }
}
