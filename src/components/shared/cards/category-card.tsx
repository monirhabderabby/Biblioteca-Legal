import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { Pencil, Trash } from "lucide-react";
import dynamic from "next/dynamic";
const AddCategoryDialog = dynamic(
  () => import("@/components/shared/modals/add-category-modal"),
  {
    ssr: false,
  }
);

interface Props {
  data: Category;
}
const CategoryCard = ({ data }: Props) => {
  return (
    <div className="border-[1px] border-[#1E2A3866]/40 py-[15px] px-[20px] rounded-[8px] bg-white flex items-center gap-x-[60px]">
      {data.name}
      <div>
        <AddCategoryDialog
          initialData={data}
          trigger={
            <Button size="icon" variant="link" title="Edit">
              <Pencil />
            </Button>
          }
        />
        <Button size="icon" variant="link" title="delete">
          <Trash className="text-rose-500" />
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard;
