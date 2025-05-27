"use client";

import AddDocumentChapterTitleModal from "@/components/shared/modals/add-document-chapter-title";
import AddDocumentSectionTitleModal from "@/components/shared/modals/add-document-section-ttile-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SectionWithChapters } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import ChapterTitleContainer from "./chapter-title-container";

interface Props {
  section: SectionWithChapters;
  index: number;
  documentId: string;
}

const SectionCard = ({ section, index, documentId }: Props) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  const toggle = () => setIsExpanded((prev) => !prev);

  return (
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
  );
};

export default SectionCard;
