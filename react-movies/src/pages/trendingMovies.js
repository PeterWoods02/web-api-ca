import React  from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getTrendingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import PlaylistAdd from "../components/cardIcons/playlistAdd";

const TrendingMovies = () => {
  const { data: trendingMovies, isLoading, isError, error } = useQuery('trendingMovies', getTrendingMovies);

 

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const movies = trendingMovies.results;

  return (
    <PageTemplate
      title="Trending Movies Right Now"
      movies={movies}
      action={(movie) => (
        <>
          <PlaylistAdd movie={movie} />
        </>
      )}
    />
  );
};

export default TrendingMovies;






 


