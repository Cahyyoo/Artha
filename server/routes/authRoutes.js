const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route untuk Register (POST /api/auth/register)
router.post("/register", authController.register);

// Route untuk Verifikasi OTP (POST /api/auth/verify-otp)
router.post("/verify-otp", authController.verifyOtp);

// Route untuk Kirim Ulang OTP (POST /api/auth/resend-otp)
router.post("/resend-otp", authController.resendOtp);

// Route untuk Refresh Token (POST /api/auth/refresh-token)
router.post("/refresh-token", authController.refreshToken);

// Route untuk Login (POST /api/auth/login)
router.post("/login", authController.login);

module.exports = router;
