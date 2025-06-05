import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";

interface Props {
  articleId: string;
  index: number;
}

interface ApiProps {
  success: boolean;
  data: Article[];
}

const BookmarkCard = ({ articleId, index }: Props) => {
  const { data } = useQuery<ApiProps>({
    queryKey: ["article"],
    queryFn: () => fetch(`/api/article/${articleId}`).then((res) => res.json()),
  });

  console.log(data);
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Article {index + 1}</CardTitle>
          <Button variant="link" className="hover:text-red-500">
            <Trash />
          </Button>
        </div>
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  );
};

export default BookmarkCard;
