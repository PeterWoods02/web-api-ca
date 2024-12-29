import fetch from 'node-fetch';

const API_KEY = process.env.TMDB_KEY; 

// Helper to handle fetch and JSON parsing
const fetchWithErrorHandling = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`TMDb API Error: ${errorData.status_message || response.statusText}`);
  }
  return response.json();
};

// Get upcoming movies
export const getUpcomingMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
  return await fetchWithErrorHandling(url);
};

// Get movies (discover)
export const getMovies = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=1`;
  return await fetchWithErrorHandling(url);
};

// Get movie details by ID
export const getMovie = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  return await fetchWithErrorHandling(url);
};

// Get movie genres
export const getGenres = async () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  return await fetchWithErrorHandling(url);
};

// Get movie images
export const getMovieImages = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`;
  return await fetchWithErrorHandling(url);
};

// Get movie reviews
export const getMovieReviews = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`;
  const data = await fetchWithErrorHandling(url);
  return data.results || [];
};

// Get top-rated movies
export const getTopRatedMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
  return await fetchWithErrorHandling(url);
};

// Get trending movies
export const getTrendingMovies = async () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=1`;
  return await fetchWithErrorHandling(url);
};

// Get recommended movies for a given movie
export const getRecommendedMovies = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`;
  return await fetchWithErrorHandling(url);
};

// Get movie actors (credits)
export const getMovieActors = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
  return await fetchWithErrorHandling(url);
};

// Get actor movies by ID
export const getActorMovies = async (actorId) => {
  const url = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}&language=en-US`;
  const data = await fetchWithErrorHandling(url);
  return data.cast || [];
};

// Get actor by name
export const getActorByName = async (actorName) => {
  const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${actorName}&page=1&include_adult=false`;
  const data = await fetchWithErrorHandling(url);
  if (data.results && data.results.length > 0) {
    return data.results[0]; 
  }
  throw new Error("Actor not found");
};

// Fetch movies for actor by name
export const getActorMoviesByName = async (actorName) => {
  const actor = await getActorByName(actorName); 
  return await getActorMovies(actor.id); 
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}`;
  return await fetchWithErrorHandling(url);
};

// Fetch actor details by name
export const fetchActorId = async (actorName) => {
    const url = `https://api.themoviedb.org/3/search/person?query=${actorName}&api_key=${API_KEY}&include_adult=false`;
    return await fetchWithErrorHandling(url);
};

// Get movies for actor (using actor ID)
export const getMoviesForActor = async (actorId) => {
  const url = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}&language=en-US`;
  const data = await fetchWithErrorHandling(url);
  return data.cast || [];
};
