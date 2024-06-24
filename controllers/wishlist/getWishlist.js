const Wishlist = require('../../models/Wishlist');
const Product = require('../../models/Product');
const { default: mongoose } = require('mongoose');



exports.getWishlist = async (req, res) => {
    const userId = req.user.id; // Assuming the user ID is available in the request
  
    try {
        const wishlist = await Wishlist.findOne({ user: userId }).populate('items.productId', 'name price');
  
        if (!wishlist) {
            return res.status(404).json({ msg: 'Wishlist not found' });
        }
  
        res.status(200).json(wishlist);
    } catch (err) {
        console.error('Error getting wishlist:', err);
        res.status(500).json({ msg: 'Server error' });
    }
  };
  