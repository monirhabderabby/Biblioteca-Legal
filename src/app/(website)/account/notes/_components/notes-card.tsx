import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { Document, Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import NoteCard from "./note-card";

interface Props {
  document: Document;
}

export type UserArticleMetaWithArticle = Prisma.UserArticleMetaGetPayload<{
  include: {
    article: true;
  };
}>;

export type UserArticleMetaResponse = {
  data: UserArticleMetaWithArticle[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const NotesCard = ({ document }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery<UserArticleMetaResponse>(
    {
      queryKey: ["notes", currentPage, document.id],
      queryFn: () =>
        fetch(
          `/api/account/notes/${document.id}?page=${currentPage}&limit=10`
        ).then((res) => res.json()),
    }
  );

  let content;

  if (isLoading) {
    content = (
      <div>
        <Loader2 className="animate-spin " />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="text-red-600 dark:text-red-400">
        <p>Error loading notes: {error?.message || "Something went wrong."}</p>
      </div>
    );
  } else if (data?.data?.length === 0) {
    content = (
      <div
        className="text-gray-500 dark:text-gray-400"
        onClick={() => setCurrentPage(1)}
      >
        No notes found for this document.
      </div>
    );
  } else {
    content = (
      <div className="space-y-4">
        {data?.data.map((meta, i) => (
          <NoteCard key={meta.id} index={i} meta={meta} />
        ))}
      </div>
    );
  }
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex flex-col items-start justify-between">
          <CardTitle className="text-[24px]">{document.name}</CardTitle>
          <CardDescription className="max-w-[600px]">
            {document.short_description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>{content}</CardContent>

      <CardFooter className="flex justify-end">
        {data?.pagination &&
          typeof data.pagination.total === "number" &&
          data.pagination.total > 10 && (
            <div>
              <PaginationControls
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                totalPages={data.pagination.totalPages}
              />
            </div>
          )}
      </CardFooter>
    </Card>
  );
};

export default NotesCard;
