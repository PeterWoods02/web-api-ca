import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const TemplateMoviePage = ({ movie, children }) => {
   const { data, error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages,
    {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const images = data.posters;

  return (
    <>
      <MovieHeader movie={movie} />

      {/* Main grid container with spacing */}
      <Grid container spacing={3} style={{ padding: "15px" }}>
        
        {/* Left grid for images */}
        <Grid item xs={12} md={3}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <ImageList
              sx={{
                height: "100vh",
              }}
              cols={1}
            >
              {images.map((image, index) => (
                <ImageListItem key={`${image.file_path}-${index}`} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={image.poster_path}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        {/* Right grid for children (content) */}
        <Grid item xs={12} md={9}>
          {children}
        </Grid>

      </Grid>
    </>
  );
};

export default TemplateMoviePage;
