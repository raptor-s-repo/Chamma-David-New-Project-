const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assuming the user ID is available in the request

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Check if product already exists in the cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        // Product exists in the cart, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Product does not exist in cart, add new item
        cart.items.push({ productId, quantity });
      }
    } else {
      // No cart for user, create a new one
      cart = new Cart({
        user: userId,
        items: [{ productId, quantity }]
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
