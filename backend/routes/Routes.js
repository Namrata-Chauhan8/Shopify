const express = require("express");
const router = express.Router();
const { signup, login } = require("../controller/UserController");
const userDetailController = require("../controller/UserDetailController");
const AuthToken = require("../middleware/AuthToken");

router.post("/signup", signup);
router.post("/login", login);

router.get('/user-details',AuthToken ,userDetailController);

module.exports = router;
