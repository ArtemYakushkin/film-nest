import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useMovieDetailsStore } from "../store/movieStore";

import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import ActorCard from "../components/ActorCard";

import MissVideo from "../assets/Video is missing.jpg";
import NoPhoto from "../assets/No photo.jpg";
import NoImage from "../assets/No image.jpg";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { movie, recommended, fetchMovieDetails } = useMovieDetailsStore();

  const getRatingColor = (rating) => {
    if (rating <= 4) return "var(--red-color)";
    if (rating <= 7) return "var(--orange-color)";
    return "var(--accent-color)";
  };

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id, fetchMovieDetails]);

  if (!movie) return <Spinner />;

  return (
    <div className="details">
      <div className="details-background">
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
        ) : (
          <img src={NoImage} alt={movie.title} />
        )}
      </div>
      <div className="container">
        <div className="details-wrapp-movie wrapp">
          <div className="details-movie">
            {movie.poster_path ? (
              <img
                className="details-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <img className="details-poster" src={NoPhoto} alt={movie.title} />
            )}

            <div className="details-information">
              <div className="details-title-rating">
                <h1 className="details-title">{movie.title}</h1>
                <div
                  className="details-rating"
                  style={{
                    color: getRatingColor(movie.vote_average),
                    border: `2px solid ${getRatingColor(movie.vote_average)}`,
                  }}
                >
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </div>
              </div>

              <p className="details-text">
                <span>Release date: </span>
                {movie.release_date.split("-").reverse().join(".")}
              </p>

              <p className="details-text">
                <span>Countries: </span>
                {movie.production_countries.map((c) => c.name).join(", ")}
              </p>

              <p className="details-text">
                <span>Runtime: </span>
                {movie.runtime} min.
              </p>

              <p className="details-text">
                <span>Age: </span>
                {movie.adult ? "18+" : "All Ages"}
              </p>

              <p className="details-text">
                <span>Director: </span>
                {movie.director}
              </p>

              <div className="details-genres">
                {movie.genres.map((g) => (
                  <div className="details-genre" key={g.name}>
                    #{g.name}
                  </div>
                ))}
              </div>

              <p className="details-text">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="gorizontal-line">
        <div></div>
      </div>

      <div className="container">
        <div className="wrapp">
          <h2 className="subtitle">Watch trailer</h2>
          <div className="details-video">
            {movie.trailer ? (
              <iframe
                src={`https://www.youtube.com/embed/${movie.trailer.key}`}
                title="YouTube trailer"
                allowFullScreen
              ></iframe>
            ) : (
              <img src={MissVideo} alt="Trailer not available" />
            )}
          </div>
        </div>
      </div>

      <div className="gorizontal-line">
        <div></div>
      </div>

      <div className="container">
        <div className="wrapp">
          <div className="details-cast">
            <h2 className="subtitle">Cast</h2>
            <div className="actor-list">
              {movie.cast.map((actor) => (
                <ActorCard
                  key={actor.id}
                  id={actor.id}
                  name={actor.name}
                  photo={actor.profile_path}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="gorizontal-line">
        <div></div>
      </div>

      <div className="container">
        <div className="wrapp">
          <div className="details-recommendations">
            <h2 className="subtitle">Recommended Movies</h2>
            <div className="grid-list">
              {recommended.map((rec) => (
                <MovieCard
                  key={rec.id}
                  id={rec.id}
                  posterPath={rec.poster_path}
                  rating={rec.vote_average}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
