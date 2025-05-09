import { create } from "zustand";

export const useSortStore = create((set) => ({
  sortBy: "popularity.desc",
  setSortBy: (value) => set({ sortBy: value }),
}));