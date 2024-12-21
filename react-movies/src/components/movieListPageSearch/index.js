import React from "react";
import { useQuery } from "react-query";
import { searchMovies } from "../../api/tmdb-api"; 
import Spinner from "../spinner"; 
import PlaylistAdd from "../cardIcons/playlistAdd";
import PageTemplate from "../templateMovieListPageNoFilter"; 
import Pagination from "@mui/material/Pagination"; 
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; 

const MovieListPageSearch = ({ searchTerm, page, setPage }) => {
  // Query for searching movies
  const { data, isLoading, isError, error } = useQuery(
    ["searchMovies", searchTerm, page],
    () => searchMovies(searchTerm, page),
    {
      enabled: !!searchTerm, // Only fetch data if searchTerm exists
    }
  );

  // Handle page change for pagination
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) {
    return <Spinner />; // Show spinner while loading
  }

  if (isError) {
    return <div>Error: {error.message}</div>; // Handle errors
  }

  return (
    <div>
      {/* Display Movies */}
      <PageTemplate
        title={searchTerm ? `Search Results for "${searchTerm}"` : "All Movies"}
        movies={data?.results || []} // Display current movies (search results or initial list)
        action={(movie) => <PlaylistAdd movie={movie} />} 
      />

      {/* Pagination */}
      {data?.total_pages > 1 && (
        <Pagination
          count={data.total_pages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              components={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
            />
          )}
        />
      )}
    </div>
  );
};

export default MovieListPageSearch;
