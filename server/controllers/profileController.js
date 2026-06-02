const supabase = require("../services/supabase");
const supabaseAdmin = supabase.supabaseAdmin;

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const email = req.user.email;
    const authSupabase = supabase.createAuthClient(req.token);

    // 1. Coba cari profil berdasarkan ID saat ini
    let { data, error } = await authSupabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    // 2. JIKA TIDAK KETEMU, cari berdasarkan EMAIL (Jembatan Google vs Manual)
    // Ini penting untuk kasus: user sudah punya akun UMKM manual,
    // lalu login via Google OAuth dengan email yang sama.
    // Google OAuth membuat user baru dengan UUID berbeda, sehingga
    // lookup by ID gagal. Kita perlu cari by email dan update ID-nya.
    if (!data && email) {
      // Gunakan supabaseAdmin (bypass RLS) jika tersedia, 
      // karena RLS policy kemungkinan hanya mengizinkan auth.uid() = id
      // sehingga query by email dengan authSupabase akan gagal
      const lookupClient = supabaseAdmin || authSupabase;
      const clientType = supabaseAdmin ? "admin (bypass RLS)" : "auth (RLS aktif)";

      console.log(`[AUTH FIX] Profil tidak ditemukan by ID, mencari via email: ${email} menggunakan ${clientType}`);

      const { data: emailMatch, error: emailError } = await lookupClient
        .from("profiles")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (emailError) {
        console.error(`[AUTH FIX] Email lookup error (${clientType}):`, emailError.message);
      }

      if (emailMatch) {
        data = emailMatch;
        console.log(`[AUTH FIX] ✅ Profil ditemukan via email lookup untuk: ${email} (user_type: ${emailMatch.user_type})`);

        // Update ID profil agar cocok dengan userId yang sedang aktif (Google/Baru)
        // Ini memastikan login berikutnya langsung ketemu tanpa lookup lagi
        const updateClient = supabaseAdmin || authSupabase;
        const { error: updateError } = await updateClient
          .from("profiles")
          .update({ id: userId })
          .eq("email", email);

        if (updateError) {
          console.error(`[AUTH FIX] Gagal update ID profil:`, updateError.message);
        } else {
          console.log(`[AUTH FIX] ✅ ID profil berhasil di-update ke: ${userId}`);
        }
      } else {
        console.log(`[AUTH FIX] Profil tidak ditemukan via email lookup untuk: ${email}`);
      }
    }

    // 3. Kembalikan hasil
    res.status(200).json({ status: "success", data: { profile: data } });
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

    const authSupabase = supabase.createAuthClient(req.token);
    const dbClient = supabaseAdmin || authSupabase;

    const updateData = {
      id: userId,
      user_type,
      onboarding_completed: true,
      email: req.user.email,
      nama_usaha: nama_usaha || null,
      tipe_usaha: tipe_usaha || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await dbClient
      .from("profiles")
      .upsert(updateData)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      status: "success",
      message: "Profil berhasil diperbarui.",
      data: { profile: data },
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

// --- UPGRADE TIPE AKUN ---
const upgradeToUmkm = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nama_usaha, tipe_usaha } = req.body;

    const authSupabase = supabase.createAuthClient(req.token);
    const dbClient = supabaseAdmin || authSupabase;

    const { data, error } = await dbClient
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

    res.status(200).json({ status: "success", data: { profile: data } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

// --- UPDATE PROFILE (Update Data Diri) ---
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nama_lengkap, telepon, bio } = req.body;

    const authSupabase = supabase.createAuthClient(req.token);
    const dbClient = supabaseAdmin || authSupabase;

    const updateData = {
      updated_at: new Date().toISOString(),
    };
    
    if (nama_lengkap !== undefined) {
      updateData.nama_lengkap = nama_lengkap;
      updateData.name = nama_lengkap; // Update dua-duanya untuk kompatibilitas
    }
    if (telepon !== undefined) updateData.telepon = telepon;
    if (bio !== undefined) updateData.bio = bio;

    const { data, error } = await dbClient
      .from("profiles")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      status: "success",
      message: "Profil berhasil diperbarui.",
      data: { profile: data },
    });
  } catch (error) {
    console.error("❌ Update Profile Error:", error.message);
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { getProfile, updateOnboarding, upgradeToUmkm, updateProfile };