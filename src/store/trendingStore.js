import { create } from "zustand";
import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../api/tmdb";

export const useTrendingStore = create((set) => ({
  movies: [],
  loading: false,
  error: null,

  loadTrending: async () => {
    set({ loading: true });
    try {
      const movies = await fetchTrendingMovies();
      set({ movies, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  loadTopRated: async () => {
    set({ loading: true });
    try {
      const movies = await fetchTopRatedMovies();
      set({ movies, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  loadUpcoming: async () => {
    set({ loading: true });
    try {
      const movies = await fetchUpcomingMovies();
      set({ movies, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));