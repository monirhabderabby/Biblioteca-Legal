"use client";

import useDebounce from "@/hooks/useDebounce";
import { useSectionSearch } from "@/store/dashboard/document/section-search";
import { SectionWithChapters } from "@/types";
import Fuse from "fuse.js";
import { useMemo } from "react";
import SectionCard from "./section-card";

interface Props {
  sections: SectionWithChapters[];
  documentId: string;
}

const SectionTitleContainer = ({ sections, documentId }: Props) => {
  const { query } = useSectionSearch();

  const searchQuery = useDebounce(query, 500);

  // Set up Fuse.js search engine
  const fuse = useMemo(() => {
    return new Fuse(sections, {
      keys: ["title", "chapters.title"],
      threshold: 0.3, // Adjust sensitivity
      includeScore: true, // Optional: show confidence score
    });
  }, [sections]);

  // Apply filtering logic
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;

    const results = fuse.search(searchQuery);
    return results.map((result) => result.item);
  }, [searchQuery, fuse, sections]);

  return (
    <div className="space-y-[30px]">
      {/* Filtered Results */}
      {filteredSections.length === 0 ? (
        <p className="text-gray-500 italic">No matching sections found.</p>
      ) : (
        filteredSections.map((section, i) => (
          <SectionCard
            key={section.id}
            section={section}
            index={i}
            documentId={documentId}
          />
        ))
      )}
    </div>
  );
};

export default SectionTitleContainer;
