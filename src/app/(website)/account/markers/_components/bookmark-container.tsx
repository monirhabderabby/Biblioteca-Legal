"use client";

import { PaginationControls } from "@/components/ui/pagination-controls";
import { UserArticleMeta } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
import BookmarkCard from "./bookmarkCard";

export type UserArticleMetaResponse = {
  data: UserArticleMeta[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const BookmarkContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery<UserArticleMetaResponse>(
    {
      queryKey: ["markers", currentPage],
      queryFn: () =>
        fetch(`/api/account/bookmarked?page=${currentPage}&limit=10`).then(
          (res) => res.json()
        ),
    }
  );

  console.log(data?.pagination);

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
        <p className="text-lg font-medium">Failed to load markers</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {error?.message || "Something went wrong. Please try again later."}
        </p>
      </div>
    );
  } else if (data?.data?.length === 0) {
    content = (
      <div className="min-h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
        No bookmarks found.
      </div>
    );
  } else if (data?.data && data.data.length > 0) {
    content = (
      <div className=" pb-20 space-y-10">
        <div className="grid grid-cols-1 space-y-10">
          {data.data.map((bookmark: UserArticleMeta, i: number) => (
            <BookmarkCard
              key={bookmark.id}
              articleId={bookmark.articleId}
              index={i}
              metaId={bookmark.id}
            />
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

export default BookmarkContainer;
