import React from "react";
import { FiArrowLeft, FiArrowRight, FiCheck, FiChevronDown, FiTrendingUp, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

// Mini chart svg for mockups
const MiniAreaChart = ({ color = "#10b981", bgFrom = "rgba(16,185,129,0.2)" }) => (
  <svg viewBox="0 0 100 40" className="w-full h-12 overflow-visible mt-2">
    <defs>
      <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    <polygon points="0,40 0,30 20,25 40,35 60,15 80,20 100,5 100,40" fill={`url(#grad-${color})`} />
    <polyline points="0,30 20,25 40,35 60,15 80,20 100,5" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    <circle cx="100" cy="5" r="3" fill={color} />
  </svg>
);

const MiniLineChart = () => (
  <svg viewBox="0 0 100 40" className="w-full h-16 overflow-visible mt-2">
    <polyline points="0,35 25,25 50,30 75,10 100,15" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    <polyline points="50,30 75,20 100,5" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeDasharray="3,3" strokeLinejoin="round" strokeLinecap="round" />
    <circle cx="100" cy="15" r="3" fill="#6366f1" />
    <circle cx="100" cy="5" r="3" fill="#a5b4fc" />
  </svg>
);

export const PerintisMockup = ({ slide }) => {
  return (
    <div className="absolute inset-0 bg-[#0a0f1c] flex flex-col px-5 pt-10 pb-6 text-left overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center gap-1.5 text-slate-400 text-[9px] font-semibold tracking-wider hover:text-white transition-colors w-max">
          <FiArrowLeft size={10} /> KEMBALI
        </button>
        <div className="text-[9px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20">
          AI ASSISTANT
        </div>
      </div>

      {slide === 0 && (
        <div className="flex flex-col flex-1 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-[45%] h-full bg-indigo-500 rounded-full"></div>
            </div>
            <span className="text-indigo-400 text-[8px] font-bold tracking-widest uppercase">
              5/12
            </span>
          </div>
          
          <h2 className="text-white text-lg font-bold mb-1.5 leading-tight">Analisis Kelayakan Bisnis</h2>
          <p className="text-slate-400 text-[10px] leading-relaxed mb-6">
            Jawab pertanyaan berikut untuk mengetahui potensi bisnis Anda.
          </p>

          <div className="bg-[#121827] border border-slate-700/50 rounded-xl p-4 mb-4 flex-1">
            <label className="block text-[11px] font-bold text-slate-300 mb-3">
              Apakah Anda sudah memiliki modal awal?
            </label>
            <div className="space-y-2.5">
              <div className="bg-indigo-500/10 border border-indigo-500 text-indigo-300 rounded-lg py-2.5 px-3 flex items-center gap-3 text-[10px] font-medium">
                <div className="w-3.5 h-3.5 rounded-full border-[3px] border-indigo-500 bg-[#0a0f1c]"></div>
                Ya, sudah memadai
              </div>
              <div className="bg-[#1e2536] border border-transparent text-slate-400 rounded-lg py-2.5 px-3 flex items-center gap-3 text-[10px] font-medium">
                <div className="w-3.5 h-3.5 rounded-full border border-slate-500 bg-transparent"></div>
                Ada, tapi masih kurang
              </div>
              <div className="bg-[#1e2536] border border-transparent text-slate-400 rounded-lg py-2.5 px-3 flex items-center gap-3 text-[10px] font-medium">
                <div className="w-3.5 h-3.5 rounded-full border border-slate-500 bg-transparent"></div>
                Belum ada modal
              </div>
            </div>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 text-[10px] font-bold tracking-wider transition-colors flex items-center justify-center gap-2 mt-auto shadow-[0_0_15px_rgba(79,70,229,0.3)]">
            SELANJUTNYA <FiArrowRight size={10} />
          </button>
        </div>
      )}

      {slide === 1 && (
        <div className="flex flex-col flex-1 animate-fade-in text-center items-center pt-2">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 border border-emerald-500/30">
            <FiCheckCircle className="text-emerald-400" size={24} />
          </div>
          <h2 className="text-white text-lg font-bold mb-1">Status: LAYAK</h2>
          <p className="text-slate-400 text-[9px] px-4 mb-6">
            Berdasarkan analisis AI, ide bisnis Anda memiliki potensi keberhasilan yang tinggi.
          </p>

          <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
            {/* Fake radial progress */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e2536" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="283" strokeDashoffset="42" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">85%</span>
              <span className="text-[8px] text-slate-400 uppercase tracking-widest mt-1">Skor AI</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-3 mb-auto">
            <div className="bg-[#121827] border border-slate-700/50 rounded-lg p-3 text-left">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[8px] font-bold text-slate-400 uppercase">Kekuatan</span>
              </div>
              <p className="text-[9px] text-white font-medium leading-tight">Pengalaman industri & Tren pasar positif</p>
            </div>
            <div className="bg-[#121827] border border-slate-700/50 rounded-lg p-3 text-left">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <span className="text-[8px] font-bold text-slate-400 uppercase">Risiko</span>
              </div>
              <p className="text-[9px] text-white font-medium leading-tight">Modal awal terbatas & Persaingan ketat</p>
            </div>
          </div>
        </div>
      )}

      {slide === 2 && (
        <div className="flex flex-col flex-1 animate-fade-in pt-2">
          <h2 className="text-white text-lg font-bold mb-1.5">Rekomendasi AI</h2>
          <p className="text-slate-400 text-[10px] mb-5">Langkah konkrit untuk memulai bisnis Anda.</p>

          <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-4">
            {[
              { title: "Buat Rencana Anggaran", desc: "Alokasikan modal awal Anda dengan porsi 40% operasional, 30% marketing.", done: true },
              { title: "Analisis Kompetitor", desc: "Identifikasi 3 pesaing terdekat dan buat strategi diferensiasi produk.", done: false },
              { title: "Siapkan Pencatatan", desc: "Gunakan fitur Arta untuk melacak setiap sen pengeluaran sedini mungkin.", done: false },
            ].map((item, i) => (
              <div key={i} className="bg-[#121827] border border-slate-700/50 rounded-xl p-3 flex gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${item.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
                  <FiCheck size={10} />
                </div>
                <div>
                  <h4 className={`text-[11px] font-bold mb-1 ${item.done ? 'text-slate-300 line-through' : 'text-white'}`}>{item.title}</h4>
                  <p className="text-[9px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Footer Progress bar to mimic actual app feel */}
      <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between items-center px-1">
        <div className="flex gap-1.5">
          <div className="w-1 h-1 rounded-full bg-slate-600"></div>
          <div className="w-1 h-1 rounded-full bg-slate-600"></div>
          <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
        </div>
        <span className="text-[8px] text-slate-500">Powered by Arta AI</span>
      </div>
    </div>
  );
};

export const PengusahaMockup = ({ slide }) => {
  return (
    <div className="absolute inset-0 bg-[#0a0f1c] flex flex-col px-5 pt-10 pb-6 text-left overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        {slide === 0 ? (
          <button className="flex items-center gap-1.5 text-slate-400 text-[9px] font-semibold tracking-wider hover:text-white transition-colors w-max">
            <FiArrowLeft size={10} /> KEMBALI
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white border border-indigo-400">
              KA
            </div>
            <span className="text-white text-[11px] font-bold">Kedai Ardnt</span>
          </div>
        )}
      </div>

      {slide === 0 && (
        <div className="flex flex-col flex-1 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3.5 h-1 bg-indigo-500 rounded-full"></div>
            <span className="text-indigo-400 text-[8px] font-bold tracking-widest uppercase">
              Langkah 2 dari 2 - Profil Usaha
            </span>
          </div>

          <h2 className="text-white text-lg font-bold mb-1.5">Detail Usaha</h2>
          <p className="text-slate-400 text-[10px] leading-relaxed mb-5">
            Lengkapi profil agar kami bisa menyiapkan dashboard terbaik untuk Anda.
          </p>

          <div className="space-y-4 flex-1">
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[8px] font-bold tracking-wider uppercase">Nama Usaha / Toko</label>
              <div className="bg-[#121827] border border-slate-700/50 rounded-lg px-3 py-2.5">
                <span className="text-white text-[11px] font-medium">Kedai Ardnt</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 text-[8px] font-bold tracking-wider uppercase">Kategori Usaha</label>
              <div className="bg-[#121827] border border-slate-700/50 rounded-lg px-3 py-2.5 flex items-center justify-between">
                <span className="text-white text-[10px] font-medium">Pakaian & Fashion</span>
                <FiChevronDown className="text-slate-500" size={12} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 text-[8px] font-bold tracking-wider uppercase">Lama Usaha Berjalan</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-indigo-500/50 bg-indigo-500/10 text-indigo-400 rounded-lg py-2 text-center text-[9px] font-bold">
                  &lt; 1 Tahun
                </div>
                <div className="bg-[#121827] border border-transparent text-slate-400 rounded-lg py-2 text-center text-[9px] font-medium">
                  1 - 3 Tahun
                </div>
                <div className="bg-[#121827] border border-transparent text-slate-400 rounded-lg py-2 text-center text-[9px] font-medium col-span-1">
                  &gt; 3 Tahun
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 text-[10px] font-bold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
              SELESAI & MULAI <FiArrowRight size={10} />
            </button>
            <p className="text-center text-[7px] text-slate-500 mt-2.5 px-4 leading-relaxed">
              Informasi ini bisa diubah kapan saja di pengaturan
            </p>
          </div>
        </div>
      )}

      {slide === 1 && (
        <div className="flex flex-col flex-1 animate-fade-in pt-1">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-white text-lg font-bold">Dashboard</h2>
              <p className="text-slate-400 text-[9px]">Ringkasan bulan ini</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#121827] border border-slate-700/50 rounded-xl p-3 relative overflow-hidden">
              <p className="text-slate-400 text-[8px] font-bold uppercase tracking-wider mb-1">Pemasukan</p>
              <h3 className="text-white text-sm font-bold mb-1">Rp 12,4Jt</h3>
              <div className="flex items-center gap-1 text-[8px] text-emerald-400 font-medium">
                <FiTrendingUp /> +18.2%
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500/10 blur-xl rounded-full"></div>
            </div>
            <div className="bg-[#121827] border border-slate-700/50 rounded-xl p-3 relative overflow-hidden">
              <p className="text-slate-400 text-[8px] font-bold uppercase tracking-wider mb-1">Laba Bersih</p>
              <h3 className="text-white text-sm font-bold mb-1">Rp 4,1Jt</h3>
              <div className="flex items-center gap-1 text-[8px] text-emerald-400 font-medium">
                <FiTrendingUp /> +5.4%
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-indigo-500/10 blur-xl rounded-full"></div>
            </div>
          </div>

          <div className="bg-[#121827] border border-slate-700/50 rounded-xl p-4 flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white text-[11px] font-bold">Arus Kas Bulanan</h3>
              <span className="text-[8px] text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded">6 Bulan</span>
            </div>
            <MiniAreaChart />
            <div className="flex justify-between mt-3 px-1 text-[7px] text-slate-500">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>Mei</span>
              <span>Jun</span>
            </div>
          </div>
        </div>
      )}

      {slide === 2 && (
        <div className="flex flex-col flex-1 animate-fade-in pt-1">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-white text-lg font-bold">Prediksi AI</h2>
              <p className="text-slate-400 text-[9px]">Forecasting Arus Kas</p>
            </div>
          </div>

          <div className="bg-[#121827] border border-slate-700/50 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-white text-[11px] font-bold">Trend Pendapatan</h3>
              <div className="flex items-center gap-2 text-[8px]">
                <span className="flex items-center gap-1 text-slate-300"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> Aktual</span>
                <span className="flex items-center gap-1 text-slate-400"><div className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></div> Prediksi</span>
              </div>
            </div>
            <MiniLineChart />
          </div>

          <h3 className="text-white text-[11px] font-bold mb-2">Insight AI Bulan Ini</h3>
          <div className="space-y-2">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex gap-2">
              <FiTrendingUp className="text-emerald-400 shrink-0 mt-0.5" size={12} />
              <div>
                <h4 className="text-[10px] text-emerald-300 font-bold mb-0.5">Potensi Peningkatan Penjualan</h4>
                <p className="text-[8px] text-emerald-400/80 leading-relaxed">Pola transaksi menunjukkan potensi kenaikan 15% di akhir bulan.</p>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex gap-2">
              <FiAlertCircle className="text-amber-400 shrink-0 mt-0.5" size={12} />
              <div>
                <h4 className="text-[10px] text-amber-300 font-bold mb-0.5">Waspada Beban Operasional</h4>
                <p className="text-[8px] text-amber-400/80 leading-relaxed">Biaya listrik & utilitas lebih tinggi 8% dari rata-rata historis.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
