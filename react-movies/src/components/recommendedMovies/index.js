import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"; // Import useParams
import { getRecommendedMovies } from "../../api/tmdb-api"; 
import Spinner from '../spinner';
import PageTemplate from "../templateMovieListPage";
import PlaylistAdd from "../cardIcons/playlistAdd";

const RecommendedMovies = () => {
    const { id } = useParams(); //useParams to get the movie ID from the URL
    const { data: recommendedMovies, isLoading, isError, error } = useQuery(
        ['recommendedMovies', id], // make id into query too
        () => getRecommendedMovies(id) 
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const movies = recommendedMovies.results; 

    return (
        <PageTemplate
            title="Recommended Movies"
            movies={movies}
            action={(movie) => (
                <PlaylistAdd movie={movie} />
            )}
        />
    );
};

export default RecommendedMovies;
