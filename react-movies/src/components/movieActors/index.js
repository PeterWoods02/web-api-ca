import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMovieActors } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ActorDisplay from "../actorDisplay";

const MovieActors = () => {
    const { id } = useParams();
    const { data: movieActors, isLoading, isError, error } = useQuery(
        ["movieActors", id],
        () => getMovieActors(id),
        {
            staleTime: 1000 * 60 * 60 * 24,
            cacheTime: 1000 * 60 * 60 * 24,
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Typography variant="h5" component="h3" sx={{ marginTop: "16px" }}>
                Cast Members
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto", // Enable horizontal scrolling
                    gap: 2, 
                    padding: 2,
                    whiteSpace: "nowrap", 
                    "&::-webkit-scrollbar": { height: 8 }, // Style the scrollbar
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888888",
                        borderRadius: 4,
                    },
                    "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#555555" },
                }}
            >
                {movieActors?.cast.slice(0, 10).map((actor) => (
                    <ActorDisplay key={actor.id} actor={actor} />
                ))}
            </Box>
        </>
    );
};

export default MovieActors;
