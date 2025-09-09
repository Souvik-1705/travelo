import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");
  const { listings } = useSelector((state) => state.listing);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setTerm(value);

    if (!value) {
      // 🔹 When search box is cleared → show categories only
      onSearch([], false);
      return;
    }
    const filtered = listings.filter((listing) =>
      [listing.placeName, listing.address, listing.category]
        .join(" ")
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    onSearch(filtered,true);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={term}
        placeholder="Search for a place, city or category..."
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
