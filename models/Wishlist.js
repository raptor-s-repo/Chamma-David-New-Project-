const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
