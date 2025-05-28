import { Article } from "@prisma/client";
import dynamic from "next/dynamic";
const ArticleCard = dynamic(() => import("./article-card"), {
  ssr: false,
});

interface Props {
  data: Article[];
  isLoggedin: boolean;
}

const ArticleWrapper = ({ data, isLoggedin }: Props) => {
  return (
    <div className="space-y-5">
      {data?.map((item, i) => (
        <ArticleCard
          data={item}
          index={i}
          key={item.id}
          isLoggedin={isLoggedin}
        />
      ))}
    </div>
  );
};

export default ArticleWrapper;
