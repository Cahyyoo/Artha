import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import api from "../services/api";
import {
  FiArrowLeft,
  FiRefreshCcw,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
  FiTarget,
  FiTrendingUp,
  FiTrendingDown,
  FiBarChart2,
  FiZap,
  FiAlertTriangle,
} from "react-icons/fi";

const EDUCATION_OPTIONS = [
  { value: "SD", labelKey: "recommendations.edu_sd" },
  { value: "SMP", labelKey: "recommendations.edu_smp" },
  { value: "SMA/SMK", labelKey: "recommendations.edu_sma" },
  { value: "Diploma", labelKey: "recommendations.edu_diploma" },
  { value: "Sarjana", labelKey: "recommendations.edu_sarjana" },
];

const RADIO_YA_TIDAK = (t) => [
  { value: "Ya", label: t("recommendations.q11_yes") },
  { value: "Tidak", label: t("recommendations.q11_no") },
];

const RADIO_PERNAH = (t) => [
  { value: "Pernah", label: t("recommendations.q4_yes") },
  { value: "Tidak Pernah", label: t("recommendations.q4_no") },
];

const RADIO_MEMADAI = (t) => [
  { value: "Memadai", label: t("recommendations.q5_yes") },
  { value: "Tidak Memadai", label: t("recommendations.q5_no") },
];

const RADIO_BAIK = (t) => [
  { value: "Baik", label: t("recommendations.q6_yes") },
  { value: "Buruk", label: t("recommendations.q6_no") },
];

const RADIO_ADA = (t) => [
  { value: "Ada", label: t("recommendations.q7_yes") },
  { value: "Tidak Ada", label: t("recommendations.q7_no") },
];

const RADIO_GENDER = (t) => [
  { value: "Laki-laki", label: t("recommendations.q3_male") },
  { value: "Perempuan", label: t("recommendations.q3_female") },
];

/* ─── Sub Components ─── */

const NumberField = ({ label, desc, value, onChange, min, max, unit }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-4">
    <label className="block text-base font-medium text-slate-800 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    {desc && <p className="text-sm text-slate-500 mb-4">{desc}</p>}
    <div className="flex items-center gap-3 sm:w-1/2">
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 border-b border-slate-300 focus:border-indigo-600 outline-none text-slate-800 transition-colors bg-transparent"
        placeholder="0"
      />
      {unit && <span className="text-slate-500 shrink-0">{unit}</span>}
    </div>
  </div>
);

