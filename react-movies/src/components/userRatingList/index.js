import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Avatar, Typography, Box, Button } from "@mui/material";

// Function to check if a user exists by their ID
const checkIfUserExists = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/rating/user/${userId}`);
    return response.ok; 
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false; // If there's an error, assume the user doesn't exist
  }
};

const UserRatingsList = ({ ratings }) => {
  const [userExistsMap, setUserExistsMap] = useState({});

  useEffect(() => {
    const checkUsersExistence = async () => {
      // Create a map of userId -> exists (true/false)
      const map = {};
      for (let rating of ratings) {
        if (rating.userId && rating.userId._id) {
          const exists = await checkIfUserExists(rating.userId._id); 
          map[rating.userId._id] = exists;
        } else {
          map[rating._id] = false; // If userId is null or missing, assume user doesn't exist
        }
      }
      setUserExistsMap(map);
    };

    checkUsersExistence();
  }, [ratings]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {ratings.map((rating) => (
        <Card key={rating._id} sx={{ display: "flex", padding: 2, backgroundColor: "#333", borderRadius: 2 }}>
          {/* Profile picture and user info */}
          <Avatar sx={{ width: 56, height: 56, backgroundColor: "#bb86fc" }} />
          <Box sx={{ marginLeft: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* Conditional rendering of the link */}
            {rating.userId && rating.userId._id && userExistsMap[rating.userId._id] ? (
              <Link to={`/rating/user/${rating.userId._id}`}>
                <Typography variant="body1" sx={{ color: "#fff", fontWeight: 600 }}>
                  {rating.userId.username || "Anonymous"}
                </Typography>
              </Link>
            ) : (
              <Typography variant="body1" sx={{ color: "#fff", fontWeight: 600 }}>
                {rating.userId?.username || "Anonymous"}
              </Typography>
            )}
            <Typography variant="body2" sx={{ color: "#bbb" }}>
              Rating: {rating.rating} / 10
            </Typography>
            <Typography variant="body2" sx={{ color: "#bbb", marginTop: 1 }}>
              Review: {rating.review || "No review provided"}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
};



export default UserRatingsList;
