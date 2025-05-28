import { updateArticleMeta } from "@/actions/article-meta/update";
import ContentViewer from "@/app/dashboard/documents/[documentId]/[sectionId]/[chapterId]/_components/contentViwer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useOutsideClick from "@/hooks/useOutsideClick";
import { cn } from "@/lib/utils";
import { Article, UserArticleMeta } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import ColorPicker from "./tool/color-picker";
import CommentPopover from "./tool/comment-provider";

interface Props {
  data: Article;
  index: number;
}

interface ApiRes {
  success: boolean;
  message: string;
  data: UserArticleMeta | null;
}

const getBackgroundClass = (colorName: string) => {
  const colors: Record<string, string> = {
    yellow: "bg-yellow-100",
    green: "bg-green-100",
    blue: "bg-blue-100",
    pink: "bg-pink-100",
    orange: "bg-orange-100",
    white: "bg-white",
  };
  return colors[colorName] || "bg-white";
};

const ArticleCard = ({ data, index }: Props) => {
  const [pending, startTransition] = useTransition();
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comment, setComment] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();

  const { data: articleMeta, isLoading } = useQuery<ApiRes>({
    queryKey: ["meta", data.id],
    queryFn: () =>
      fetch(`/api/article-meta-data/${data.id}`).then((res) => res.json()),
  });

  useEffect(() => {
    if (articleMeta?.success && articleMeta?.data) {
      console.log(articleMeta);
      setSelectedColor(articleMeta.data.selectedColor!);
    }
  }, [articleMeta]);

  useOutsideClick(cardRef, () => setIsColorPickerOpen(false));

  const onColorUpdate = (color: string) => {
    startTransition(() => {
      updateArticleMeta({
        articleId: data.id,
        selectedColor: color,
      }).then((res) => {
        if (!res.success) {
          toast.error(res.message);

          return;
        }

        // handle success
        queryClient.invalidateQueries({ queryKey: ["meta", data.id] });
        setIsColorPickerOpen(false);
      });
    });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "rounded-lg shadow-sm border transition-colors duration-300 relative",
          getBackgroundClass(selectedColor),
          isColorPickerOpen && "z-10"
        )}
      >
        <CardHeader>
          <div className="flex items-center gap-x-2 relative">
            <Button
              className="bg-[#1E2A384D]/30 hover:bg-[#1E2A384D]/40 w-fit text-black"
              onClick={() => setIsColorPickerOpen(true)}
              disabled={isLoading || pending}
            >
              Article {index + 1}
            </Button>

            <AnimatePresence>
              {isColorPickerOpen && (
                <ColorPicker
                  selectedColor={selectedColor}
                  onColorSelect={(color) => {
                    setSelectedColor(color); // update UI
                    onColorUpdate(color); // update server
                  }}
                  onOpenComment={() => setIsCommentOpen(true)}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isCommentOpen && (
                <CommentPopover
                  comment={comment}
                  setComment={setComment}
                  onClose={() => setIsCommentOpen(false)}
                  inputRef={commentInputRef}
                />
              )}
            </AnimatePresence>
          </div>
        </CardHeader>

        <CardContent>
          <ContentViewer article={data} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArticleCard;
