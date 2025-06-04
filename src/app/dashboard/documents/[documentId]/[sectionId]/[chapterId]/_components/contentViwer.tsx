"use client";
// import DOMPurify from "dompurify";
import xss from "xss";
// const windowDOMPurify = DOMPurify as typeof DOMPurify & {
//   sanitize: (dirty: string) => string;
// };

// const { sanitize } = windowDOMPurify;

interface Props {
  content: string;
}

const ContentViewer = ({ content }: Props) => {
  const cleanHTML = xss(content);
  return (
    <div
      className="text-[14px] leading-[200%] space-y-5"
      dangerouslySetInnerHTML={{
        __html: cleanHTML,
      }}
    />
  );
};

export default ContentViewer;
