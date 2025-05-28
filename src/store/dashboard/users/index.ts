import { create } from "zustand";

export interface UserSearchState {
  query: string;
  page: number;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
}

export const useManageUserSearchStore = create<UserSearchState>((set) => ({
  query: "",
  page: 1,
  setQuery: (query) => set({ query }),
  setPage: (page) => set({ page }),
}));
