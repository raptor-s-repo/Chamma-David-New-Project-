const Product = require('../../models/Product');
const { Types } = require('mongoose');
const ObjectId = Types.ObjectId;



exports.getProductsBySearch = async (req, res) => {
    const { search } = req.query;
    
    try {
      // Example search criteria: searching products by name or description
      const products = await Product.find({
        $or: [
          { name: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search by name
          { description: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search by description
        ]
      });
  
      res.json(products);
    } catch (err) {
      console.error('Error in searching products:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };