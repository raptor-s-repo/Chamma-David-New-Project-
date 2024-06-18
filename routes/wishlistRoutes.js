const express = require('express');
const { addToWishlist } = require('../controllers/wishlist/wishlistControllers'); // Ensure correct import path
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, addToWishlist);

module.exports = router;
