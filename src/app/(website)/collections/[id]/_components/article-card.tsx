import ContentViewer from "@/app/dashboard/documents/[documentId]/[sectionId]/[chapterId]/_components/contentViwer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Article } from "@prisma/client";

interface Props {
  data: Article;
  index: number;
}

const ArticleCard = ({ data, index }: Props) => {
  return (
    <div>
      <Card className="shadow-none border-0">
        <CardHeader>
          <Button className="bg-[#1E2A384D]/30 w-fit text-black">
            Article {index + 1}
          </Button>
        </CardHeader>

        <CardContent>
          <ContentViewer article={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleCard;
