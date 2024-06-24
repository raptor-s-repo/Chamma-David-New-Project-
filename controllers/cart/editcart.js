const Cart = require('../../models/Cart');
const { default: mongoose } = require('mongoose');
exports.editCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assuming the user ID is available in the request

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        // Product exists in the cart, update quantity
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        return res.status(200).json(cart);
      } else {
        return res.status(404).json({ msg: 'Product not found in cart' });
      }
    } else {
      return res.status(404).json({ msg: 'Cart not found' });
    }
  } catch (err) {
    console.error('Error editing cart item:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
