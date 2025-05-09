import React, { useEffect } from "react";

import { useTrendingStore } from "../store/trendingStore";

import MovieCard from "../components/MovieCard";

const TopPage = () => {
  const { movies, loadTopRated } = useTrendingStore();

  useEffect(() => {
    loadTopRated();
  }, [loadTopRated]);

  return (
    <div className="section">
      <div className="container">
        <div className="wrapp">
          <h2 className="subtitle">Trending Movies</h2>
          <div className="grid-list">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPage;
