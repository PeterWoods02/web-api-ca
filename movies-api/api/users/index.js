import express from 'express';
import User from './userModel';
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


// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Register User
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const existingUser = await User.findByUserName(username);
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user.', error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const user = await User.findByUserName(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

router.post('/playlist', verifyToken, async (req, res) => {
  try {
    const { movie } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if movie already exists in the playlist
    if (user.playlist.some((m) => m.id === movie.id)) {
      return res.status(400).json({ message: 'Movie already in playlist' });
    }

    // Add movie to playlist
    user.playlist.push(movie);
    await user.save();

    res.status(200).json({ message: 'Movie added to playlist', playlist: user.playlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie to playlist', error: error.message });
  }
});





// Remove movie from user's playlist
router.delete('/playlist/:movieId', verifyToken, async (req, res) => {
  const { movieId } = req.params;  
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const movieIndex = user.playlist.findIndex((movie) => movie.id === parseInt(movieId)); // Compare movieId with 'id'
    
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found in playlist' });
    }
    user.playlist.splice(movieIndex, 1);
    await user.save();

    // Respond with a success message
    res.status(200).json({ message: 'Movie removed from playlist', playlist: user.playlist });
  } catch (error) {
    console.error('Error removing movie from playlist:', error);
    res.status(500).json({ message: 'Error removing movie from playlist', error: error.message });
  }
});






// Get all movies in the user's playlist
router.get('/playlist', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ playlist: user.playlist });
  } catch (error) {
    console.error('Error retrieving playlist:', error);
    res.status(500).json({ message: 'Error retrieving playlist', error: error.message });
  }
});



export default router;
