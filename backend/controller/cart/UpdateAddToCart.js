const cart = require("../../modal/CartModal");

const updateAddToCart = async (req, res) => {
  try {
    const currentUser = req.userId;
    const productId = req.body._id;
    const quantity = req.body.quantity;

    const updateCart = await cart.updateOne(
      { _id: productId },
      {
        ...(quantity && { quantity: quantity }),
      }
    );
    res.status(200).json({
      data: updateCart,
      error: false,
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = updateAddToCart;
