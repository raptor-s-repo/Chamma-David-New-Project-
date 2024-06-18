const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users/userController');
const auth = require('../middleware/auth');

// Register a new user
router.post('/register', UserController.registerUser);

// Activate user
router.get('/activate/:activationCode', UserController.activateUser);

// Login user
router.post('/login', UserController.loginUser);

// Get user info (protected route)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
