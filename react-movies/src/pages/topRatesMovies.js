import React  from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getTopRatedMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import PlaylistAdd from "../components/cardIcons/playlistAdd";

const TopRatedMovies = () => {
  const { data: topRatedMovies, isLoading, isError, error } = useQuery('topRatedMovies', getTopRatedMovies);

 

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const movies = topRatedMovies.results;

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => (
        <>
          <PlaylistAdd movie={movie} />
        </>
      )}
    />
  );
};

export default TopRatedMovies;






 


