import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Avatar, Typography, Box, Button } from "@mui/material";

const UserRatingsList = ({ ratings }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {ratings.map((rating) => (
        <Card key={rating._id} sx={{ display: "flex", padding: 2, backgroundColor: "#333", borderRadius: 2 }}>
          {/* Profile picture and user info */}
          <Avatar sx={{ width: 56, height: 56, backgroundColor: "#bb86fc" }} />
          <Box sx={{ marginLeft: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Link to={`/user/${rating.userId}`}>
            <Typography variant="body1" sx={{ color: "#fff", fontWeight: 600 }}>
              {rating.userId ? rating.userId : "Anonymous"} {/* Fallback username will add real username later */}
            </Typography></Link>
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
