const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controller/UserController");
const userDetailController = require("../controller/UserDetailController");
const AuthToken = require("../middleware/AuthToken");
const allUsers = require("../controller/AllUsers");
const updateUser = require("../controller/UpdateUser");

router.post("/signup", signup);
router.post("/login", login);

router.get('/user-details',AuthToken ,userDetailController);

router.get('/logout', logout);

//admin panel
router.get('/allUsers',AuthToken, allUsers);
router.post('/update-user',AuthToken,updateUser);

module.exports = router;
