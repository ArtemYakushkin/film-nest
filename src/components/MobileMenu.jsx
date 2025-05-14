import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase";

import { useUserStore } from "../store/userStore";

import {
  IoLogOutOutline,
  IoPeople,
  IoBookmark,
  IoNewspaperOutline,
  IoCalendarNumberOutline,
} from "react-icons/io5";

import SearchBar from "./SearchBar";
import GenreList from "./GenreList";
import TrendingLinks from "./TrendingLinks";

const MobileMenu = ({ isOpen, toggleMenu, closeMenu }) => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearUser();
      closeMenu();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className={`mobile-menu ${isOpen ? "mobile-menu-open" : ""}`}>
      {user ? (
        <div className="mobile-menu-user-wrapp">
          <p className="mobile-menu-user">{user.name}</p>
          <button className="a" onClick={handleLogout}>
            <IoLogOutOutline size={28} color="var(--first-color)" />
          </button>
        </div>
      ) : (
        <></>
      )}

      <div>
        <SearchBar closeMenu={closeMenu} />

        <GenreList closeMenu={closeMenu} />

        <TrendingLinks closeMenu={closeMenu} />

        <Link className="sidebar-link" to={"/popular-actors"} onClick={closeMenu}>
          <IoPeople size={28} />
          <p>Popular Actors</p>
        </Link>

        <Link className="sidebar-link" to={"/news"} onClick={closeMenu}>
          <IoNewspaperOutline size={28} />
          <p>Movies News</p>
        </Link>

        {user && (
          <Link className="sidebar-link" to="/saved" onClick={closeMenu}>
            <IoBookmark size={28} /> <p>My Saved Movies</p>
          </Link>
        )}

        {user && (
          <Link className="sidebar-link" to="/calendar" onClick={closeMenu}>
            <IoCalendarNumberOutline size={28} /> <p>Release</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
