import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import PlaylistAdd from "../components/cardIcons/playlistAdd";

const UpcomingMoviesPage = () => {
  const { data: upcomingMoviesData, isLoading, isError, error } = useQuery('upcomingMovies', getUpcomingMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const movies = upcomingMoviesData.results;

  
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => (
        <>
          <PlaylistAdd movie={movie} />
        </>
      )}
    />
  );
};

export default UpcomingMoviesPage;
