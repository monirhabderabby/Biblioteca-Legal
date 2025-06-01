import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const cu = await auth();
  const { id } = params || {};
  const { searchParams } = new URL(req.url);
  const isLoggedin = !!cu;
  const searchQuery = searchParams.get("query")?.trim().toLowerCase();

  try {
    let sections;

    if (searchQuery) {
      // Fetch sections where section or chapters match
      sections = await prisma.section.findMany({
        where: {
          documentId: id,
          OR: [
            {
              title: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
            {
              chapters: {
                some: {
                  title: {
                    contains: searchQuery,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
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

      // Filter chapters inside each section to only include matching chapters OR all chapters if section title matches
      sections = sections.map((section) => {
        // Check if section title matches search query
        const sectionMatches = section.title
          .toLowerCase()
          .includes(searchQuery);

        return {
          ...section,
          chapters: section.chapters.filter((chapter) => {
            // Include chapter if section matches OR chapter matches
            return (
              sectionMatches ||
              chapter.title.toLowerCase().includes(searchQuery)
            );
          }),
        };
      });

      // Optional: remove sections with no chapters after filtering (if needed)
      sections = sections.filter((section) => section.chapters.length > 0);
    } else {
      // No search query – return all
      sections = await prisma.section.findMany({
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
    }

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
