import AddArticleModal from "@/components/shared/modals/add-article-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "@prisma/client";
import ContentViewer from "./contentViwer";

interface Props {
  data: Article;
  index: number;
  chapterId: string;
  sectionId: string;
  documentId: string;
}

const ArticleViewer = ({ data, index, sectionId, documentId }: Props) => {
  return (
    <Card className="shadow-none" key={data.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Artitlce {index + 1}</CardTitle>
          <div>
            <AddArticleModal
              trigger={
                <Button
                  variant="outline"
                  className="text-primary hover:text-primary/80"
                >
                  Edit
                </Button>
              }
              chapterId={data.chapterId}
              initialData={data}
              sectionId={sectionId}
              documentId={documentId}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ContentViewer article={data} />
      </CardContent>
    </Card>
  );
};

export default ArticleViewer;
