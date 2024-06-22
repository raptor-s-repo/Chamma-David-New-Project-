// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  seller: {
    name: { type: String, required: true }
  },
  type: { type: String },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  fabric: { type: String },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  features: [{ type: String }],
  videos: [{ type: String }],
  size: [{ type: String }],
  theme: { type: String },
  sellerTag: { type: String },
  color: { type: String },
  gender: { type: String, required: true },
  displayImage: { type: String, required: true },
  ratings: { type: Number }
});

module.exports = mongoose.model('Product', productSchema);
