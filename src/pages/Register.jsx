import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    tipe_usaha: "Kuliner",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Terjadi kesalahan saat mendaftar",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Grow Your UMKM!" 
      subtitle="Start managing your business finances smartly and unlock new growth opportunities."
      showSocial={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col flex-grow">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center border border-red-100 font-medium">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-600 ml-1">
            Full Name
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-400 focus:bg-white outline-none transition-all text-sm placeholder:text-slate-400"
            placeholder="Input Full Name"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-600 ml-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-400 focus:bg-white outline-none transition-all text-sm placeholder:text-slate-400"
            placeholder="Input your email"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-600 ml-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-400 focus:bg-white outline-none transition-all text-sm placeholder:text-slate-400"
            placeholder="Input your password"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-600 ml-1">
            Business Type
          </label>
          <select
            name="tipe_usaha"
            value={formData.tipe_usaha}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-400 focus:bg-white outline-none transition-all text-sm text-slate-700 appearance-none"
          >
            <option value="Kuliner">F&B / Kuliner</option>
            <option value="Retail">Retail / Toko Kelontong</option>
            <option value="Jasa">Jasa / Layanan</option>
            <option value="Fashion">Fashion / Pakaian</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all active:scale-[0.98] flex justify-center items-center"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          By continuing with Google, Apple, or Email, you agree to 
          UMKM Finance <a href="#" className="font-semibold underline">Terms of Service</a> and <a href="#" className="font-semibold underline">Privacy Policy</a>.
        </p>

        <p className="mt-auto pt-6 text-center text-sm font-medium text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-slate-900 hover:text-orange-500 font-bold transition-colors"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
