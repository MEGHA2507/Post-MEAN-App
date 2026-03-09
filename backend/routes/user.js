const express = require("express"); // relative path to user.js
const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserController.createUser);


router.post("/login", UserController.userLogin);

module.exports = router;