import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import api from "./services/api";

// Import Halaman
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Onboarding from "./pages/Onboarding";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Recommendations from "./pages/Recommendations";
import Forecasting from "./pages/Forecasting";
import Settings from "./pages/Settings";

const ProtectedRoute = ({ children }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Tunggu AuthProvider selesai memuat sesi + profil
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Jika tidak login, ke halaman login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Cek profil dari context (AuthProvider sudah sync dari server)
  // Jika profil belum lengkap dan bukan di halaman onboarding, redirect
  if (location.pathname !== "/onboarding" && (!profile || profile.onboarding_completed !== true)) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* Rute Onboarding */}
          <Route path="/onboarding" element={
            <ProtectedRoute><Onboarding /></ProtectedRoute>
          } />

          {/* Rute Aplikasi Utama (Diproteksi) */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Layout /></ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="reports" element={<Reports />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="forecasting" element={<Forecasting />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;