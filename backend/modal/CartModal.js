const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    productId: { type: String, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    userId: { type: String, ref: "User", required: true },
  },
  { timestamps: true }
);

const cartModal = mongoose.model("Cart", cartSchema);
module.exports = cartModal;
