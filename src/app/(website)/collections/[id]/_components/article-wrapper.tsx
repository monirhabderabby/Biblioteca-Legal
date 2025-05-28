import { Article } from "@prisma/client";
import ArticleCard from "./article-card";

interface Props {
  data: Article[];
}

const ArticleWrapper = ({ data }: Props) => {
  return (
    <div className="space-y-5">
      {data.map((item, i) => (
        <ArticleCard data={item} index={i} key={item.id} />
      ))}
    </div>
  );
};

export default ArticleWrapper;
