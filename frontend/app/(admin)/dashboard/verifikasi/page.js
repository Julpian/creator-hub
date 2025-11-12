"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Check,
  X,
  Mail,
  Phone,
  Instagram,
  Twitch,
  Youtube,
  Facebook,
} from "lucide-react";

export default function VerifikasiPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchSubmissions = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    const res = await fetch("/api/admin/submissions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setSubmissions(await res.json());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleApprove = async (id) => {
    if (
      !confirm(
        "Setujui influencer ini? Data akan dipindahkan ke daftar utama."
      )
    )
      return;

    const token = localStorage.getItem("authToken");
    const res = await fetch(`/api/admin/submissions/${id}/approve`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("Influencer disetujui!");
      fetchSubmissions();
    } else {
      alert("Gagal menyetujui.");
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Tolak dan hapus pendaftaran ini?")) return;

    const token = localStorage.getItem("authToken");
    const res = await fetch(`/api/admin/submissions/${id}/reject`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("Pendaftaran ditolak dan dihapus.");
      fetchSubmissions();
    } else {
      alert("Gagal menolak.");
    }
  };

  if (loading) return <p>Memuat data pendaftar...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Verifikasi Influencer
      </h1>

      {submissions.length === 0 ? (
        <p className="text-gray-500">Tidak ada pendaftaran baru yang menunggu.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Nama</th>
                <th className="px-4 py-3 text-left font-semibold">Kontak</th>
                <th className="px-4 py-3 text-left font-semibold">Bio</th>
                <th className="px-4 py-3 text-left font-semibold">Gender</th>
                <th className="px-4 py-3 text-left font-semibold">Lokasi</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Sosial Media
                </th>
                <th className="px-4 py-3 text-left font-semibold">Foto</th>
                <th className="px-4 py-3 text-left font-semibold">Statistik</th>
                <th className="px-4 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {submissions.map((sub) => (
                <tr
                  key={sub.ID}
                  className="hover:bg-indigo-50 transition-colors duration-150"
                >
                  {/* Nama */}
                  <td className="px-4 py-3 font-medium text-indigo-700">
                    {sub.name}
                  </td>

                  {/* Kontak */}
                  <td className="px-4 py-3 text-gray-700">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1">
                        <Mail size={14} /> {sub.email}
                      </span>
                      {sub.phoneNumber && (
                        <span className="flex items-center gap-1">
                          <Phone size={14} /> {sub.phoneNumber}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Bio */}
                  <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">
                    {sub.bio || "-"}
                  </td>

                  {/* Gender */}
                  <td className="px-4 py-3">{sub.gender || "-"}</td>

                  {/* Lokasi */}
                  <td className="px-4 py-3">{sub.location || "-"}</td>

                  {/* Sosial Media */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {sub.instagramUrl && (
                        <Link
                          href={sub.instagramUrl}
                          target="_blank"
                          className="text-pink-600 hover:scale-110 transition"
                        >
                          <Instagram size={18} />
                        </Link>
                      )}
                      {sub.tiktokUrl && (
                        <Link
                          href={sub.tiktokUrl}
                          target="_blank"
                          className="text-black hover:scale-110 transition"
                        >
                          <Twitch size={18} />
                        </Link>
                      )}
                      {sub.youtubeUrl && (
                        <Link
                          href={sub.youtubeUrl}
                          target="_blank"
                          className="text-red-600 hover:scale-110 transition"
                        >
                          <Youtube size={18} />
                        </Link>
                      )}
                      {sub.facebookUrl && (
                        <Link
                          href={sub.facebookUrl}
                          target="_blank"
                          className="text-blue-700 hover:scale-110 transition"
                        >
                          <Facebook size={18} />
                        </Link>
                      )}
                    </div>
                  </td>

                  {/* Foto */}
                  <td className="px-4 py-3">
                    <img
                      src={sub.profileImageUrl}
                      alt="Profil"
                      className="w-14 h-14 object-cover rounded-lg border"
                    />
                  </td>

                  {/* Statistik */}
                  <td className="px-4 py-3">
                    <img
                      src={sub.statsImageUrl}
                      alt="Statistik"
                      className="w-14 h-14 object-cover rounded-lg border"
                    />
                  </td>

                  {/* Tombol Aksi */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleApprove(sub.ID)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1"
                      >
                        <Check size={16} /> Setujui
                      </button>
                      <button
                        onClick={() => handleReject(sub.ID)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1"
                      >
                        <X size={16} /> Tolak
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
