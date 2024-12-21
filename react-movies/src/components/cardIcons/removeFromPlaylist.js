import React, { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const RemoveFromPlaylist = ({ movieId }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRemoveFromPlaylist = async () => {
    const token = localStorage.getItem("token"); // Get JWT token from localStorage
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      // Make API call to remove the movie from the playlist
      await axios.delete(`/api/playlists/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Movie removed from playlist!");

      setOpenSnackbar(true);

      // Optionally refresh or trigger state update here
      setTimeout(() => {
        window.location.reload(); // Refresh the page after removal
      }, 1000);
    } catch (error) {
      console.error("Error removing movie from playlist: ", error);
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
