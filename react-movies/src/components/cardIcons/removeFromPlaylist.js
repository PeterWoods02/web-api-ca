import React, { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const RemoveFromPlaylist = ({ movieId, getPlaylist, showSnackbar  }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isError, setIsError] = useState(false);  
  const [message, setMessage] = useState("");  

  const handleRemoveFromPlaylist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      const response = await fetch(`http://localhost:8080/api/users/playlist/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Add token to Authorization header
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove movie from playlist');
      }
  
      const result = await response.json();
      console.log(result.message);  // Handle success
      getPlaylist();

      // Show success message
      setMessage("Movie removed from playlist!");
      setOpenSnackbar(true);
      showSnackbar("Movie removed from playlist!");
    } catch (error) {
      console.error("Error removing from playlist:", error);

      // Show error message
      setMessage(error.message || "Error removing movie");
      setOpenSnackbar(true);
      showSnackbar("Failed to remove movie from playlist");
    }
  };


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <IconButton
        color="error"
        onClick={handleRemoveFromPlaylist}
        aria-label="remove from playlist"
      >
        <CancelIcon />
      </IconButton>

      {/* Snackbar for showing movie removal success */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        message="Movie removed from playlist!"
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default RemoveFromPlaylist;
