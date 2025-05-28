import { prisma } from "@/lib/db"; // adjust as needed
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params || {};
  const { searchParams } = new URL(req.url);
  const isLoggedin = searchParams.get("isLoggedin") === "true";

  try {
    const sections = await prisma.section.findMany({
      where: {
        documentId: id,
      },
      include: {
        chapters: {
          include: {
            articles: {
              take: isLoggedin ? undefined : 3,
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Sections fetched successfully",
      data: sections,
    });
  } catch (error) {
    console.error("Error fetching sections:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch sections",
        data: null,
      },
      { status: 500 }
    );
  }
}
