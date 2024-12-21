import React, { useState } from 'react';
import { IconButton, Snackbar } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel'; 


const RemoveFromPlaylist = ({ movieId }) => {
  const auth = getAuth();
  const userUid = auth.currentUser?.uid; // Get the user ID from Firebase Authentication
  const [openSnackbar, setOpenSnackbar] = useState(false); 

  const handleRemoveFromPlaylist = async () => {
    if (userUid) {
      const playlistRef = doc(db, 'playlists', userUid); // Reference to user's playlist document in Firestore
      try {
        // Remove movie from the 'movies' array in the playlist
        await updateDoc(playlistRef, {
          movies: arrayRemove(movieId),
        });
        console.log('Movie removed from playlist!');

        
        setOpenSnackbar(true);

        // Wait for Snackbar to show and refresh the page
        setTimeout(() => {
          window.location.reload(); // Refresh the page after removal
        }, 1000); //gives one second to see snackbar
      } catch (error) {
        console.error('Error removing movie from playlist: ', error);
      }
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
