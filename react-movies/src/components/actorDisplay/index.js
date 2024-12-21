import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

const ActorDisplay = ({ actor }) => {
    return (
        <Link to={`/actor/${actor.id}/movies`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card
            sx={{
                width: 160,
                flexShrink: 0, 
                margin: 1,
                boxShadow: 3,
                
            }}
        >
            <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                sx={{ height: 150, objectFit: "cover", borderRadius: 2 }}
            />
            <CardContent sx={{ textAlign: "left", padding: "8px" }}>
               <Typography variant="body2" fontWeight="bold">
                    {actor.name}
                </Typography>
          
                <Typography variant="body2" color="text.secondary">
                    {actor.character}
                </Typography>
            </CardContent>
        </Card>
        </Link>
    );
};

export default ActorDisplay;
