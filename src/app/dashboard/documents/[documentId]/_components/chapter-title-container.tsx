import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Chapter } from "@prisma/client";

interface Props {
  data: Chapter[];
}

const ChapterTitleContainer = ({ data }: Props) => {
  return (
    <div className="space-y-[15px]">
      {data.map((chapter, i) => (
        <div
          className="flex items-center justify-between w-full border-[1px] border-[#1E2A3833]/20 py-[15px] px-[30px] "
          key={chapter.id}
        >
          <CardTitle>
            {i + 1}. {chapter.title}
          </CardTitle>
          <div>
            <Button
              variant="outline"
              className="text-primary hover:text-primary/80"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChapterTitleContainer;
