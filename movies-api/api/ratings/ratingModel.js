import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  movieId: { type: String, required: true }, 
  movieTitle: {type: String, required: false},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  rating: { type: Number, required: true, min: 1, max: 10 }, 
  review: { type: String, required: false },  // Optional review text 
}, { timestamps: true });  // track when the rating was created/updated

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
