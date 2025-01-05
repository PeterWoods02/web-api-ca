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
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { isAuthenticated, userName } = useContext(AuthContext);
  

 
  const addToPlaylist = async (movie) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8080/api/users/playlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Attach the token in the header
        },
        body: JSON.stringify({ movie }), // Send the movie data
      });
  
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      return data; 
    } catch (error) {
      throw error; 
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
      setErrorMessage("");
      setOpenSnackbar(true);
    } catch (error) {
      setIsAdded(false);
      setIsError(true);
      
  
      if (error.message === "Movie already in playlist") {
        setErrorMessage("This movie is already in your playlist.");
      } else {
        setErrorMessage("This movie is already in your playlist.");
      }
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
          {errorMessage || isError ? "This movie is already in your playlist!" : "Movie added to playlist!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddPlaylistAddIcon;
