const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ewdrmcrhfwhjuzvpzvhn.supabase.co";
// Using the anon key from client env
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZHJtY3JoZndoanV6dnB6dmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MDE5MDAsImV4cCI6MjA5Mjk3NzkwMH0.kFB3dUWbF9kGohMzqC3sTcsf4b-r3APUosuKo7PT8fA";

const supabase = createClient(supabaseUrl, supabaseKey);
const backendUrl = "https://arta-backend-nine.vercel.app";

async function run() {
  try {
    const email = `test_user_${Math.floor(Math.random() * 100000)}@example.com`;
    const password = "Password123!";

    console.log(`1. Registering new user: ${email}...`);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nama_lengkap: "Test User",
        }
      }
    });

    if (signUpError) throw signUpError;
    const token = signUpData.session?.access_token;
    if (!token) {
      console.log("Sign up succeeded but no session returned. Auto-confirm might be off or verification needed.");
      return;
    }

    console.log("2. Simulating onboarding via Vercel backend...");
    const onboardingResponse = await fetch(`${backendUrl}/api/profile/onboarding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        user_type: "umkm_aktif",
        nama_usaha: "Test Business " + Math.floor(Math.random() * 1000),
        tipe_usaha: "Ritel & Kelontong",
        lama_usaha: "1 - 3 Tahun"
      })
    });
    const onboardingResData = await onboardingResponse.json();
    console.log("Onboarding Status:", onboardingResponse.status);
    console.log("Onboarding Response:", JSON.stringify(onboardingResData, null, 2));

    console.log("3. Fetching dashboard overview from Vercel backend...");
    const overviewResponse = await fetch(`${backendUrl}/api/dashboard/overview?range=bulan_ini`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const overviewResData = await overviewResponse.json();
    console.log("Overview Status:", overviewResponse.status);
    console.log("Overview Response:", JSON.stringify(overviewResData, null, 2));

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

run();
