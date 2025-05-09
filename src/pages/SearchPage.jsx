import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useSearchStore } from "../store/searchStore";

import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchPage = () => {
  const query = useQuery().get("query");
  const { results, isLoading, error, fetchSearchResults } = useSearchStore();

  useEffect(() => {
    if (query) fetchSearchResults(query);
  }, [query, fetchSearchResults]);

  return (
    <div className="section">
      <div className="container">
        <div className="wrapp">
          <h2 className="subtitle">Search results for: "{query}"</h2>

          {isLoading && <Spinner />}
          {error && <p>{error}</p>}

          <div className="grid-list">
            {results.map((movie) => (
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

export default SearchPage;
