import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Box, Snackbar } from "@mui/material";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist"; // Import the RemoveFromPlaylist component
import PageTemplate from "../components/templateMovieListPageNoFilter"; // Import your PageTemplate
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [user, setUser] = useState(null); // State to store the logged-in user info
  const [movies, setMovies] = useState([]); // State to store the playlist movies
  const [loading, setLoading] = useState(true); // State for loading
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State to hold the Snackbar message
  const navigate = useNavigate();

  // Get JWT from localStorage
  const token = window.localStorage.getItem("token");
 

  useEffect(() => {
    if (token) {
      try {
        // Decode the token to get the user info (e.g., userId)
        const decoded = jwtDecode(token);
        setUser(decoded); // Set the user data (like email or userId)

        // Fetch the user's playlist movies based on the decoded user ID
        getPlaylistMovies(); 
      } catch (error) {
        console.error("Error decoding token: ", error);
        setLoading(false);
      }
    } else {
      // Redirect to login page if no token exists
      navigate("/movies/homePageLogIn");
    }
  }, [navigate, token]);

  // Function to get the user's playlist movies (from an API or backend)
  const getPlaylistMovies = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/users/playlist/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error(`Failed to fetch movies. Status: ${response.status}`);
        throw new Error('Failed to fetch movies');
      }
  
     
      const data = await response.json();
      // Set movies data to state
      setMovies(data.playlist || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  
  // Function to log out
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT from localStorage
    setUser(null); // Clear user data
    navigate("/movies/homePageLogIn"); // Redirect to login page
  };

  // Function to handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Function to show snackbar after movie is removed
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
            <Typography variant="h6">Welcome, {user.email || "User"}!</Typography>
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

          {/* Use PageTemplate to display movies */}
          <PageTemplate
            title="My Playlist"
            movies={movies} // Pass the movies array to the PageTemplate
            action={(movie) => (
              <RemoveFromPlaylist
                movieId={movie.id} 
                getPlaylist={getPlaylistMovies}
                showSnackbar={showSnackbar} 
              />
            )}
          />

            {/* Snackbar to show the success message */}
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
