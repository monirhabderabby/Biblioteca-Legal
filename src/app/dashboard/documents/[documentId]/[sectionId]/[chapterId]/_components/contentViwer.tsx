"use client";

import DOMPurify from "dompurify";

interface Props {
  content: string;
}
const ContentViewer = ({ content }: Props) => {
  return (
    <div
      className="text-[14px] leading-[200%]"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    />
  );
};

export default ContentViewer;
