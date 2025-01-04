import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RatingForm = ({  movieId, fetchRatings, showSnackbar  }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Validate input
    if (rating < 1 || rating > 10) {
        setError("Rating must be between 1 and 10.");
        return;
      }
  
      if (!review.trim()) {
        setError("Review cannot be empty.");
        return;
      }
      setError("");

      try {
        // Decode token to get userId
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
  
        // Submit rating and review
        const response = await fetch("http://localhost:8080/api/rating", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ movieId, userId, rating, review }),
        });
  
        if (response.ok) {
          showSnackbar("Rating submitted successfully!");
          fetchRatings(); // Refresh the ratings list
          setRating(0); // Reset the form
          setReview("");
        } else {
          const errorResponse = await response.json();
          setError(errorResponse.message || "Failed to submit rating.");
        }
      } catch (error) {
        console.error("Error submitting rating:", error);
        setError("An unexpected error occurred.");
      }
    };

  return (
    <div>
      <Typography variant="h6">Rate This Movie</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          label="Rating (1-10)"
          fullWidth
        />
        <TextField
          value={review}
          onChange={(e) => setReview(e.target.value)}
          label="Your Review"
          multiline
          rows={4}
          fullWidth
        />
        <Button type="submit" variant="contained">Submit Rating</Button>
      </form>
    </div>
  );
};

export default RatingForm;
