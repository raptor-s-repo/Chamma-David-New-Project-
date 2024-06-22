const express = require('express');
const { addToCart, removeFromCart, editCartItem ,getCart } = require('../controllers/cart/cartControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.post('/remove', authMiddleware, removeFromCart);
router.post('/edit', authMiddleware, editCartItem);
router.get('/getcart', authMiddleware, getCart);







module.exports = router;
