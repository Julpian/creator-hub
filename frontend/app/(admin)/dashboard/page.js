// File: app/(admin)/dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, PlusCircle, Search, Users } from "lucide-react";

export default function DashboardPage() {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Ambil data dari API (pagination + search)
  const fetchInfluencers = async (page = 1, query = "") => {
    setLoading(true);
    try {
      const limit = 6;
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (query) params.set("q", query);

      const res = await fetch(
        `http://localhost:8080/api/influencers/search?${params.toString()}`
      );
      const data = await res.json();

      setInfluencers(data.data || []);
      setTotalData(data.total_data || 0);
      setCurrentPage(data.page || 1);
      setTotalPages(Math.ceil((data.total_data || 0) / limit));
    } catch (err) {
      console.error("Gagal mengambil data influencer:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Panggil saat halaman berubah
  useEffect(() => {
    fetchInfluencers(currentPage, searchQuery);
  }, [currentPage]);

  // 🔹 Pencarian
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchInfluencers(1, searchQuery);
  };

  // 🔹 Hapus data dengan konfirmasi
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus influencer ini?")) return;

    setInfluencers((prev) => prev.filter((inf) => inf.ID !== id));

    try {
      const res = await fetch(`http://localhost:8080/api/influencers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus data");
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus data");
      console.error(err);
      fetchInfluencers(currentPage, searchQuery);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Header Section */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              Dashboard Influencer
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Kelola data influencer yang terdaftar dalam sistem.
            </p>
          </div>

          <Link
            href="/dashboard/tambah"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-md hover:bg-indigo-700 transition"
          >
            <PlusCircle size={18} />
            Tambah Influencer
          </Link>
        </div>

        {/* 🔹 Statistik Singkat */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <Users className="text-indigo-600" size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Influencer</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {totalData.toLocaleString("id-ID")}
              </h2>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="bg-green-100 p-3 rounded-xl">
              <Search className="text-green-600" size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pencarian Aktif</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {searchQuery ? `"${searchQuery}"` : "-"}
              </h2>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <span className="text-yellow-600 font-bold text-lg">
                📊
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Halaman Saat Ini</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {currentPage} / {totalPages}
              </h2>
            </div>
          </div>
        </div>

        {/* 🔹 Search Bar */}
        <form onSubmit={handleSearch} className="relative mb-8">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari influencer berdasarkan nama..."
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
            />
          </div>
        </form>

        {/* 🔹 Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <p className="text-center py-12 text-gray-500 animate-pulse">
              ⏳ Memuat data...
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-indigo-50 text-gray-700 uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-4 text-left">Gambar</th>
                  <th className="p-4 text-left">Nama</th>
                  <th className="p-4 text-left">Umur</th>
                  <th className="p-4 text-left">Kategori</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {influencers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500">
                      😕 Tidak ada data influencer ditemukan.
                    </td>
                  </tr>
                ) : (
                  influencers.map((influencer) => (
                    <tr
                      key={influencer.ID}
                      className="border-b last:border-none hover:bg-indigo-50/30 transition"
                    >
                      {/* 🖼️ Gambar */}
                      <td className="p-4">
                        {influencer.imageUrl ? (
                          <img
                            src={`http://localhost:8080${influencer.imageUrl}`}
                            alt={influencer.name}
                            className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm"
                          />
                        ) : (
                          <div className="w-14 h-14 bg-gray-100 flex items-center justify-center text-gray-400 text-xs rounded-lg border">
                            No Image
                          </div>
                        )}
                      </td>

                      {/* 🧍 Nama */}
                      <td className="p-4 font-semibold text-gray-800">
                        {influencer.name}
                      </td>

                      {/* 🎂 Umur */}
                      <td className="p-4 text-gray-600">
                        {influencer.age > 0 ? `${influencer.age} thn` : "-"}
                      </td>

                      {/* 🏷️ Kategori */}
                      <td className="p-4">
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
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-3">
                          <Link
                            href={`/dashboard/edit/${influencer.ID}`}
                            className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(influencer.ID)}
                            className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
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

        {/* 🔹 Pagination */}
        <div className="flex justify-between items-center mt-8">
          <span className="text-sm text-gray-600">
            Halaman <strong>{currentPage}</strong> dari{" "}
            <strong>{totalPages}</strong>
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ⬅ Sebelumnya
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Selanjutnya ➡
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
