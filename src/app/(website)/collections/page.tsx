import HeaderSection from "@/components/shared/sections/header";
import { prisma } from "@/lib/db";
import dynamic from "next/dynamic";
import CollectionFilter from "./_components/collection-filter";
const CollectionContainer = dynamic(
  () => import("./_components/collection-container"),
  {
    ssr: false,
  }
);

const Page = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div>
      <HeaderSection
        imageUrl="https://files.edgestore.dev/ln9m9j3kr2yibrue/staticFiled/_public/86f8cacd-d2d6-42df-a1bd-569b2c5e047c.webp"
        title="Legal Document Collection"
        description="Browse our comprehensive collection of laws, decrees, and legal
            documents"
      />

      <div>
        <CollectionFilter categories={categories} />
      </div>

      <CollectionContainer />
    </div>
  );
};

export default Page;
