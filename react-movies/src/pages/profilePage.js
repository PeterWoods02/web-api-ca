import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Box } from "@mui/material";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist"; // Import the RemoveFromPlaylist component
import PageTemplate from "../components/templateMovieListPageNoFilter"; // Import your PageTemplate

const ProfilePage = () => {
  const [user, setUser] = useState(null); // State to store the logged-in user info
  const [movies, setMovies] = useState([]); // State to store the playlist movies
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
        getPlaylistMovies(currentUser.uid) // Fetch the playlist movies for the logged-in user
          .then((movieDetails) => {
            setMovies(movieDetails); // Set the movies in state
          })
          .catch((error) => {
            console.error("Error fetching movies: ", error);
          });
      } else {
        setUser(null); // Set to null if logged out
        navigate("/movies/homePageLogIn"); // Redirect to login if not logged in
      }
    });
    return () => unsubscribe(); // Cleanup listener when component is unmounted
  }, [navigate]);

  return (
    <Container maxWidth={false} sx={{ padding: 0 }}>
      {user ? (
        <>
        <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start', 
              padding: '16px 24px', 
              backgroundColor: '#1d1d1d', 
              borderRadius: '8px', 
              marginBottom: '24px' 
            }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#bb86fc', fontWeight: 700 }}>
            Profile Page
          </Typography>
          <Typography variant="h6">Welcome, {user.email || "User"}!</Typography>
          </Box>
          <Typography variant="h6" gutterBottom>My Saved Playlist</Typography>
          
        
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const auth = getAuth();
              auth.signOut(); // Log out
              navigate("/movies/homePageLogIn"); // Redirect to login
            }}
          sx={{
              position: 'fixed', 
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
              <RemoveFromPlaylist movieId={movie.id} /> // Render RemoveFromPlaylist button for each movie
            )}
          />
        </>

        
      ) 
      
      : (
        
        <Typography variant="body1">Loading...</Typography>
      )}
    </Container>
  );
};

export default ProfilePage;
