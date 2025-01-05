import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, Box, Button, Snackbar } from "@mui/material";
import { getUserDetails, getUserReviews } from "../api/tmdb-api"; // Assume these functions exist

const UserReviewPage = () => {
  const { userId } = useParams(); // Get the userId from URL parameters
  const [userDetails, setUserDetails] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUserDetails(userId); // Fetch user details by userId
        const reviews = await getUserReviews(userId); // Fetch all reviews by userId
        setUserDetails(user);
        setUserReviews(reviews);
      } catch (error) {
        console.error("Error fetching user details or reviews:", error);
        setSnackbarMessage("Error fetching user details or reviews");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ padding: 0 }}>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : userDetails ? (
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
              {userDetails.username || "Unknown User"}
            </Typography>

            <Typography variant="body1" sx={{ color: "#ffffff", marginBottom: 2 }}>
              Total Reviews: {userReviews.length}
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ color: "#ffffff" }}>
              Reviews:
            </Typography>
            {userReviews.length > 0 ? (
              userReviews.map((review) => (
                <Box key={review._id} sx={{ marginBottom: 2, padding: "8px", backgroundColor: "#333333", borderRadius: "8px" }}>
                  <Typography variant="h6" sx={{ color: "#bb86fc" }}>
                    {review.movieTitle}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#ffffff" }}>
                    {review.review}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ffffff" }}>
                    Rating: {review.rating}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                No reviews available for this user.
              </Typography>
            )}
          </Box>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            message={snackbarMessage}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </>
      ) : (
        <Typography variant="body1" color="textSecondary">
          User not found.
        </Typography>
      )}
    </Container>
  );
};

export default UserReviewPage;
