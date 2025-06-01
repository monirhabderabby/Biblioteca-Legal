import { create } from "zustand";

export interface UserSearchState {
  query: string;
  setQuery: (query: string) => void;
}

export const useSectionSearch = create<UserSearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
