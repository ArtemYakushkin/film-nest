import React from "react";
import { Link } from "react-router-dom";
import { useTrendingStore } from "../store/trendingStore";

const TrendingLinks = ({ closeMenu }) => {
  const { loadTrending, loadTopRated, loadUpcoming } = useTrendingStore();

  const handleClick = (type) => {
    switch (type) {
      case "trending":
        loadTrending();
        break;
      case "top-rated":
        loadTopRated();
        break;
      case "upcoming":
        loadUpcoming();
        break;
      default:
        break;
    }
  };

  return (
    <div className="trending-links">
      <ul className="trending-links-list">
        <li>
          <Link
            className="trending-links-item"
            to="/trending"
            onClick={() => {
              handleClick("trending");
              if (closeMenu) closeMenu();
            }}
          >
            <p className="trending-links-letter">T</p>
            <p className="trending-links-word">Trending Movies</p>
          </Link>
        </li>
        <li>
          <Link
            className="trending-links-item"
            to="/top-rated"
            onClick={() => {
              handleClick("top-rated");
              if (closeMenu) closeMenu();
            }}
          >
            <p className="trending-links-letter">R</p>
            <p className="trending-links-word">Top Rated</p>
          </Link>
        </li>
        <li>
          <Link
            className="trending-links-item"
            to="/upcoming"
            onClick={() => {
              handleClick("upcoming");
              if (closeMenu) closeMenu();
            }}
          >
            <p className="trending-links-letter">U</p>
            <p className="trending-links-word">Upcoming</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TrendingLinks;
