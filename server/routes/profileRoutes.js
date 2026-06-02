const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// GET /api/profile — Ambil profil user
router.get("/", profileController.getProfile);

// POST /api/profile/onboarding — Simpan hasil onboarding
router.post("/onboarding", profileController.updateOnboarding);

// PUT /api/profile — Update Data Diri (Nama, Telepon, Bio)
router.put("/", profileController.updateProfile);

// POST /api/profile/upgrade — Upgrade ke UMKM Aktif
router.post("/upgrade", profileController.upgradeToUmkm);

// POST /api/profile/sync-business — Sinkronisasi business_id dari Owner ke karyawan
router.post("/sync-business", profileController.syncBusinessId);

module.exports = router;
