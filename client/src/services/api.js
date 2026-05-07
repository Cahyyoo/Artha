import axios from "axios";

// Membuat instance axios dengan konfigurasi dasar
const api = axios.create({
  // Base URL mengarah ke server Express Anda
  baseURL: "http://localhost:5001",
  // Pastikan cookies/session dikirim jika diperlukan
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Nanti di sini kita bisa menambahkan "Interceptors"
// untuk menyisipkan Token JWT secara otomatis

export default api;
