import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Box, Snackbar } from "@mui/material";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";
import PageTemplate from "../components/templateMovieListPageNoFilter"; 
import { jwtDecode } from "jwt-decode";
import { getPlaylistMovies } from "../api/tmdb-api";

const ProfilePage = () => {
  const [user, setUser] = useState(null); 
  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(""); 
  const navigate = useNavigate();

  // Get JWT from localStorage
  const token = window.localStorage.getItem("token");
 

  
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        console.log('Decoded user:', decoded); // Log the decoded user
        fetchPlaylistMovies();
      } catch (error) {
        console.error('Error decoding token: ', error);
        setLoading(false);
      }
    } else {
      navigate("/movies/homePageLogIn");
    }
  }, [navigate, token]);
  
  const fetchPlaylistMovies = async () => {
    console.log('Fetching playlist for user:', user.id);
    try {
      const playlist = await getPlaylistMovies(user.id);
      console.log('Fetched playlist:', playlist); // Log the playlist directly
      if (Array.isArray(playlist)) {
        setMovies(playlist); // Set the movies array if it's an array
      } else {
        console.error('Fetched data is not an array:', playlist);
        setMovies([]); // Set empty array if it's not an array
      }
    } catch (error) {
      console.error('Error fetching playlist movies:', error);
      setSnackbarMessage("Error fetching playlist movies.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/movies/homePageLogIn");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth={false} sx={{ padding: 0 }}>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : user ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "16px 24px",
              backgroundColor: "#1d1d1d",
              borderRadius: "8px",
              marginBottom: "24px",
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ color: "#bb86fc", fontWeight: 700 }}>
              Profile Page
            </Typography>
            <Typography variant="h6">Welcome, {user.username || "User"}!</Typography>
          </Box>

          <Typography variant="h6" gutterBottom>
            My Saved Playlist
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000,
            }}
          >
            Log Out
          </Button>

          <PageTemplate
            title="My Playlist"
            movies={movies}
            action={(movie) => (
              <RemoveFromPlaylist
                movieId={movie.id}
                getPlaylist={fetchPlaylistMovies}
                showSnackbar={showSnackbar}
              />
            )}
          />

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            message={snackbarMessage}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </>
      ) : (
        <Typography variant="body1">Please log in to see your playlist.</Typography>
      )}
    </Container>
  );
};

export default ProfilePage;