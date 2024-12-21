import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorMovies } from "../api/tmdb-api";  // API function to fetch actor's movies
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import PlaylistAdd from "../components/cardIcons/playlistAdd";

const ActorMoviePage = () => {
  const { actorId } = useParams(); // Get actorId from URL
  const { data: actorMovies, isLoading, isError, error } = useQuery(
    ["actorMovies", actorId], // Use actorId as part of the query key
    () => getActorMovies(actorId), // Fetch movies for the actor
    {
      staleTime: 1000 * 60 * 60 * 24, // Cache data for 24 hours
      cacheTime: 1000 * 60 * 60 * 24, // Cache data for 24 hours
      refetchOnWindowFocus: false, // Do not refetch on window focus
    }
  );

  const [sortedMovies, setSortedMovies] = useState([]);

  useEffect(() => {
    if (actorMovies && actorMovies.cast) {
      // Sort movies by vote_average (rating) in descending order
      const sorted = actorMovies.cast.sort((a, b) => b.vote_average - a.vote_average);
      setSortedMovies(sorted); // Set the sorted list of movies
    }
  }, [actorMovies]);  // Re-run when actorMovies changes

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <PageTemplate
      title="Movies by Actor"
      movies={sortedMovies || []}  // Display sorted movies
      action={(movie) => (
        <PlaylistAdd movie={movie} />
      )}
    />
  );
};

export default ActorMoviePage;
