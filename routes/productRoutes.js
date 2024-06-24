const express = require('express');
const router = express.Router();
const {getAllProducts} = require('../controllers/products/getAllProducts')
const {getProductById} = require('../controllers/products/getProductById')
const {getProductsByFilter}  = require('../controllers/products/getProductsByFilter')

router.get('/', getAllProducts);

router.get('/filter', getProductsByFilter);
router.get('/product/:id', getProductById);



module.exports = router;
