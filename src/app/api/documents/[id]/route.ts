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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sections: any[] = [];

    if (articleNumberSearch) {
      // Specific article search for "Articulo <number>"
      const article = await prisma.article.findFirst({
        where: {
          articleNumber: articleNumberSearch,
          chapter: {
            section: {
              documentId: id,
            },
          },
        },
        include: {
          chapter: {
            include: {
              section: true,
            },
          },
        },
      });

      if (article) {
        sections = [
          {
            ...article.chapter.section,
            chapters: [
              {
                ...article.chapter,
                articles: [article],
              },
            ],
          },
        ];
      }
    } else if (searchQuery) {
      // Sequential search: section title -> chapter title -> article content
      if (hasFullAccess) {
        // 1. Search in section title
        sections = await prisma.section.findMany({
          where: {
            documentId: id,
            title: { contains: searchQuery, mode: "insensitive" },
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

        // 2. If no sections found, search in chapter title
        if (sections.length === 0) {
          sections = await prisma.section.findMany({
            where: {
              documentId: id,
              chapters: {
                some: {
                  title: { contains: searchQuery, mode: "insensitive" },
                },
              },
            },
            include: {
              chapters: {
                where: {
                  title: { contains: searchQuery, mode: "insensitive" },
                },
                include: {
                  articles: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          });
        }

        // 3. If no sections found, search in article contentPlainText
        if (sections.length === 0) {
          sections = await prisma.section.findMany({
            where: {
              documentId: id,
              chapters: {
                some: {
                  articles: {
                    some: {
                      contentPlainText: {
                        contains: searchQuery,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
            },
            include: {
              chapters: {
                where: {
                  articles: {
                    some: {
                      contentPlainText: {
                        contains: searchQuery,
                        mode: "insensitive",
                      },
                    },
                  },
                },
                include: {
                  articles: {
                    where: {
                      contentPlainText: {
                        contains: searchQuery,
                        mode: "insensitive",
                      },
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

        // Filter out empty chapters
        sections = sections
          .map((section) => ({
            ...section,
            chapters: section.chapters.filter(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (chapter: any) => chapter.articles.length > 0
            ),
          }))
          .filter((section) => section.chapters.length > 0);
      } else {
        // Limited access: fetch only 1 section, 1 chapter, 3 articles
        // 1. Search in section title
        let firstSection = await prisma.section.findFirst({
          where: {
            documentId: id,
            title: { contains: searchQuery, mode: "insensitive" },
          },
          include: {
            chapters: {
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
          orderBy: {
            createdAt: "asc",
          },
        });

        // 2. If no section found, search in chapter title
        if (!firstSection) {
          firstSection = await prisma.section.findFirst({
            where: {
              documentId: id,
              chapters: {
                some: {
                  title: { contains: searchQuery, mode: "insensitive" },
                },
              },
            },
            include: {
              chapters: {
                where: {
                  title: { contains: searchQuery, mode: "insensitive" },
                },
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
            orderBy: {
              createdAt: "asc",
            },
          });
        }

        // 3. If no section found, search in article contentPlainText
        if (!firstSection) {
          firstSection = await prisma.section.findFirst({
            where: {
              documentId: id,
              chapters: {
                some: {
                  articles: {
                    some: {
                      contentPlainText: {
                        contains: searchQuery,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
            },
            include: {
              chapters: {
                where: {
                  articles: {
                    some: {
                      contentPlainText: {
                        contains: searchQuery,
                        mode: "insensitive",
                      },
                    },
                  },
                },
                take: 1,
                include: {
                  articles: {
                    where: {
                      contentPlainText: {
                        contains: searchQuery,
                        mode: "insensitive",
                      },
                    },
                    take: 3,
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

        sections = firstSection ? [firstSection] : [];
      }
    } else {
      // No search query: fetch all data based on access level
      if (hasFullAccess) {
        sections = await prisma.section.findMany({
          where: {
            documentId: id,
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
      } else {
        const [firstSection] = await prisma.section.findMany({
          where: {
            documentId: id,
          },
          include: {
            chapters: {
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
    }

    return NextResponse.json({
      success: true,
      message:
        sections.length > 0
          ? "Sections fetched successfully"
          : "No results found",
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
