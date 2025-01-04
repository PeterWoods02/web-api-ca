import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Container, Box, Snackbar } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import RatingCard from "../components/userRatingList"; 
import RatingForm from "../components/ratingForm"; 

const RatingsPage = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null); 
  const [ratings, setRatings] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(""); 
  const navigate = useNavigate(); 

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        // Decode the JWT token to get the user info (e.g., userId)
        const decoded = jwtDecode(token);
        setUser(decoded); // Set the user data

        // Fetch movie ratings based on the movieId from URL
        getMovieRatings();
      } catch (error) {
        console.error("Error decoding token:", error);
        setLoading(false);
      }
    } else {
      // If no token exists, navigate to login page
      navigate("/login");
    }
  }, [navigate, token, id]);

  

    // Fetch ratings for the movie
    const getMovieRatings = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found.");
          
          const response = await fetch(`http://localhost:8080/api/rating/${id}`, {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          });
      
          if (!response.ok) throw new Error(`Failed to fetch ratings: ${response.statusText}`);
          
          const { ratings = [] } = await response.json();
          setRatings(ratings);
        } catch (error) {
          console.error("Error fetching ratings:", error);
        } finally {
          setLoading(false);
        }
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
              Movie Ratings Page
            </Typography>
            <Typography variant="h6">Welcome, {user.email || "User"}!</Typography>
          </Box>

          <Typography variant="h6" gutterBottom>
            Ratings for Movie {id}
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

          {/* RatingForm component for submitting new ratings */}
          <RatingForm movieId={id} fetchRatings={getMovieRatings} showSnackbar={showSnackbar} />

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
