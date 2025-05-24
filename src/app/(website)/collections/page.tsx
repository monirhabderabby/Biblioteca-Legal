import DocumentCard from "@/components/shared/cards/document-card";
import HeaderSection from "@/components/shared/sections/header";

const Page = () => {
  return (
    <div>
      <HeaderSection
        imageUrl="https://files.edgestore.dev/ln9m9j3kr2yibrue/public/_public/5d3e66d7-2688-44b6-9201-97600e22a1d6.webp"
        title="Legal Document Collection"
        description="Browse our comprehensive collection of laws, decrees, and legal
            documents"
      />

      <div className="py-[100px] container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
      </div>
    </div>
  );
};

export default Page;
