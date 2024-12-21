import React from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";


function MovieListPageTemplateNoFilter({ movies, title, action }) {
 
 

    return (
        <Grid container>
          <Grid size={12}>
            <Header title={title} />
          </Grid>
          <Grid container sx={{ flex: "1 1 500px" }}>
            <MovieList action={action} movies={movies} />
          </Grid>
        </Grid>
      );
}

export default MovieListPageTemplateNoFilter;
