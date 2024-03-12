const express = require("express");
const { register, login } = require("../controllers/userController");
const router = express.Router();
const validator = require("../middleware/validator");
const { registerSchema, loginSchema } = require("../validator/userValidator");

router.post("/register", validator(registerSchema), register);
router.post("/login", validator(loginSchema), login);

module.exports = router;
