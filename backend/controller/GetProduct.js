const productModal = require("../modal/ProductModal");

const getProductController = async (req, res) => {
    try {
        const products = await productModal.find().sort({ createdAt: -1 });
        res.status(200).json({
            data: products,
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

module.exports = getProductController