"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton"; // pastikan path ini benar

export default function DashboardPage() {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getInfluencers() {
      try {
        const res = await fetch("http://localhost:8080/api/influencers", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Gagal mengambil data influencer");
        const data = await res.json();
        setInfluencers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getInfluencers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          🎯 Kelola Influencer
        </h1>

        {/* Tombol Tambah */}
        <Link
          href="/dashboard/tambah"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          + Tambah Influencer
        </Link>
      </div>

      {/* Tabel Konten */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <p className="p-6 text-center text-gray-500">⏳ Memuat data...</p>
        ) : error ? (
          <p className="p-6 text-center text-red-500">⚠️ {error}</p>
        ) : influencers.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            Belum ada influencer yang terdaftar.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Nama
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Kategori
                </th>
                <th className="p-3 text-center text-sm font-semibold text-gray-600">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {influencers.map((influencer, index) => (
                <tr
                  key={influencer.ID || index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-gray-800">{influencer.name}</td>
                  <td className="p-3 text-gray-600">{influencer.category}</td>
                  <td className="p-3 flex justify-center gap-3">
                    {/* Tombol Edit */}
                    <Link
                      href={`/dashboard/edit/${influencer.ID}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                    >
                      ✏️ Edit
                    </Link>

                    {/* Tombol Delete */}
                    <DeleteButton id={influencer.ID} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
