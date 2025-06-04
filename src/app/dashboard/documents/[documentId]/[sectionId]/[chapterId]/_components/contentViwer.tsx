"use client";
import DOMPurify from "dompurify";
const windowDOMPurify = DOMPurify as typeof DOMPurify & {
  sanitize: (dirty: string) => string;
};

const { sanitize } = windowDOMPurify;

interface Props {
  content: string;
}

const ContentViewer = ({ content }: Props) => {
  return (
    <div
      className="text-[14px] leading-[230%] space-y-10"
      dangerouslySetInnerHTML={{
        __html: sanitize(content),
      }}
    />
  );
};

export default ContentViewer;
