import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useMovieStore, useCarouselStore } from "../store/movieStore";

import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const HeroSlider = () => {
  const { movies, fetchMovies } = useMovieStore();
  const { currentIndex, next, prev } = useCarouselStore();
  const navigate = useNavigate();

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;

    if (distance > 100) {
      next(); // свайп влево
    } else if (distance < -100) {
      prev(); // свайп вправо
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const currentMovie = movies[currentIndex];

  return (
    <>
      {currentMovie && (
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="hero-slider"
          style={{
            backgroundImage: `linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(39, 39, 39, 0.886) 100%, rgba(0, 0, 0, 0.755) 100%), url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
          }}
        >
          <div className="container" style={{ position: "relative" }}>
            <div className="carousel-wrapper">
              <AnimatePresence mode="wait">
                {currentMovie && (
                  <motion.div
                    key={currentMovie.id}
                    className="carousel-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.h1
                      className="carousel-title"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentMovie.title}
                    </motion.h1>

                    <motion.p
                      className="carousel-overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {currentMovie.overview}
                    </motion.p>

                    <motion.div
                      className="carousel-btn-box"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <button
                        className="button"
                        onClick={() => navigate(`/movie/${currentMovie.id}`)}
                      >
                        See More
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="carousel-thumbnail">
                <div className="thumbnail-list">
                  {movies.length > 0 &&
                    [...Array(4)].map((_, i) => {
                      const index = (currentIndex + i) % movies.length;
                      const movie = movies[index];
                      return (
                        <motion.div
                          key={movie.id}
                          className="carousel-thumbnail-item"
                          initial={{ opacity: 0, scale: 1 }}
                          animate={{ opacity: 1, scale: i === 0 ? 1 : 1 }}
                          exit={{ opacity: 0, scale: 1 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                          />
                        </motion.div>
                      );
                    })}
                </div>
              </div>

              <div className="carousel-arrows">
                <button onClick={prev}>
                  <AiOutlineDoubleLeft size={20} />
                </button>
                <button onClick={next}>
                  <AiOutlineDoubleRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSlider;
