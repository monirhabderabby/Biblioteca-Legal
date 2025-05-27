import { Chapter, Section } from "@prisma/client";

export type SectionWithChapters = Section & {
  chapters: Chapter[];
};
