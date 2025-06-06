import { Article } from "@prisma/client";
import dynamic from "next/dynamic";
const ArticleCard = dynamic(() => import("./article-card"), {
  ssr: false,
});

interface Props {
  data: Article[];
  isLoggedin: boolean;
  documentId: string;
}

const ArticleWrapper = ({ data, isLoggedin, documentId }: Props) => {
  return (
    <div className="space-y-5">
      {data?.map((item, i) => (
        <ArticleCard
          data={item}
          index={i}
          key={item.id}
          isLoggedin={isLoggedin}
          documentId={documentId}
        />
      ))}
    </div>
  );
};

export default ArticleWrapper;
