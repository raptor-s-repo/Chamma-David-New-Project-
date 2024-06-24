const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const { addToWishlist } = require('../controllers/wishlist/addToWishlist');
const { removeFromWishlist } =  require('../controllers/wishlist/removeFromWishlist');
const { getWishlist } = require('../controllers/wishlist/getWishlist');

router.post('/', authMiddleware, addToWishlist);
router.delete('/', authMiddleware,removeFromWishlist);
router.get('/', authMiddleware, getWishlist)

module.exports = router;

