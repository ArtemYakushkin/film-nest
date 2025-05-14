import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams, useNavigate, useLocation } from "react-router-dom";

import { fetchMoviesByGenre } from "../api/tmdb";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";

import { IoIosArrowRoundDown, IoIosArrowRoundUp, IoIosArrowRoundBack } from "react-icons/io";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const GenrePage = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);

  // URL state
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialSort = searchParams.get("sort") || "popularity.desc";

  const [page, setPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState(initialSort);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const handleGoBack = () => {
    if (from) {
      navigate(from);
    } else {
      navigate("/"); // fallback
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const { name, results, totalPages } = await fetchMoviesByGenre(genreId, page, sortBy);
        setGenreName(name);
        setMovies(results);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Failed to load movies for genre:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [genreId, page, sortBy]);

  // ✅ Обновляем URL параметры ТОЛЬКО ЕСЛИ они отличаются
  useEffect(() => {
    const currentPage = searchParams.get("page");
    const currentSort = searchParams.get("sort");

    const needsUpdate = currentPage !== String(page) || currentSort !== sortBy;

    if (needsUpdate) {
      setSearchParams({ page: String(page), sort: sortBy });
    }
  }, [page, sortBy, searchParams, setSearchParams]);

  const handleSelect = (value) => {
    setSortBy(value);
    setPage(1); // reset to first page when sorting changes
    setDropdownOpen(false);
  };

  const sortOptions = [
    {
      value: "popularity.desc",
      label: (
        <>
          Popularity <IoIosArrowRoundDown />
        </>
      ),
    },
    {
      value: "popularity.asc",
      label: (
        <>
          Popularity <IoIosArrowRoundUp />
        </>
      ),
    },
    {
      value: "release_date.desc",
      label: (
        <>
          Newest <IoIosArrowRoundDown />
        </>
      ),
    },
    {
      value: "release_date.asc",
      label: (
        <>
          Oldest <IoIosArrowRoundUp />
        </>
      ),
    },
    {
      value: "vote_average.desc",
      label: (
        <>
          Rating <IoIosArrowRoundDown />
        </>
      ),
    },
    {
      value: "vote_average.asc",
      label: (
        <>
          Rating <IoIosArrowRoundUp />
        </>
      ),
    },
  ];

  const selectedLabel = sortOptions.find((opt) => opt.value === sortBy)?.label || "Sort by";

  if (loading) return <Spinner />;

  return (
    <div className="section">
      <div className="container">
        <div className="wrapp">
          <button className="genre-btn-back" onClick={handleGoBack}>
            <IoIosArrowRoundBack />
            Back
          </button>

          <div className="genre-frame">
            <h2 className="subtitle">{genreName} Movies</h2>

            <div className="genre-filters" ref={dropdownRef}>
              <div className="genre-dropdown">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="genre-dropdown-toggle"
                >
                  {selectedLabel}
                </button>

                {dropdownOpen && (
                  <ul className="genre-dropdown-menu">
                    {sortOptions.map((opt) => (
                      <li key={opt.value} onClick={() => handleSelect(opt.value)}>
                        {opt.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="grid-list">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
              />
            ))}
          </div>

          <div className="genre-pagination">
            <button
              className="genre-pagination-btn"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              <AiOutlineArrowLeft />
            </button>
            <span className="genre-pagination-page">
              Page {page} of {totalPages}
            </span>
            <button
              className="genre-pagination-btn"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
