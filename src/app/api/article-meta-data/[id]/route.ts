import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const articleId = params.id;

  try {
    const meta = await prisma.userArticleMeta.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    });

    if (!meta) {
      return NextResponse.json({
        success: false,
        message: "No metadata found for this article.",
        data: null,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Metadata retrieved successfully.",
      data: meta,
    });
  } catch (error) {
    console.error("Error fetching article meta:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}
