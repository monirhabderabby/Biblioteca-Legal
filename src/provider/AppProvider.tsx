"use client";

import { EdgeStoreProvider } from "@/lib/edgestore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const AppProvider = ({ children }: { children: ReactNode }) => {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <EdgeStoreProvider>{children}</EdgeStoreProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
