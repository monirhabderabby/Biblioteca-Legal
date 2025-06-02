import { create } from "zustand";

export interface State {
  open: boolean;
  setopen: (p: boolean) => void;
}

export const useProfileEditState = create<State>((set) => ({
  open: false,
  setopen: (open) => set({ open }),
}));
