"use client";

import DocumentCard from "@/components/shared/cards/document-card";
import { PaginationControls } from "@/components/ui/pagination-controls";
import useDebounce from "@/hooks/useDebounce";
import { DocumentsApiResponse } from "@/schemas/document";
import useCollectionSearchStore from "@/store/collections";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, FileText, Loader2 } from "lucide-react";
import { useEffect } from "react";

const CollectionContainer = () => {
  const { query, page, setPage, category } = useCollectionSearchStore();
  const searchQuery = useDebounce(query, 500);

  const { data, isLoading, isError, error, isFetching, refetch } =
    useQuery<DocumentsApiResponse>({
      queryKey: ["documents", searchQuery, page, category],
      queryFn: async () => {
        const response = await fetch(
          `/api/documents?search=${encodeURIComponent(searchQuery)}&category=${category}&limit=12&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      },
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      retry: 2,
      retryDelay: 1000,
    });

  // Auto-refresh on network recovery
  useEffect(() => {
    const handleOnline = () => {
      if (isError) {
        refetch();
      }
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [isError, refetch]);

  let content;

  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-red-600 dark:text-red-400 text-center space-y-4 p-8">
        <AlertTriangle size={48} className="mb-4" />
        <h3 className="text-xl font-semibold">
          Error al cargar los documentos
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
          {error?.message ||
            "No se pudieron cargar los documentos. Por favor, verifica tu conexión."}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  } else if (data?.data?.length === 0) {
    content = (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-4 p-8">
        <FileText size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
          No se encontraron documentos
        </h3>
        <p className="text-gray-500 dark:text-gray-500 text-sm">
          {searchQuery
            ? `No hay resultados para "${searchQuery}"`
            : "Intenta ajustar tus filtros de búsqueda."}
        </p>
      </div>
    );
  } else {
    content = (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {data?.data?.map((item) => (
            <DocumentCard key={item.id} document={item} />
          ))}
        </div>

        {isFetching && !isLoading && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 container pb-8">
      {content}

      {data?.meta?.totalPages !== undefined && data.meta.totalPages > 1 && (
        <div className="pt-8">
          <PaginationControls
            currentPage={page}
            totalPages={data.meta.totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default CollectionContainer;
