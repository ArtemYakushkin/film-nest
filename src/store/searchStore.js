import { create } from "zustand";
import { searchMovies } from "../api/tmdb";

export const useSearchStore = create((set) => ({
  results: [],
  isLoading: false,
  error: null,

  fetchSearchResults: async (query) => {
    try {
      set({ isLoading: true, error: null });
      const results = await searchMovies(query);
      set({ results, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch search results", isLoading: false });
    }
  },
}));