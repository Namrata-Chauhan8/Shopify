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
router.get('/get-categoryProduct', getCategoryProduct);
router.get('/get-productsByCategory', getProductsByCategory);

module.exports = router;
