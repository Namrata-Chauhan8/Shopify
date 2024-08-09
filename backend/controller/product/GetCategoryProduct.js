const productModal = require("../../modal/ProductModal");

const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await productModal.distinct("category");

    const productByCategory = [];
    for (const category of productCategory) {
      const product = await productModal.findOne({ category: category });
      if (product) {
        productByCategory.push(product);
      }
    }
    res.json({
      data: productByCategory,
      error: false,
      success: true,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = getCategoryProduct;
