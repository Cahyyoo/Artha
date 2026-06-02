import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import {
  FiArrowRight,
  FiArrowLeft,
  FiCpu,
  FiStar,
  FiBriefcase,
  FiInfo,
  FiDownload,
  FiRefreshCcw,
  FiChevronDown,
  FiAlertTriangle,
  FiZap,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
} from "react-icons/fi";

const SEKTOR_OPTIONS = [
  { id: "Jasa & Layanan Umum", label: "Jasa & Layanan Umum" },
  { id: "Kuliner (F&B)", label: "Kuliner (F&B)" },
  { id: "Ritel & Perdagangan", label: "Ritel & Perdagangan" },
  { id: "Teknologi & Digital", label: "Teknologi & Digital" },
  { id: "Manufaktur & Produksi", label: "Manufaktur & Produksi" },
  { id: "Pertanian & Agribisnis", label: "Pertanian & Agribisnis" },
  { id: "Kesehatan & Kecantikan", label: "Kesehatan & Kecantikan" },
  { id: "Lainnya", label: "Lainnya" },
];

const LOKASI_OPTIONS = [
  { id: "Pinggir Jalan Raya Utama", label: "Pinggir Jalan Raya Utama" },
  { id: "Pusat Perbelanjaan / Mall", label: "Pusat Perbelanjaan / Mall" },
  { id: "Area Perkantoran", label: "Area Perkantoran" },
  {
    id: "Kawasan Pemukiman / Perumahan",
    label: "Kawasan Pemukiman / Perumahan",
  },
  { id: "Lingkungan Kampus / Sekolah", label: "Lingkungan Kampus / Sekolah" },
  { id: "Online / Dari Rumah", label: "Online / Dari Rumah" },
];

const TARGET_PASAR_OPTIONS = [
  { id: "Anak-anak", label: "Anak-anak" },
  { id: "Remaja", label: "Remaja" },
  { id: "Dewasa", label: "Dewasa" },
  { id: "Lansia", label: "Lansia" },
  { id: "Keluarga", label: "Keluarga" },
  { id: "Perusahaan (B2B)", label: "Perusahaan (B2B)" },
  { id: "Umum (Semua Usia)", label: "Umum (Semua Usia)" },
];

const PENDIDIKAN_OPTIONS = [
  { id: "SD", label: "SD" },
  { id: "SMP", label: "SMP" },
  { id: "SMA / Sederajat", label: "SMA / Sederajat" },
  { id: "Diploma (D1-D4)", label: "Diploma (D1-D4)" },
  { id: "Sarjana (S1+)", label: "Sarjana (S1+)" },
];

const KEAHLIAN_OPTIONS = [
  { id: "Pemrograman / IT", label: "Pemrograman / IT" },
  { id: "Desain / Kreatif", label: "Desain / Kreatif" },
  { id: "Memasak / Tata Boga", label: "Memasak / Tata Boga" },
  { id: "Penjualan / Marketing", label: "Penjualan / Marketing" },
  { id: "Manajemen / Administrasi", label: "Manajemen / Administrasi" },
  { id: "Teknik / Otomotif", label: "Teknik / Otomotif" },
  { id: "Kecantikan / Salon", label: "Kecantikan / Salon" },
  { id: "Pendidikan / Mengajar", label: "Pendidikan / Mengajar" },
  { id: "Tidak Ada Keahlian Khusus", label: "Tidak Ada Keahlian Khusus" },
];

const CurrencyInput = ({ label, value, onChange, description }) => {
  const formatNumber = (num) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, "");
    if (/^\d*$/.test(rawValue)) {
      onChange(rawValue);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col mb-4">
      <label className="block text-base font-medium text-slate-800 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      {description && (
        <p className="text-sm text-slate-500 mb-4">{description}</p>
      )}
      <div className="flex items-center gap-3 sm:w-1/2">
        <input
          type="text"
          value={formatNumber(value)}
          onChange={handleInputChange}
          className="w-full py-2 border-b border-slate-300 focus:border-indigo-600 outline-none text-slate-800 transition-colors bg-transparent"
          placeholder="Jawaban Anda"
        />
        <span className="text-slate-500 shrink-0">Rp</span>
      </div>
    </div>
  );
};

