import express from 'express';
import Rating from './ratingModel';
import jwt from 'jsonwebtoken';


const router = express.Router(); // eslint-disable-line

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    console.log('No token provided');
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    console.log('Decoded token:', decoded); // Log the decoded token
    req.user = decoded; // Attach decoded user data to request
    next();
  });
};

// Get all ratings for a specific movie
router.get('/rating/:movieId', async (req, res) => {
    const { movieId } = req.params;
  
    if (!movieId) {
      return res.status(400).json({ message: 'MovieId is required' });
    }
    try {
      const ratings = await Rating.find({ movieId });
  
      if (!ratings || ratings.length === 0) {
        return res.status(404).json({ message: 'No ratings found for this movie' });
      }
  
      // Return the list of ratings
      return res.status(200).json({ ratings });
    } catch (error) {
      console.error('Error fetching ratings:', error);
      return res.status(500).json({ message: 'Error fetching ratings', error: error.message });
    }
  });
  

// Add or update rating for a movie
router.post('/rating', verifyToken, async (req, res) => {
    const { movieId, rating, review } = req.body;  // Now accepting the review
    const userId = req.user.id; 
  
    if (!movieId || !rating) {
      return res.status(400).json({ message: 'MovieId and rating are required' });
    }
    if (rating < 1 || rating > 10) {
      return res.status(400).json({ message: 'Rating must be between 1 and 10' });
    }
  
    try {
      let existingRating = await Rating.findOne({ movieId, userId });
  
      if (existingRating) {
        // If rating already exists, update it with the review as well
        existingRating.rating = rating;
        existingRating.review = review || existingRating.review;  // Update review if provided
        await existingRating.save();
        return res.status(200).json({ message: 'Rating updated successfully', rating: existingRating });
      }
  
      // If no existing rating, create a new one with the review
      const newRating = new Rating({ movieId, userId, rating, review });
      await newRating.save();
      
      return res.status(201).json({ message: 'Rating added successfully', rating: newRating });
    } catch (error) {
      console.error('Error adding/updating rating:', error);
      return res.status(500).json({ message: 'Error adding/updating rating', error: error.message });
    }
  });

    // Get all ratings for a specific user
  router.get('/rating/user/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }

    try {
      // Fetch ratings for the user by their userId
      const ratings = await Rating.find({ userId });

      if (!ratings || ratings.length === 0) {
        return res.status(404).json({ message: 'No ratings found for this user' });
      }

      // Return the list of ratings
      return res.status(200).json({ ratings });
    } catch (error) {
      console.error('Error fetching ratings:', error);
      return res.status(500).json({ message: 'Error fetching ratings', error: error.message });
    }
  });

  
  export default router;