const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controller/user/UserController");
const userDetailController = require("../controller/user/UserDetailController");
const AuthToken = require("../middleware/AuthToken");
const allUsers = require("../controller/user/AllUsers");
const updateUser = require("../controller/user/UpdateUser");
const UploadProductController = require("../controller/product/UploadProduct");
const getProductController = require("../controller/product/GetProduct");
const editProductController = require("../controller/product/EditProducts");
const getCategoryProduct = require("../controller/product/GetCategoryProduct");
const getProductsByCategory = require("../controller/product/GetProductsByCategory");
const getProductDetails = require("../controller/product/GetProductDetails");
const addToCartController = require("../controller/cart/AddtoCart");
const cartProductCountController = require("../controller/cart/CartProductCount");
const getProductsFromCart = require("../controller/cart/GetAddToCart");
const updateAddToCart = require("../controller/cart/UpdateAddToCart");
const deleteProductFromCart = require("../controller/cart/DeleteProduct");
const searchProducts = require("../controller/product/SearchProducts");
const filterProducts = require("../controller/product/FilterProducts");
const deleteProduct = require("../controller/product/DeleteProduct");
const { checkout } = require("../controller/cart/Payment");

router.post("/signup", signup);
router.post("/login", login);

router.get("/user-details", AuthToken, userDetailController);

router.get("/logout", logout);

//admin panel
router.get("/allUsers", AuthToken, allUsers);
router.post("/update-user", AuthToken, updateUser);

//product
router.post("/upload-product", AuthToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", AuthToken, editProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/get-productsByCategory", getProductsByCategory);
router.post("/get-productDetails", getProductDetails);
router.get("/search", searchProducts);
router.post("/filter", filterProducts);
router.delete("/delete-admin-product", AuthToken, deleteProduct);

//cart
router.post("/add-to-cart", AuthToken, addToCartController);
router.get("/get-cart-count", AuthToken, cartProductCountController);
router.get("/view-card-product", AuthToken, getProductsFromCart);
router.post("/update-addToCart", AuthToken, updateAddToCart);
router.delete("/delete-product", AuthToken, deleteProductFromCart);
router.post("/checkout", AuthToken, checkout);

module.exports = router;
