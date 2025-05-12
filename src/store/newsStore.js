import { create } from 'zustand';
import { fetchMovieNews } from '../api/news';

export const useNewsStore = create((set) => ({
  news: [],
  loading: false,
  error: null,
  fetchNews: async () => {
    set({ loading: true, error: null });
    try {
      const articles = await fetchMovieNews();
      set({ news: articles, loading: false });
    } catch (error) {
      set({ error: 'Не удалось загрузить новости.', loading: false });
    }
  },
}));