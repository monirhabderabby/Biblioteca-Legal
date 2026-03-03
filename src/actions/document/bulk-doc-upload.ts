// app/actions/document.ts
"use server";
import { prisma } from "@/lib/db";

type Row = {
  Document: string;
  Section: string;
  Chapter: string;
  Article: number;
  Text: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function uploadLegalDocumentAction(rawRows: any[]) {
  // 📊 1. Initialize Statistics
  const totalRows = rawRows.length;
  let dbOpsCount = 0;
  let dbTimeMs = 0;
  const functionStart = performance.now();

  const trackDb = async <T>(operation: Promise<T>): Promise<T> => {
    const start = performance.now();
    try {
      dbOpsCount++;
      return await operation;
    } finally {
      dbTimeMs += performance.now() - start;
    }
  };

  if (!rawRows.length) return { success: false, message: "No rows" };

  // 1️⃣ Ensure document exists (ONCE)
  const documentName = rawRows[0].Document;
  let document = await trackDb(
    prisma.document.findFirst({ where: { name: documentName } }),
  );

  if (!document) {
    document = await trackDb(
      prisma.document.create({
        data: { name: documentName, short_description: "", law_number: "" },
      }),
    );
  }

  // 2️⃣ Group Data in Memory (No DB calls here)
  // Structure: Map<SectionTitle, Map<ChapterTitle, ListOfArticles>>
  const hierarchy = new Map<string, Map<string, Row[]>>();

  for (const row of rawRows) {
    if (!hierarchy.has(row.Section)) {
      hierarchy.set(row.Section, new Map());
    }
    const sectionMap = hierarchy.get(row.Section)!;

    if (!sectionMap.has(row.Chapter)) {
      sectionMap.set(row.Chapter, []);
    }
    sectionMap.get(row.Chapter)!.push(row);
  }

  // 3️⃣ Process Hierarchy
  // wrap hierarchy in Array.from()
  for (const [sectionTitle, chaptersMap] of Array.from(hierarchy)) {
    // A. Handle Section (Once per unique section)
    let section = await trackDb(
      prisma.section.findFirst({
        where: { documentId: document.id, title: sectionTitle },
      }),
    );

    if (!section) {
      section = await trackDb(
        prisma.section.create({
          data: { documentId: document.id, title: sectionTitle },
        }),
      );
    }

    for (const [chapterTitle, articleRows] of Array.from(chaptersMap)) {
      // B. Handle Chapter (Once per unique chapter)
      let chapter = await trackDb(
        prisma.chapter.findFirst({
          where: { sectionId: section.id, title: chapterTitle },
        }),
      );

      if (!chapter) {
        chapter = await trackDb(
          prisma.chapter.create({
            data: { sectionId: section.id, title: chapterTitle },
          }),
        );
      }

      // C. Optimized Article Processing
      // 1. Fetch ALL existing article numbers for this chapter in ONE query
      const existingArticles = await trackDb(
        prisma.article.findMany({
          where: { chapterId: chapter.id },
          select: { articleNumber: true },
        }),
      );

      const existingNumbers = new Set(
        existingArticles.map((a) => a.articleNumber),
      );

      // 2. Filter out rows that already exist
      const newArticles = articleRows
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((row: any) => !existingNumbers.has(Number(row.Article)))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((row: any) => ({
          chapterId: chapter!.id,
          articleNumber: Number(row.Article),
          content: row.Text,
          contentPlainText: row.Text,
        }));

      // 3. Bulk Insert (One DB call for all new articles in this chapter)
      if (newArticles.length > 0) {
        await trackDb(
          prisma.article.createMany({
            data: newArticles,
          }),
        );
      }
    }
  }

  // 📊 4. Console Statistics
  const totalExecTime = (performance.now() - functionStart).toFixed(2);
  console.log(`
    ========== OPTIMIZED STATS ==========
    📂 Total Rows Data     : ${totalRows}
    🔄 DB Operations       : ${dbOpsCount}
    ⏱️ DB Time Only        : ${dbTimeMs.toFixed(2)} ms
    🚀 Total Execution Time: ${totalExecTime} ms
    =====================================
  `);

  return { success: true, message: "" };
}
