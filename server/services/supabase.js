const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "❌ ERROR: SUPABASE_URL atau SUPABASE_KEY tidak ditemukan di file .env",
  );
}

// Inisialisasi client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
