import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Document, Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, Loader2 } from "lucide-react";
import { useState } from "react";

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
      queryKey: ["markers", currentPage, document.id],
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
          <div key={meta.id}>
            <p className="flex items-center gap-x-2 font-semibold">
              {meta.isBookmarked ? (
                <Bookmark className="h-5 w-5 fill-primary" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}{" "}
              Article {i + 1}
            </p>

            <p className="mt-2 border-input border-[1px] px-2 py-1 rounded-sm text-[15px]">
              {meta.comment}
            </p>
          </div>
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
    </Card>
  );
};

export default NotesCard;
