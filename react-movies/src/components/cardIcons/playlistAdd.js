/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AuthContext } from "../../contexts/authContext"; 


const AddPlaylistAddIcon = ({ movie }) => {
  const [isAdded, setIsAdded] = useState(false); 
  const [isError, setIsError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { isAuthenticated, userName } = useContext(AuthContext);

  // Mock function for adding movie to the playlist (you can replace this later with Firebase functionality)
  const addToPlaylist = async (movie) => {
    const token = localStorage.getItem('token');
    console.log("Movie data being added:", movie);  // Log the movie object
  
    try {
      const response = await fetch('http://localhost:8080/api/users/playlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ movie }),  // Send the movie object
      });
  
      const data = await response.json();
      console.log("Server response:", response.status, data);  // Log response
      if (response.ok) {
        console.log('Movie added to playlist successfully:', data);
      } else {
        console.error('Error from server:', data.message);
      }
    } catch (error) {
      console.error('Error in fetch request:', error.message);
    }
  };
  
  
  

  const handleAddToMustWatch = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setIsError(true);
      setOpenSnackbar(true);
      return; // Exit early if not authenticated
    }

    try {
      await addToPlaylist(movie); // Call the API function
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
