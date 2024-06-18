const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  // Additional fields specific to interior design and furniture
  material: { type: String },
  dimensions: {
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number }
  },
  color: { type: String },
  style: { type: String },
  offer: {
    discountPercentage: { type: Number, min: 0, max: 100 },
    startDate: { type: Date },
    endDate: { type: Date }
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
