"use client";

import { deleteArticle } from "@/actions/document/section/article/delete";
import AddArticleModal from "@/components/shared/modals/add-article-modal";
import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "@prisma/client";
import { Trash } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useTransition } from "react";
import { toast } from "sonner";
const ContentViewer = dynamic(() => import("./contentViwer"), {
  ssr: false,
});

interface Props {
  data: Article;
  index: number;
  chapterId: string;
  sectionId: string;
  documentId: string;
}

const ArticleViewer = ({
  data,
  index,
  sectionId,
  documentId,
  chapterId,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(() => {
      deleteArticle(data.id, documentId, sectionId, chapterId).then((res) => {
        if (!res.success) {
          toast.error(res.message);
        }
        // handle success
        toast.success(res.message);
        setOpen(false);
      });
    });
  };
  return (
    <div>
      <Card className="shadow-none bg-transparent" key={data.id}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Artitlce {index + 1}</CardTitle>
            <div className="flex items-center gap-2">
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

              <Button
                variant="destructive"
                size="icon"
                onClick={() => setOpen(true)}
              >
                <Trash />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <ContentViewer content={data.content} />
        </CardContent>
      </Card>
      <AlertModal
        loading={pending}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
    </div>
  );
};

export default ArticleViewer;
