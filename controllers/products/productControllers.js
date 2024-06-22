const Product = require('../../models/Product');
const { Types } = require('mongoose');
const ObjectId = Types.ObjectId;



// Assuming productId is the string representation of your _id

// Get all products
exports.getAllProducts = async (req, res) => {
  
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

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, category, fabric, size, color, gender, brand, subCategory, seller, displayImage, ratings } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      fabric,
      size,
      color,
      gender,
      brand,
      subCategory,
      seller,
      displayImage,
      ratings
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get products based on filter query
exports.getProductsByFilter = async (req, res) => {
    const { filter, page = 1, limit = 10 } = req.query; // Default values for page and limit
    
    try {
        const filterObj = JSON.parse(filter);
        const query = Product.find(filterObj);

        // Pagination
        const startIndex = (page - 1) * limit;

        query.skip(startIndex).limit(Number(limit)); // Convert limit to a number

        const products = await query.exec();
        res.json(products);
    } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ msg: 'Server error jonesx' });
  }
};






// Controller function to get products by search criteria
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