const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route untuk Register (POST /api/auth/register)
router.post("/register", authController.register);

// Route untuk Login (POST /api/auth/login)
router.post("/login", authController.login);

module.exports = router;
