import React, { useContext, useState } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [open, setOpen] = useState(false);

  const isFavorite = context.favorites.includes(movie.id);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    if (!isFavorite) {
      context.addToFavorites(movie);
      setOpen(true); // snackbar shows when added to favorites
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false); 
  };

  return (
    <>
      <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
        {isFavorite ? (
          <FavoriteIcon color="error" fontSize="large" />
        ) : (
          <FavoriteBorderIcon color="error" fontSize="large" />
        )}
      </IconButton>
      <Snackbar
        open={open}
        autoHideDuration={2000} // closes after 2 seconds
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Added to Favorites!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToFavoritesIcon;
