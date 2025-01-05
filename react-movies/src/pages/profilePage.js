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
    const fetchUserData = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded && decoded.id) {
            setUser(decoded);
            await fetchPlaylistMovies(decoded.id); // Fetch playlist after setting user
          } else {
            console.error('User ID not found in token');
            navigate("/movies/homePageLogIn");
          }
        } catch (error) {
          console.error("Error decoding token: ", error);
          setLoading(false);
        }
      } else {
        navigate("/movies/homePageLogIn");
      }
    };

    fetchUserData();

    // Cleanup state on component unmount (reset loading and movies)
    return () => {
      setMovies([]);  // Reset movies on unmount
      setLoading(true); // Reset loading on unmount
    };
  }, [navigate, token]);

  const fetchPlaylistMovies = async (userId) => {
    try {
      setLoading(true); // Set loading true before fetching
      const playlist = await getPlaylistMovies(userId); // Make sure user.id is available
      if (playlist.length === 0) {
        console.error("No movies found in the playlist");
        setMovies([]);
      } else {
        setMovies(playlist);
        console.log("Fetched playlist:", playlist); // Log the movies that were fetched
      }
    } catch (error) {
      console.error("Error fetching playlist movies:", error);
      setSnackbarMessage("Error fetching playlist movies.");
      setSnackbarOpen(true);
      setMovies([]); // Set movies to empty on error
    } finally {
      setLoading(false); // Set loading to false when done
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
                getPlaylist={fetchPlaylistMovies} // Re-fetch the playlist after a change
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
