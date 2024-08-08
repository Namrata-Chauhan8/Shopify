 const uploadProductPermission = require("../helpers/permisson");
const productModal = require("../modal/ProductModal");
 async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId;
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }
        const uploadProduct = new productModal(req.body)
        const saveProduct = await uploadProduct.save();
        res.status(201).json({
            data : saveProduct,
            error : false,
            success : true,
            message : "Product uploaded successfully" 
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error,
          });
    }
 }

 module.exports = UploadProductController