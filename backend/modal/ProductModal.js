const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    category: { type: String, required: true },
    productImage: { type: [], required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const productModal = mongoose.model("Product", productSchema);
module.exports = productModal;
