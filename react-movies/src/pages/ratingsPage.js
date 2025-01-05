import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Container, Box, Snackbar } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import RatingCard from "../components/userRatingList"; 
import RatingForm from "../components/ratingForm"; 
import { getMovieRatingsFromUsers, getMovieDetails, getMovieRatings}  from "../api/tmdb-api";


const RatingsPage = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null); 
  const [ratings, setRatings] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(""); 
  const [movieRatings, setMovieRatings] = useState({ vote_count: 0, vote_average: 0 }); 
  const navigate = useNavigate(); 
  const [title, setMovieName] = useState("");

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        // Decode the JWT token to get the user info (e.g., userId)
        const decoded = jwtDecode(token);
        setUser(decoded); // Set the user data

        
        // Fetch movie ratings based on the movieId from URL
        
        getMovieDetailsAndRatings(id); 
        getUserRatings(id);
      } catch (error) {
        console.error("Error decoding token:", error);
        setLoading(false);
      }
    } else {
      // If no token exists, navigate to login page
      navigate("/login");
    }
  }, [navigate, token, id]);


   // get title and ratings
  const getMovieDetailsAndRatings = async (movieId) => {
    try {
      const details = await getMovieDetails(movieId); 
      const ratingsData = await getMovieRatings(movieId); 
      setMovieName(details.title); 
      setMovieRatings(ratingsData); 
    } catch (error) {
      console.error("Error fetching movie details or ratings:", error);
    } finally {
      setLoading(false);
    }
  };


  const getUserRatings = async (movieId) => {
    try {
      const userRatings = await getMovieRatingsFromUsers(movieId);
      if (!userRatings) {
        throw new Error("No ratings found for this movie");
      }
      setRatings(userRatings);
    } catch (error) {
      console.error("Error fetching user ratings:", error);
      setSnackbarMessage("Error fetching ratings");
      setSnackbarOpen(true);
    }
  };

  const calculateCombinedAverage = () => {
    const allRatings = ratings.map((r) => r.rating); // Extract all user ratings
    const totalRatings = allRatings.reduce((acc, val) => acc + val, 0); // Sum all the ratings
    const userRatingCount = allRatings.length;
    const movieRatingCount = movieRatings.vote_count;
  
    // Combine the movie ratings and user ratings
    const combinedRatingCount = userRatingCount + movieRatingCount;
    const combinedTotalRating = totalRatings + movieRatings.vote_average * movieRatingCount;
  
    if (combinedRatingCount === 0) return 0; // Prevent division by zero
    return combinedTotalRating / combinedRatingCount; // Return the combined average rating
  };
  
  
     // Trigger ratings refresh after a rating is submitted
  const refreshRatings = () => {
    getUserRatings(id); // Re-fetch the updated ratings
  };
  
  // Handle closing of the Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Show a success message on rating actions (like adding or updating a rating)
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <Container maxWidth={false} sx={{ padding: 0 }}>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : user ? (
        <>
        <Box sx={{ marginBottom: 6 }} />   
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
            {title || "Loading..."} 
          </Typography>


          {/* Display the movie's vote count and average */}
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Typography variant="body1" sx={{ color: "#ffffff", marginRight: 2 }}>
                Vote Count: {movieRatings.vote_count + ratings.length}
              </Typography>
              <Typography variant="body1" sx={{ color: "#ffffff" }}>
                Average Rating: {calculateCombinedAverage().toFixed(1)}
              </Typography>
            </Box>
          </Box>

           
           

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

          {/* RatingForm component for submitting new ratings */}
          <RatingForm movieId={id} fetchRatings={() => getMovieRatingsFromUsers(id)} refreshRatings={refreshRatings} showSnackbar={showSnackbar} />

          <Box sx={{ marginBottom: 6 }} />   

          {/* Display the list of ratings */}
          {ratings.length > 0 ? (
            <RatingCard ratings={ratings} />
        ) : (
            <Typography variant="body1" color="textSecondary">
                No ratings available for this movie yet.
            </Typography>
            )}


          {/* Snackbar to show success/error messages */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            message={snackbarMessage}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </>
      ) : (
        <Typography variant="body1">Please log in to see the movie ratings.</Typography>
      )}
    </Container>
  );
};

export default RatingsPage;
