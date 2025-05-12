import React from "react";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

import { useUserStore } from "../store/userStore";

import { IoBookmark } from "react-icons/io5";

import NoPhoto from "../assets/No photo.jpg";

const MovieCard = ({ id, title, posterPath, rating }) => {
  const { user } = useUserStore();

  const getRatingColor = (rating) => {
    if (rating <= 4) return "var(--red-color)";
    if (rating <= 7) return "var(--orange-color)";
    return "var(--accent-color)";
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return alert("First, log in to your account.");

    try {
      if (!title || !posterPath || !id) {
        console.warn("Неполные данные фильма, сохранение отменено");
        return;
      }

      const movieRef = doc(db, "users", user.uid, "savedMovies", String(id));
      await setDoc(movieRef, {
        id,
        title: title || "Untitled",
        posterPath,
        rating: rating || null,
      });
      alert("The movie is saved!");
    } catch (error) {
      console.error("Ошибка при сохранении фильма:", error);
      alert("Error saving movie.");
    }
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

      {user && (
        <button className="card-save-btn" onClick={handleSave}>
          <IoBookmark size={34} color="var(--first-color)" />
        </button>
      )}
    </Link>
  );
};

export default MovieCard;
