"use client";

import useDebounce from "@/hooks/useDebounce";
import { useArticleSearchStore } from "@/store/collections";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import ArticleHeader from "./article-header";
import ArticleWrapper from "./article-wrapper";

interface Props {
  documentId: string;
  isLoggedin: boolean;
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

const ArticleContainer = ({ documentId, isLoggedin }: Props) => {
  const { query } = useArticleSearchStore();
  const searchQuery = useDebounce(query, 500);
  const { data, isLoading, isError, error } = useQuery<
    ApiResponse<FullSectionResponse[]>
  >({
    queryKey: ["article", documentId, searchQuery],
    queryFn: () =>
      fetch(`/api/documents/${documentId}?query=${searchQuery}`).then((res) =>
        res.json()
      ),
  });

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
      <div className=" space-y-[100px] mb-[200px]">
        {data.data.map((section) => (
          <div key={section.id} className="space-y-[80px]">
            {section.chapters.map((chapter) => (
              <div key={chapter.id}>
                <ArticleHeader
                  sectionTitle={section.title}
                  chapterTitle={chapter.title}
                />
                <ArticleWrapper
                  data={chapter.articles}
                  isLoggedin={isLoggedin}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return <div className="container ">{content}</div>;
};

export default ArticleContainer;
