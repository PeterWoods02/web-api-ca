/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import { MoviesContext } from "../../contexts/moviesContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"; 

const AddPlaylistAddIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [isAdded, setIsAdded] = useState(false); 
  const [isError, setIsError] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handle adding movie to the playlist
  const handleAddToMustWatch = async (e) => {
    e.preventDefault();
    try {
      // Call the function to add movie to the playlist
      await addToPlaylist(movie);
      setIsAdded(true);  
      setIsError(false); 
      setOpenSnackbar(true); 
    } catch (error) {
      setIsError(true); 
      setIsAdded(false); 
      console.error("Error adding to must watch list:", error);
      setOpenSnackbar(true); 
    }
  };

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      {/* Playlist Add Icon */}
      <IconButton
        aria-label="add to must watch"
        onClick={handleAddToMustWatch}
      >
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>

      {/* Snackbar to show success or error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isError ? "error" : "success"}  // Show error or success message
          sx={{ width: "100%" }}
        >
          {isError ? "Error adding to playlist!" : "Movie added to playlist!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddPlaylistAddIcon;
