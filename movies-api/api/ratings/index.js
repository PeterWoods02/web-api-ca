import express from 'express';
import Rating from './ratingModel';
import jwt from 'jsonwebtoken';


const router = express.Router(); // eslint-disable-line

// Add or update rating for a movie
router.post('/rating', async (req, res) => {
    const { movieId, rating } = req.body;
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
        // If rating already exists, update it
        existingRating.rating = rating;
        await existingRating.save();
        return res.status(200).json({ message: 'Rating updated successfully', rating: existingRating });
      }
  
      // If no existing rating, create a new one
      const newRating = new Rating({ movieId, userId, rating });
      await newRating.save();
      
      return res.status(201).json({ message: 'Rating added successfully', rating: newRating });
    } catch (error) {
      console.error('Error adding/updating rating:', error);
      return res.status(500).json({ message: 'Error adding/updating rating', error: error.message });
    }
  });
  
  export default router;