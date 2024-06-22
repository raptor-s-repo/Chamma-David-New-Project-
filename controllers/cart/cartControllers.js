  const { default: mongoose } = require('mongoose');
const Cart = require('../../models/Cart');
  const Product = require('../../models/Product');

// add to Cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assuming the user ID is available in the request

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Check if product already exists in the cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
     
        cart.items.push({ productId  , quantity });
      
    } else {
      // No cart for user, create a new one
      cart = new Cart({
        user: userId,
        items: [{ productId, quantity }]
      });
    }

    // Save the cart
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
  // Remove from Cart
  exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id; // Assuming the user ID is available in the request

    try {
      let cart = await Cart.findOne({ user: userId });

      if (cart) {
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
          // Product exists in the cart, remove it
          cart.items.splice(itemIndex, 1);
          await cart.save();
          return res.status(200).json(cart);
        } else {
          return res.status(404).json({ msg: 'Product not found in cart' });
        }
      } else {
        return res.status(404).json({ msg: 'Cart not found' });
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
      res.status(500).json({ msg: 'Server error' });
    }
  };

  // Edit Cart Item
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


  // Get Cart
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