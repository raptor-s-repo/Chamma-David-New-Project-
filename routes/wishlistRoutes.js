const express = require('express');
const { addToWishlist,removeFromWishlist,getWishlist } = require('../controllers/wishlist/wishlistControllers'); // Ensure correct import path
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.patch('/add', authMiddleware, addToWishlist);
router.post('/remove', authMiddleware, removeFromWishlist);
router.get('/getWishlist', authMiddleware, getWishlist);


module.exports = router;

