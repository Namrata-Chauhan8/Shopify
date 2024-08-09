const productModal = require("../../modal/ProductModal");
const uploadProductPermission = require("../../helpers/permisson");

const editProductController = async (req, res) => {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }

    const { _id, ...resBody } = req.body;

    const editProduct = await productModal.findByIdAndUpdate(_id, resBody);
    res.status(200).json({
      data: editProduct,
      error: false,
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = editProductController;
