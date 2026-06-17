import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  FiMessageCircle,
  FiX,
  FiSend,
  FiCpu,
  FiTrash2,
  FiChevronDown,
  FiZap,
} from "react-icons/fi";
import chatBotIcon from "../assets/icons/chat-bot.png";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Model fallback chain — try newer available models to bypass quota limits
const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-3.5-flash",
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
  "gemini-flash-latest"
];

const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num || 0);

function buildSystemPrompt(financialData, businessName) {
  const income = financialData?.summary?.income || 0;
  const expense = financialData?.summary?.expense || 0;
  const netProfit = financialData?.summary?.net_profit || 0;
  const healthStatus = financialData?.summary?.health_status || "Tidak diketahui";
  const incomeChange = financialData?.summary?.income_change || 0;
  const expenseChange = financialData?.summary?.expense_change || 0;

  const recentTx = (financialData?.recent_transactions || []).slice(0, 10);
  const txSummary = recentTx.length > 0
    ? recentTx.map(tx => `- ${tx.date}: ${tx.description || tx.desc} (${tx.type}) ${formatRupiah(tx.amount)}`).join("\n")
    : "Belum ada transaksi terbaru.";

  return `Kamu adalah "Arta AI", asisten konsultan keuangan virtual cerdas yang terintegrasi di dalam platform manajemen keuangan UMKM bernama "Arta". 

PERAN UTAMA:
- Menjadi penasihat keuangan digital yang ramah, profesional, dan mudah dipahami untuk pelaku UMKM Indonesia.
- Menjawab pertanyaan tentang keuangan, strategi bisnis, pengelolaan kas, investasi sederhana, dan tips keuangan UMKM.
- Memberikan analisis berdasarkan data keuangan riil yang sedang dilihat pengguna di dashboard.

DATA KEUANGAN TERKINI PENGGUNA (PERIODE YANG DIPILIH):
- Nama Bisnis: ${businessName || "Bisnis Pengguna"}
- Total Pemasukan: ${formatRupiah(income)} (perubahan: ${incomeChange >= 0 ? "+" : ""}${incomeChange}% vs periode lalu)
- Total Pengeluaran: ${formatRupiah(expense)} (perubahan: ${expenseChange >= 0 ? "+" : ""}${expenseChange}% vs periode lalu)
- Laba Bersih: ${formatRupiah(netProfit)}
- Profit Margin: ${income > 0 ? ((netProfit / income) * 100).toFixed(1) : 0}%
- Status Kesehatan Bisnis: ${healthStatus}

TRANSAKSI TERBARU:
${txSummary}

ATURAN PENTING:
1. Selalu jawab dalam Bahasa Indonesia yang sopan dan mudah dipahami.
2. Gunakan data keuangan di atas untuk memberikan analisis yang spesifik dan personal, JANGAN mengarang angka.
3. Berikan saran yang actionable dan praktis untuk pelaku UMKM.
4. Jika ditanya di luar topik keuangan/bisnis, arahkan kembali percakapan ke konsultasi keuangan dengan sopan.
5. Format jawaban dengan rapi menggunakan poin-poin jika perlu.
6. Jangan pernah menyebutkan bahwa kamu adalah "Gemini" atau model AI dari Google. Kamu adalah "Arta AI".
7. Jika data keuangan kosong atau nol, sarankan pengguna untuk mulai mencatat transaksi terlebih dahulu.
8. Batasi jawaban maksimal 300 kata agar ringkas dan mudah dibaca.`;
}

const quickPrompts = [
  { label: "📊 Analisis Keuangan", prompt: "Berikan analisis singkat kondisi keuangan bisnis saya berdasarkan data saat ini." },
  { label: "💡 Tips Hemat", prompt: "Berikan tips praktis untuk menekan pengeluaran bisnis saya." },
  { label: "📈 Strategi Profit", prompt: "Bagaimana strategi meningkatkan laba bersih bisnis saya?" },
  { label: "🏥 Cek Kesehatan", prompt: "Jelaskan arti status kesehatan bisnis saya dan apa yang perlu diperbaiki." },
];

// Simple markdown-ish renderer for bold and lists
function renderMessageContent(text) {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold
    let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Bullet points
    if (/^\s*[-•]\s/.test(processed)) {
      processed = processed.replace(/^\s*[-•]\s/, '');
      return <li key={i} className="ml-4 list-disc text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: processed }} />;
    }
    // Numbered list
    if (/^\s*\d+[\.\)]\s/.test(processed)) {
      return <li key={i} className="ml-4 list-decimal text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: processed }} />;
    }
    if (processed.trim() === "") return <br key={i} />;
    return <p key={i} className="text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: processed }} />;
  });
}

