import { Chapter } from "@prisma/client";
import ChapterCard from "./chapter-card";

interface Props {
  data: Chapter[];
  sectionId: string;
  documentId: string;
}

const ChapterTitleContainer = ({ data, sectionId, documentId }: Props) => {
  return (
    <div className="space-y-[15px]">
      {data.map((chapter, i) => (
        <ChapterCard
          chapter={chapter}
          index={i}
          key={chapter.id}
          sectionId={sectionId}
          documentId={documentId}
        />
      ))}
    </div>
  );
};

export default ChapterTitleContainer;
