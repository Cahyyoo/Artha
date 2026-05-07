require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

// Inisialisasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. MIDDLEWARE GLOBAL
// ==========================================
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Support both standard Vite ports
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==========================================
// 2. DAFTAR ROUTES
// ==========================================
app.use("/api/auth", authRoutes);

// Test Route Dasar
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server UMKM Finance API berjalan dengan baik! 🚀",
  });
});

// Route untuk mengecek koneksi Supabase
app.get("/api/health", async (req, res, next) => {
  try {
    const supabase = require("./services/supabase");

    const { data, error } = await supabase
      .from("_test_connection_")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error && error.code !== "PGRST116" && error.code !== "42P01") {
      throw error;
    }

    res.json({
      status: "success",
      message: "Koneksi Supabase berhasil & API siap digunakan! 🚀",
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 3. ERROR HANDLING (Mencegah Server Crash)
// ==========================================

// Middleware untuk menangani Route yang tidak ditemukan (404)
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message:
      "Endpoint API tidak ditemukan (404). Silakan cek kembali URL Anda.",
  });
});

// Global Error Handler (Menangkap semua error dari blok try-catch)
app.use((err, req, res, next) => {
  console.error("❌ Terjadi Kesalahan Internal:", err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "error",
    message:
      err.message || "Terjadi kesalahan pada server (Internal Server Error).",
  });
});

// ==========================================
// 4. JALANKAN SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`=========================================`);
});
