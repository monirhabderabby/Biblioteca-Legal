"use client";

import { Article } from "@prisma/client";
import DOMPurify from "dompurify";

interface Props {
  article: Article;
}
const ContentViewer = ({ article }: Props) => {
  return (
    <div
      className="text-[14px] leading-[200%]"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(article.content),
      }}
    />
  );
};

export default ContentViewer;
