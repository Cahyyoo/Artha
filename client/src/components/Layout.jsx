import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiList,
  FiPieChart,
  FiSettings,
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiUserCheck
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "../assets/logo.png";

const Layout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const fullName = user?.user_metadata?.nama_lengkap || "Admin Usaha";
  const email = user?.email || "admin@artha.id";
  const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Transaksi", path: "/dashboard/transactions", icon: <FiList /> },
    { name: "Laporan", path: "/dashboard/reports", icon: <FiPieChart /> },
    { name: "Profil", path: "/dashboard/profile", icon: <FiUserCheck /> },
    { name: "Pengaturan", path: "/dashboard/settings", icon: <FiSettings /> },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token autentikasi dari penyimpanan lokal
    localStorage.removeItem("token");
    setIsProfileOpen(false);
    // Arahkan kembali ke halaman login
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar untuk Desktop */}
      <motion.aside 
        animate={{ width: isDesktopSidebarCollapsed ? 96 : 288 }} // 288 = w-72, 96 = w-24
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-white border-r border-slate-200 hidden lg:flex flex-col shadow-sm z-20 overflow-hidden"
      >
        <div className="h-20 flex items-center justify-center border-b border-slate-100 px-4">
          <div className="flex items-center justify-center w-full min-w-max">
            <img 
              src={logoImg} 
              alt="Artha Logo" 
              className={`w-auto object-contain drop-shadow-sm transition-all duration-300 cursor-pointer ${isDesktopSidebarCollapsed ? 'h-8' : 'h-10 sm:h-12 md:h-14 hover:scale-105'}`} 
            />
          </div>
        </div>
        <nav className={`flex-1 space-y-2 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isDesktopSidebarCollapsed ? 'p-4' : 'p-6'}`}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              title={isDesktopSidebarCollapsed ? item.name : ""}
              className={`flex items-center rounded-xl transition-colors duration-200 ${
                isDesktopSidebarCollapsed ? 'justify-center px-0 py-3.5' : 'px-5 py-3.5'
              } ${
                location.pathname === item.path
                  ? "bg-indigo-50 text-indigo-700 font-bold shadow-sm shadow-indigo-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <span className="text-xl min-w-[24px] flex justify-center">{item.icon}</span>
              <AnimatePresence>
                {!isDesktopSidebarCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                    animate={{ opacity: 1, width: "auto", marginLeft: 12 }}
                    exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-[15px] whitespace-nowrap overflow-hidden origin-left"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[70] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="h-20 flex items-center justify-center relative border-b border-slate-100">
                <div className="flex items-center justify-center w-full">
                  <img src={logoImg} alt="Artha Logo" className="h-10 w-auto object-contain" />
                </div>
                <button
                  onClick={toggleSidebar}
                  className="text-slate-400 hover:text-slate-600 absolute right-6 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
              <nav className="flex-1 p-6 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={toggleSidebar}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl ${
                      location.pathname === item.path
                        ? "bg-indigo-50 text-indigo-700 font-bold"
                        : "text-slate-500"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-base">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Konten Utama */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-200 flex items-center px-6 md:px-8 justify-between relative z-50">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <FiMenu size={24} />
            </button>
            {/* Desktop Sidebar Toggle */}
            <button
              onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
              className="hidden lg:block p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <FiMenu size={24} />
            </button>
            <div className="hidden lg:flex flex-col justify-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Welcome Back</p>
              <h2 className="text-base font-black text-slate-800 tracking-tight leading-none">
                Halo, <span className="text-indigo-600">{fullName}</span>
              </h2>
            </div>
            <h2 className="text-lg font-bold text-slate-800 lg:hidden">
              Dashboard
            </h2>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 md:gap-4 hover:bg-slate-50 p-1.5 md:pr-4 rounded-full md:rounded-2xl transition-colors border border-transparent hover:border-slate-200"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm shrink-0">
                {initials}
              </div>
              <div className="flex flex-col items-start hidden sm:flex text-left">
                <span className="text-sm font-bold text-slate-700 leading-tight">
                  {fullName}
                </span>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Online
                </span>
              </div>
              <FiChevronDown className={`hidden sm:block text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 py-2 z-50 origin-top-right overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-50 sm:hidden">
                      <p className="text-sm font-bold text-slate-800">{fullName}</p>
                      <p className="text-xs text-slate-500">{email}</p>
                    </div>
                    
                    <div className="p-2 space-y-1">
                      <Link 
                        to="/dashboard/profile" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                      >
                        <FiUser size={16} />
                        <span>Profil Saya</span>
                      </Link>
                      <Link 
                        to="/dashboard/settings" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                      >
                        <FiSettings size={16} />
                        <span>Pengaturan Akun</span>
                      </Link>
                    </div>
                    
                    <div className="p-2 border-t border-slate-50 mt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <FiLogOut size={16} />
                        <span>Keluar Akun</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Area Render Halaman */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-50/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
