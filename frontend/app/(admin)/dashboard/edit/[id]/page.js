// File: app/(admin)/dashboard/edit/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchInfluencer = async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/influencers/${id}`);
          if (!res.ok) throw new Error("Gagal mengambil data");
          const data = await res.json();
          setName(data.name);
          setCategory(data.category);
        } catch (error) {
          alert("Gagal memuat data influencer.");
        } finally {
          setLoading(false);
        }
      };
      fetchInfluencer();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/admin/influencers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, category }),
      });

      if (res.ok) {
        alert("✅ Data berhasil diperbarui!");
        router.push("/dashboard");
        router.refresh();
      } else {
        alert("❌ Gagal memperbarui data.");
      }
    } catch (error) {
      alert("⚠️ Terjadi kesalahan saat memperbarui data.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700 text-lg">
        ⏳ Memuat data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-10 px-6 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl transition-transform hover:scale-[1.01]">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          ✏️ Edit Data Influencer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 text-gray-900">
          {/* Nama */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-900 mb-1"
            >
              Nama Influencer
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama influencer"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Kategori */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-900 mb-1"
            >
              Kategori
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Masukkan kategori influencer"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Tombol Simpan */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition transform hover:-translate-y-[1px]"
          >
            💾 Simpan Perubahan
          </button>

          {/* Tombol Kembali */}
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
          >
            ⬅️ Kembali ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
