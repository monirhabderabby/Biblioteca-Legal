"use client";

import { Input } from "@/components/ui/input";
import { useArticleSearchStore } from "@/store/collections";
import { Document } from "@prisma/client";

interface Props {
  document: Document;
}

const CollectionHeader = ({ document }: Props) => {
  const { query, setQuery } = useArticleSearchStore();

  return (
    <div className=" mt-28 container flex flex-col justify-center items-center gap-y-6">
      <h1 className="font-bold text-[30px] md:text-[35px] lg:text-[40px] leading-[120%] text-center">
        {document.name}
      </h1>

      <Input
        placeholder="Search by  section title or chapter title..."
        className="max-w-[600px] mx-auto"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default CollectionHeader;
