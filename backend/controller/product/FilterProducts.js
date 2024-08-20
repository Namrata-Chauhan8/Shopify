const productModal = require("../../modal/ProductModal");

const filterProducts = async (req, res) => {
  try {
    const categoryList = req?.body?.category;

    const products = await productModal.find({
      category: {
        $in: categoryList,
      },
    });

    if (products) {
      return res.status(200).json({
        success: true,
        products: products,
        error: false,
        message: "Filtered Products",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = filterProducts;
