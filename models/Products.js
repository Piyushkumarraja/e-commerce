const mongoose = require("mongoose");
// const variantSchema = require("./Variants");

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  additionalCost: { type: Number, required: true },
  stockCount: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    variants: [variantSchema],
  });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;