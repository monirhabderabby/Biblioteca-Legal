import { removeBookmark } from "@/actions/article-meta/update";
import ContentViewer from "@/app/dashboard/documents/[documentId]/[sectionId]/[chapterId]/_components/contentViwer";
import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBackgroundClass } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { Article } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, Loader2, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  articleId: string;
  index: number;
  metaId: string;
  selectedColor: string;
  isBookmarked: boolean;
}

interface ApiProps {
  success: boolean;
  data: Article;
  message?: string;
}

const HighlightCard = ({
  articleId,

  metaId,
  selectedColor,
  isBookmarked,
}: Props) => {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<ApiProps>({
    queryKey: [`meta`, articleId],
    queryFn: () => fetch(`/api/article/${articleId}`).then((res) => res.json()),
  });

  const onRemoveBookmark = () => {
    startTransition(() => {
      removeBookmark({ metaId }).then((res) => {
        if (!res.success) {
          toast.error(res.message || "Failed to remove bookmark");
          return;
        }

        // handle successful removal
        toast.success("Bookmark removed successfully");
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: [`markers`] });
        queryClient.invalidateQueries({ queryKey: [`meta`, articleId] });
      });
    });
  };

  let content;

  if (isLoading) {
    content = (
      <div className="min-h-[100px] flex items-center justify-center">
        <Loader2 className="animate-spin opacity-70" />;
      </div>
    );
  } else if (!data?.success) {
    content = (
      <div className="min-h-[300px] flex items-center justify-center text-red-600 dark:text-red-400 text-center space-y-2">
        <p className="text-lg font-medium">Failed to load article</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {data?.message || "Something went wrong. Please try again later."}
        </p>
      </div>
    );
  } else if (!data?.data) {
    content = (
      <div className="min-h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
        No article found.
      </div>
    );
  } else {
    content = <ContentViewer content={data.data.content} />;
  }

  return (
    <>
      <div
        className={cn(
          `shadow-none w-full rounded-[6px] `,
          getBackgroundClass(selectedColor)
        )}
      >
        <div className="h-[60px] w-full flex items-center  justify-between p-5">
          <div
            className="flex items-center justify-between w-full cursor-pointer"
            onClick={() => setContentOpen((p) => !p)}
          >
            <div className="flex items-center gap-2">
              {isBookmarked ? (
                <Bookmark className="fill-primary h-5 w-5" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}{" "}
              Article {data?.data.articleNumber}
            </div>
            <Button
              variant="link"
              className="hover:text-red-500"
              onClick={() => setOpen(true)}
            >
              <Trash />
            </Button>
          </div>
        </div>

        {/* <CardContent>{content}</CardContent> */}
      </div>

      <AlertModal
        loading={pending}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onRemoveBookmark}
      />

      <ResponsiveDialog
        open={contentOpen}
        onOpenChange={(p) => setContentOpen(p)}
        title={`Article ${data?.data.articleNumber}`}
        description=""
      >
        <ScrollArea className="min-h-[200px] h-auto max-h-[400px]">
          {content}
        </ScrollArea>
      </ResponsiveDialog>
    </>
  );
};

export default HighlightCard;
