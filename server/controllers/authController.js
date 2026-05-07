const supabase = require("../services/supabase");

// --- REGISTRASI USER BARU ---
const register = async (req, res) => {
  try {
    const { email, password, nama, tipe_usaha } = req.body;

    // Validasi dasar
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "error", message: "Email dan password wajib diisi" });
    }

    // Mendaftarkan user ke Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nama_lengkap: nama,
          tipe_usaha: tipe_usaha || "Lainnya",
        },
      },
    });

    if (error) throw error;

    res.status(201).json({
      status: "success",
      message:
        "Registrasi berhasil. Silakan cek email untuk verifikasi (jika diaktifkan di Supabase).",
      data: { user: data.user },
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

// --- LOGIN USER ---
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "error", message: "Email dan password wajib diisi" });
    }

    // Proses Login menggunakan Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (!data.session) {
      return res.status(401).json({
        status: "error",
        message: "Login gagal: Sesi tidak ditemukan. Pastikan email sudah terverifikasi.",
      });
    }

    // Supabase secara otomatis mengembalikan JWT Token di data.session.access_token
    res.status(200).json({
      status: "success",
      message: "Login berhasil",
      data: {
        user: data.user,
        token: data.session.access_token, // Ini JWT Token-nya
        refreshToken: data.session.refresh_token,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message || error);
    
    let message = "Email atau password salah";
    if (error.message === "Email not confirmed") {
      message = "Email belum dikonfirmasi. Silakan cek kotak masuk email Anda atau matikan konfirmasi email di dashboard Supabase.";
    } else if (error.message === "Invalid login credentials") {
      message = "Email atau password salah";
    }

    res
      .status(error.status || 401)
      .json({ status: "error", message: message });
  }
};

module.exports = {
  register,
  login,
};
