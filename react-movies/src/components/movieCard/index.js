import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid2";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

export default function MovieCard({ movie, action }) {
  const { favorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  return (
    <Card>
      <CardHeader
       title={
        <Typography 
              variant="h5" 
              component="p" 
              
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                cursor: "default",
                width: '100%',  
                '&:hover': {
                  whiteSpace: 'normal', 
                  cursor: "default",
                  overflow: 'visible',  
                  
                },
              }}
        >
          {movie.title}
        </Typography>
      }
    />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{xs: 8}}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{xs: 6}}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" sx={{ color: '#f0bd30' }}/>
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {action(movie)}
    
      <Link to={`/movies/${movie.id}`}>
        <Button variant="outlined" size="medium" color="primary">
          More Info ...
        </Button>
      </Link>

      {/*Rate Button */}
      <Link to={`/movies/${movie.id}/ratings`}>
          <Button variant="outlined" size="medium" color="secondary">
            Rate  <StarRateIcon fontSize="small" sx={{ color: '#f0bd30' }}/>
          </Button>
        </Link>
      
    </CardActions>
    </Card>
  );
}