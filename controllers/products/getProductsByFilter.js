const Product = require('../../models/Product');
const { Types } = require('mongoose');
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