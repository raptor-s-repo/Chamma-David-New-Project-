const express = require('express');
// const { removeFromCart, editCartItem ,getCart } = require('../controllers/cart/cartControllers');
const { addToCart } = require('../controllers/cart/addtocart');
const { editCartItem } = require('../controllers/cart/editcart');
const { getCart } = require('../controllers/cart/getfromcart');
const { removeFromCart } = require('../controllers/cart/removefromcart');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.delete('/remove', authMiddleware, removeFromCart);
router.post('/edit', authMiddleware, editCartItem);
router.get('/', authMiddleware, getCart);








module.exports = router;
