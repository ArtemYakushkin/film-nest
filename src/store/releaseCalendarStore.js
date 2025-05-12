import { create } from 'zustand';
import { fetchUpcomingMoviesCalendar } from '../api/tmdb';

export const useReleaseCalendarStore = create((set) => ({
  movies: [],
  loading: false,
  error: null,
  fetchReleases: async () => {
    set({ loading: true });
    try {
      const movies = await fetchUpcomingMoviesCalendar();
      set({ movies, loading: false });
    } catch (error) {
      set({ error: 'Failed to load releases', loading: false });
    }
  },
}));