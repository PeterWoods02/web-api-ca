import express from 'express';
import asyncHandler from 'express-async-handler';
import movieModel from './movieModel'; // Movie model
import {
    getUpcomingMovies,
    getGenres,
    getMovies,
    getMovie,
    getMovieImages,
    getMovieReviews,
    getTopRatedMovies,
    getTrendingMovies,
    getRecommendedMovies,
    getMovieActors,
    searchMovies,
    fetchActorId,
    getMoviesForActor,
} from '../tmdb-api'; // TMDB API functions
import authenticate from '../../authenticate/index.js'; // Authentication middleware

const router = express.Router();

// Get paginated list of movies from the database
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // Destructure page and limit with defaults
    [page, limit] = [+page, +limit]; // Convert to numeric

    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit),
    ]);

    const total_pages = Math.ceil(total_results / limit); // Calculate total pages

    const returnObject = {
        page,
        total_pages,
        total_results,
        results,
    };

    res.status(200).json(returnObject);
}));


// Get movie details by ID 
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);  // Parse the movie ID from the request

    try {
        const movie = await getMovie(id);  
    
        if (movie) {
            res.status(200).json(movie);  
        } else {
            res.status(404).json({ message: 'Movie not found' });  
        }
    } catch (error) {
        // Handle any errors that occur during the API call
        res.status(500).json({ message: 'An error occurred while fetching movie details', error: error.message });
    }
}));

  

// Get upcoming movies from TMDB API
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// Get movie genres from TMDB API
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

// Get all movies from the TMDB API
router.get('/tmdb/all', authenticate, asyncHandler(async (req, res) => {
    const movies = await getMovies();
    res.status(200).json(movies);
}));

// Get movie images by ID
router.get('/tmdb/images/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const images = await getMovieImages(id);
    res.status(200).json(images);
}));

// Get movie reviews by ID
router.get('/tmdb/:id/reviews', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const reviews = await getMovieReviews(id);
    res.status(200).json(reviews);
}));

// Get top-rated movies
router.get('/tmdb/top_rated', asyncHandler(async (req, res) => {
    const topRatedMovies = await getTopRatedMovies();
    res.status(200).json(topRatedMovies);
}));

// Get trending movies
router.get('/tmdb/trending', asyncHandler(async (req, res) => {
    const trendingMovies = await getTrendingMovies();
    res.status(200).json(trendingMovies);
}));

// Get recommended movies by movie ID
router.get('/tmdb/:id/recommended', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const recommendedMovies = await getRecommendedMovies(id);
    res.status(200).json(recommendedMovies);
}));

// Search movies
router.get('/tmdb/search', asyncHandler(async (req, res) => {
    const { query, page } = req.query;
    const searchResults = await searchMovies(query, page);
    res.status(200).json(searchResults);
}));

// Fetch actor details by name (get actor ID)
router.get('/tmdb/actor/:actorName', asyncHandler(async (req, res) => {
    const { actorName } = req.params;
    try {
        const actorDetails = await fetchActorId(actorName);
        res.status(200).json(actorDetails);
    } catch (error) {
        res.status(404).json({ message: `Actor ${actorName} not found`, error: error.message });
    }
}));

// Get movies for a given actor by actor's ID
router.get('/tmdb/actor/:actorId/movies', asyncHandler(async (req, res) => {
    const { actorId } = req.params;
    try {
        const moviesForActor = await getMoviesForActor(actorId);
        res.status(200).json(moviesForActor);
    } catch (error) {
        res.status(404).json({ message: `Movies for actor with ID ${actorId} not found`, error: error.message });
    }
}));

// Get movie actors (credits) by movie ID
router.get('/tmdb/actors/:id', asyncHandler(async (req, res) => {
    const { id } = req.params; 
    try {
      const actors = await getMovieActors(id);
      res.status(200).json(actors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching movie actors', error: error.message });
    }
  }));

  // Get vote avaerage and number of votes from tmdb
router.get('/:id/ratings', asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const tmdbMovie = await getMovie(id); 
        if (tmdbMovie) {
            return res.status(200).json({
                vote_count: tmdbMovie.vote_count,
                vote_average: tmdbMovie.vote_average,
            });
        }
        res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching movie ratings', error: error.message });
    }
  }));

  



export default router;
