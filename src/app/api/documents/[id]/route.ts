import { auth } from "@/auth";
import { getCurrentUserSubscription } from "@/helper/subscription";
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

  let articleNumberSearch = null;

  if (searchQuery) {
    const articuloMatch = searchQuery.match(/^Articulo\s+(\d+)$/i);
    if (articuloMatch) {
      articleNumberSearch = parseInt(articuloMatch[1], 10);
    }
  }

  let hasFullAccess = false;

  // Check subscription status if user is logged in
  if (isLoggedin) {
    const currentSubscription = await getCurrentUserSubscription();
    const isActive = currentSubscription?.subscription.isActive ?? false;
    const currentPeriodEnd = currentSubscription?.subscription.currentPeriodEnd;

    const now = new Date();
    hasFullAccess = isActive && !!currentPeriodEnd && currentPeriodEnd > now;
  }

  try {
    let sections;

    if (hasFullAccess) {
      // Full access: fetch all data
      sections = await prisma.section.findMany({
        where: {
          documentId: id,
          ...(searchQuery &&
            !articleNumberSearch && {
              OR: [
                { title: { contains: searchQuery, mode: "insensitive" } },
                {
                  chapters: {
                    some: {
                      title: { contains: searchQuery, mode: "insensitive" },
                      articles: {
                        some: {
                          content: {
                            contains: searchQuery,
                            mode: "insensitive",
                          },
                        },
                      },
                    },
                  },
                },
              ],
            }),
          ...(articleNumberSearch && {
            chapters: {
              some: {
                articles: {
                  some: {
                    articleNumber: articleNumberSearch,
                  },
                },
              },
            },
          }),
        },
        include: {
          chapters: {
            include: {
              articles: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      // Filter chapters and articles if searchQuery exists
      if (searchQuery) {
        sections = sections.map((section) => {
          const sectionMatches = section.title
            .toLowerCase()
            .includes(searchQuery);
          let filteredChapters = section.chapters;

          if (!sectionMatches || articleNumberSearch) {
            filteredChapters = filteredChapters.filter((chapter) => {
              if (articleNumberSearch) {
                return chapter.articles.some(
                  (article) => article.articleNumber === articleNumberSearch
                );
              }
              return chapter.title.toLowerCase().includes(searchQuery);
            });
          }

          return {
            ...section,
            chapters: filteredChapters,
          };
        });

        sections = sections.filter((section) => section.chapters.length > 0);
      }
    } else {
      // Limited access: fetch only 1 section, 1 chapter, 3 articles
      const [firstSection] = await prisma.section.findMany({
        where: {
          documentId: id,
          ...(searchQuery &&
            !articleNumberSearch && {
              OR: [
                { title: { contains: searchQuery, mode: "insensitive" } },
                {
                  chapters: {
                    some: {
                      title: { contains: searchQuery, mode: "insensitive" },
                    },
                  },
                },
              ],
            }),
          ...(articleNumberSearch && {
            chapters: {
              some: {
                articles: {
                  some: {
                    articleNumber: articleNumberSearch,
                  },
                },
              },
            },
          }),
        },
        include: {
          chapters: {
            where: searchQuery
              ? {
                  ...(articleNumberSearch
                    ? {
                        articles: {
                          some: {
                            articleNumber: articleNumberSearch,
                          },
                        },
                      }
                    : {
                        OR: [
                          {
                            title: {
                              contains: searchQuery,
                              mode: "insensitive",
                            },
                          },
                          {
                            articles: {
                              some: {
                                content: {
                                  contains: searchQuery,
                                  mode: "insensitive",
                                },
                              },
                            },
                          },
                        ],
                      }),
                }
              : undefined,
            take: 1,
            include: {
              articles: {
                take: 3,
                orderBy: {
                  createdAt: "asc",
                },
              },
            },
          },
        },
        take: 1,
        orderBy: {
          createdAt: "asc",
        },
      });
      sections = firstSection ? [firstSection] : [];
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
