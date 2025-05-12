import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

import { useReleaseCalendarStore } from "../store/releaseCalendarStore";
import ModalMovieCard from "../components/ModalMovieCard";

const ReleaseCalendarPage = () => {
  const { movies, fetchReleases } = useReleaseCalendarStore();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  const releaseDates = movies.reduce((acc, movie) => {
    const date = movie.release_date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(movie);
    return acc;
  }, {});

  const tileContent = ({ date }) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (releaseDates[dateStr]) {
      return (
        <div className="calendar-marker">
          <span className="calendar-badge">{releaseDates[dateStr].length}</span>
        </div>
      );
    }
    return null;
  };

  const handleDateClick = (date) => {
    const normalizedDate = new Date(date.setHours(0, 0, 0, 0));
    setSelectedDate(normalizedDate);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  return (
    <div className="section">
      <div className="container">
        <div className="wrapp">
          <h2 className="subtitle">Movie Release Calendar</h2>

          <Calendar
            locale="en-US"
            value={selectedDate}
            onClickDay={handleDateClick}
            tileContent={tileContent}
            className="custom-calendar"
          />

          {formattedDate && releaseDates[formattedDate] && (
            <div className="calendar-movie">
              <h3>
                Movies on <span>{formattedDate}</span>
              </h3>
              <ul className="calendar-movie-list">
                {releaseDates[formattedDate].map((movie) => (
                  <li
                    key={movie.id}
                    onClick={() => handleMovieClick(movie)}
                    className="calendar-item"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="calendar-poster"
                    />
                    <span>{movie.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ModalMovieCard
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            movie={selectedMovie}
          />
        </div>
      </div>
    </div>
  );
};

export default ReleaseCalendarPage;
