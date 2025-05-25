import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const AddCategoryDialog = dynamic(
  () => import("@/components/shared/modals/add-category-modal"),
  {
    ssr: false,
  }
);

const Page = () => {
  return (
    <div>
      <div className="w-full flex justify-between mb-5">
        <h1 className="text-primary font-semibold text-[32px] leading-[120%]">
          Manage Category
        </h1>

        <AddCategoryDialog trigger={<Button>Add Category</Button>} />
      </div>
    </div>
  );
};

export default Page;
