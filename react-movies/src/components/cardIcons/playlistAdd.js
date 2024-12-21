/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AddPlaylistAddIcon = ({ movie }) => {
  const [isAdded, setIsAdded] = useState(false); 
  const [isError, setIsError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Mock function for adding movie to the playlist (you can replace this later with Firebase functionality)
  const addToPlaylist = async (movie) => {
    return new Promise((resolve, reject) => {
      // Simulate a successful addition after a short delay
      setTimeout(() => {
        resolve(); // You can simulate success here
        // reject(new Error("Something went wrong")); // You can simulate error here if needed
      }, 1000);
    });
  };

  const handleAddToMustWatch = async (e) => {
    e.preventDefault();
    try {
      await addToPlaylist(movie); // Call the mock function
      setIsAdded(true);  
      setIsError(false); 
      setOpenSnackbar(true); 
    } catch (error) {
      setIsError(true); 
      setIsAdded(false); 
      console.error("Error adding to playlist:", error);
      setOpenSnackbar(true); 
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {isError ? "Error adding to playlist!" : "Movie added to playlist!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddPlaylistAddIcon;
