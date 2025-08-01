import { useArticleSearchStore } from "@/store/collections";
import { Article } from "@prisma/client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const ArticleCard = dynamic(() => import("./article-card"), {
  ssr: false,
});

interface Props {
  data: Article[];
  isLoggedin: boolean;
  documentId: string;
}

const ArticleWrapper = ({ data, isLoggedin, documentId }: Props) => {
  const { query } = useArticleSearchStore();
  const [highlightedArticle, setHighlightedArticle] = useState<number | null>(
    null
  );

  const articleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const searchNumber = parseInt(query.trim(), 10);

    if (!isNaN(searchNumber)) {
      const targetIndex = data.findIndex(
        (article) => article.articleNumber === searchNumber
      );

      if (targetIndex !== -1) {
        const target = articleRefs.current[targetIndex];

        if (target) {
          // Scroll with offset (header = 80px)
          const yOffset = -80;
          const y =
            target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });

          // Trigger highlight
          setHighlightedArticle(searchNumber); // highlight by articleNumber now

          const timeout = setTimeout(() => {
            setHighlightedArticle(null);
          }, 1200);

          return () => clearTimeout(timeout);
        }
      }
    }
  }, [query, data]);

  return (
    <div className="space-y-5">
      {data?.map((item, i) => (
        <div
          key={item.id}
          ref={(el) => {
            articleRefs.current[i] = el;
          }}
          className={`transition-colors duration-700 rounded-md  ${
            highlightedArticle === item.articleNumber
              ? "bg-yellow-50 border-yellow-400"
              : "bg-white"
          }`}
        >
          <ArticleCard
            data={item}
            index={i}
            isLoggedin={isLoggedin}
            documentId={documentId}
            highlightedArticle={highlightedArticle}
          />
        </div>
      ))}
    </div>
  );
};

export default ArticleWrapper;
