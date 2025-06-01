"use client";

import { Input } from "@/components/ui/input";
import { useSectionSearch } from "@/store/dashboard/document/section-search";

const SectionSearch = () => {
  const { setQuery, query } = useSectionSearch();
  return (
    <div>
      <Input
        className="min-w-[300px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by Section title, chapter title..."
      />
    </div>
  );
};

export default SectionSearch;
