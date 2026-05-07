import { useState, useEffect } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [serverStatus, setServerStatus] = useState("Memeriksa koneksi...");
  const [loading, setLoading] = useState(true);

  // useEffect dijalankan saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        // Ini adalah IMPLEMENTASI KRITERIA 1: Networking Call ke API
        const response = await api.get("/api/health");

        // Mengambil pesan dari response JSON server
        setServerStatus(response.data.message);
      } catch (error) {
        setServerStatus("Gagal terhubung ke server Back-End ❌");
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServerStatus();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-4">
        Dashboard Utama
      </h1>

      {/* Card untuk menampilkan status koneksi */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 inline-block">
        <h2 className="text-sm font-semibold text-slate-500 mb-2">
          Status Sistem API
        </h2>
        {loading ? (
          <p className="text-blue-500 animate-pulse">Menghubungi server...</p>
        ) : (
          <p
            className={`font-medium ${serverStatus.includes("Gagal") ? "text-red-500" : "text-emerald-600"}`}
          >
            {serverStatus}
          </p>
        )}
      </div>

      <p className="text-slate-600 mt-6 mt-4">
        Ringkasan keuangan dan grafik Recharts akan muncul di bawah sini pada
        fase selanjutnya.
      </p>
    </div>
  );
};

export default Dashboard;
