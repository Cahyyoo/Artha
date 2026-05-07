import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import logoImg from "../assets/logo.png";
import logo2Img from "../assets/logo-2.png";

const Landing = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  const navItems = [
    { id: "beranda", name: "Beranda" },
    { id: "fitur", name: "Fitur" },
    { id: "layanan", name: "Layanan" },
    { id: "testimoni", name: "Testimoni" },
    { id: "kontak", name: "Kontak" },
  ];

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    ); // Adjust threshold as needed

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Maya Singh",
      role: "Product Manager",
      text: "Highly recommend to every dev. The consistency and quality are unmatched. Every project we launch with this kit gets instant praise for its UI.",
      avatar: "https://i.pravatar.cc/150?u=Maya",
    },
    {
      name: "Chris Anderson",
      role: "UX Designer",
      text: "A designer's dream toolkit. Beautiful defaults with enough flexibility to make them truly mine. It has saved me hundreds of hours.",
      avatar: "https://i.pravatar.cc/150?u=Chris",
    },
    {
      name: "Alex Turner",
      role: "Fullstack Dev",
      text: "The animations are buttery smooth. Worth every penny of the investment. My clients can't believe how professional the end product looks.",
      avatar: "https://i.pravatar.cc/150?u=Alex",
    },
    {
      name: "Olivia Martinez",
      role: "Startup Founder",
      text: "Best in class components. The quality and consistency are unmatched. We were able to ship our MVP in record time.",
      avatar: "https://i.pravatar.cc/150?u=Olivia",
    },
    {
      name: "Priya Patel",
      role: "Design Lead",
      text: "Saved us $50k in design costs. Achieved even better results faster. The modular approach is exactly what we needed for our scale.",
      avatar: "https://i.pravatar.cc/150?u=Priya",
    },
    {
      name: "David Park",
      role: "Frontend Lead",
      text: "The templates saved us months of development time. It's not just a UI kit, it's a productivity booster.",
      avatar: "https://i.pravatar.cc/150?u=David",
    },
    {
      name: "Lisa Thompson",
      role: "CEO",
      text: "Aceternity UI is the competitive edge we didn't know we needed. Our conversion rates have improved by 30% since the redesign.",
      avatar: "https://i.pravatar.cc/150?u=Lisa",
    },
    {
      name: "James Wilson",
      role: "Creative Director",
      text: "Incredible developer experience. Copy, paste, customize. It's that simple. The documentation is clear and the components just work.",
      avatar: "https://i.pravatar.cc/150?u=James",
    },
    {
      name: "Sarah Chen",
      role: "Web Developer",
      text: "Best investment for our startup. We shipped our landing page in two days instead of two weeks. The code quality is excellent.",
      avatar: "https://i.pravatar.cc/150?u=Sarah",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden relative z-0">
      {/* 1. Background Base Layers */}
      <div className="absolute inset-0 z-[-3] h-full w-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-20"></div>
      <div className="absolute inset-0 z-[-3] h-full w-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10"></div>

      {/* 2. Hero Spotlight Effect — Cinematic */}
      <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
        {/* Ambient Glow Layer */}
        <div className="absolute top-[-20%] left-[5%] w-[90%] h-[1000px] bg-indigo-600/[0.07] blur-[180px] rounded-full animate-shimmer"></div>
        <div className="absolute top-[0%] right-[-10%] w-[55%] h-[700px] bg-purple-500/[0.04] blur-[150px] rounded-full animate-float"></div>
        <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[550px] bg-teal-500/[0.03] blur-[130px] rounded-full animate-pulse-slow"></div>

        {/* Main Spotlight Beam — Diagonal from top-left */}
        <div className="animate-spotlight absolute top-[-50%] left-[-25%] w-[70%] h-[200%] opacity-0 origin-top-left">
          <div
            className="w-full h-full"
            style={{
              background: `conic-gradient(from 218deg at 20% 30%, rgba(99,102,241,0.12) 0deg, rgba(139,92,246,0.08) 25deg, transparent 50deg, transparent 310deg, rgba(99,102,241,0.05) 340deg, rgba(99,102,241,0.12) 360deg)`,
            }}
          ></div>
        </div>

        {/* Core Glow — Bright center of beam hitting hero */}
        <div className="animate-spotlight-core absolute top-[5%] left-[15%] w-[600px] h-[600px] opacity-0">
          <div className="w-full h-full bg-[radial-gradient(circle,rgba(129,140,248,0.15)_0%,rgba(99,102,241,0.06)_35%,transparent_70%)] blur-[40px]"></div>
        </div>

        {/* Secondary Glow — Purple accent top-right */}
        <div className="animate-spotlight-secondary absolute top-[-10%] right-[5%] w-[500px] h-[500px] opacity-0">
          <div className="w-full h-full bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,rgba(139,92,246,0.03)_40%,transparent_70%)]"></div>
        </div>

        {/* Light Streak Lines — Subtle diagonal accents */}
        <div className="animate-spotlight absolute top-0 left-[10%] w-[1px] h-[120%] opacity-0 rotate-[25deg] origin-top">
          <div className="w-full h-full bg-gradient-to-b from-indigo-400/20 via-indigo-400/5 to-transparent"></div>
        </div>
        <div
          className="animate-spotlight absolute top-0 left-[12%] w-[1px] h-[100%] opacity-0 rotate-[22deg] origin-top"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="w-full h-full bg-gradient-to-b from-purple-400/15 via-purple-400/3 to-transparent"></div>
        </div>
      </div>

      {/* 3. Floating Financial Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-2]">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[25%] left-[10%] text-2xl text-emerald-500/20 font-bold blur-[1px]"
        >
          $
        </motion.div>

        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, 10, 0],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] right-[15%] text-indigo-500/20"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-16 h-16 fill-current blur-[2px]"
          >
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
          </svg>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[15%] left-[20%] text-blue-500/10 font-black text-7xl blur-[3px]"
        >
          Rp
        </motion.div>

        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent animate-beam"></div>
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent animate-beam-slow"></div>
      </div>

      {/* Navbar Container */}
      <div className="fixed top-4 md:top-8 left-0 w-full flex justify-center z-50 px-4 md:px-6">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#111827]/60 backdrop-blur-2xl border border-white/[0.08] px-3 md:px-4 py-2 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between md:justify-start gap-4 md:gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/[0.05] w-full max-w-5xl"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-2.5 pl-2 md:pl-4 md:pr-6 md:border-r border-white/10 group cursor-pointer shrink-0">
            <img
              src={logo2Img}
              alt="Arta Logo"
              className="h-6 md:h-10 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setHoveredPath(item.id)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`relative px-5 py-2.5 text-[13px] font-bold transition-all duration-300 rounded-xl ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <AnimatePresence>
                    {(hoveredPath === item.id || isActive) && (
                      <motion.span
                        layoutId="nav-pill"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: isActive ? 1 : 0.5, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 bg-white/[0.08] rounded-xl -z-0 border border-white/[0.05] shadow-inner"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 35,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Auth Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 pl-4 border-l border-white/10 ml-auto">
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white px-5 lg:px-7 py-2.5 md:py-3 rounded-2xl text-xs font-black transition-all active:scale-95 shadow-xl shadow-indigo-500/25 border border-white/10"
              >
                Dashboard
              </button>
            ) : (
              <div className="flex items-center gap-4 lg:gap-6">
                <Link
                  to="/login"
                  className="text-xs font-black text-slate-400 hover:text-white transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white px-5 lg:px-7 py-2.5 md:py-3 rounded-2xl text-xs font-black transition-all active:scale-95 shadow-xl shadow-indigo-500/25 border border-white/10"
                >
                  Daftar Gratis
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        </motion.nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-4 right-4 bg-[#111827]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 md:hidden shadow-2xl z-40"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-lg font-bold text-left px-2 transition-colors ${
                        isActive
                          ? "text-indigo-400"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
              <div className="h-px bg-white/10 w-full my-2"></div>
              {isLoggedIn ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white py-4 rounded-2xl font-black text-center"
                >
                  Dashboard
                </button>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    to="/login"
                    className="text-center font-bold text-slate-300 py-2"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white py-4 rounded-2xl font-black text-center"
                  >
                    Daftar Gratis
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hero Section */}
      <main
        id="beranda"
        className="container mx-auto px-6 lg:px-12 pt-32 md:pt-48 xl:pt-56 pb-20 flex flex-col lg:flex-row items-center justify-between relative z-10 min-h-screen lg:min-h-[calc(100vh-104px)] gap-12 lg:gap-8 xl:gap-20"
      >


        {/* Left Content */}
        <div className="w-full lg:w-[50%] xl:w-[55%] space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-[10px] md:text-xs font-semibold text-slate-300 backdrop-blur-md mx-auto lg:mx-0 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Platform #1 Pengelolaan Keuangan UMKM Terintegrasi AI
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-black leading-[1.15] tracking-tight relative text-white">
            Kembangkan <br className="hidden sm:block" />
            Usaha dengan <br className="hidden sm:block" />
            {/* Elegant Text Glow Effect */}
            <span className="relative inline-block py-1 md:py-2">
              {/* Soft animated background glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-emerald-500/30 blur-2xl opacity-70 rounded-full animate-pulse-slow"></span>

              {/* Text with dynamic gradient */}
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
                Pengelolaan Keuangan
              </span>
            </span>
            <br className="hidden sm:block" />
            Cerdas & Efisien
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-lg lg:max-w-md xl:max-w-lg leading-relaxed font-medium mx-auto lg:mx-0">
            Jembatan digital untuk UMKM muda. Mulai dari pencatatan kas digital,
            prediksi masa depan keuangan, hingga rekomendasi bisnis berbasis AI
            dalam satu platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            {/* Magnetic Primary Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <button
                onClick={() => navigate("/register")}
                onMouseMove={(e) => {
                  const btn = e.currentTarget;
                  const rect = btn.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  btn.style.setProperty("--mouse-x", `${x}px`);
                  btn.style.setProperty("--mouse-y", `${y}px`);
                }}
                className="relative w-full sm:w-auto group overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl text-base font-bold transition-colors shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 border border-white/10"
              >
                {/* Cursor Glow Layer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 100px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent)`,
                  }}
                />

                <span className="relative z-10">Mulai Sekarang</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </button>
            </motion.div>

            {/* Magnetic Secondary Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <button
                onMouseMove={(e) => {
                  const btn = e.currentTarget;
                  const rect = btn.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  btn.style.setProperty("--mouse-x", `${x}px`);
                  btn.style.setProperty("--mouse-y", `${y}px`);
                }}
                className="relative w-full sm:w-auto group overflow-hidden bg-white/[0.03] hover:bg-white/[0.08] text-white px-10 py-4 rounded-2xl text-base font-bold transition-colors border border-white/10 backdrop-blur-md"
              >
                {/* Cursor Glow Layer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 80px at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.15), transparent)`,
                  }}
                />
                <span className="relative z-10">Pelajari Fitur</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right Content - Decorative Composition */}
        <div className="w-full lg:w-[45%] xl:w-[40%] relative mt-20 lg:mt-0 h-[400px] md:h-[500px] animate-in fade-in zoom-in-95 duration-1000 scale-[0.8] sm:scale-90 xl:scale-100 origin-center lg:origin-right">
          <div className="relative w-full h-full max-w-[500px] mx-auto lg:ml-auto">
            {/* 1. Main Chart Card (Pertumbuhan Omzet) */}
            <div className="absolute top-[5%] right-0 w-[300px] md:w-[360px] z-20 bg-[#161F33]/80 backdrop-blur-xl border border-white/10 p-5 md:p-7 rounded-[2.5rem] shadow-2xl animate-float">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-9 h-9 md:w-11 md:h-11 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 fill-none stroke-current stroke-2"
                  >
                    <path d="M23 6l-9.5 9.5-5-5L1 18"></path>
                    <path d="M17 6h6v6"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] md:text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">
                    Pertumbuhan Omzet
                  </p>
                  <p className="text-xl md:text-2xl font-black text-white leading-none">
                    +45%{" "}
                    <span className="text-[9px] md:text-[10px] text-emerald-400 font-medium normal-case tracking-normal">
                      rata-rata
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between h-24 md:h-32 gap-2 md:gap-2.5">
                {[40, 65, 45, 80, 55, 90, 70, 95, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    className="w-full bg-gradient-to-t from-emerald-600/40 to-emerald-400 rounded-t-lg hover:brightness-125 transition-all shadow-sm shadow-emerald-500/20"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* 2. Sesi Selesai Card */}
            <div className="absolute top-[40%] left-[-2%] md:left-[-5%] z-30 bg-[#1e2336]/90 backdrop-blur-xl border border-white/10 p-4 md:p-5 rounded-3xl shadow-2xl w-48 md:w-60 animate-bounce-slow">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#6366f1] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 md:w-6 md:h-6 text-white fill-none stroke-current stroke-2"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Sesi Selesai
                  </p>
                  <p className="text-base md:text-lg font-black text-white">
                    2,450 sesi
                  </p>
                </div>
              </div>
              <div className="w-full bg-slate-800 h-2 md:h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] h-full w-[75%] rounded-full shadow-inner"></div>
              </div>
            </div>

            {/* 3. UMKM Bergabung Card */}
            <div
              className="absolute bottom-[10%] right-[5%] z-40 bg-[#1a2035]/90 backdrop-blur-xl border border-white/10 py-4 md:py-5 px-5 md:px-6 rounded-3xl shadow-2xl animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="flex items-center gap-4 md:gap-5">
                <div className="flex -space-x-3 md:-space-x-3.5">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#1a2035] bg-blue-500 flex items-center justify-center text-xs md:text-sm font-black shadow-lg">
                    S
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#1a2035] bg-emerald-500 flex items-center justify-center text-xs md:text-sm font-black shadow-lg">
                    B
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#1a2035] bg-orange-500 flex items-center justify-center text-xs md:text-sm font-black shadow-lg">
                    R
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#1a2035] bg-slate-800 flex items-center justify-center text-[9px] md:text-[10px] font-extrabold shadow-lg">
                    +497
                  </div>
                </div>
                <div>
                  <p className="text-[10px] md:text-[11px] text-slate-300 font-bold leading-tight uppercase tracking-widest">
                    497+ UMKM
                  </p>
                  <p className="text-[8px] md:text-[9px] text-slate-500 font-medium uppercase tracking-tighter">
                    Bergabung
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Powered by Arta Badge */}
            <div
              className="absolute top-[-5%] left-[10%] md:left-[15%] z-50 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-2 md:p-3 rounded-2xl md:rounded-[1.5rem] shadow-2xl animate-float cursor-pointer group"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-[1.5rem]"></div>
              <div className="flex items-center gap-2 md:gap-3 relative z-10">
                <div className="bg-[#111827]/80 backdrop-blur-md p-1.5 md:p-2 rounded-xl shadow-inner border border-white/5">
                  <img src={logoImg} alt="Arta AI" className="h-5 md:h-6 w-auto object-contain drop-shadow-[0_0_10px_rgba(99,102,241,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.8)] transition-all" />
                </div>
                <div className="pr-2 md:pr-3">
                  <p className="text-[8px] md:text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-0.5">Powered by</p>
                  <p className="text-xs md:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Arta AI Engine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Showcase Section */}
      <section
        id="fitur"
        className="relative py-24 lg:py-32 xl:py-48 px-6 overflow-hidden"
      >
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 mb-6"
            >
              Dashboard & Mobile App
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black mb-6 tracking-tight"
            >
              Solusi Terpadu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
                Keuangan Bisnis Anda
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-slate-400 font-medium max-w-2xl mx-auto"
            >
              Kelola transaksi, pantau pertumbuhan omzet, dan dapatkan insight
              profesional langsung dari genggaman Anda.
            </motion.p>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 xl:gap-24">
            {/* Left Side: Animated Features */}
            <div className="w-full lg:w-[45%] xl:w-[40%] space-y-4 md:space-y-6 relative z-20">
              {[
                {
                  id: "feat-1",
                  title: "Real-time Tracking",
                  desc: "Pantau setiap rupiah yang masuk dan keluar secara instan.",
                  icon: "📊",
                  color: "from-blue-500 to-indigo-500",
                },
                {
                  id: "feat-2",
                  title: "Laporan Otomatis",
                  desc: "Laporan keuangan standar profesional siap diunduh kapan saja.",
                  icon: "📄",
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  id: "feat-3",
                  title: "AI Financial Insights",
                  desc: "Dapatkan rekomendasi cerdas untuk efisiensi pengeluaran.",
                  icon: "🧠",
                  color: "from-purple-500 to-pink-500",
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-3xl p-5 md:p-6 transition-all backdrop-blur-md"
                >
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${feature.color} rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}

              {/* Animated Connectors (Decorative) */}
              <svg className="absolute -right-20 top-0 w-20 h-full hidden xl:block pointer-events-none overflow-visible">
                <motion.path
                  d="M 0 100 Q 50 100 100 150"
                  fill="none"
                  stroke="url(#grad-line)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <defs>
                  <linearGradient
                    id="grad-line"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="rgba(99,102,241,0)" />
                    <stop offset="100%" stopColor="rgba(99,102,241,0.5)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Right Side: 3D Tilt Mockup Illustration */}
            <motion.div
              className="w-full lg:w-[50%] xl:w-[55%] relative group perspective-1000"
              style={{
                perspective: "1200px",
              }}
            >
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-indigo-500/30 transition-colors duration-700"></div>

              <motion.div
                style={{
                  rotateX: useTransform(
                    useScroll().scrollYProgress,
                    [0.3, 0.6],
                    [10, 0],
                  ),
                  rotateY: useTransform(
                    useScroll().scrollYProgress,
                    [0.3, 0.6],
                    [5, 0],
                  ),
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 preserve-3d"
              >
                <motion.img
                  src="/app_mockup_mobile_desktop.png"
                  alt="App Mockup"
                  className="w-full h-auto drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)] rounded-[2rem] md:rounded-[3rem] border border-white/5"
                  whileHover={{ rotateY: -5, rotateX: 5 }}
                  transition={{ type: "spring", stiffness: 100 }}
                />

                {/* Floating Elements with Parallax */}
                <motion.div
                  style={{
                    y: useTransform(
                      useScroll().scrollYProgress,
                      [0.3, 0.7],
                      [-20, 40],
                    ),
                  }}
                  className="absolute -top-6 lg:-top-10 -right-4 lg:-right-10 hidden sm:block bg-[#1E293B]/90 border border-white/10 p-3 lg:p-4 rounded-xl lg:rounded-2xl backdrop-blur-xl shadow-2xl z-20"
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-emerald-500 rounded-full flex items-center justify-center text-xs">
                      ✓
                    </div>
                    <p className="text-[10px] lg:text-xs font-bold text-white">
                      Target Tercapai!
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  style={{
                    y: useTransform(
                      useScroll().scrollYProgress,
                      [0.3, 0.7],
                      [40, -40],
                    ),
                  }}
                  className="absolute -bottom-6 lg:-bottom-10 -left-4 lg:-left-10 hidden sm:block bg-indigo-600 p-4 lg:p-5 rounded-xl lg:rounded-2xl shadow-2xl border border-white/20 z-20"
                >
                  <p className="text-[8px] lg:text-[10px] uppercase font-black tracking-widest text-indigo-200 mb-1">
                    Total Saldo
                  </p>
                  <p className="text-lg lg:text-xl font-black text-white leading-none">
                    Rp 128.450.000
                  </p>
                </motion.div>

                {/* Additional Decorative Floating Orb */}
                <motion.div
                  style={{
                    x: useTransform(
                      useScroll().scrollYProgress,
                      [0.3, 0.7],
                      [-100, 100],
                    ),
                    opacity: useTransform(
                      useScroll().scrollYProgress,
                      [0.4, 0.6],
                      [0, 0.5],
                    ),
                  }}
                  className="absolute top-1/4 -left-20 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        @keyframes shimmer {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.5; }
          50% { transform: scale(1.05) translate(-10px, 10px); opacity: 0.8; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-shimmer { animation: shimmer 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        @keyframes spotlight {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-spotlight { animation: spotlight 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s 1 forwards; }
        @keyframes spotlight-core {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-spotlight-core { animation: spotlight-core 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s 1 forwards; }
        @keyframes spotlight-secondary {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-spotlight-secondary { animation: spotlight-secondary 3s ease 1s 1 forwards; }
        @keyframes beam {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-beam { animation: beam 8s linear infinite; }
        .animate-beam-slow { animation: beam 12s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
      `}</style>
      {/* Brands with a Spotlight Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Seamless Transition Gradient Top */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#020617] to-transparent pointer-events-none z-0"></div>

        {/* Background Spotlight - Increased Blur for Seamless Blending */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-indigo-500/10 blur-[160px] rounded-full pointer-events-none z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter"
            >
              Brands with a spotlight
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-medium max-w-2xl mx-auto text-lg"
            >
              Brands who funded us deserve more than a spotlight.{" "}
              <br className="hidden md:block" />
              Check out what they are saying.
            </motion.p>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Row 1 */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { name: "Aceternity UI", icon: "💎" },
                { name: "Gamity", icon: "🎮" },
                { name: "Host IT", icon: "🌐" },
                { name: "Asteroid Kit", icon: "☄️" },
              ].map((logo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, color: "#fff" }}
                  className="flex items-center gap-3 px-4 py-2 cursor-pointer transition-all group"
                >
                  <span className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                    {logo.icon}
                  </span>
                  <span className="text-xl font-bold text-slate-500 group-hover:text-white transition-colors">
                    {logo.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { name: "Asteroid Kit", icon: "☄️" },
                { name: "Host IT", icon: "🌐" },
                { name: "Aceternity UI", icon: "💎" },
                { name: "Gamity", icon: "🎮" },
              ].map((logo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: (i + 4) * 0.1 }}
                  whileHover={{ scale: 1.1, color: "#fff" }}
                  className="flex items-center gap-3 px-4 py-2 cursor-pointer transition-all group"
                >
                  <span className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                    {logo.icon}
                  </span>
                  <span className="text-xl font-bold text-slate-500 group-hover:text-white transition-colors">
                    {logo.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution (Pain Points) Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter"
            >
              Solusi Tepat untuk <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Masalah Keuangan Anda
              </span>
            </motion.h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
              Kami memahami kesulitan Anda dalam mengelola UMKM. Biarkan Arta
              menyelesaikan kerumitan tersebut dengan pendekatan cerdas berbasis
              AI.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                problem: "Masih bergantung pada pencatatan manual di buku kas?",
                solution:
                  "Digital Cashbook Arta memungkinkan pencatatan transaksi digital yang rapi dan terstruktur, cocok untuk usaha pemula maupun aktif.",
              },
              {
                problem: "Bingung mengalokasikan anggaran untuk usaha baru?",
                solution:
                  "Dapatkan analisis kelayakan usaha dan saran alokasi anggaran awal melalui sistem kecerdasan buatan (AI Rekomendasi) kami.",
              },
              {
                problem: "Sulit menyusun laporan neraca & laba rugi?",
                solution:
                  "Fitur Generated Report kami menyusun laporan keuangan formal secara otomatis hanya berdasarkan input arus kas harian Anda.",
              },
              {
                problem: "Khawatir arus kas berantakan di bulan depan?",
                solution:
                  "Model AI Time-Series Forecasting kami memprediksi tren arus kas di masa depan untuk mendukung pengambilan keputusan finansial Anda.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <details className="bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-all">
                  <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                    <span className="text-lg md:text-xl font-bold text-white/90 group-hover:text-white transition-colors pr-8">
                      {item.problem}
                    </span>
                    <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 transition-transform group-open:rotate-180">
                      ↓
                    </span>
                  </summary>
                  <div className="px-8 pb-8 text-slate-400 font-medium leading-relaxed border-t border-white/5 pt-6 bg-gradient-to-b from-white/[0.01] to-transparent">
                    {item.solution}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section - Refined Tech Grid */}
      <section
        id="layanan"
        className="relative py-32 overflow-hidden bg-[#020617]"
      >
        {/* Section Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-6"
            >
              Powerful Capabilities
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter"
            >
              Fitur Utama Artha
            </motion.h2>
            <p className="text-slate-500 font-medium max-w-xl text-lg border-l-2 border-indigo-500/30 pl-6">
              Solusi komprehensif yang dirancang khusus untuk membantu UMKM muda
              mengelola keuangan dengan sehat dan berkelanjutan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/5 rounded-[3rem] overflow-hidden bg-white/[0.01] backdrop-blur-3xl shadow-2xl shadow-indigo-500/5">
            {[
              {
                title: "Digital Cashbook",
                desc: "Pencatatan kas masuk dan keluar secara digital dengan antarmuka yang sangat intuitif dan responsif.",
                icon: "📒",
              },
              {
                title: "AI Rekomendasi",
                desc: "Sistem cerdas untuk klasifikasi dan evaluasi kelayakan bisnis bagi calon pengusaha baru.",
                icon: "🧠",
              },
              {
                title: "Generated Report",
                desc: "Laporan neraca dan laba rugi instan yang dihasilkan otomatis tanpa perlu keahlian akuntansi khusus.",
                icon: "📄",
              },
              {
                title: "AI Forecasting",
                desc: "Prediksi tren finansial (Time-Series) untuk mengantisipasi kondisi arus kas usaha Anda di masa depan.",
                icon: "📈",
              },
              {
                title: "Visualisasi Data",
                desc: "Analisis performa keuangan melalui grafik interaktif yang mudah dipahami dalam satu dashboard.",
                icon: "📊",
              },
              {
                title: "Onboarding Adaptif",
                desc: "Alur registrasi yang menyesuaikan kebutuhan Anda, baik yang baru merintis maupun yang sudah memiliki usaha.",
                icon: "🎯",
              },
              {
                title: "Keamanan Terjamin",
                desc: "Data finansial Anda dilindungi dengan enkripsi tingkat tinggi untuk memastikan privasi.",
                icon: "🔒",
              },
              {
                title: "Cloud Based",
                desc: "Akses data UMKM Anda kapan saja dan di mana saja tanpa khawatir kehilangan riwayat transaksi.",
                icon: "☁️",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="relative p-10 border-r border-b border-white/5 group cursor-default hover:bg-white/[0.03] transition-all duration-500"
              >
                {/* Dynamic Beam Indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-indigo-500 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(99,102,241,1)] transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl mb-8 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium group-hover:text-slate-400 transition-colors">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - World Class Refinement */}
      <section
        id="cara-kerja"
        className="relative py-32 overflow-hidden bg-[#030617]"
      >
        {/* Premium Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        {/* Animated Connecting Flow Path - More subtle & cinematic */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent z-0 hidden lg:block">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-1/3 h-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent blur-[2px]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-28">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-8"
            >
              The Seamless Journey
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none"
            >
              Mulai dalam <br className="md:hidden" />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-[size:200%] animate-gradient-x">
                  3 Langkah
                </span>
                <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent blur-sm"></div>
              </span>{" "}
              Mudah
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Step 1: Daftar Akun (The Glass Master) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 p-12 rounded-[4rem] bg-white/[0.02] border border-white/[0.05] relative overflow-hidden group min-h-[500px] backdrop-blur-3xl"
            >
              {/* Atmospheric Background Orb */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-colors duration-700"></div>

              <div className="relative z-10">
                {/* Integrated Step Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                  <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse"></div>
                  <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                    Langkah 01
                  </span>
                </div>

                <h3 className="text-4xl font-black text-white mb-6 tracking-tight">
                  Daftar Akun
                </h3>
                <p className="text-slate-400 text-xl max-w-xs font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  Buat akun dalam 60 detik. <br /> Tanpa kartu kredit, <br />{" "}
                  Tanpa ribet.
                </p>
              </div>

              {/* Ultra-High-End Mockup Form */}
              <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[85%] bg-gradient-to-b from-[#111827] to-[#0B1120] border border-white/10 rounded-[2.5rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] group-hover:bottom-[-2%] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="space-y-6 relative z-10">
                  <div className="h-14 w-full bg-white/[0.03] rounded-2xl border border-white/[0.05] flex items-center px-6 text-sm text-slate-500 shadow-inner">
                    Email Bisnis
                  </div>
                  <div className="h-14 w-full bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl flex items-center justify-center text-sm font-black text-white shadow-xl shadow-indigo-600/30 active:scale-95 transition-transform">
                    Mulai Gratis Sekarang
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Middle Column */}
            <div className="lg:col-span-1 grid grid-rows-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-10 rounded-[3.5rem] bg-emerald-500/[0.02] border border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-700"
              >
                <div className="relative z-10">
                  {/* Integrated Step Badge */}
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                    <span className="text-[8px] font-black text-emerald-400 uppercase tracking-[0.2em]">
                      Langkah 02
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-3">
                    Input Data
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Catat pemasukan & pengeluaran UMKM dengan satu sentuhan.
                  </p>
                </div>
                <div className="absolute -bottom-2 -right-2 p-6 bg-emerald-500/20 border border-emerald-500/20 rounded-[2rem] backdrop-blur-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 shadow-2xl shadow-emerald-500/20">
                  <span className="text-emerald-400 text-sm font-black tabular-nums tracking-tighter">
                    + Rp 1.250.000
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="p-10 rounded-[3.5rem] bg-white/[0.02] border border-white/[0.05] relative overflow-hidden group flex flex-col justify-center items-center text-center hover:bg-white/[0.04] transition-all duration-500"
              >
                {/* High-End Laser Scanning Beam */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.5)] opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-[2000ms] ease-linear"></div>

                {/* Ambient Protection Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="w-20 h-20 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-4xl mb-6 relative z-10 group-hover:scale-110 transition-transform duration-700">
                  <div className="absolute inset-0 rounded-[2rem] bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  🛡️
                </div>
                <h3 className="text-xs font-black text-white uppercase tracking-[0.5em] opacity-80 relative z-10">
                  Security First
                </h3>
                <p className="text-[9px] text-slate-500 mt-3 font-bold opacity-40 uppercase tracking-tighter relative z-10">
                  End-to-End Encryption
                </p>
              </motion.div>
            </div>

            {/* Step 3: Hasil Nyata (The Visualizer) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1 p-10 rounded-[4rem] bg-indigo-600/[0.04] border border-white/[0.05] relative overflow-hidden group min-h-[500px] hover:border-indigo-500/40 transition-all duration-700 flex flex-col"
            >
              {/* Atmospheric Background Orb */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-colors duration-700"></div>

              {/* Growth Badge */}
              <div className="absolute top-8 right-8 px-3 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl shadow-2xl shadow-emerald-500/10 group-hover:scale-110 transition-transform">
                <span className="text-[10px] font-black text-emerald-400 tracking-tighter italic">
                  +42.5%
                </span>
              </div>

              <div className="relative z-10 mb-10">
                {/* Integrated Step Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                  <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                    Langkah 03
                  </span>
                </div>

                <h3 className="text-3xl font-black text-white mb-6 tracking-tight leading-none">
                  Hasil Nyata
                </h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[200px]">
                  Keputusan bisnis lebih cerdas dengan data visual otomatis.
                </p>
              </div>

              {/* Chart Container - Pushed to Bottom */}
              <div className="flex-1 relative flex items-end gap-3 px-2 min-h-[180px]">
                {/* Subtle Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2">
                  <div className="w-full h-[1px] bg-white/[0.03]"></div>
                  <div className="w-full h-[1px] bg-white/[0.03]"></div>
                  <div className="w-full h-[1px] bg-white/[0.03]"></div>
                </div>

                {[35, 65, 45, 95, 55, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 relative group/bar h-full flex flex-col justify-end"
                  >
                    {/* Tooltip - Adjusted for bottom-aligned bars */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bg-white text-[10px] font-black text-indigo-950 px-2.5 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl z-20 border border-indigo-100"
                      style={{ bottom: `calc(${h}% + 10px)` }}
                    >
                      {h}% Growth
                    </div>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      whileInView={{ height: `${h}%`, opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: 0.2 + i * 0.1,
                      }}
                      whileHover={{
                        scale: 1.05,
                        filter: "brightness(1.2)",
                        transition: { duration: 0.2 },
                      }}
                      className="w-full bg-gradient-to-t from-indigo-600/40 via-indigo-500 to-indigo-300 rounded-full relative cursor-pointer overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-shadow"
                    >
                      {/* Internal Animated Shimmer */}
                      <motion.div
                        initial={{ top: "100%" }}
                        whileInView={{ top: "-100%" }}
                        transition={{
                          duration: 2,
                          delay: 1 + i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                        className="absolute inset-x-0 h-1/2 bg-gradient-to-t from-transparent via-white/20 to-transparent pointer-events-none"
                      />

                      {/* Neon Glowing Tip */}
                      <div className="absolute top-0 left-0 right-0 h-2 bg-white/60 blur-[1px] rounded-full"></div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Drifting Cards & Spotlight */}
      <section
        id="testimoni"
        onMouseMove={(e) => {
          const section = e.currentTarget;
          const rect = section.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          section.style.setProperty("--spotlight-x", `${x}px`);
          section.style.setProperty("--spotlight-y", `${y}px`);
        }}
        className="relative py-64 px-6 overflow-hidden group/testimonials"
      >
        {/* Sharpened Dot Grid Background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:40px_40px] opacity-20"></div>

        {/* Dynamic Spotlight Layer */}
        <div
          className="absolute inset-0 z-0 opacity-0 group-hover/testimonials:opacity-100 transition-opacity duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(1000px circle at var(--spotlight-x) var(--spotlight-y), rgba(99, 102, 241, 0.08), transparent 80%)`,
          }}
        />

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Drifting Draggable Cards Area (Background Layer) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {[
            {
              name: "Maya Singh",
              role: "Product Manager",
              text: "Highly recommend to every dev. The consistency and quality are unmatched.",
              start: { top: "10%", left: "5%" },
              drift: { x: [0, 30, 0], y: [0, -20, 0] },
            },
            {
              name: "Chris Anderson",
              role: "UX Designer",
              text: "A designer's dream toolkit. Beautiful defaults with enough flexibility.",
              start: { top: "15%", left: "65%" },
              drift: { x: [0, -40, 0], y: [0, 30, 0] },
            },
            {
              name: "Alex Turner",
              role: "Fullstack Dev",
              text: "The animations are buttery smooth. Worth every penny.",
              start: { top: "55%", left: "75%" },
              drift: { x: [0, 20, 0], y: [0, -40, 0] },
            },
            {
              name: "Olivia Martinez",
              role: "Startup Founder",
              text: "Best in class components. The quality is unmatched.",
              start: { bottom: "10%", left: "12%" },
              drift: { x: [0, 40, 0], y: [0, 20, 0] },
            },
            {
              name: "Priya Patel",
              role: "Design Lead",
              text: "Saved us $50k in design costs. Achieved results faster.",
              start: { bottom: "15%", right: "30%" },
              drift: { x: [0, -30, 0], y: [0, -30, 0] },
            },
            {
              name: "David Park",
              role: "Frontend Lead",
              text: "The templates saved us months of development time.",
              start: { top: "45%", right: "8%" },
              drift: { x: [0, -20, 0], y: [0, 40, 0] },
            },
            {
              name: "Lisa Thompson",
              role: "CEO",
              text: "Aceternity UI is the competitive edge we needed.",
              start: { bottom: "35%", left: "5%" },
              drift: { x: [0, 30, 0], y: [0, -15, 0] },
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              drag
              dragConstraints={{
                top: -400,
                left: -400,
                right: 400,
                bottom: 400,
              }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.02, zIndex: 100 }}
              initial={{ opacity: 0, ...testimonial.start }}
              whileInView={{ opacity: 0.7 }}
              animate={{
                x: testimonial.drift.x,
                y: testimonial.drift.y,
              }}
              transition={{
                duration: 20 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-[300px] md:w-[380px] bg-[#0F172A]/40 backdrop-blur-sm border border-white/[0.05] p-6 md:p-8 rounded-[2rem] shadow-2xl cursor-grab active:cursor-grabbing hover:opacity-100 hover:border-white/10 hover:bg-[#0F172A]/60 transition-all duration-500 pointer-events-auto group/card"
            >
              <p className="text-base md:text-lg text-slate-400 leading-relaxed font-medium mb-6 group-hover/card:text-slate-200 transition-colors">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10">
                  <img
                    src={`https://i.pravatar.cc/150?u=${testimonial.name}`}
                    alt={testimonial.name}
                    className="w-full h-full object-cover saturate-50 group-hover/card:saturate-100 transition-all"
                  />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-bold text-white/80 group-hover/card:text-white transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto relative z-10 text-center pointer-events-none">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-[5rem] font-black mb-8 tracking-tighter text-white leading-[1.1]"
          >
            Loved by thousands <br />
            of happy customers
          </motion.h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-12">
            Hear from our community of builders, designers, and creators who
            trust us to power their projects.
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => setShowReviewsModal(true)}
              className="px-10 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] rounded-full text-sm font-bold text-white backdrop-blur-xl transition-all pointer-events-auto"
            >
              Read all reviews →
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Grid with Details Section */}
      <section
        id="kontak"
        className="relative py-32 lg:py-40 overflow-hidden bg-[#020617]"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0B1120] to-transparent pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B1120] to-transparent pointer-events-none z-0"></div>
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
            {/* Left Column - Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              {/* Mail Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-600/20"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-white fill-none stroke-current stroke-[1.5]"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </motion.div>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
                Hubungi Kami
              </h2>

              {/* Description */}
              <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-lg mb-10">
                Kami selalu mencari cara untuk meningkatkan produk dan layanan
                kami. Hubungi kami dan beri tahu bagaimana kami bisa membantu
                Anda.
              </p>

              {/* Contact Info Items */}
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-14">
                <motion.a
                  href="mailto:contact@konsulkeu.id"
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:shadow-[0_0_12px_rgba(99,102,241,0.6)] transition-shadow"></div>
                  <span className="text-sm font-semibold">
                    contact@konsulkeu.id
                  </span>
                </motion.a>
                <motion.a
                  href="tel:+6281234567890"
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition-shadow"></div>
                  <span className="text-sm font-semibold">
                    +62 (812) 3456 7890
                  </span>
                </motion.a>
                <motion.a
                  href="mailto:support@konsulkeu.id"
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-purple-500 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.6)] transition-shadow"></div>
                  <span className="text-sm font-semibold">
                    support@konsulkeu.id
                  </span>
                </motion.a>
              </div>

              {/* Map Illustration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Deterministic Dot-Matrix World Map */}
                {(() => {
                  // 72x36 binary grid — 1=land, 0=water (Equirectangular projection)
                  const W = [
                    "000000000000000000000000000000000000000000000000000000000000000000000000",
                    "000000000000000000000000000000000000000000000000000000000000000000000000",
                    "000000000000000000000000000000000000000000000000001111100000000000000000",
                    "000001100000000000011110000000000000001100011111111111111000000000000000",
                    "000001110000011111111111000000000000011111111111111111111111000000000000",
                    "000000110000111111111111100000000000111111111111111111111111100000000000",
                    "000000010001111111111111110000000001111111111111111111111111110000000000",
                    "000000000011111111111111110000000011111111111111111111111111111000000000",
                    "000000000011111111111111100000000001111111111111011111111111111100000000",
                    "000000000001111111111111100000000000111111111100001111111111111000000000",
                    "000000000001111111111111000000000000111111111100000111111111110000000000",
                    "000000000000111111111110000000000000111111111100000111111111100000000000",
                    "000000000000011111111000000000000001111111111000000011111110000000000000",
                    "000000000000001111100000000000000001111111110000000001111100000000000000",
                    "000000000000000111000000000000000001111111100000000000111000000100000000",
                    "000000000000000111100000000000000001111111100000000000010000011100000000",
                    "000000000000001111110000000000000000111111000000000000000000111110000000",
                    "000000000000011111111000000000000000111110000000000000000000111111000000",
                    "000000000000011111111100000000000000011110000000000000000000011110000000",
                    "000000000000011111111110000000000000011100000000000000000000001000000000",
                    "000000000000001111111110000000000000001100000000000000000000000000000000",
                    "000000000000001111111100000000000000000100000000000000000000000000000000",
                    "000000000000000111111000000000000000000000000000000000000000000000000000",
                    "000000000000000111110000000000000000000000000000000000000000000000000000",
                    "000000000000000011100000000000000000000000000000000000000111100000000000",
                    "000000000000000011000000000000000000000000000000000000001111110000000000",
                    "000000000000000010000000000000000000000000000000000000011111111000000000",
                    "000000000000000010000000000000000000000000000000000000011111111000000000",
                    "000000000000000000000000000000000000000000000000000000001111110000000000",
                    "000000000000000000000000000000000000000000000000000000000111100000000000",
                    "000000000000000000000000000000000000000000000000000000000011000000000000",
                    "000000000000000000000000000000000000000000000000000000000000000000000000",
                    "000000000000000000000000000000000000000000000000000000000000000000000000",
                    "000000000000000000000000000000000000000000000000000000000000000000000000",
                    "000000000000000000000000000000000000000000000000000000000000000000000000",
                    "000000000000000000000000000000000000000000000000000000000000000000000000",
                  ];
                  const dots = [];
                  const cols = 72,
                    rows = 36;
                  const svgW = 720,
                    svgH = 360;
                  const dx = svgW / cols,
                    dy = svgH / rows;
                  for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                      if (W[r] && W[r][c] === "1") {
                        dots.push(
                          <circle
                            key={`m${r}-${c}`}
                            cx={c * dx + dx / 2}
                            cy={r * dy + dy / 2}
                            r="2"
                            fill="currentColor"
                            className="text-indigo-400/60"
                          />,
                        );
                      }
                    }
                  }
                  return (
                    <div className="relative">
                      {/* "We are here" badge — positioned over Indonesia/SE Asia */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        viewport={{ once: true }}
                        className="absolute top-[36%] left-[78%] z-20 -translate-x-1/2"
                      >
                        <div className="relative">
                          <div className="bg-white/90 text-[10px] font-black text-slate-900 px-3 py-1.5 rounded-lg shadow-xl border border-white/20 whitespace-nowrap">
                            We are here
                          </div>
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/90 rotate-45"></div>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center">
                          <div className="w-3 h-3 bg-emerald-400 rounded-full z-10 relative shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
                          <div className="absolute w-6 h-6 bg-emerald-400/30 rounded-full animate-ping"></div>
                        </div>
                      </motion.div>

                      {/* The Dot-Matrix Map */}
                      <svg
                        viewBox={`0 0 ${svgW} ${svgH}`}
                        className="w-full h-auto opacity-40"
                      >
                        {dots}
                      </svg>

                      {/* Connecting lines from location */}
                      <div className="absolute inset-0 pointer-events-none">
                        <svg
                          viewBox={`0 0 ${svgW} ${svgH}`}
                          className="w-full h-full"
                        >
                          <motion.line
                            x1="570"
                            y1="160"
                            x2="350"
                            y2="100"
                            stroke="rgba(99,102,241,0.15)"
                            strokeWidth="0.8"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 1 }}
                          />
                          <motion.line
                            x1="570"
                            y1="160"
                            x2="160"
                            y2="120"
                            stroke="rgba(99,102,241,0.15)"
                            strokeWidth="0.8"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 1.3 }}
                          />
                          <motion.line
                            x1="570"
                            y1="160"
                            x2="610"
                            y2="270"
                            stroke="rgba(16,185,129,0.15)"
                            strokeWidth="0.8"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 1.5 }}
                          />
                          {/* Glowing dots at connection endpoints */}
                          <circle
                            cx="350"
                            cy="100"
                            r="3"
                            fill="rgba(99,102,241,0.3)"
                          />
                          <circle
                            cx="160"
                            cy="120"
                            r="3"
                            fill="rgba(99,102,241,0.3)"
                          />
                          <circle
                            cx="610"
                            cy="270"
                            r="3"
                            fill="rgba(16,185,129,0.3)"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission
                  const formData = new FormData(e.target);
                  console.log(
                    "Contact form submitted:",
                    Object.fromEntries(formData),
                  );
                }}
                className="space-y-6"
              >
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="contact-fullname"
                    className="block text-sm font-bold text-white mb-2.5"
                  >
                    Nama Lengkap
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      id="contact-fullname"
                      name="fullname"
                      placeholder="Nama Anda"
                      className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.05] border border-white/[0.08] focus:border-indigo-500/50 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 backdrop-blur-sm shadow-inner focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-bold text-white mb-2.5"
                  >
                    Alamat Email
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      placeholder="email@perusahaan.com"
                      className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.05] border border-white/[0.08] focus:border-indigo-500/50 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 backdrop-blur-sm shadow-inner focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-sm font-bold text-white mb-2.5"
                  >
                    Nama Perusahaan / UMKM
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      id="contact-company"
                      name="company"
                      placeholder="PT. Usaha Maju"
                      className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.05] border border-white/[0.08] focus:border-indigo-500/50 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 backdrop-blur-sm shadow-inner focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-bold text-white mb-2.5"
                  >
                    Pesan
                  </label>
                  <div className="relative group">
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="5"
                      placeholder="Tulis pesan Anda disini..."
                      className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.05] border border-white/[0.08] focus:border-indigo-500/50 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 backdrop-blur-sm shadow-inner resize-none focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                    ></textarea>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseMove={(e) => {
                    const btn = e.currentTarget;
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    btn.style.setProperty("--btn-x", `${x}px`);
                    btn.style.setProperty("--btn-y", `${y}px`);
                  }}
                  className="relative w-full overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white py-4 rounded-2xl text-sm font-black transition-all shadow-xl shadow-indigo-600/20 border border-white/10 group"
                >
                  {/* Cursor Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle 100px at var(--btn-x) var(--btn-y), rgba(255,255,255,0.15), transparent)`,
                    }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Kirim Pesan
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-none stroke-current stroke-2 group-hover:translate-x-1 transition-transform"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </motion.button>

                {/* Bottom note */}
                <p className="text-center text-xs text-slate-600 font-medium pt-2">
                  Kami akan merespons dalam waktu 24 jam kerja.{" "}
                  <span className="text-indigo-500/60">Dijamin.</span>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Testimonials Modal */}
      <AnimatePresence>
        {showReviewsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-[#0F172A] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 md:p-12 border-b border-white/5 flex items-center justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
                    Semua Testimoni
                  </h3>
                  <p className="text-slate-500 font-medium">
                    Apa kata mereka tentang KonsulKeu
                  </p>
                </div>
                <button
                  onClick={() => setShowReviewsModal(false)}
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all group"
                >
                  <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">
                    ✕
                  </span>
                </button>
              </div>

              {/* Modal Content - Scrollable Grid */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] transition-colors"
                    >
                      <p className="text-slate-300 leading-relaxed mb-6 italic text-sm md:text-base">
                        "{t.text}"
                      </p>
                      <div className="flex items-center gap-4">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-10 h-10 rounded-full border border-white/10"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {t.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            {t.role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Modal Footer Overlay for Gradient Scroll */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0F172A] to-transparent pointer-events-none"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Big Text Footer Section */}
      <footer className="relative bg-[#020617] pt-32 pb-8 overflow-hidden border-t border-white/5">
        {/* Subtle background glow for footer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
            {/* Column 1: Brand & Description (Takes up more space) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-5 pr-0 lg:pr-12">
              <div className="flex items-center mb-8 relative group w-max cursor-pointer">
                <div className="absolute inset-0 bg-indigo-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                <img
                  src={logo2Img}
                  alt="Artha Logo"
                  className="h-12 md:h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-105 group-hover:drop-shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300 relative z-10"
                />
              </div>
              <p className="text-slate-400 font-medium leading-relaxed mb-8 text-base md:text-lg max-w-md">
                Platform #1 Pengelolaan Keuangan UMKM Terintegrasi AI. Solusi
                cerdas untuk mencatat kas, mendapatkan rekomendasi, dan
                memprediksi masa depan bisnis Anda tanpa kerumitan.
              </p>

              {/* Social Media Links */}
              <div className="flex gap-4">
                {["Twitter", "LinkedIn", "Instagram", "YouTube"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      <span className="text-xs font-bold">{social[0]}</span>
                    </a>
                  ),
                )}
              </div>
            </div>

            {/* Column 2: Platform Links */}
            <div className="col-span-1 lg:col-span-2 lg:col-start-7">
              <h4 className="text-white font-bold mb-6 tracking-wide">
                Platform
              </h4>
              <ul className="space-y-4 flex flex-col items-start">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-slate-400 hover:text-indigo-400 transition-colors font-medium"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Perusahaan Links */}
            <div className="col-span-1 lg:col-span-2">
              <h4 className="text-white font-bold mb-6 tracking-wide">
                Perusahaan
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-indigo-400 transition-colors font-medium"
                  >
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-indigo-400 transition-colors font-medium"
                  >
                    Karir
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-indigo-400 transition-colors font-medium"
                  >
                    Blog & Edukasi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-indigo-400 transition-colors font-medium"
                  >
                    Hubungi Kami
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal Links */}
            <div className="col-span-1 lg:col-span-2">
              <h4 className="text-white font-bold mb-6 tracking-wide">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-indigo-400 transition-colors font-medium"
                  >
                    Syarat & Ketentuan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-indigo-400 transition-colors font-medium"
                  >
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-indigo-400 transition-colors font-medium"
                  >
                    Keamanan Data
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Big Text "ARTHA" at the bottom */}
        <div className="w-full flex justify-center items-end overflow-hidden pointer-events-none mt-10 border-b border-white/[0.03] pb-4 px-4 relative">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[18vw] md:text-[22vw] font-black leading-[0.75] tracking-tighter text-transparent bg-clip-text select-none text-center"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.01))",
              WebkitTextStroke: "1px rgba(255,255,255,0.05)",
            }}
          >
            ARTHA
          </motion.h1>

          {/* Subtle gradient overlay at the bottom of the text to blend it with the background */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#020617] to-transparent"></div>
        </div>

        {/* Copyright */}
        <div className="container mx-auto px-6 lg:px-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Artha Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-500 text-sm font-medium">
              Sistem Beroperasi Normal
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Landing;
