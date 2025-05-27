import { Chapter } from "@prisma/client";
import ChapterCard from "./chapter-card";

interface Props {
  data: Chapter[];
}

const ChapterTitleContainer = ({ data }: Props) => {
  return (
    <div className="space-y-[15px]">
      {data.map((chapter, i) => (
        <ChapterCard chapter={chapter} index={i} key={chapter.id} />
      ))}
    </div>
  );
};

export default ChapterTitleContainer;
