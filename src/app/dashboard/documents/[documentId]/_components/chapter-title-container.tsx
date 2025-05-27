import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";

const ChapterTitleContainer = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full border-[1px] border-[#1E2A3833]/20 py-[15px] px-[30px]">
        <CardTitle>1. Chapter</CardTitle>
        <div>
          <Button
            variant="outline"
            className="text-primary hover:text-primary/80"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChapterTitleContainer;
