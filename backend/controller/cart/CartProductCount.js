const cart = require("../../modal/CartModal");

const cartProductCountController = async (req, res) => {
    try {
       const userId = req.userId
       const productCount = await cart.countDocuments({userId : userId}) 

        res.status(200).json({
            data : productCount,
            error : false,
            success : true,
            message : "Cart product count"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error,
        });
    }
}

module.exports = cartProductCountController