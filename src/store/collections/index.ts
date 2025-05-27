// store/searchStore.ts
import { create } from "zustand";
// types/store.ts
export interface SearchState {
  query: string;
  category: string;
  setQuery: (query: string) => void;
  setCategory: (category: string) => void;
}

const useCollectionSearchStore = create<SearchState>((set) => ({
  query: "",
  category: "all",

  setQuery: (query) => set({ query }),
  setCategory: (category) => set({ category }),
}));

export default useCollectionSearchStore;
