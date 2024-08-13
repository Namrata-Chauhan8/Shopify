const productModal = require("../../modal/ProductModal");

const getProductDetails = async (req, res) => {
  try {
    const { _id } = req.body;
    const product = await productModal.findById(_id);
    if (product) {
      return res.status(200).json({
        data: product,
        error: false,
        success: true,
        message: "Product fetched successfully",
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

module.exports = getProductDetails;
