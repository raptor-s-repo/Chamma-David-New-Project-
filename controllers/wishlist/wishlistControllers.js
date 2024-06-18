const Wishlist = require('../../models/Wishlist');
const Product = require('../../models/Product');

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; // Assuming the user ID is available in the request

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      // Check if product already exists in the wishlist
      const itemExists = wishlist.items.some(item => item.productId.toString() === productId);
      if (!itemExists) {
        wishlist.items.push({ productId });
      }
    } else {
      // No wishlist for user, create a new one
      wishlist = new Wishlist({
        user: userId,
        items: [{ productId }]
      });
    }

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};