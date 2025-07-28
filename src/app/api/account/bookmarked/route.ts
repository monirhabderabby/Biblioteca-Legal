import { auth } from "@/auth";
import { prisma } from "@/lib/db"; // adjust path to your prisma instance
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cu = await auth();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (!cu?.user?.id) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.userArticleMeta.findMany({
        where: { userId: cu.user.id, isBookmarked: true },
        skip,
        take: limit,
        include: {
          article: true,
          document: true,
        },
        orderBy: {
          article: {
            articleNumber: "asc",
          },
        },
      }),
      prisma.userArticleMeta.count({
        where: { userId: cu.user.id, isBookmarked: true },
      }),
    ]);

    return NextResponse.json({
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching user article meta:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
