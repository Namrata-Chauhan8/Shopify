const productModal = require("../../modal/ProductModal");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.query;

    const regex = new RegExp(query, "i", "g");

    const product = await productModal.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });

    res.json({
      data: product,
      message: "Search Product list",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = searchProduct;
