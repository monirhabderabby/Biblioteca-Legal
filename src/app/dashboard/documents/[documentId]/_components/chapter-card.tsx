import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Chapter } from "@prisma/client";

interface Props {
  chapter: Chapter;
  index: number;
}

const ChapterCard = ({ chapter, index }: Props) => {
  return (
    <div
      className="flex items-center justify-between w-full border-[1px] border-[#1E2A3833]/20 py-[15px] px-[30px]"
      key={chapter.id}
    >
      <CardTitle>
        {index + 1}. {chapter.title}
      </CardTitle>
      <div className="flex items-center gap-x-[15px]">
        <Button
          variant="outline"
          className="text-primary hover:text-primary/80"
        >
          Edit
        </Button>
        <Button variant="destructive">Delete</Button>
        <Button
          variant="outline"
          className="text-primary hover:text-primary/80"
        >
          Manage Chapter
        </Button>
      </div>
    </div>
  );
};

export default ChapterCard;
