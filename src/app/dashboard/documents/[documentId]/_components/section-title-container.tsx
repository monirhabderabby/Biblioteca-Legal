"use client";
import AddDocumentChapterTitleModal from "@/components/shared/modals/add-document-chapter-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionWithChapters } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import ChapterTitleContainer from "./chapter-title-container";

interface Props {
  sections: SectionWithChapters[];
  documentId: string;
}

const SectionTitleContainer = ({ sections, documentId }: Props) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(
    new Set([1])
  );

  const toggleChapter = (chapterId: number) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };
  return (
    <div className="space-y-[30px]">
      {sections.map((section, i) => (
        <Card className="shadow-none" key={i}>
          <CardHeader className="border-b-[1px] border-[#1E2A3833]/20">
            <div className="flex items-center justify-between w-full">
              <CardTitle
                onClick={() => toggleChapter(i + 1)}
                className="cursor-pointer"
              >
                {i + 1}. {section.title}
              </CardTitle>
              <AddDocumentChapterTitleModal
                documentId={documentId}
                trigger={
                  <Button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the card header click from toggling the chapter
                    }}
                  >
                    <Plus /> Add Chapter
                  </Button>
                }
                sectionId={section.id}
              />
            </div>
          </CardHeader>

          <AnimatePresence>
            {expandedChapters.has(i + 1) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="overflow-hidden"
              >
                <CardContent className="pt-5">
                  <ChapterTitleContainer data={section.chapters} />
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
};

export default SectionTitleContainer;
