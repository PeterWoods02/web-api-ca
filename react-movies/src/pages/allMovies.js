import React, { useState } from "react";
import SearchBar from "../components/searchBar"; 
import MovieListPageSearch from "../components/movieListPageSearch"; 

const AllMovies = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [page, setPage] = useState(1); // Pagination state

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to the first page on a new search
  };

  return (
    <div >
      
      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      {/* Movie list and pagination */}
      <MovieListPageSearch
        searchTerm={searchTerm}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default AllMovies;