const SelectField = ({ label, desc, value, onChange, options, placeholder }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-4">
      <label className="block text-base font-medium text-slate-800 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      {desc && <p className="text-sm text-slate-500 mb-4">{desc}</p>}
      <div className="relative sm:w-1/2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full py-2.5 pr-8 border-b border-slate-300 focus:border-indigo-600 outline-none text-slate-800 transition-colors bg-transparent appearance-none cursor-pointer"
        >
          <option value="">{placeholder || "Pilih"}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.labelKey) || opt.value}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const RadioField = ({ label, desc, name, value, onChange, options }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-4">
    <label className="block text-base font-medium text-slate-800 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    {desc && <p className="text-sm text-slate-500 mb-4">{desc}</p>}
    <div className="flex flex-wrap gap-6 mt-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="appearance-none w-5 h-5 border-2 border-slate-400 rounded-full checked:border-indigo-600 transition-colors cursor-pointer group-hover:border-indigo-400"
            />
            {value === opt.value && (
              <div className="absolute w-2.5 h-2.5 bg-indigo-600 rounded-full pointer-events-none" />
            )}
          </div>
          <span className="text-slate-700 font-normal leading-none text-sm">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const SliderField = ({ label, desc, value, onChange, min, max, marks }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-4">
    <label className="block text-base font-medium text-slate-800 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    {desc && <p className="text-sm text-slate-500 mb-4">{desc}</p>}
    <div className="sm:w-2/3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400">{min}</span>
        <span className="text-lg font-bold text-indigo-600">{value}</span>
        <span className="text-xs text-slate-400">{max}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
      />
      {marks && (
        <div className="flex justify-between mt-1">
          {marks.map((m) => (
            <span key={m} className="text-[10px] text-slate-400">{m}</span>
          ))}
        </div>
      )}
    </div>
  </div>
);

/* ─── Main Component ─── */
const Recommendations = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language?.toLowerCase() || "id";

  const [phase, setPhase] = useState(2);
  const [formData, setFormData] = useState({
    usia: "",
    pendidikan: "",
    jenis_kelamin: "",
    pengalaman_orang_tua: "",
    modal_awal: "",
    pencatatan_keuangan: "",
    rencana_bisnis: "",
    kemitraan: "",
    pengalaman_industri: "",
    upaya_pemasaran: 5,
    penggunaan_internet: "",
    konsultasi_profesional: 4,
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const updateField = (key, val) => {
    setFormData((p) => ({ ...p, [key]: val }));
    if (error) setError("");
  };

  const isFormValid = () => {
    const { usia, pendidikan, jenis_kelamin, pengalaman_orang_tua, modal_awal,
      pencatatan_keuangan, rencana_bisnis, kemitraan, pengalaman_industri,
      upaya_pemasaran, penggunaan_internet, konsultasi_profesional } = formData;
    return (
      usia !== "" && Number(usia) > 0 &&
      pendidikan !== "" &&
      jenis_kelamin !== "" &&
      pengalaman_orang_tua !== "" &&
      modal_awal !== "" &&
      pencatatan_keuangan !== "" &&
      rencana_bisnis !== "" &&
      kemitraan !== "" &&
      pengalaman_industri !== "" &&
      upaya_pemasaran >= 1 &&
      penggunaan_internet !== "" &&
      konsultasi_profesional >= 1
    );
  };

  const encodePayload = () => {
    const educationMap = {
      "SD": 1, "SMP": 2, "SMA/SMK": 3, "Diploma": 4, "Sarjana": 5,
    };
    const b = (val) => (val === "Ya" || val === "Pernah" || val === "Memadai" || val === "Baik" || val === "Ada" ? 1 : 0);

    return {
      Age: Number(formData.usia),
      Education: educationMap[formData.pendidikan] || 3,
      Initial_Capital: b(formData.modal_awal),
      Financial_Record_Keeping: b(formData.pencatatan_keuangan),
      Internet_Usage: b(formData.penggunaan_internet),
      Business_Plan: b(formData.rencana_bisnis),
      Marketing_Effort: Number(formData.upaya_pemasaran),
      Partnership: b(formData.kemitraan),
      Parent_Business_Experience: b(formData.pengalaman_orang_tua),
      Industry_Experience: Number(formData.pengalaman_industri) || 0,
      Owner_Gender: formData.jenis_kelamin === "Laki-laki" ? 1 : 0,
      Professional_Advice: Number(formData.konsultasi_profesional) || 1,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError(t("recommendations.fill_all_warning"));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setPhase(3);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const payload = encodePayload();
      const res = await api.post("/api/feasibility-tests", payload);

      // Unwrap response at multiple possible nesting levels
      const raw = res.data;
      let data = raw?.data?.data || raw?.data || raw;
      // If still wrapped, try common container keys
      if (data && typeof data === "object" && !data.prediction) {
        for (const k of ["result", "response", "feasibility", "ai_prediction"]) {
          if (data[k] && typeof data[k] === "object") {
            data = data[k];
            break;
          }
        }
      }
      // If data has the expected fields inside a nested block, flatten it
      if (data && data.prediction !== undefined && data.probability_success !== undefined) {
        // Already correct shape
      } else if (data && data.prediction === undefined && data.data) {
        data = data.data;
      }

      setResult(data);
      console.log("[Feasibility] Raw response:", raw);
      console.log("[Feasibility] Saved data:", raw?.saved_data);
      console.log("[Feasibility] ML input used:", raw?.ai_input_used);
      console.log("[Feasibility] Data extracted:", data);
      setPhase(4);
    } catch (err) {
      console.error("[Feasibility Error]", err.response?.data || err.message);
      const serverMsg = err.response?.data?.message || err.response?.data?.error || "";
      setError(
        serverMsg ||
          (lang === "id"
            ? "Gagal menghubungi server AI. Silakan coba lagi nanti."
            : "Failed to reach AI server. Please try again later.")
      );
      setPhase(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetForm = () => {
    setFormData({
      usia: "", pendidikan: "", jenis_kelamin: "", pengalaman_orang_tua: "",
      modal_awal: "", pencatatan_keuangan: "", rencana_bisnis: "", kemitraan: "",
      pengalaman_industri: "", upaya_pemasaran: 5, penggunaan_internet: "",
      konsultasi_profesional: 4,
    });
    setResult(null);
    setError("");
    setPhase(2);
  };

  const sectionHeader = (title, color) => (
    <div className={`${color} text-white p-4 rounded-t-xl shadow-sm mt-8`}>
      <h2 className="text-lg font-medium">{title}</h2>
    </div>
  );

  /* ─── FORM ─── */
  if (phase === 2) {
    return (
      <div className="max-w-3xl mx-auto pb-20 animate-fade-in mt-4 font-sans bg-slate-50/50 p-2 sm:p-0 min-h-screen">
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <FiArrowLeft /> {t("recommendations.back")}
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
          <div className="h-3 bg-gradient-to-r from-indigo-600 to-purple-600 w-full" />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
              {t("recommendations.questionnaire_title")}
            </h1>
            <p className="text-slate-600">
              {t("recommendations.questionnaire_desc")}
            </p>
            <hr className="my-6 border-slate-200" />
            <p className="text-sm text-red-500">* {lang === "id" ? "Menunjukkan pertanyaan yang wajib diisi" : "Indicates required questions"}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 flex items-center gap-2 text-sm shadow-sm">
            <FiAlertTriangle className="shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Section A */}
          {sectionHeader(t("recommendations.section_a"), "bg-gradient-to-r from-indigo-600 to-indigo-500")}

          <NumberField
            label={t("recommendations.q1_label")}
            desc={t("recommendations.q1_desc")}
            value={formData.usia}
            onChange={(v) => updateField("usia", v)}
            min={15} max={100} unit={lang === "id" ? "Tahun" : "Years"}
          />
          <SelectField
            label={t("recommendations.q2_label")}
            desc={t("recommendations.q2_desc")}
            value={formData.pendidikan}
            onChange={(v) => updateField("pendidikan", v)}
            options={EDUCATION_OPTIONS}
            placeholder={t("recommendations.q2_placeholder")}
          />
          <RadioField
            label={t("recommendations.q3_label")}
            desc={t("recommendations.q3_desc")}
            name="gender"
            value={formData.jenis_kelamin}
            onChange={(v) => updateField("jenis_kelamin", v)}
            options={RADIO_GENDER(t)}
          />
          <RadioField
            label={t("recommendations.q4_label")}
            desc={t("recommendations.q4_desc")}
            name="parent_exp"
            value={formData.pengalaman_orang_tua}
            onChange={(v) => updateField("pengalaman_orang_tua", v)}
            options={RADIO_PERNAH(t)}
          />

          {/* Section B */}
          {sectionHeader(t("recommendations.section_b"), "bg-gradient-to-r from-emerald-600 to-emerald-500")}

          <RadioField
            label={t("recommendations.q5_label")}
            desc={t("recommendations.q5_desc")}
            name="modal"
            value={formData.modal_awal}
            onChange={(v) => updateField("modal_awal", v)}
            options={RADIO_MEMADAI(t)}
          />
          <RadioField
            label={t("recommendations.q6_label")}
            desc={t("recommendations.q6_desc")}
            name="catatan"
            value={formData.pencatatan_keuangan}
            onChange={(v) => updateField("pencatatan_keuangan", v)}
            options={RADIO_BAIK(t)}
          />
          <RadioField
            label={t("recommendations.q7_label")}
            desc={t("recommendations.q7_desc")}
            name="rencana"
            value={formData.rencana_bisnis}
            onChange={(v) => updateField("rencana_bisnis", v)}
            options={RADIO_ADA(t)}
          />
          <RadioField
            label={t("recommendations.q8_label")}
            desc={t("recommendations.q8_desc")}
            name="kemitraan"
            value={formData.kemitraan}
            onChange={(v) => updateField("kemitraan", v)}
            options={RADIO_YA_TIDAK(t)}
          />

          {/* Section C */}
          {sectionHeader(t("recommendations.section_c"), "bg-gradient-to-r from-amber-500 to-orange-500")}

          <NumberField
            label={t("recommendations.q9_label")}
            desc={t("recommendations.q9_desc")}
            value={formData.pengalaman_industri}
            onChange={(v) => updateField("pengalaman_industri", v)}
            min={0} max={50} unit={lang === "id" ? "Tahun" : "Years"}
          />
          <SliderField
            label={t("recommendations.q10_label")}
            desc={t("recommendations.q10_desc")}
            value={formData.upaya_pemasaran}
            onChange={(v) => updateField("upaya_pemasaran", v)}
            min={1} max={10}
            marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          />
          <RadioField
            label={t("recommendations.q11_label")}
            desc={t("recommendations.q11_desc")}
            name="internet"
            value={formData.penggunaan_internet}
            onChange={(v) => updateField("penggunaan_internet", v)}
            options={RADIO_YA_TIDAK(t)}
          />
          <SliderField
            label={t("recommendations.q12_label")}
            desc={t("recommendations.q12_desc")}
            value={formData.konsultasi_profesional}
            onChange={(v) => updateField("konsultasi_profesional", v)}
            min={1} max={7}
            marks={[1, 2, 3, 4, 5, 6, 7]}
          />

          {/* Submit */}
          <div className="flex items-center gap-4 pt-6 pb-10">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              {t("recommendations.predict_btn")}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="text-slate-500 text-sm hover:text-slate-800 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {lang === "id" ? "Kosongkan" : "Clear"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  /* ─── LOADING ─── */
  if (phase === 3) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center animate-fade-in px-4">
        <div className="relative flex items-center justify-center mb-8">
          <div className="w-20 h-20 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FiBarChart2 size={28} className="text-indigo-600 animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3 text-center tracking-tight">
          {t("recommendations.analyzing_title")}
        </h2>
        <p className="text-slate-500 text-center max-w-sm text-base leading-relaxed">
          {t("recommendations.analyzing_desc")}
        </p>
      </div>
    );
  }

  /* ─── RESULTS ─── */
  if (phase === 4 && result) {
    const {
      prediction,
      label,
      probability_success = 0,
      probability_fail = 0,
      confidence = "Rendah",
      shap,
      ai_analysis,
    } = result;

    const pct = probability_success * 100;
    const failPct = probability_fail * 100;
    const isHigh = pct >= 70;
    const isMedium = pct >= 40;
    const gaugeColor = isHigh ? "#10b981" : isMedium ? "#f59e0b" : "#ef4444";
    const gaugeBg = isHigh ? "bg-emerald-500" : isMedium ? "bg-amber-500" : "bg-red-500";
    const gaugeText = isHigh ? "text-emerald-600" : isMedium ? "text-amber-600" : "text-red-600";
    const gaugeRing = isHigh ? "ring-emerald-200" : isMedium ? "ring-amber-200" : "ring-red-200";
    const isConfHigh = confidence === "Tinggi" || confidence === "High";
    const confBadge = isConfHigh
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : "bg-amber-100 text-amber-700 border-amber-200";

    const topPositive = shap?.top_positive_factors || [];
    const topNegative = shap?.top_negative_factors || [];
    const allFactors = shap?.all_factors || [];
    const analysis = ai_analysis || {};
    const summary = analysis.summary || "";
    const strengths = analysis.strengths || [];
    const weaknesses = analysis.weaknesses || [];
    const recommendations = analysis.recommendations || [];
    const encouragement = analysis.encouragement || "";

    const statusLabel = label
      ? label
      : isHigh
        ? (lang === "id" ? "LAYAK" : "FEASIBLE")
        : (lang === "id" ? "BUTUH PENYESUAIAN" : "NEEDS ADJUSTMENT");

    return (
      <div className="max-w-6xl mx-auto pb-24 animate-fade-in mt-6 font-sans px-4">
        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
          <div>
            <p className="text-xs font-semibold text-indigo-600 tracking-[0.2em] uppercase mb-1.5">
              {t("recommendations.ai_analysis_result")}
            </p>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {t("recommendations.analysis_complete")}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {t("recommendations.recommendation_desc")}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all bg-white shadow-sm"
            >
              <FiRefreshCcw size={15} /> {t("recommendations.recalculate")}
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-sm"
            >
              <FiDownload size={15} /> {t("recommendations.save_pdf")}
            </button>
          </div>
        </div>

        {/* ── SCORE CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 shadow-xl mb-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Gauge */}
            <div className="relative shrink-0">
              <svg width="160" height="160" viewBox="0 0 160 160" className="drop-shadow-lg">
                <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                <circle
                  cx="80" cy="80" r="68"
                  fill="none"
                  stroke={gaugeColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 68}
                  strokeDashoffset={2 * Math.PI * 68 * (1 - pct / 100)}
                  className="transition-all duration-1000 ease-out"
                  transform="rotate(-90 80 80)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-extrabold tracking-tight`} style={{ color: gaugeColor }}>
                  {pct.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
                  {t("recommendations.eligibility")}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${confBadge}`}>
                  <FiZap size={13} />
                  {isConfHigh
                    ? (lang === "id" ? "Keyakinan Tinggi" : "High Confidence")
                    : (lang === "id" ? "Keyakinan Rendah" : "Low Confidence")}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${isHigh ? "bg-emerald-900/40 text-emerald-300 border-emerald-700" : "bg-amber-900/40 text-amber-300 border-amber-700"}`}>
                  {isHigh ? <FiCheckCircle size={13} /> : <FiAlertTriangle size={13} />}
                  {statusLabel}
                </span>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">
                  {lang === "id" ? "Probabilitas Keberhasilan" : "Success Probability"}
                </p>
                <div className="flex items-center gap-6 mt-3 justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-slate-300">
                      {lang === "id" ? "Berhasil" : "Success"} <span className="font-semibold text-white">{pct.toFixed(1)}%</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-sm text-slate-300">
                      {lang === "id" ? "Gagal" : "Fail"} <span className="font-semibold text-white">{failPct.toFixed(1)}%</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Mini bar */}
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mt-2 max-w-md mx-auto lg:mx-0">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${gaugeColor}, ${gaugeColor}dd)` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CONTENT GRID ── */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* LEFT: Main Analysis */}
          <div className="lg:col-span-3 space-y-8">

            {/* AI Summary */}
            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                    <FiZap size={17} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {lang === "id" ? "Ringkasan Analisis AI" : "AI Analysis Summary"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {lang === "id" ? "Berdasarkan model prediksi Artha" : "Based on Artha's prediction model"}
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/60 p-5 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100/20 rounded-full blur-3xl pointer-events-none" />
                  <p className="text-slate-700 text-sm leading-relaxed font-medium relative z-10">
                    {summary}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Strengths & Weaknesses Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {strengths.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <FiCheckCircle size={16} className="text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {lang === "id" ? "Kekuatan" : "Strengths"}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-emerald-700">{i + 1}</span>
                        </span>
                        <span className="text-sm text-slate-600 leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {weaknesses.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <FiAlertTriangle size={16} className="text-red-500" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {lang === "id" ? "Kelemahan" : "Weaknesses"}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-red-600">{i + 1}</span>
                        </span>
                        <span className="text-sm text-slate-600 leading-relaxed">{w}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <FiTarget size={17} className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {lang === "id" ? "Rekomendasi Tindakan" : "Action Recommendations"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {lang === "id" ? "Langkah prioritas untuk meningkatkan bisnis" : "Priority steps to improve your business"}
                    </p>
                  </div>
                </div>
                <div className="space-y-0">
                  {recommendations.map((r, i) => (
                    <div key={i} className={`flex items-start gap-4 py-4 ${i < recommendations.length - 1 ? "border-b border-slate-100" : ""}`}>
                      <div className="relative flex flex-col items-center">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-sm shrink-0">
                          {i + 1}
                        </span>
                        {i < recommendations.length - 1 && (
                          <div className="w-0.5 h-full bg-indigo-100 mt-1" />
                        )}
                      </div>
                      <span className="text-sm text-slate-700 leading-relaxed pt-1">{r}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Encouragement */}
            {encouragement && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl p-7 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">&ldquo;</span>
                  <p className="text-white/90 text-base font-medium leading-relaxed italic">
                    {encouragement}
                  </p>
                  <span className="text-2xl self-end">&rdquo;</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT: SHAP Factors */}
          <div className="lg:col-span-2 space-y-6">

            {/* Top Positive */}
            {topPositive.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <FiTrendingUp size={16} className="text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {lang === "id" ? "Faktor Positif" : "Positive Factors"}
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-100">
                    {lang === "id" ? "Pendorong" : "Drivers"}
                  </span>
                </div>
                <div className="space-y-5">
                  {topPositive.map((f, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold text-slate-800 truncate">
                          {f.display_name}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 shrink-0 ml-3">
                          +{f.impact_pct.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2 truncate">{f.decoded_value}</p>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-700"
                          style={{ width: `${Math.min(f.impact_pct, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Top Negative */}
            {topNegative.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <FiTrendingDown size={16} className="text-red-500" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {lang === "id" ? "Faktor Negatif" : "Negative Factors"}
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-red-100">
                    {lang === "id" ? "Penghambat" : "Barriers"}
                  </span>
                </div>
                <div className="space-y-5">
                  {topNegative.map((f, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold text-slate-800 truncate">
                          {f.display_name}
                        </span>
                        <span className="text-xs font-bold text-red-500 shrink-0 ml-3">
                          {f.impact_pct.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2 truncate">{f.decoded_value}</p>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-red-300 to-red-400 transition-all duration-700"
                          style={{ width: `${Math.min(f.impact_pct, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* All Factors */}
            {allFactors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <FiBarChart2 size={16} className="text-slate-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {lang === "id" ? "Semua Faktor" : "All Factors"}
                  </h3>
                </div>
                <div className="space-y-1">
                  {allFactors
                    .slice()
                    .sort((a, b) => Math.abs(b.shap_value) - Math.abs(a.shap_value))
                    .map((f, i) => {
                      const isPos = f.direction === "positive";
                      return (
                        <div key={i} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
                          <div className={`w-1 h-8 rounded-full shrink-0 ${isPos ? "bg-emerald-400" : "bg-red-400"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-700 truncate">
                                {f.display_name}
                              </span>
                              <span className={`text-xs font-bold shrink-0 ml-2 ${isPos ? "text-emerald-600" : "text-red-500"}`}>
                                {isPos ? "+" : ""}{f.impact_pct.toFixed(1)}%
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 truncate mt-0.5">{f.decoded_value}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Recommendations;