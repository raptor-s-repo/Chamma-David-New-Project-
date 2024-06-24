
const Cart = require('../../models/Cart');
const { default: mongoose } = require('mongoose');

exports.getCart = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.id); // Assuming the user ID is available in the request
    console.log("getCart")
    console.log(userId)
    try {
      let cart = await Cart.findOne({ user: userId }).populate('items.productId', 'name price'); // Assuming you have 'name' and 'price' fields in your Product model

      if (!cart) {
        return res.status(404).json({ msg: 'Cart not found' });
      }

      res.status(200).json(cart);
    } catch (err) {
      console.error('Error getting cart:', err);
      res.status(500).json({ msg: 'Server error' });
    }
  };