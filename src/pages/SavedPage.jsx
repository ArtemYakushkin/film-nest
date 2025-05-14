import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useUserStore } from "../store/userStore";
import { IoTrashOutline } from "react-icons/io5";
import Spinner from "../components/Spinner";

const SavedPage = () => {
  const { user } = useUserStore();
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRatingColor = (rating) => {
    if (rating <= 4) return "var(--red-color)";
    if (rating <= 7) return "var(--orange-color)";
    return "var(--accent-color)";
  };

  const fetchSavedMovies = useCallback(async () => {
    if (!user) return;

    try {
      const savedRef = collection(db, "users", user.uid, "savedMovies");
      const snapshot = await getDocs(savedRef);
      const movies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedMovies(movies);
    } catch (error) {
      console.error("Ошибка при загрузке сохранённых фильмов:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleDeleteMovie = async (movieId) => {
    if (!user || !movieId) return;

    try {
      const movieDocRef = doc(db, "users", user.uid, "savedMovies", String(movieId));
      await deleteDoc(movieDocRef);
      setSavedMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error("Ошибка при удалении фильма:", error);
    }
  };

  useEffect(() => {
    fetchSavedMovies();
  }, [fetchSavedMovies]);

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="section">
      <div className="container">
        <div className="wrapp">
          <h2 className="subtitle">Saved movies</h2>

          {savedMovies.length === 0 ? (
            <p className="saved-no-movies">You don't have any saved movies yet</p>
          ) : (
            <div className="saved-list">
              {savedMovies.map((movie) => (
                <div className="saved-item" key={movie.id}>
                  <Link className="saved-link" to={`/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                      alt={movie.title}
                    />
                    <div>
                      <h3>{movie.title}</h3>
                      <p
                        style={{
                          color: getRatingColor(movie.rating),
                          border: `2px solid ${getRatingColor(movie.rating)}`,
                        }}
                      >
                        {movie.rating ? movie.rating.toFixed(1) : "N/A"}
                      </p>
                    </div>
                  </Link>
                  <button className="saved-del-btn" onClick={() => handleDeleteMovie(movie.id)}>
                    <IoTrashOutline size={20} color="var(--red-color)" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPage;
