import React from "react";

function SearchBar({ searchTerm, handleSearchChange }) {
  

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <h1>Search Movies</h1>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={searchBarStyle}
      />
    </div>
  );
}

// Basic CSS Styles for the search bar
const searchBarStyle = {
  padding: "10px",
  width: "100%",
  maxWidth: "500px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

export default SearchBar;