const NumberInput = ({
  label,
  value,
  onChange,
  min,
  max,
  unit,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col mb-4">
      <label className="block text-base font-medium text-slate-800 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      {description && (
        <p className="text-sm text-slate-500 mb-4">{description}</p>
      )}
      <div className="flex items-center gap-3 sm:w-1/2">
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full py-2 border-b border-slate-300 focus:border-indigo-600 outline-none text-slate-800 transition-colors bg-transparent"
          placeholder="Jawaban Anda"
        />
        {unit && <span className="text-slate-500 shrink-0">{unit}</span>}
      </div>
    </div>
  );
};

const TextAreaInput = ({
  label,
  value,
  onChange,
  placeholder,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col mb-4">
      <label className="block text-base font-medium text-slate-800 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      {description && (
        <p className="text-sm text-slate-500 mb-4">{description}</p>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 border border-slate-300 rounded-lg focus:border-indigo-600 outline-none text-slate-800 transition-colors bg-transparent resize-y min-h-[120px]"
        placeholder={placeholder}
      />
    </div>
  );
};

const ComboboxField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLabel = options.find((o) => o.id === value)?.label || value;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col mb-4 relative">
      <label className="block text-base font-medium text-slate-800 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      {description && (
        <p className="text-sm text-slate-500 mb-4">{description}</p>
      )}
      <div className="relative sm:w-1/2">
        <input
          type="text"
          value={currentLabel}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className="w-full py-2 pr-8 border-b border-slate-300 focus:border-indigo-600 outline-none text-slate-800 transition-colors bg-transparent cursor-pointer"
          readOnly
        />
        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-slate-400">
          <FiChevronDown size={20} />
        </div>
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-56 overflow-y-auto p-1">
            {options.map((opt) => (
              <div
                key={opt.id}
                className="px-4 py-2 rounded-md cursor-pointer hover:bg-slate-100 text-slate-700"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(opt.id);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const RadioGroup = ({ label, description, options, name, value, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col mb-4">
      <label className="block text-base font-medium text-slate-800 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      {description && (
        <p className="text-sm text-slate-500 mb-4">{description}</p>
      )}
      <div className="flex flex-col gap-4 mt-2">
        {options.map((opt) => (
          <label
            key={opt.v}
            className="flex items-center gap-3 cursor-pointer group w-fit"
          >
            <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
              <input
                type="radio"
                name={name}
                value={opt.v}
                checked={value === opt.v}
                onChange={() => onChange(opt.v)}
                className="appearance-none w-5 h-5 border-2 border-slate-400 rounded-full checked:border-indigo-600 transition-colors cursor-pointer group-hover:border-indigo-400"
              />
              {value === opt.v && (
                <div className="absolute w-2.5 h-2.5 bg-indigo-600 rounded-full pointer-events-none"></div>
              )}
            </div>
            <span className="text-slate-700 font-normal leading-none">
              {opt.l}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

const Recommendations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [perintisPhase, setPerintisPhase] = useState(2);

  const [wizardData, setWizardData] = useState({
    initial_capital: "",
    tools_materials_percentage: "",
    marketing_percentage: "",
    roi_target_months: "",
    business_sector: "",
    strategic_location: "",
    target_market: "",
    last_education: "",
    technical_expertise: "",
    has_business_experience: "",
    age: "",
    business_plan: "",
  });

  const [aiResults, setAiResults] = useState(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleWizardInput = (key, val) => {
    setWizardData((p) => ({ ...p, [key]: val }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      initial_capital,
      tools_materials_percentage,
      marketing_percentage,
      roi_target_months,
      business_sector,
      strategic_location,
      target_market,
      last_education,
      technical_expertise,
      has_business_experience,
      age,
      business_plan,
    } = wizardData;

    if (
      !initial_capital ||
      !tools_materials_percentage ||
      !marketing_percentage ||
      !roi_target_months ||
      !business_sector ||
      !strategic_location ||
      !target_market ||
      !last_education ||
      !technical_expertise ||
      !has_business_experience ||
      !age ||
      !business_plan
    ) {
      setErrorMsg(
        t("recommendations.fill_all_warning") || "Harap isi semua kolom wajib.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setPerintisPhase(3);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const payload = {
        age: Number(age),
        initial_capital: Number(initial_capital),
        tools_materials_percentage: Number(tools_materials_percentage),
        marketing_percentage: Number(marketing_percentage),
        roi_target_months: Number(roi_target_months),
        business_sector,
        strategic_location,
        target_market,
        last_education,
        technical_expertise,
        has_business_experience: has_business_experience === "true",
        business_plan,
      };

      const res = await api.post("/api/feasibility-tests", payload);
      const resultData = res.data?.data || res.data;
      setAiResults(resultData);
      setPerintisPhase(4);
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.message ||
          "Gagal menghubungi server AI. Silakan coba lagi nanti.",
      );
      setPerintisPhase(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ───── FASE 2: FORMULIR ───── */
  if (perintisPhase === 2) {
    return (
      <div className="max-w-3xl mx-auto pb-20 animate-fade-in mt-4 font-sans bg-slate-50/50 p-2 sm:p-0 min-h-screen">
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <FiArrowLeft /> {t("recommendations.back") || "Kembali"}
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
          <div className="h-3 bg-indigo-600 w-full"></div>
          <div className="p-8">
            <h1 className="text-3xl font-normal text-slate-800 mb-2">
              {t("recommendations.questionnaire_title") ||
                "Uji Kelayakan Bisnis"}
            </h1>
            <p className="text-slate-600">
              {t("recommendations.questionnaire_desc") ||
                "Jawab pertanyaan berikut agar AI Arta dapat memprediksi kelayakan bisnis Anda secara akurat."}
            </p>
            <hr className="my-6 border-slate-200" />
            <p className="text-sm text-red-500">
              * Menunjukkan pertanyaan yang wajib diisi
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 flex items-center gap-2 text-sm shadow-sm">
            <FiInfo className="shrink-0" /> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-indigo-600 text-white p-4 rounded-t-xl shadow-sm mt-8">
            <h2 className="text-lg font-medium">
              A. Rencana Modal & Finansial
            </h2>
          </div>
          <div className="bg-white p-1 rounded-b-xl border border-t-0 border-slate-200 shadow-sm mb-4"></div>

          <CurrencyInput
            label="Berapa total modal awal yang Anda persiapkan?"
            value={wizardData.initial_capital}
            onChange={(v) => handleWizardInput("initial_capital", v)}
            description="Masukkan perkiraan total dana awal untuk merintis bisnis."
          />
          <NumberInput
            label="Berapa persen alokasi modal untuk alat & bahan baku?"
            value={wizardData.tools_materials_percentage}
            onChange={(v) => handleWizardInput("tools_materials_percentage", v)}
            min={0}
            max={100}
            unit="%"
            description="Persentase dari modal awal (0-100)."
          />
          <NumberInput
            label="Berapa persen alokasi modal untuk promosi/marketing?"
            value={wizardData.marketing_percentage}
            onChange={(v) => handleWizardInput("marketing_percentage", v)}
            min={0}
            max={100}
            unit="%"
            description="Persentase dari modal awal (0-100)."
          />
          <NumberInput
            label="Dalam berapa bulan target balik modal (ROI) Anda?"
            value={wizardData.roi_target_months}
            onChange={(v) => handleWizardInput("roi_target_months", v)}
            min={1}
            max={120}
            unit="Bulan"
            description="Contoh: 12 untuk target satu tahun balik modal."
          />

          <div className="bg-emerald-600 text-white p-4 rounded-t-xl shadow-sm mt-8">
            <h2 className="text-lg font-medium">B. Detail & Konsep Bisnis</h2>
          </div>
          <div className="bg-white p-1 rounded-b-xl border border-t-0 border-slate-200 shadow-sm mb-4"></div>

          <ComboboxField
            label="Sektor / Jenis Bisnis"
            value={wizardData.business_sector}
            onChange={(v) => handleWizardInput("business_sector", v)}
            options={SEKTOR_OPTIONS}
            placeholder="Pilih sektor bisnis"
          />
          <ComboboxField
            label="Lokasi Strategis Bisnis Anda"
            value={wizardData.strategic_location}
            onChange={(v) => handleWizardInput("strategic_location", v)}
            options={LOKASI_OPTIONS}
            placeholder="Pilih lokasi target"
          />
          <ComboboxField
            label="Target Pasar / Konsumen Utama"
            value={wizardData.target_market}
            onChange={(v) => handleWizardInput("target_market", v)}
            options={TARGET_PASAR_OPTIONS}
            placeholder="Pilih target pasar"
          />

          <TextAreaInput
            label="Jelaskan secara singkat rencana bisnis Anda (Business Plan)"
            value={wizardData.business_plan}
            onChange={(v) => handleWizardInput("business_plan", v)}
            placeholder="Contoh: Saya ingin membuka kedai kopi berkonsep minimalis di area kampus dengan target mahasiswa..."
            description="Penjelasan ini akan membantu AI memahami konteks dan keunikan ide bisnis Anda."
          />

          <div className="bg-amber-500 text-white p-4 rounded-t-xl shadow-sm mt-8">
            <h2 className="text-lg font-medium">C. Latar Belakang Anda</h2>
          </div>
          <div className="bg-white p-1 rounded-b-xl border border-t-0 border-slate-200 shadow-sm mb-4"></div>

          <NumberInput
            label="Berapa usia Anda saat ini?"
            value={wizardData.age}
            onChange={(v) => handleWizardInput("age", v)}
            min={15}
            max={100}
            unit="Tahun"
            description="Usia digunakan AI untuk memetakan relevansi demografi pengusaha."
          />
          <ComboboxField
            label="Pendidikan Terakhir"
            value={wizardData.last_education}
            onChange={(v) => handleWizardInput("last_education", v)}
            options={PENDIDIKAN_OPTIONS}
            placeholder="Pilih pendidikan terakhir"
          />
          <ComboboxField
            label="Keahlian Khusus yang Dimiliki"
            value={wizardData.technical_expertise}
            onChange={(v) => handleWizardInput("technical_expertise", v)}
            options={KEAHLIAN_OPTIONS}
            placeholder="Pilih keahlian khusus utama"
          />
          <RadioGroup
            label="Apakah Anda pernah menjalankan bisnis sebelumnya?"
            name="has_business_experience"
            value={wizardData.has_business_experience}
            onChange={(v) => handleWizardInput("has_business_experience", v)}
            options={[
              { v: "true", l: "Ya, Pernah" },
              { v: "false", l: "Belum Pernah (Pertama Kali)" },
            ]}
          />

          <div className="flex justify-between items-center pt-6 pb-10">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-md transition-colors shadow-sm"
            >
              Analisis Kelayakan Bisnis
            </button>
            <button
              type="button"
              onClick={() => {
                setWizardData({
                  initial_capital: "",
                  tools_materials_percentage: "",
                  marketing_percentage: "",
                  roi_target_months: "",
                  business_sector: "",
                  strategic_location: "",
                  target_market: "",
                  last_education: "",
                  technical_expertise: "",
                  has_business_experience: "",
                  age: "",
                  business_plan: "",
                });
                setErrorMsg("");
              }}
              className="text-slate-500 text-sm hover:text-slate-800 font-medium px-4 py-2 rounded hover:bg-slate-100 transition-colors"
            >
              Kosongkan formulir
            </button>
          </div>
        </form>
      </div>
    );
  }

  /* ───── FASE 3: LOADING ───── */
  if (perintisPhase === 3) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center animate-fade-in px-4">
        <div className="relative flex items-center justify-center mb-8">
          {/* Professional Loading Ring */}
          <div className="w-20 h-20 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FiTrendingUp size={28} className="text-indigo-600 animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3 text-center tracking-tight">
          Menganalisis Kelayakan Bisnis...
        </h2>
        <p className="text-slate-500 text-center max-w-sm text-base leading-relaxed">
          Model analisis kami sedang mengolah data Anda untuk memberikan
          prediksi yang paling akurat.
        </p>
      </div>
    );
  }

  /* ───── FASE 4: HASIL (REFACTOR TOTAL) ───── */
  if (perintisPhase === 4 && aiResults) {
    const { ai_prediction = {}, saved_data = {} } = aiResults;

    // Fallback parser aman agar tidak menampilkan 0.0 jika AI offline
    const feasibility_score =
      ai_prediction.feasibility_score ?? ai_prediction.default_score ?? 50;
    const status =
      ai_prediction.status ??
      (feasibility_score >= 60 ? "Layak" : "Butuh Penyesuaian");
    const recommendation =
      ai_prediction.recommendation ??
      ai_prediction.message ??
      "Analisis selesai diproses.";

    // Pemetaan Faktor Positif & Negatif dari respons Model AI
    const positiveFactors = ai_prediction.positive_factors || [
      {
        feature: "Sektor Usaha",
        detail: saved_data.business_sector,
        impact: "Tinggi",
      },
      {
        feature: "Alokasi Modal",
        detail: `Bahan Baku ${saved_data.tools_materials_percentage}%`,
        impact: "Optimal",
      },
      {
        feature: "Target Pasar",
        detail: saved_data.target_market,
        impact: "Strategis",
      },
    ];

    const negativeFactors = ai_prediction.negative_factors || [
      {
        feature: "Pengalaman Bisnis",
        detail: saved_data.has_business_experience ? "Pernah" : "Pertama Kali",
        impact: "Risiko Sedang",
      },
      {
        feature: "Target Garis ROI",
        detail: `${saved_data.roi_target_months} Bulan`,
        impact: "Agresif",
      },
    ];

    const isLayak =
      typeof status === "string" && status.toLowerCase() === "layak";

    return (
      <div className="max-w-6xl mx-auto pb-20 animate-fade-in mt-4 font-sans px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100">
          <div>
            <p className="text-xs font-bold text-indigo-600 tracking-widest uppercase mb-1">
              Business Audit Results
            </p>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Laporan Analisis Kelayakan Bisnis
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Hasil evaluasi komprehensif berdasarkan parameter profil,
              finansial, dan potensi pasar rintisan Anda.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setPerintisPhase(2);
                setAiResults(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all bg-white shadow-sm"
            >
              <FiRefreshCcw size={16} /> Hitung Ulang
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-md"
            >
              <FiDownload size={16} /> Simpan Laporan
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* KOLOM KIRI: Ringkasan Skor, Strategist's Note & Action Path */}
          <div className="lg:col-span-3 space-y-8">
            {/* SCORE CARD */}
            <div
              className={`rounded-3xl border overflow-hidden p-8 shadow-sm transition-all flex flex-col sm:flex-row items-center justify-between gap-8 ${isLayak ? "bg-emerald-50/40 border-emerald-100" : "bg-amber-50/40 border-amber-100"}`}
            >
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isLayak ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
                  >
                    {isLayak ? <FiCheckCircle /> : <FiAlertTriangle />} Prediksi
                    Akhir: {status}
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-1">
                  {saved_data.business_sector || "Sektor Rintisan"}
                </h2>
                <p className="text-sm font-semibold text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>{" "}
                  {saved_data.strategic_location}
                </p>
              </div>

              <div
                className={`w-32 h-32 rounded-2xl flex flex-col items-center justify-center p-4 shrink-0 shadow-sm border ${isLayak ? "bg-white border-emerald-200 text-emerald-600" : "bg-white border-amber-200 text-amber-600"}`}
              >
                <div className="text-4xl font-extrabold leading-none">
                  {Number(feasibility_score).toFixed(0)}
                  <span className="text-lg font-bold">%</span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 text-center">
                  Skor Kelayakan
                </div>
              </div>
            </div>

            {/* STRATEGIST'S NOTE / EXPERT INSIGHT BOX */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FiZap className="text-indigo-500" /> Catatan Strategis AI
              </h3>
              <div className="bg-indigo-50/30 border border-indigo-100 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/20 rounded-full blur-2xl pointer-events-none"></div>
                <p className="text-slate-700 text-base leading-relaxed font-medium relative z-10">
                  {recommendation}
                </p>
              </div>
            </div>

            {/* ACTION FLOW: NEXT STEPS */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                  <FiInfo className="text-indigo-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Interpretasi Matriks Audit
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Evaluasi ini disusun menggunakan metodologi pemetaan
                    kontribusi fitur kuantitatif. Indikator kekuatan
                    meningkatkan keyakinan kelayakan bisnis, sementara faktor
                    risiko menunjukkan aspek operasional atau modal yang
                    memerlukan manajemen mitigasi tambahan.
                  </p>
                </div>
              </div>

              <div>
                {isUpgrading ? (
                  <form
                    className="flex flex-col gap-4 animate-fade-in"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const namaUsaha = e.target.nama_usaha.value;
                      if (!namaUsaha) return;

                      try {
                        const res = await api.post("/api/profile/upgrade", {
                          nama_usaha: namaUsaha,
                          tipe_usaha: saved_data.business_sector || "Umum",
                          lama_usaha: "< 1 Tahun",
                        });

                        if (res.data?.data?.profile) {
                          localStorage.setItem(
                            "profile",
                            JSON.stringify(res.data.data.profile),
                          );
                        }
                        window.location.href = "/dashboard";
                      } catch (err) {
                        console.error(err);
                        alert(
                          "Gagal membuat rencana bisnis. " +
                            (err.response?.data?.message || err.message),
                        );
                      }
                    }}
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Nama Usaha Baru Anda{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nama_usaha"
                        required
                        placeholder="Contoh: Toko Berkah, Jasa Fotografi..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm font-semibold"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setIsUpgrading(false)}
                        className="px-5 py-3 rounded-xl text-sm font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-5 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
                      >
                        Simpan & Buka Dashboard UMKM
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <p className="text-sm font-bold text-slate-800">
                        Lanjutkan ke Implementasi
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Konversi analisis kelayakan ini menjadi entitas bisnis
                        aktif di dashboard Anda.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsUpgrading(true)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-md shadow-indigo-600/10"
                    >
                      Lanjut Buat Rencana Bisnis <FiArrowRight />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Visualisasi Faktor Positif vs Negatif Terbesar (Audit Style) */}
          <div className="lg:col-span-2 space-y-8">
            {/* PANEL POSITIF */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500" /> Kekuatan Utama
                  Bisnis
                </h3>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Kontribusi Positif
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {positiveFactors.map((item, i) => (
                  <div
                    key={i}
                    className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="font-bold text-sm text-slate-800">
                        {item.feature}
                      </p>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        {item.detail}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 shrink-0">
                      {item.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PANEL NEGATIF */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FiXCircle className="text-amber-500" /> Faktor Risiko &
                  Tantangan
                </h3>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Butuh Perhatian
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {negativeFactors.map((item, i) => (
                  <div
                    key={i}
                    className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="font-bold text-sm text-slate-800">
                        {item.feature}
                      </p>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        {item.detail}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg border border-amber-100 shrink-0">
                      {item.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Recommendations;
