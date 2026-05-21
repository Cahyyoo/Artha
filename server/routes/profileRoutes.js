const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// GET /api/profile — Ambil profil user
router.get("/", profileController.getProfile);

// POST /api/profile/onboarding — Simpan hasil onboarding
router.post("/onboarding", profileController.updateOnboarding);

// POST /api/profile/upgrade — Upgrade ke UMKM Aktif
router.post("/upgrade", profileController.upgradeToUmkm);

module.exports = router;
