const Wishlist = require('../../models/Wishlist');
const Product = require('../../models/Product');
const { default: mongoose } = require('mongoose');


exports.removeFromWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id; // Assuming the user ID is available in the request
  console.log(req.body,"now")
    try {
      let wishlist = await Wishlist.findOne({ user: userId });
  
      if (wishlist) {
        const itemIndex = wishlist.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
          // Product exists in the wishlist, remove it
          wishlist.items.splice(itemIndex, 1);
          await wishlist.save();
          return res.status(200).json(wishlist);
        } else {
          return res.status(404).json({ msg: 'Product not found in wishlist' });
        }
      } else {
        return res.status(404).json({ msg: 'Wishlist not found' });
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  