"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });



      if (res.ok) {
          // --- TAMBAHKAN LOGIKA INI ---
          const data = await res.json(); // Ambil body respons
          localStorage.setItem('authToken', data.token); // Simpan token ke localStorage

        alert("Login ke backend berhasil!");
        router.push("/dashboard");
      } else {
        const data = await res.json();
        alert(`Login gagal: ${data.error || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      console.error("Tidak bisa terhubung ke server:", error);
      alert("Login gagal: Tidak bisa terhubung ke server.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-3xl font-extrabold text-center text-white mb-2 drop-shadow-md">
          Creator Hub
        </h1>
        <p className="text-center text-gray-200 mb-6 text-sm">
          Admin Login Panel
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@email.com"
              className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-800 border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-100 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-800 border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-gray-200 mt-6">
          © 2025 Creator Hub Admin
        </p>
      </div>
    </div>
  );
}
