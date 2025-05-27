"use client";

import { SectionWithChapters } from "@/types";
import SectionCard from "./section-card";

interface Props {
  sections: SectionWithChapters[];
  documentId: string;
}

const SectionTitleContainer = ({ sections, documentId }: Props) => {
  return (
    <div className="space-y-[30px]">
      {sections.map((section, i) => (
        <SectionCard
          key={section.id}
          section={section}
          index={i}
          documentId={documentId}
        />
      ))}
    </div>
  );
};

export default SectionTitleContainer;
