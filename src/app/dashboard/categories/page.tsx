import CategoryCard from "@/components/shared/cards/category-card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import dynamic from "next/dynamic";
const AddCategoryDialog = dynamic(
  () => import("@/components/shared/modals/add-category-modal"),
  {
    ssr: false,
  }
);

const Page = async () => {
  const allCategories = await prisma.category.findMany();
  return (
    <div>
      <div className="w-full flex justify-between mb-5">
        <h1 className="text-primary font-semibold text-[32px] leading-[120%]">
          Manage Category
        </h1>

        <AddCategoryDialog
          trigger={<Button className="h-[45px]">Add Category</Button>}
        />
      </div>

      <div className="flex flex-wrap gap-x-[60px] gap-y-[30px] mt-[80px]">
        {allCategories.map((item) => (
          <CategoryCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
