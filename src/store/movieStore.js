import { create } from 'zustand';

import { fetchCast, FetchLatestMovies, fetchMovieById, fetchTrailer, fetchRecommended } from '../api/tmdb';

export const useMovieStore = create((set) => ({
    movies: [],
    isLoading: false,
    fetchMovies: async () => {
        set({ isLoading: true });
        const movies = await FetchLatestMovies();
        set({ movies, isLoading: false });
    },
}));

export const useCarouselStore = create((set, get) => ({
  currentIndex: 0,
  next: () => {
    const { currentIndex } = get();
    set({ currentIndex: (currentIndex + 1) % 5 }); // 5 — кол-во фильмов
  },
  prev: () => {
    const { currentIndex } = get();
    set({ currentIndex: (currentIndex - 1 + 5) % 5 });
  },
}));

export const useMovieDetailsStore = create((set) => ({
  movie: null,
  recommended: [],
  fetchMovieDetails: async (id) => {
    // Сбросим предыдущее состояние, чтобы показать <Spinner />
    set({ movie: null, recommended: [] });

    const data = await fetchMovieById(id);
    const cast = await fetchCast(id);
    const trailer = await fetchTrailer(id);
    const recommended = await fetchRecommended(id);

    const director = data.credits.crew.find((p) => p.job === "Director");

    set({
      movie: {
        ...data,
        cast,
        trailer,
        director: director ? director.name : "Unknown",
      },
      recommended,
    });
  },
}));