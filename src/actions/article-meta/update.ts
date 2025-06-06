"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db"; // Your Prisma client

interface UpdateMetaInput {
  articleId: string;
  selectedColor?: string;
  isBookmarked?: boolean;
  comment?: string;
}

export async function updateArticleMeta({
  articleId,
  selectedColor,
  isBookmarked,
  comment,
}: UpdateMetaInput) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    const updatedMeta = await prisma.userArticleMeta.upsert({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
      update: {
        ...(selectedColor !== undefined && { selectedColor }),
        ...(isBookmarked !== undefined && { isBookmarked }),
        ...(comment !== undefined && { comment }),
      },
      create: {
        userId,
        articleId,
        selectedColor: selectedColor ?? undefined,
        isBookmarked: isBookmarked ?? false,
        comment: comment ?? undefined,
      },
    });

    return {
      success: true,
      message: "Article meta updated successfully.",
      data: updatedMeta,
    };
  } catch (error) {
    console.error("Failed to update article meta:", error);
    return {
      success: false,
      message: "Failed to update article meta.",
    };
  }
}

interface RemoveBookmarkInput {
  metaId: string;
}

export async function removeBookmark({ metaId }: RemoveBookmarkInput) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  try {
    const updatedMeta = await prisma.userArticleMeta.update({
      where: {
        id: metaId,
      },
      data: {
        isBookmarked: false,
      },
    });

    return {
      success: true,
      message: "Bookmark removed successfully.",
      data: updatedMeta,
    };
  } catch (error) {
    console.error("Failed to remove bookmark:", error);
    return {
      success: false,
      message: "Failed to remove bookmark.",
    };
  }
}
