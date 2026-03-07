"use client";

import AdSenseUnit from "@/components/AdsenseUnit";
import { adsSLot } from "@/constants";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import ArticleHeader from "./article-header";
import ArticleWrapper from "./article-wrapper";

interface Props {
  documentId: string;
  isLoggedin: boolean;
  hasFullAccess: boolean;
  showAds?: boolean;
}

// Define the full nested response type
export type FullSectionResponse = Prisma.SectionGetPayload<{
  include: {
    chapters: {
      include: {
        articles: true;
      };
    };
  };
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data: T | null;
};

const ArticleContainer = ({
  documentId,
  isLoggedin,
  hasFullAccess,
  showAds = false,
}: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    ApiResponse<FullSectionResponse[]>
  >({
    queryKey: ["article", documentId],
    queryFn: () =>
      fetch(`/api/documents/${documentId}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2, // Retry twice on failure
  });

  useEffect(() => {
    if (documentId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [documentId]);

  let content;

  if (isLoading) {
    content = (
      <div className="min-h-[400px] w-full flex justify-center items-center text-primary gap-x-3">
        <Loader2 className="animate-spin " />
        <p className="animate-pulse">Please wait...</p>
      </div>
    );
  } else if (isError || !data?.success || !data.data) {
    content = (
      <div className="p-4 bg-red-100 border border-red-300 text-red-800 rounded-md my-10 mb-[300px]">
        <h2 className="font-semibold text-lg">Something went wrong</h2>
        <p>{(error as Error)?.message || data?.message || "Unknown error"}</p>
      </div>
    );
  } else {
    content = (
      <div className="space-y-[100px] mb-[100px]">
        {data.data.map((section, sectionIndex) => (
          <>
            <div key={section.id} className="space-y-[80px]">
              {section.chapters.map((chapter, cId) => {
                const isFirstChapter = cId === 0;

                return (
                  <div key={chapter.id}>
                    <ArticleHeader
                      sectionTitle={isFirstChapter ? section.title : ""}
                      chapterTitle={chapter.title}
                    />
                    <ArticleWrapper
                      data={chapter.articles}
                      isLoggedin={isLoggedin}
                      documentId={documentId}
                      hasFullAccess={hasFullAccess}
                    />
                  </div>
                );
              })}
            </div>

            {/* Inject ad after every 2nd section, never after the last */}
            {showAds &&
              sectionIndex % 2 === 1 &&
              sectionIndex < (data.data?.length ?? 0) - 1 && (
                <div key={`ad-${sectionIndex}`} className="w-full">
                  <AdSenseUnit slot={adsSLot} />
                </div>
              )}
          </>
        ))}
      </div>
    );
  }

  return <div className="container min-h-[calc(100vh-600px)]">{content}</div>;
};

export default ArticleContainer;
