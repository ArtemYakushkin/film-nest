import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IoSearchOutline, IoList, IoPeople } from "react-icons/io5";

import SearchBar from "./SearchBar";
import GenreList from "./GenreList";
import TrendingLinks from "./TrendingLinks";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside
      className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}
      ref={dropdownRef}
      onClick={toggleSidebar}
    >
      <div className="sidebar-btn-box">
        <button className="sidebar-toggle-button" onClick={toggleSidebar}>
          {isOpen ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />}
        </button>
      </div>

      {isOpen ? (
        <SearchBar isOpen={isOpen} />
      ) : (
        <IoSearchOutline
          size={28}
          color="var(--first-color)"
          style={{ marginBottom: "24px", cursor: "pointer" }}
        />
      )}

      {isOpen ? (
        <GenreList isOpen={isOpen} />
      ) : (
        <IoList
          size={28}
          color="var(--first-color)"
          style={{ marginBottom: "24px", cursor: "pointer" }}
        />
      )}

      {isOpen ? (
        <TrendingLinks isOpen={isOpen} />
      ) : (
        <div className="sidebar-letters">
          <p>T</p>
          <p>R</p>
          <p>U</p>
        </div>
      )}

      {isOpen ? (
        <Link className="sidebar-popular" to={"/popular-actors"}>
          <IoPeople size={28} />
          <p>Popular Actors</p>
        </Link>
      ) : (
        <IoPeople
          size={28}
          color="var(--first-color)"
          style={{ marginBottom: "24px", cursor: "pointer" }}
        />
      )}
    </aside>
  );
};

export default Sidebar;
