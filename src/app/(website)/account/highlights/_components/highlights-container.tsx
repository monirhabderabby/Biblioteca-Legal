"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { Prisma, UserArticleMeta } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
import HighlightCard from "./highlight-card";

type GroupedByDocument = {
  documentId: string;
  document: UserArticleMetaWithRelations["document"];
  items: Omit<UserArticleMetaWithRelations, "document">[];
};

export type UserArticleMetaWithRelations = Prisma.UserArticleMetaGetPayload<{
  include: {
    article: true;
    document: {
      select: {
        name: true;
        short_description: true;
      };
    };
  };
}>;

export type UserArticleMetaResponse = {
  data: UserArticleMetaWithRelations[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export function groupByDocumentId(
  data: UserArticleMetaWithRelations[]
): GroupedByDocument[] {
  return Object.values(
    data.reduce<Record<string, GroupedByDocument>>((acc, item) => {
      const docId = item.documentId;

      if (!acc[docId]) {
        acc[docId] = {
          documentId: docId,
          document: item.document,
          items: [],
        };
      }

      // Push a copy of item without `document`
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { document, ...rest } = item;
      acc[docId].items.push(rest);

      return acc;
    }, {})
  );
}

const HighlightContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery<UserArticleMetaResponse>(
    {
      queryKey: ["markers", currentPage],
      queryFn: () =>
        fetch(`/api/account/highlights?page=${currentPage}&limit=10`).then(
          (res) => res.json()
        ),
    }
  );

  const grouped = groupByDocumentId(data?.data ?? []);

  let content;

  if (isLoading) {
    content = (
      <div className="min-h-[600px] flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="min-h-[300px] flex flex-col items-center justify-center text-red-600 dark:text-red-400 text-center space-y-2">
        <AlertTriangle size={32} />
        <p className="text-lg font-medium">Error al cargar los marcadores</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {error?.message ||
            "Algo salió mal. Por favor, inténtalo de nuevo más tarde."}
        </p>
      </div>
    );
  } else if (data?.data?.length === 0) {
    content = (
      <div className="min-h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
        No se encontraron resaltados.
      </div>
    );
  } else if (data?.data && data.data.length > 0) {
    content = (
      <div className="pb-20 ">
        <div className="grid grid-cols-1 space-y-10">
          {grouped.map((doc: GroupedByDocument, i: number) => (
            <Card className="shadow-none" key={doc.documentId}>
              <CardHeader>
                <CardTitle className="text-[14px] md:text-[16px]">
                  {doc.document.name}
                </CardTitle>
                <CardDescription className="text-[12px] md:text-[14px]">
                  {doc.document.short_description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {doc.items.map((bookmark: UserArticleMeta) => (
                  <HighlightCard
                    key={bookmark.id}
                    articleId={bookmark.articleId}
                    index={i}
                    metaId={bookmark.id}
                    isBookmarked={bookmark.isBookmarked}
                    selectedColor={bookmark.selectedColor ?? "#f0f0f0"}
                  />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        {data.pagination.total > 10 && (
          <div>
            <PaginationControls
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              totalPages={data.pagination.totalPages}
            />
          </div>
        )}
      </div>
    );
  }

  return <div>{content}</div>;
};

export default HighlightContainer;
