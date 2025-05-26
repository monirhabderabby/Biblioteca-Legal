import { prisma } from "@/lib/db"; // adjust path based on your setup
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * pageSize;

    // Search
    const query = searchParams.get("search")?.toLowerCase() || "";

    const whereClause = query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" as const } },
            {
              short_description: {
                contains: query,
                mode: "insensitive" as const,
              },
            },
            { law_number: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {};

    // Fetch total count
    const totalCount = await prisma.document.count({ where: whereClause });

    // Fetch paginated documents
    const documents = await prisma.document.findMany({
      where: whereClause,
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully retrieve ",
      data: documents,
      meta: {
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        totalCount,
      },
    });
  } catch (error) {
    console.error("[GET_DOCUMENTS]", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
