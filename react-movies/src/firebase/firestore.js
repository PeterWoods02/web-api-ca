import { db, auth } from "./firebaseConfig"; 
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"; 
import {getMovie} from "../api/tmdb-api";

// Function to add a movie to the user's playlist
export const addToPlaylist = async (movie) => {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid;
  
      // Reference to the user's playlist document in Firestore
      const playlistRef = doc(db, "playlists", userUid);
  
      try {
        // Get the existing playlist data from Firestore
        const docSnap = await getDoc(playlistRef);
  
        if (docSnap.exists()) {
          // update existing document Union avoid duplication
          await updateDoc(playlistRef, {
            movies: arrayUnion(movie.id),  
          });
          console.log("Movie added to existing playlist!");
        } else {
          // If the playlist doesn't exist, create a new one with the movie
          await setDoc(playlistRef, {
            movies: [movie.id],  
          });
          console.log("New playlist created and movie added!");
        }
      } catch (error) {
        // Log any errors
        console.error("Error adding movie to playlist: ", error);
      }
    } else {
      console.log("User is not logged in.");
    }
  };



  export const getPlaylistMovies = async (userId) => {
    try {
      const playlistRef = doc(db, "playlists", userId); // Reference to the user's playlist document
      const playlistSnap = await getDoc(playlistRef);
  
      if (playlistSnap.exists()) {
        const movieIds = playlistSnap.data().movies; // Get the movie IDs from the 'movies' array
  
        // Fetch details for each movie from TMDB API
        const moviesData = await Promise.all(
          movieIds.map(async (movieId) => {
            const movieDetails = await getMovie({ queryKey: ["movie", { id: movieId }] });
            return movieDetails;
          })
        );
  
        console.log("Fetched Playlist Movies:", moviesData);
        return moviesData;  // Return the array of movie details
      } else {
        console.log("No movies found in the playlist.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching playlist movies:", error);
      throw new Error(error.message);
    }
  };



  
  