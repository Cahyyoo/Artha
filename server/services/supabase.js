const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "❌ ERROR: SUPABASE_URL atau SUPABASE_KEY tidak ditemukan di file .env",
  );
}

// Inisialisasi client Supabase (anon key — RLS berlaku)
const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client dengan service_role key — bypass RLS, untuk operasi admin
let supabaseAdmin = null;
if (serviceRoleKey) {
  supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
} else {
  console.warn("⚠️  SUPABASE_SERVICE_ROLE_KEY tidak diset — email lookup di getProfile tidak akan berfungsi.");
}

const createAuthClient = (token) => {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });
};

module.exports = supabase;
module.exports.createAuthClient = createAuthClient;
module.exports.supabaseAdmin = supabaseAdmin;
