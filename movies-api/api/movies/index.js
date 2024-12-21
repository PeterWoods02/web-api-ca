import express from 'express';
import asyncHandler from 'express-async-handler';
import movieModel from './movieModel'; // movie model
import { getUpcomingMovies, getMovieGenres, getMovies } from '../tmdb-api'; // tmdb API functions
import authenticate from '../../authenticate/index.js'; // Authentication middleware

const router = express.Router();

// Get paginated list of movies from the database
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; // Convert to numeric

    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);

    const total_pages = Math.ceil(total_results / limit); // Calculate total pages

    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    
    res.status(200).json(returnObject); // Return the result
}));

// Get movie details by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id); // Assuming this method is defined in your model

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

// Get upcoming movies from TMDB API
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// Get movie genres from TMDB API
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getMovieGenres();
    res.status(200).json(genres);
}));

// Get movies from the TMDB API
router.get('/tmdb/all', authenticate, asyncHandler(async (req, res) => {
    try {
        const movies = await getMovies(); // Fetch movies from TMDB API
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
}));

export default router;
