import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';


const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
      }
  
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
      // Find the user by username
      const user = await User.findByUserName(username);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      // Compare the password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
      // Generate a JWT token if credentials are correct
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET, { expiresIn: '1h' });
      // Respond with the token
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error during login', error: error.message });
    }
  });

  router.post('/logout', (req, res) => {
    // Client will handle the actual token removal
    res.status(200).json({ message: 'Logged out successfully' });
  });

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});


async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}
export default router;