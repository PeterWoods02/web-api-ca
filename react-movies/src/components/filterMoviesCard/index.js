import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Card, CardContent, Typography, MenuItem, TextField,
  FormControl, Select, Rating, Button, Menu
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";  // Import Filter Icon
import { getGenres, getActorByName, fetchActorId } from "../../api/tmdb-api";
import Spinner from "../spinner";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../themes/theme';


const formControl = { margin: 1, minWidth: 220, backgroundColor: "rgb(255, 255, 255)" };

export default function FilterMoviesCard({ titleFilter, genreFilter, ratingFilter, onUserInput,sortOption,
  onSortChange }) {
  const [localRating, setLocalRating] = useState(ratingFilter / 10 || 0);
  const [searchTerm, setSearchTerm] = useState("");
  const [actorFilter, setActorFilter] = useState("");
  const [actorSearchStatus, setActorSearchStatus] = useState("idle");
  const [anchorEl, setAnchorEl] = useState(null);  // State for anchor element (for the dropdown)


  const { data: genreData, isLoading: genreLoading, isError: genreIsError } = useQuery(
    "genres", getGenres, { staleTime: 1000 * 60 * 60 * 24, cacheTime: 1000 * 60 * 60 * 24, refetchOnWindowFocus: false }
  );

  const { data: actorData, isLoading: actorLoading, isError: actorIsError } = useQuery(
    ["actorByName", actorFilter], () => getActorByName(actorFilter), {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      enabled: actorSearchStatus === "searching" && actorFilter.length > 0,
    }
  );

  if (genreLoading || actorLoading) return <Spinner />;
  if (genreIsError || actorIsError) return <h1>Error loading data</h1>;

  const genres = genreData?.genres || [];
  if (genres.length && genres[0].name !== "All Genres") genres.unshift({ id: "0", name: "All Genres" });
  const actorsList = actorData?.results || [];

  const handleSearchClick = async () => {
    if (!searchTerm.trim()) return;

    setActorSearchStatus("searching");
    setActorFilter(searchTerm);
    try {
      const actorData = await fetchActorId(searchTerm);
      if (actorData?.results?.length) {
        const selectedActor = actorData.results[0];
        onUserInput("actor", selectedActor.id);
      } else {
        onUserInput("actor", null);
      }
    } catch {
      onUserInput("actor", null);
    }
  };

  // Open the menu (dropdown)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);  // Set the anchor for the menu
  };

  // Close the menu (dropdown)
  const handleClose = () => {
    setAnchorEl(null);  // Close the menu
  };

  // Handle sorting option change from dropdown
  const handleSortChange = (option) => {
    onSortChange(option);  // Call the parent function to update the sort option
    handleClose();  // Close the menu after selection
  };

  // Clear all filters
  const handleClearFilters = () => {
   setSearchTerm("");
   setActorFilter("");
   setLocalRating(0);
   onUserInput("name", "");
   onUserInput("genre", "0");
   onUserInput("rating", "0");
   onUserInput("actor", null);
  };

  return (
    <ThemeProvider theme={theme}>
    <Card sx={{ backgroundColor: "rgb(61, 47, 69)" }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterListIcon fontSize="large" onClick={handleClick} style={{ cursor: "pointer" }} /> Filter Movies
        </Typography>

        {/* Sorting Dropdown */}
       <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
           <MenuItem onClick={() => handleSortChange("a-z")}>a-z</MenuItem>
          <MenuItem onClick={() => handleSortChange("z-a")}>z-a</MenuItem>
          <MenuItem onClick={() => handleSortChange("highestRated")}>Highest Rated</MenuItem>
          <MenuItem onClick={() => handleSortChange("recentlyReleased")}>Recently Released</MenuItem>
        </Menu>

        <TextField
  sx={{
    ...formControl,  
    '& .MuiInputBase-input': {
      color: '#333333',  
    },
  }}
  label="Search field"
  type="search"
  variant="filled"
  value={titleFilter}
  onChange={(e) => onUserInput("name", e.target.value)}
/>

<FormControl sx={formControl}>
  <Select
    labelId="genre-label"
    value={genreFilter}
    onChange={(e) => onUserInput("genre", e.target.value)}
    sx={{
      '& .MuiSelect-select': {
        color: '#8f8f8f', 
      }
    }}
  >
    {genres.map((genre) => (
      <MenuItem key={genre.id} value={genre.id}>
        {genre.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>


        <Typography variant="subtitle1">Rating ({ratingFilter || "0"} - 10)</Typography>
        <Rating
          name="rating-filter"
          value={localRating}
          onChange={(e, newValue) => {
            setLocalRating(newValue);
            onUserInput("rating", ((newValue / 5) * 10).toFixed(1));
          }}
          precision={0.5}
        />

        <TextField
        sx={{
          ...formControl,  
          '& .MuiInputBase-input': {
            color: '#333333',  
          },
        }}
          label="Search by Actor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="filled"
        />

        {searchTerm && actorsList.length > 0 && (
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {actorsList.map((actor) => (
              <MenuItem
                key={actor.id}
                value={actor.id}
                onClick={() => {
                  setActorFilter(actor.id);
                  setSearchTerm(actor.name);
                  onUserInput("actor", actor.id);
                }}
              >
                {actor.name}
              </MenuItem>
            ))}
          </div>
        )}

       

        <Button
          sx={{ width :"30%",marginRight: "4%",}}
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
        >
          Search
        </Button>
        <Button
              sx={{ width :"30%" }}
              variant="outlined"
              color="error"
              onClick={handleClearFilters}
            >
              Clear 
            </Button>
      </CardContent>
    </Card>
    </ThemeProvider>
  );
}
