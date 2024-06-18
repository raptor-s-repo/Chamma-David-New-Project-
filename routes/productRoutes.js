const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get a particular product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  const { name, description, price, category, material, dimensions, color, style, offer } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      material,
      dimensions,
      color,
      style,
      offer
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
