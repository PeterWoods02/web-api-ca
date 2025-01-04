import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Avatar } from "@mui/material";

const MovieUserRatings = () => {
  const { movieId } = useParams(); // Get movieId from the URL
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    const fetchUserRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/movie/${movieId}/ratings`);
        setUserRatings(response.data);
      } catch (error) {
        console.error("Error fetching user ratings:", error);
      }
    };

    fetchUserRatings();
  }, [movieId]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Users Who Rated This Movie
      </Typography>

      <Grid container spacing={3}>
        {userRatings.map((rating, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Avatar alt={rating.username} src={rating.profileImage} sx={{ width: 56, height: 56 }} />
                <Typography variant="h6">{rating.username}</Typography>
                <Typography variant="body2">Rating: {rating.rating}/10</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MovieUserRatings;
