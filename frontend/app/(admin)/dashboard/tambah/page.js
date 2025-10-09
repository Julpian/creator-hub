"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category) {
      alert("Nama dan kategori wajib diisi.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/admin/influencers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, category }),
      });

      if (res.ok) {
        alert("🎉 Influencer baru berhasil ditambahkan!");
        router.push("/dashboard");
        router.refresh();
      } else {
        alert("❌ Gagal menambahkan data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Terjadi kesalahan saat menambahkan data.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-10 px-6 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl transition-transform hover:scale-[1.01]">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          ✨ Tambah Influencer Baru
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Influencer
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama influencer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kategori
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Masukkan kategori influencer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition transform hover:-translate-y-[1px]"
          >
            💾 Simpan
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition"
          >
            ⬅️ Kembali ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
