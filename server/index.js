require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. MIDDLEWARE GLOBAL (Pengaturan Order yang Benar)
// ==========================================
// Pastikan CORS adalah middleware pertama agar 'pre-flight' request ditangani dengan benar
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://arta-frontend.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: '10mb' })); // Menambah limit payload jika ada kiriman gambar
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ==========================================
// 2. DAFTAR ROUTES
// ==========================================

// Auth routes (Publik)
app.use("/api/auth", authRoutes);

// Profile routes (Dilindungi)
app.use("/api/profile", authMiddleware, profileRoutes);

// User management routes (Dilindungi — hanya Owner/Admin)
app.use("/api/users", authMiddleware, userRoutes);

// Business route — proxy ke Vercel backend (atasi CORS) + fallback direct Supabase
app.put("/api/business", authMiddleware, async (req, res) => {
  const { supabaseAdmin } = require("./services/supabase");
  const userId = req.user.id;

  try {
    // --- MAPPING KATEGORI UNTUK AI VERCEL ---
    // AI Vercel HANYA menerima: 'kuliner', 'jasa', 'retail', 'otomotif'
    let aiSector = "retail"; // default fallback
    const rawType = (req.body.type || req.body.industry || "").toLowerCase();
    
    if (rawType.includes("makanan") || rawType.includes("minuman") || rawType.includes("f&b") || rawType.includes("kuliner")) {
      aiSector = "kuliner";
    } else if (rawType.includes("jasa") || rawType.includes("servis") || rawType.includes("pendidikan") || rawType.includes("hiburan") || rawType.includes("kesehatan")) {
      aiSector = "jasa";
    } else if (rawType.includes("otomotif")) {
      aiSector = "otomotif";
    } else {
      aiSector = "retail"; // sisanya (fashion, kelontong, elektronik, dll) masuk retail
    }

    // Timpa payload asli dengan sektor yang dimengerti AI
    const mappedBody = {
      ...req.body,
      type: aiSector,
      industry: aiSector
    };

    // 1. Coba kirim ke Vercel backend dulu
    let response = await fetch("https://arta-backend-nine.vercel.app/api/business", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": req.headers.authorization
      },
      body: JSON.stringify(mappedBody)
    });
    
    let data = await response.json();

    // 2. Jika Vercel gagal dengan "Cannot coerce", langsung INSERT ke Supabase
    const responseStr = JSON.stringify(data);
    if (!response.ok && responseStr.includes("Cannot coerce")) {
      console.log("⚡ Vercel gagal, fallback: direct INSERT ke tabel businesses via Supabase...");
      
      if (!supabaseAdmin) {
        return res.status(500).json({ status: "error", message: "Service role key tidak tersedia untuk fallback." });
      }

      // Cek apakah business sudah ada untuk user ini
      const { data: existingBiz } = await supabaseAdmin
        .from("businesses")
        .select("id")
        .eq("owner_id", userId)
        .maybeSingle();

      let bizResult;
      if (existingBiz) {
        // UPDATE existing business
        const { data: updated, error: updateErr } = await supabaseAdmin
          .from("businesses")
          .update({
            name: mappedBody.name || null,
            type: mappedBody.type || null,
            industry: mappedBody.industry || null,
            founded_year: req.body.founded_year || null,
            employee_count: req.body.employee_count || null,
            description: req.body.description || null,
            phone: req.body.phone || null,
            email: req.body.email || null,
            address: req.body.address || null,
            website: req.body.website || null,
            instagram: req.body.instagram || null,
            nib: req.body.nib || null,
            npwp: req.body.npwp || null,
            updated_at: new Date().toISOString()
          })
          .eq("id", existingBiz.id)
          .select()
          .single();
        if (updateErr) throw updateErr;
        bizResult = updated;
      } else {
        // INSERT new business
        const { data: inserted, error: insertErr } = await supabaseAdmin
          .from("businesses")
          .insert({
            name: mappedBody.name || "Usaha Saya",
            type: mappedBody.type || null,
            industry: mappedBody.industry || null,
            owner_id: userId,
            currency: "IDR",
            founded_year: req.body.founded_year || null,
            employee_count: req.body.employee_count || null,
            description: req.body.description || null,
            phone: req.body.phone || null,
            email: req.body.email || null,
            address: req.body.address || null,
            website: req.body.website || null,
            instagram: req.body.instagram || null,
            nib: req.body.nib || null,
            npwp: req.body.npwp || null
          })
          .select()
          .single();
        if (insertErr) throw insertErr;
        bizResult = inserted;
      }

      // Sinkronkan business_id ke tabel profiles
      if (bizResult?.id) {
        await supabaseAdmin
          .from("profiles")
          .update({ business_id: bizResult.id, updated_at: new Date().toISOString() })
          .eq("id", userId);
        console.log(`✅ Fallback berhasil! business_id=${bizResult.id} tersimpan ke profiles.`);
      }

      return res.status(200).json({
        status: "success",
        message: "Profil usaha berhasil disimpan (via fallback).",
        data: { business: bizResult },
        business_id: bizResult?.id
      });
    }

    // 3. Jika Vercel sukses, teruskan response-nya
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Proxy /api/business error:", err.message);
    res.status(502).json({ status: "error", message: "Gagal menyimpan profil usaha: " + err.message });
  }
});


app.get("/", (req, res) => {
  res.json({ status: "success", message: "Server Arta API aktif!" });
});

// Health Check
app.get("/api/health", async (req, res) => {
  res.json({ status: "success", message: "Koneksi stabil." });
});

// ==========================================
// 3. ERROR HANDLING (Robust)
// ==========================================

// Menangani 404
app.use((req, res, next) => {
  res.status(404).json({ status: "error", message: "Endpoint tidak ditemukan." });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Terjadi Kesalahan:", err.message);

  // Mengirim error yang lebih informatif
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});