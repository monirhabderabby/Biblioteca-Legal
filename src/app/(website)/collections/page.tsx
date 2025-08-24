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
        imageUrl="/collections/banner.webp"
        title="Colección de Documentos Legales"
        description="Explore nuestra colección actualizada de leyes, decretos y documentos legales"
      />

      <div>
        <CollectionFilter categories={categories} />
      </div>

      <CollectionContainer />
    </div>
  );
};

export default Page;
