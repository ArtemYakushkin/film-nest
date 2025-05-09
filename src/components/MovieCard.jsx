import React from "react";
import { Link } from "react-router-dom";

import NoPhoto from "../assets/No photo.jpg";

const MovieCard = ({ id, title, posterPath, rating }) => {
  const getRatingColor = (rating) => {
    if (rating <= 4) return "var(--red-color)";
    if (rating <= 7) return "var(--orange-color)";
    return "var(--accent-color)";
  };

  return (
    <Link to={`/movie/${id}`} className="card">
      {posterPath ? (
        <img
          className="card-img"
          src={`https://image.tmdb.org/t/p/w200${posterPath}`}
          alt={title}
        />
      ) : (
        <img className="card-img-placeholder" src={NoPhoto} alt={title} />
      )}

      <p
        className="card-rating"
        style={{
          color: getRatingColor(rating),
          border: `2px solid ${getRatingColor(rating)}`,
        }}
      >
        {rating ? rating.toFixed(1) : "N/A"}
      </p>
    </Link>
  );
};

export default MovieCard;
