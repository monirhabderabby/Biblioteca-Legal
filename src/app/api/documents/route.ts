import { prisma } from "@/lib/db"; // adjust path based on your setup
import { redis } from "@/lib/redis/redis";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = "force-dynamic";

function generateCacheKey(searchParams: URLSearchParams): string {
  return `documents:${searchParams.toString()}`;
}

const CACHE_TTL = 300;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const cacheKey = generateCacheKey(searchParams);
    const cachedData = await redis.get(cacheKey);

    if (typeof cachedData === "string") {
      return NextResponse.json(JSON.parse(cachedData));
    }

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * pageSize;

    // Search
    const query = searchParams.get("search")?.toLowerCase() || "";
    const category = searchParams.get("category") || undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};

    if (query) {
      whereClause.OR = [
        { name: { contains: query, mode: "insensitive" as const } },
        { law_number: { contains: query, mode: "insensitive" as const } },
        {
          sections: {
            some: {
              title: { contains: query, mode: "insensitive" as const },
            },
          },
        },
        {
          sections: {
            some: {
              chapters: {
                some: {
                  title: { contains: query, mode: "insensitive" as const },
                },
              },
            },
          },
        },
      ];
    }

    if (category && category !== "all") {
      whereClause.categories = {
        some: {
          id: category,
        },
      };
    }

    // Fetch total count
    const totalCount = await prisma.document.count({ where: whereClause });

    // Fetch paginated documents
    const documents = await prisma.document.findMany({
      where: whereClause,
      skip,
      take: pageSize,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });

    const responseData = {
      success: true,
      message: "Successfully retrieve ",
      data: documents,
      meta: {
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        totalCount,
      },
    };

    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(responseData));

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("[GET_DOCUMENTS]", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

// import { prisma } from "@/lib/db";
// import { redis } from "@/lib/redis/redis";
// import { NextRequest, NextResponse } from "next/server";

// // Cache TTL (5 minutes)

// // Force dynamic rendering

// // Generate cache key based on query parameters

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);

//     // Check cache first

//     // Pagination with validation
//     const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
//     const pageSize = Math.min(
//       50,
//       Math.max(1, parseInt(searchParams.get("limit") || "12"))
//     );
//     const skip = (page - 1) * pageSize;

//     // Search parameters
//     const query = searchParams.get("search")?.toLowerCase().trim() || "";
//     const category = searchParams.get("category") || undefined;

//     // Build optimized MongoDB query
//     const whereClause: any = { published: true }; // Only fetch published documents

//     if (query) {
//       whereClause.$or = [
//         { name: { $regex: query, $options: "i" } },
//         { law_number: { $regex: query, $options: "i" } },
//         { "sections.title": { $regex: query, $options: "i" } },
//         { "sections.chapters.title": { $regex: query, $options: "i" } },
//       ];
//     }

//     if (category && category !== "all") {
//       whereClause["categories.id"] = category;
//     }

//     // Use Promise.all for parallel execution
//     const [totalCount, documents] = await Promise.all([
//       prisma.document.count({ where: whereClause }),
//       prisma.document.findMany({
//         where: whereClause,
//         skip,
//         take: pageSize,
//         orderBy: [{ createdAt: "desc" }, { id: "desc" }],
//         select: {
//           id: true,
//           name: true,
//           short_description: true,
//           law_number: true,
//           categories: true,
//           publishedAt: true,
//           createdAt: true,
//           // Only include necessary fields
//         },
//       }),
//     ]);

//     const responseData = {
//       success: true,
//       message: "Documents retrieved successfully",
//       data: documents,
//       meta: {
//         page,
//         pageSize,
//         totalPages: Math.ceil(totalCount / pageSize),
//         totalCount,
//       },
//     };

//     // Cache the response
//     await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(responseData));

//     return NextResponse.json(responseData);
//   } catch (error) {
//     console.error("[GET_DOCUMENTS]", error);
//     return NextResponse.json(
//       {
//         message: "Internal Server Error",
//         success: false,
//         error:
//           process.env.NODE_ENV === "development" &&
//           error &&
//           typeof error === "object" &&
//           "message" in error
//             ? (error as { message: string }).message
//             : undefined,
//       },
//       { status: 500 }
//     );
//   }
// }
