"use client";

import useDebounce from "@/hooks/useDebounce";
import { useArticleSearch } from "@/store/dashboard/document/section-search";
import { Article } from "@prisma/client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ArticleViewer = dynamic(() => import("./article-viewer"), {
  ssr: false,
});

interface Props {
  chapterId: string;
  sectionId: string;
  documentId: string;
  articles: Article[];
}

const ArticleContainer = ({
  chapterId,
  sectionId,
  documentId,
  articles,
}: Props) => {
  const { query } = useArticleSearch();
  const searchQuery = useDebounce(query, 10);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  // Create an array of refs for articles
  const articleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const index = parseInt(searchQuery.trim(), 10);

    if (!isNaN(index) && index >= 1 && index <= articles.length) {
      const target = articleRefs.current[index - 1];

      if (target) {
        // Scroll with offset (header = 80px)
        const yOffset = -80;
        const y =
          target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });

        // Trigger highlight
        setHighlightedIndex(index - 1);

        // Remove highlight after 1.2s
        const timeout = setTimeout(() => {
          setHighlightedIndex(null);
        }, 1200);

        return () => clearTimeout(timeout);
      }
    }
  }, [searchQuery, articles]);

  return (
    <>
      <div className="mt-5 flex justify-end ml-auto"></div>
      <div className="mt-10 space-y-5">
        {articles.length === 0 ? (
          <p className="text-gray-500 italic">No matching articles found.</p>
        ) : (
          articles.map((article, i) => (
            <div
              key={article.id}
              ref={(el) => {
                articleRefs.current[i] = el;
              }}
              className={`transition-colors duration-700 rounded-md  ${
                highlightedIndex === i
                  ? "bg-yellow-50 border-yellow-400"
                  : "bg-white"
              }`}
            >
              <ArticleViewer
                data={article}
                index={i}
                chapterId={chapterId}
                sectionId={sectionId}
                documentId={documentId}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ArticleContainer;
