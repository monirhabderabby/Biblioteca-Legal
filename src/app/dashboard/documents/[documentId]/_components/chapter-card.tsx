const AddDocumentChapterTitleModal = dynamic(
  () => import("@/components/shared/modals/add-document-chapter-title"),
  {
    ssr: false,
  }
);
import { deleteDocumentChapter } from "@/actions/document/section/chapter/delete";
import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Chapter } from "@prisma/client";
import dynamic from "next/dynamic";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  chapter: Chapter;
  index: number;
  sectionId: string;
  documentId: string;
}

const ChapterCard = ({ chapter, index, sectionId, documentId }: Props) => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function onDelete() {
    startTransition(() => {
      // Call the delete function here
      deleteDocumentChapter(chapter.id, documentId).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }
        toast.success(res.message);
        setOpen(false);
      });
    });
  }
  return (
    <>
      <div
        className="flex items-center justify-between w-full border-[1px] border-[#1E2A3833]/20 py-[15px] px-[30px]"
        key={chapter.id}
      >
        <CardTitle>
          {index + 1}. {chapter.title}
        </CardTitle>
        <div className="flex items-center gap-x-[15px]">
          <AddDocumentChapterTitleModal
            trigger={
              <Button
                variant="outline"
                className="text-primary hover:text-primary/80"
              >
                Edit
              </Button>
            }
            sectionId={sectionId}
            documentId={documentId}
            initialData={chapter}
          />
          <Button variant="destructive" onClick={() => setOpen(true)}>
            Delete
          </Button>
          <Button
            variant="outline"
            className="text-primary hover:text-primary/80"
          >
            Manage Chapter
          </Button>
        </div>
      </div>

      <AlertModal
        isOpen={open}
        loading={pending}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
    </>
  );
};

export default ChapterCard;
