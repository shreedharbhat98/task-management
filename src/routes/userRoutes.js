const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { signupValidationRules, loginValidationRules, validate } = require("../middleware/userValidation");

router.post("/signup", signupValidationRules, validate, userController.createUser);
router.post("/login", loginValidationRules, validate, userController.loginUser);

module.exports = router;
