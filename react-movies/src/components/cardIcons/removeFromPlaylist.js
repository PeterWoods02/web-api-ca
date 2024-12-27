import React, { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const RemoveFromPlaylist = ({ movieId }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRemoveFromPlaylist = async () => {
    try {
      const token = localStorage.getItem('token');  // Get token from local storage
      const response = await fetch(`/api/users/playlist/${movieId}`, {
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
      return result;
    } catch (error) {
      console.error('Error removing from playlist:', error.message);
      throw error;
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
