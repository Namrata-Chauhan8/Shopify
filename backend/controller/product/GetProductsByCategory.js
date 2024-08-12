const product = require("../../modal/ProductModal");
const getProductsByCategory = async (req, res) => {
    try {
        const products = await product.find({ category: req.params.category });
        console.log('req.params.category: ', req.params);
        console.log('products: ', products);
        if (products) {
            return res.status(200).json({
                data: products,
                error: false,
                success: true,
                message: "Products fetched successfully",
            })
        }else{
            return res.status(404).json({
                data: [],
                error: false,
                success: true,
                message: "No product found in this category",
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error,
        })
    }
}

module.exports = getProductsByCategory