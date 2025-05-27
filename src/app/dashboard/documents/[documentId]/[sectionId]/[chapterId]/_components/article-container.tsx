import { prisma } from "@/lib/db";
import ArticleViewer from "./article-viewer";

interface Props {
  chapterId: string;
  sectionId: string;
  documentId: string;
}

const ArticleContainer = async ({
  chapterId,
  sectionId,
  documentId,
}: Props) => {
  const articles = await prisma.article.findMany({
    where: {
      chapterId: chapterId,
    },
  });
  return (
    <div className="mt-10 space-y-5">
      {articles.map((article, i) => (
        <ArticleViewer
          key={article.id}
          data={article}
          index={i}
          chapterId={chapterId}
          sectionId={sectionId}
          documentId={documentId}
        />
      ))}
    </div>
  );
};

export default ArticleContainer;
