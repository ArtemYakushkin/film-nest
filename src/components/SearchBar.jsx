import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ closeMenu }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
    }
    if (closeMenu) closeMenu();
  };

  return (
    <form
      className="searchbar-form"
      onSubmit={handleSearch}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div>
        <IoSearchOutline size={28} color="var(--first-color)" />
      </div>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
