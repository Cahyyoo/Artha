const supabase = require("../services/supabase");
const supabaseAdmin = supabase.supabaseAdmin;

// --- AMBIL PROFIL USER ---
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const email = req.user.email;
    const authSupabase = supabase.createAuthClient(req.token);

    const { data, error } = await authSupabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error;

    // Jika tidak ditemukan berdasarkan ID, coba cari user dengan email yang sama
    // via admin API. Ini menangani kasus Google OAuth yang punya user ID berbeda.
    if (!data && email && supabaseAdmin) {
      try {
        const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        if (!listError && users) {
          const match = users.find(u => u.email === email && u.id !== userId);
          if (match) {
            const { data: existingProfile } = await supabaseAdmin
              .from("profiles")
              .select("*")
              .eq("id", match.id)
              .maybeSingle();

            if (existingProfile) {
              return res.status(200).json({
                status: "success",
                message: "Profil ditemukan via email lookup.",
                data: { profile: existingProfile },
              });
            }
          }
        }
      } catch (_) {
        // supabaseAdmin mungkin tidak punya akses (service_role key diperlukan)
        // fallback: return null
      }
    }

    // Tidak ada profil ditemukan — return null, jangan auto-create
    if (!data) {
      return res.status(200).json({
        status: "success",
        data: { profile: null },
      });
    }

    res.status(200).json({
      status: "success",
      data: { profile: data },
    });
  } catch (error) {
    console.error("❌ Get Profile Error:", error.message);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// --- SIMPAN HASIL ONBOARDING ---
const updateOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;
    const { user_type, nama_usaha, tipe_usaha } = req.body;

    if (!user_type || !["calon_pengusaha", "umkm_aktif"].includes(user_type)) {
      return res.status(400).json({
        status: "error",
        message: "Tipe akun tidak valid. Pilih 'calon_pengusaha' atau 'umkm_aktif'.",
      });
    }

    const updateData = {
      user_type,
      onboarding_completed: true,
      email: req.user.email,
      updated_at: new Date().toISOString(),
    };

    // Jika umkm_aktif, simpan juga data bisnis
    if (user_type === "umkm_aktif") {
      if (nama_usaha) updateData.nama_usaha = nama_usaha;
      if (tipe_usaha) updateData.tipe_usaha = tipe_usaha;
    }

    const authSupabase = supabase.createAuthClient(req.token);

    const { data, error } = await authSupabase
      .from("profiles")
      .upsert({ id: userId, ...updateData })
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      status: "success",
      message: user_type === "umkm_aktif"
        ? "Profil bisnis berhasil disimpan! Selamat datang di Dashboard UMKM."
        : "Onboarding selesai! Selamat datang di Dashboard Calon Pengusaha.",
      data: { profile: data },
    });
  } catch (error) {
    console.error("❌ Update Onboarding Error:", error.message);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// --- UPGRADE TIPE AKUN ---
const upgradeToUmkm = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nama_usaha, tipe_usaha } = req.body;

    if (!nama_usaha || !tipe_usaha) {
      return res.status(400).json({
        status: "error",
        message: "Nama usaha dan tipe usaha wajib diisi.",
      });
    }

    const authSupabase = supabase.createAuthClient(req.token);

    const { data, error } = await authSupabase
      .from("profiles")
      .upsert({
        id: userId,
        user_type: "umkm_aktif",
        nama_usaha,
        tipe_usaha,
        email: req.user.email,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      status: "success",
      message: "Selamat! Akun Anda berhasil di-upgrade ke UMKM Aktif.",
      data: { profile: data },
    });
  } catch (error) {
    console.error("❌ Upgrade Error:", error.message);
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = {
  getProfile,
  updateOnboarding,
  upgradeToUmkm,
};
