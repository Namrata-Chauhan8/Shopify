const cart = require("../../modal/CartModal");

const getProductsFromCart = async (req, res) => {
  try {
    const currentUser = req.userId;

    const productsFromCart = await cart.find({ userId: currentUser }).populate("productId");
    if (productsFromCart) {
      return res.status(200).json({
        data: productsFromCart,
        error: false,
        success: true,
        message: "Products fetched successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Products not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = getProductsFromCart;
