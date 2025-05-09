import { create } from "zustand";
import { fetchGenres } from "../api/tmdb";

export const useGenreStore = create((set) => ({
  genres: [],
  loading: false,
  error: null,

  loadGenres: async () => {
    set({ loading: true });
    try {
      const genres = await fetchGenres();
      set({ genres, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch genres", loading: false });
    }
  },
}));