export default function AIConsultantChat({ dashboardData, businessName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatSession, setChatSession] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const chatContainerRef = useRef(null);
  const [pulseBtn, setPulseBtn] = useState(true);

  const activeModelRef = useRef(MODELS[0]);

  // Helper to create a chat session with a specific model
  const createChatSession = useCallback((modelName) => {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });
    const systemPrompt = buildSystemPrompt(dashboardData, businessName);
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Saya mengerti. Saya adalah Arta AI, asisten konsultan keuangan virtual Anda. Saya sudah mempelajari data keuangan bisnis Anda dan siap membantu memberikan analisis serta rekomendasi. Silakan tanyakan apa saja seputar keuangan bisnis Anda!" }],
        },
      ],
    });
    return chat;
  }, [dashboardData, businessName]);

  // Initialize Gemini chat session — try models in fallback order
  useEffect(() => {
    if (!GEMINI_API_KEY) {
      setError("API Key Gemini belum dikonfigurasi. Tambahkan VITE_GEMINI_API_KEY di file .env");
      return;
    }
    try {
      const chat = createChatSession(activeModelRef.current);
      setChatSession(chat);
      setError(null);
    } catch (err) {
      console.error("Gagal inisialisasi Gemini:", err);
      setError("Gagal menginisialisasi AI. Periksa kembali API Key Anda.");
    }
  }, [createChatSession]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setPulseBtn(false);
    }
  }, [isOpen]);

  // Scroll detection
  const handleScroll = useCallback(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    const threshold = 100;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > threshold);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || isLoading || !chatSession) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);
    setError(null);

    // Try sending with current model, fallback on 429
    let lastErr = null;
    const currentIdx = MODELS.indexOf(activeModelRef.current);
    const modelsToTry = [
      ...MODELS.slice(currentIdx),
      ...MODELS.slice(0, currentIdx),
    ];

    for (const modelName of modelsToTry) {
      try {
        // If model changed, create a new session and replay messages
        let session = chatSession;
        if (modelName !== activeModelRef.current) {
          console.log(`[Arta AI] Fallback ke model: ${modelName}`);
          session = createChatSession(modelName);
          // Replay previous user messages so context is preserved
          for (const msg of messages) {
            if (msg.role === "user") {
              await session.sendMessage(msg.content);
            }
          }
          activeModelRef.current = modelName;
          setChatSession(session);
        }

        const result = await session.sendMessage(userMsg);
        const response = await result.response;
        const aiText = response.text();
        setMessages(prev => [...prev, { role: "ai", content: aiText }]);
        setIsLoading(false);
        return; // Success — exit
      } catch (err) {
        lastErr = err;
        const isQuotaOrNotFound = err.message?.includes("429") || err.message?.includes("quota") || err.message?.includes("exceeded") || err.message?.includes("404") || err.message?.includes("not found");
        if (!isQuotaOrNotFound) break; // Only fallback on quota or missing model errors
        console.warn(`[Arta AI] Model ${modelName} gagal (kuota/tidak ditemukan), mencoba model berikutnya...`);
      }
    }

    // All models failed
    console.error("Gemini Error:", lastErr);
    const errMsg = lastErr?.message?.includes("API_KEY")
      ? "API Key tidak valid. Periksa VITE_GEMINI_API_KEY di file .env Anda."
      : lastErr?.message?.includes("429") || lastErr?.message?.includes("quota")
      ? "Kuota semua model AI habis untuk hari ini. Silakan coba lagi besok, atau upgrade ke paket berbayar di Google AI Studio."
      : "Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan coba lagi.";
    setMessages(prev => [...prev, { role: "ai", content: errMsg, isError: true }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    activeModelRef.current = MODELS[0];
    if (GEMINI_API_KEY) {
      try {
        const chat = createChatSession(activeModelRef.current);
        setChatSession(chat);
      } catch (err) {
        console.error("Reset chat error:", err);
      }
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[60] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
            aria-label="Buka Konsultan AI"
          >
            <div className="relative bg-[#ffffff] rounded-full p-2.5 shadow-lg shadow-black/20 border border-slate-200">
              <img 
                src={chatBotIcon} 
                alt="AI Assistant" 
                className="w-10 h-10 object-contain"
              />
              {/* Online Indicator (Static & Clean) */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#ffffff]" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            data-chat-panel
            className="fixed bottom-6 right-6 z-[60] w-[380px] h-[600px] max-h-[85vh] flex flex-col rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.2)] border border-slate-200 bg-[#ffffff]"
          >
            {/* Header */}
            <div data-chat-header className="flex items-center justify-between px-4 py-3 shrink-0 bg-[#33475b]">
              <div className="flex items-center gap-3">
                <div className="relative bg-[#ffffff] rounded-full p-1 flex items-center justify-center shrink-0 w-9 h-9" data-chat-avatar>
                  <img src={chatBotIcon} alt="AI" className="w-full h-full object-contain" data-chat-icon />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#ffffff]" data-chat-online-dot />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-[15px] tracking-tight leading-tight">Arta AI Consultant</h3>
                  <p className="text-white/70 text-[11px] font-medium mt-0.5">Selalu siap membantu</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="Hapus percakapan"
                >
                  <FiTrash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="Tutup"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={chatContainerRef}
              onScroll={handleScroll}
              data-chat-messages
              className="flex-1 overflow-y-auto px-4 py-5 space-y-5 scroll-smooth bg-[#ffffff]"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(150,150,150,0.3) transparent",
              }}
            >
              {/* Welcome message */}
              {messages.length === 0 && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center py-2"
                >
                  <p data-chat-welcome-text className="text-slate-500 text-[13px] leading-relaxed mb-6">
                    Halo! Saya Arta AI. Konsultan keuangan virtual Anda. Ada yang bisa saya bantu terkait bisnis Anda hari ini?
                  </p>

                  {/* Quick prompts */}
                  <div className="flex flex-col gap-2 px-1">
                    {quickPrompts.map((qp, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        onClick={() => sendMessage(qp.prompt)}
                        data-chat-quick-prompt
                        className="text-left px-4 py-3 rounded-xl text-[13px] font-medium text-[#33475b] transition-all cursor-pointer border border-[#33475b]/20 hover:bg-[#f5f8fa]"
                      >
                        {qp.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Error banner */}
              {error && messages.length === 0 && (
                <div data-chat-error className="mx-2 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs leading-relaxed">
                  ⚠️ {error}
                </div>
              )}

              {/* Chat messages */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="flex-shrink-0 mr-2 self-end mb-1">
                      <div data-chat-msg-avatar className="w-7 h-7 rounded-full bg-[#ffffff] border border-slate-200 p-0.5 flex items-center justify-center">
                        <img src={chatBotIcon} alt="AI" className="w-full h-full object-contain" data-chat-icon />
                      </div>
                    </div>
                  )}
                  
                  <div
                    data-chat-bubble={msg.role}
                    className={`max-w-[80%] px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "text-white bg-[#33475b] rounded-2xl rounded-br-sm"
                        : msg.isError
                        ? "text-rose-600 bg-rose-50 border border-rose-200 rounded-2xl rounded-bl-sm"
                        : "text-[#33475b] bg-[#f5f8fa] border border-slate-200 rounded-2xl rounded-bl-sm"
                    }`}
                  >
                    <div className="space-y-1.5 [&>p]:mb-1 last:[&>p]:mb-0">{renderMessageContent(msg.content)}</div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex-shrink-0 mr-2 self-end mb-1">
                    <div data-chat-msg-avatar className="w-7 h-7 rounded-full bg-[#ffffff] border border-slate-200 p-0.5 flex items-center justify-center">
                      <img src={chatBotIcon} alt="AI" className="w-full h-full object-contain" data-chat-icon />
                    </div>
                  </div>
                  
                  <div data-chat-typing className="px-4 py-4 rounded-2xl rounded-bl-sm bg-[#f5f8fa] border border-slate-200 shadow-sm flex items-center justify-center h-10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#33475b]/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#33475b]/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#33475b]/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  data-chat-scroll-btn
                  className="absolute bottom-[76px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-[#33475b] bg-[#ffffff] cursor-pointer shadow-md border border-slate-200"
                >
                  <FiChevronDown size={18} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div data-chat-input-area className="px-4 py-3 shrink-0 bg-[#ffffff] border-t border-slate-200">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Write a message..."
                  disabled={isLoading || !!error}
                  data-chat-input
                  className="flex-1 bg-transparent text-[#33475b] text-[14px] placeholder-slate-400 outline-none disabled:opacity-50 px-2 py-1"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading || !!error}
                  data-chat-send-btn
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-[#33475b] hover:bg-slate-100"
                >
                  <FiSend size={18} />
                </button>
              </div>
              <div data-chat-footer className="text-center mt-2 flex items-center justify-center gap-1">
                <span className="text-[10px] text-slate-400">⚡ Didukung oleh</span>
                <span className="text-[10px] font-semibold text-rose-500">Arta AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4), 0 0 0 0 rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4), 0 0 0 12px rgba(99, 102, 241, 0); }
        }
      `}</style>
    </>
  );
}
