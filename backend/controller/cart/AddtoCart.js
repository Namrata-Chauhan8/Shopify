const cart = require("../../modal/CartModal");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;

    const checkCart = await cart.findOne({ productId });

    if (checkCart) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Product already in cart",
      });
    } else {
      const cartData = new cart({
        productId,
        userId,
        quantity: 1,
      });
      const saveCart = await cartData.save();
      res.status(201).json({
        data: saveCart,
        error: false,
        success: true,
        message: "Product added to cart successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = addToCartController;
