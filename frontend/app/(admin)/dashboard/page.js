// File: app/(admin)/dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

export default function DashboardPage() {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data dari API
  const fetchInfluencers = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/influencers?limit=100");
      const data = await res.json();
      setInfluencers(data.data || []);
    } catch (err) {
      console.error("Gagal mengambil data influencer:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  // 🔹 Hapus instan tanpa refresh
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus influencer ini?")) return;

    // Optimistic update (hapus di UI dulu)
    setInfluencers((prev) => prev.filter((inf) => inf.ID !== id));

    // Lalu hapus di backend
    try {
      const res = await fetch(`http://localhost:8080/api/influencers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus data");
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus data");
      console.error(err);
      // Rollback (kembalikan jika gagal)
      fetchInfluencers();
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* 🔹 Header Section */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Kelola Influencer
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Pantau, ubah, atau hapus data influencer dari satu tempat ✨
            </p>
          </div>

          <Link
            href="/dashboard/tambah"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            <PlusCircle size={18} />
            Tambah Influencer
          </Link>
        </div>

        {/* 🔹 Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          {loading ? (
            <p className="text-center py-10 text-gray-500">⏳ Memuat data...</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 text-left uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-3">Gambar</th>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Umur</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {influencers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-gray-500">
                      😕 Belum ada data influencer.
                    </td>
                  </tr>
                ) : (
                  influencers.map((influencer) => (
                    <tr
                      key={influencer.ID}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      {/* 🖼️ Gambar */}
                      <td className="p-3">
                        {influencer.imageUrl ? (
                          <img
                            src={`http://localhost:8080${influencer.imageUrl}`}
                            alt={influencer.name}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-gray-400 text-xs rounded-lg border">
                            No Image
                          </div>
                        )}
                      </td>

                      {/* 🧍 Nama */}
                      <td className="p-3 font-medium text-gray-800">
                        {influencer.name}
                      </td>

                      {/* 2. TAMPILKAN DATA UMUR */}
                      <td className="p-3 text-gray-600">
                          {influencer.age > 0 ? `${influencer.age} thn` : '-'}
                      </td>

                      {/* 🏷️ Kategori */}
                      <td className="p-3">
                        <div className="flex flex-wrap gap-2">
                          {influencer.categories?.length > 0 ? (
                            influencer.categories.map((cat) => (
                              <span
                                key={cat.ID}
                                className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs font-semibold rounded-full"
                              >
                                {cat.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs italic">
                              Tidak ada kategori
                            </span>
                          )}
                        </div>
                      </td>

                      {/* ⚙️ Aksi */}
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-3">
                          <Link
                            href={`/dashboard/edit/${influencer.ID}`}
                            className="p-2 rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </Link>

                          <button
                            onClick={() => handleDelete(influencer.ID)}
                            className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
