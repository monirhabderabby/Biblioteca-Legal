import { removeBookmark } from "@/actions/article-meta/update";
import ContentViewer from "@/app/dashboard/documents/[documentId]/[sectionId]/[chapterId]/_components/contentViwer";
import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Article } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Bookmark, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  articleId: string;
  metaId: string;
  article: Article;
}

// interface ApiProps {
//   success: boolean;
//   data: Article;
//   message?: string;
// }

const BookmarkCard = ({ articleId, metaId, article }: Props) => {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const queryClient = useQueryClient();

  // const { data, isLoading } = useQuery<ApiProps>({
  //   queryKey: [`article`, articleId],
  //   queryFn: () => fetch(`/api/article/${articleId}`).then((res) => res.json()),
  // });

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
        queryClient.invalidateQueries({ queryKey: [`article`, articleId] });
      });
    });
  };

  // let content;

  // if (isLoading) {
  //   content = (
  //     <div className="min-h-[100px] flex items-center justify-center">
  //       <Loader2 className="animate-spin opacity-70" />;
  //     </div>
  //   );
  // } else if (!data?.success) {
  //   content = (
  //     <div className="min-h-[300px] flex items-center justify-center text-red-600 dark:text-red-400 text-center space-y-2">
  //       <p className="text-lg font-medium">Failed to load article</p>
  //       <p className="text-sm text-gray-500 dark:text-gray-400">
  //         {data?.message || "Something went wrong. Please try again later."}
  //       </p>
  //     </div>
  //   );
  // } else if (!data?.data) {
  //   content = (
  //     <div className="min-h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
  //       No article found.
  //     </div>
  //   );
  // } else {
  //   content = <ContentViewer content={article.content} />;
  // }

  return (
    <>
      <div
        className="w-full px-5 shadow-none  h-[45px] md:h-[60px] rounded-[6px] border flex items-center cursor-pointer"
        onClick={() => {
          setContentOpen((p) => !p);
        }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Bookmark className="fill-primary h-5 w-5" /> Article
            <span> {article.articleNumber}</span>
          </div>
          <Button
            variant="link"
            className="hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <Trash />
          </Button>
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
        title={`Article ${article.articleNumber}`}
        description=""
      >
        <ScrollArea className="min-h-[200px] h-auto lg:max-h-[400px]">
          <ContentViewer content={article.content} />;
        </ScrollArea>
      </ResponsiveDialog>
    </>
  );
};

export default BookmarkCard;
