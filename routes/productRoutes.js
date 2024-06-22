const express = require('express');
const router = express.Router();
const productController = require('../controllers/products/productControllers');

// Route to get all products
router.get('/', productController.getAllProducts);
router.post('/search', productController.getProductsBySearch);
router.get('/filter', productController.getProductsByFilter); 


// Route to get a particular product by ID
router.get('/:id', productController.getProductById);



module.exports = router;
