const productModal = require("../../modal/ProductModal");
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const deleteProduct = await productModal.deleteOne({ _id: productId });
    if (deleteProduct) {
      return res.status(200).json({
        data: deleteProduct,
        error: false,
        success: true,
        message: "Product deleted successfully",
      });
    } else {
      return res.status(404).json({
        data: [],
        error: false,
        success: true,
        message: "No product found",
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

module.exports = deleteProduct;
