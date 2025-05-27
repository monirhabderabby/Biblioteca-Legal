"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import ChapterTitleContainer from "./chapter-title-container";

interface Props {
  sections: Section[];
}

const SectionTitleContainer = ({ sections }: Props) => {
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
          <CardHeader
            className="border-b-[1px] border-[#1E2A3833]/20"
            onClick={() => toggleChapter(i + 1)}
          >
            <div className="flex items-center justify-between w-full">
              <CardTitle>
                {i + 1}. {section.title}
              </CardTitle>
              <Button>
                <Plus /> Add Chapter
              </Button>
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
                  <ChapterTitleContainer />
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
