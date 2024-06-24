const Wishlist = require('../../models/Wishlist');
const Product = require('../../models/Product');
const { default: mongoose } = require('mongoose');




exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id; // Assuming the user ID is available in the request
    console.log("jones")
    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Find the wishlist for the user
        let wishlist = await Wishlist.findOne({ user: userId });

        if (wishlist) {
            // Check if product already exists in the wishlist
            const itemIndex = wishlist.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                return res.status(400).json({ msg: 'Product already in wishlist' });
            } else {
                // Product does not exist in wishlist, add new item
                wishlist.items.push({ productId });
            }
        } else {
            // No wishlist for user, create a new one
            wishlist = new Wishlist({
                user: userId,
                items: [{ productId }]
            });
        }

        // Save the wishlist
        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (err) {
        console.error('Error adding to wishlist:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};
