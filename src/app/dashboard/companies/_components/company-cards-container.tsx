"use client";

import { Input } from "@/components/ui/input";
import { PaginationControls } from "@/components/ui/pagination-controls";
import useDebounce from "@/hooks/useDebounce";
import { useCompanySearchState } from "@/store/company";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Search } from "lucide-react";
import CompanyCard from "./company-card";

export interface Company {
  id: string;
  name: string;
  location: string;
  totalEmployees: number;
  contact_email: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetCompaniesResponse {
  success: boolean;
  message: string;
  data: Company[];
  pagination: Pagination | null;
}

const CompanyCardsContainer = () => {
  const { query, setQuery, page, setPage } = useCompanySearchState();

  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, isError, error } = useQuery<GetCompaniesResponse>({
    queryKey: ["companies", debouncedQuery, page],
    queryFn: () =>
      fetch(
        `/api/companies?searchQuery=${debouncedQuery}&page=${page}&limit=8`
      ).then((res) => res.json()),
  });

  let content;

  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[200px] bg-gray-200 rounded-xl dark:bg-gray-800"
          />
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div className="min-h-[300px] flex flex-col items-center justify-center text-red-600 dark:text-red-400 text-center space-y-2">
        <AlertTriangle size={32} />
        <p className="text-lg font-medium">Failed to load companies</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {error?.message || "Something went wrong. Please try again later."}
        </p>
      </div>
    );
  } else if (data?.data?.length === 0) {
    content = (
      <div className="min-h-[300px] flex flex-col items-center justify-center text-center space-y-2 text-gray-600 dark:text-gray-400">
        <Search className="h-10 w-10 text-gray-300" />
        <p className="text-lg font-medium">No companies found</p>
        <p className="text-sm">Try adjusting your search term.</p>
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {data?.data.map((company) => (
          <CompanyCard key={company.id} data={company} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 ">
      <div className="flex justify-end w-full">
        <Input
          placeholder="Search by company name"
          value={query}
          endIcon={Search}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-[400px] ml-auto"
        />
      </div>

      {content}

      <div className="py-[80px]">
        {data?.pagination !== undefined &&
          (data.pagination?.totalPages ?? 0) > 0 && (
            <PaginationControls
              currentPage={page}
              totalPages={data.pagination?.totalPages ?? 0}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
      </div>
    </div>
  );
};

export default CompanyCardsContainer;
