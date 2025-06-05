"use client";

import { UserArticleMeta } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Loader2 } from "lucide-react";
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
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["markers"],
    queryFn: () => fetch(`/api/account/bookmarked`).then((res) => res.json()),
  });

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
  } else if (data?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.data.map((bookmark: UserArticleMeta, i: number) => (
          <BookmarkCard
            key={bookmark.id}
            articleId={bookmark.articleId}
            index={i}
          />
        ))}
      </div>
    );
  }

  return <div>{content}</div>;
};

export default BookmarkContainer;
