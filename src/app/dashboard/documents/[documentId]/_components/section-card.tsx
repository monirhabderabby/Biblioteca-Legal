"use client";

import { deleteDocumentSection } from "@/actions/document/section/delete";
import AddDocumentChapterTitleModal from "@/components/shared/modals/add-document-chapter-title";
import AddDocumentSectionTitleModal from "@/components/shared/modals/add-document-section-ttile-modal";
import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SectionWithChapters } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Plus, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ChapterTitleContainer from "./chapter-title-container";

interface Props {
  section: SectionWithChapters;
  index: number;
  documentId: string;
}

const SectionCard = ({ section, index, documentId }: Props) => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState(index === 0);

  const toggle = () => setIsExpanded((prev) => !prev);

  const handleDelete = async () => {
    startTransition(() => {
      deleteDocumentSection(section.id, documentId).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        setOpen(false);
      });
    });
  };

  return (
    <>
      <Card className="shadow-none">
        <CardHeader
          className={cn(isExpanded && "border-b-[1px] border-[#1E2A3833]/20")}
        >
          <div className="flex items-center justify-between w-full">
            <CardTitle onClick={toggle} className="cursor-pointer">
              {index + 1}. {section.title}
            </CardTitle>
            <div className="flex items-center gap-x-3">
              <AddDocumentChapterTitleModal
                documentId={documentId}
                sectionId={section.id}
                trigger={
                  <Button onClick={(e) => e.stopPropagation()}>
                    <Plus /> Add Chapter
                  </Button>
                }
              />

              <AddDocumentSectionTitleModal
                trigger={
                  <Button
                    size="icon"
                    variant="outline"
                    className="text-primary hover:text-primary/80"
                  >
                    <Pencil />
                  </Button>
                }
                documentId={documentId}
                initialData={section}
              />

              <Button
                size="icon"
                variant="destructive"
                onClick={() => setOpen(true)}
              >
                <Trash />
              </Button>
            </div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <CardContent className="pt-5">
                <ChapterTitleContainer
                  data={section.chapters}
                  sectionId={section.id}
                  documentId={documentId}
                />
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <AlertModal
        loading={pending}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default SectionCard;
