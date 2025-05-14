import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useGenreStore } from "../store/genreStore";

import { IoList } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

const GenreList = ({ closeMenu }) => {
  const { genres, loadGenres } = useGenreStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null); // оборачиваем и кнопку, и список

  useEffect(() => {
    loadGenres();
  }, [loadGenres]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    setDropdownOpen(false);
    if (closeMenu) closeMenu();
  };

  return (
    <div className="genrelist" ref={containerRef}>
      <button
        className="genrelist-toggle"
        onClick={(e) => {
          e.stopPropagation();
          setDropdownOpen((prev) => !prev);
        }}
      >
        <span>
          <IoList size={28} color="var(--first-color)" />
        </span>
        <div>
          Genres <IoMdArrowDropdown />
        </div>
      </button>

      {dropdownOpen && (
        <ul className="genrelist-dropdown">
          {genres.map((genre) => (
            <li key={genre.id}>
              <Link to={`/genre/${genre.id}`} onClick={handleClick}>
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenreList;
