const Product = require('../../models/Product');
const { Types } = require('mongoose');

exports.getAllProducts = async (req, res) => {
    console.log('getAllProducts')
  try {
    const products = await Product.find();
   
    res.json(products);
  } catch (err) {

    res.status(500).json({ msg: 'Server error' });
  }
};


exports.getProductById = async (req, res) => {
    const { id } = req.params; // Assuming id is passed as a parameter
   
    try {
        // Validate if the provided id is a valid ObjectId
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid product ID' });
        }
  
        // Find the product by its _id using findById
        const product = await Product.findById(id) ;
        
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
  
        res.json(product);
    } catch (err) {
        console.error('Error fetching product by ID:', err);
        res.status(500).json({ msg: 'Server error' });
    }
  };
  