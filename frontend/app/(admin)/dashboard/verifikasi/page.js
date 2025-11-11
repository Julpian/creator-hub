// File: app/(admin)/dashboard/verifikasi/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, X, Mail, Phone, Instagram, Twitch, Youtube, Facebook } from "lucide-react";

export default function VerifikasiPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fungsi untuk mengambil semua data pendaftar
  const fetchSubmissions = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    //const res = await fetch("http://127.0.0.1:8080/api/admin/submissions", {
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
    if (!confirm("Setujui influencer ini? Data akan dipindahkan ke daftar utama.")) return;
    
    const token = localStorage.getItem("authToken");
    //const res = await fetch(`http://127.0.0.1:8080/api/admin/submissions/${id}/approve`, {
    const res = await fetch(`/api/admin/submissions/${id}/approve`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("Influencer disetujui!");
      fetchSubmissions(); // Muat ulang daftar
    } else {
      alert("Gagal menyetujui.");
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Tolak dan hapus pendaftaran ini?")) return;

    const token = localStorage.getItem("authToken");
    //const res = await fetch(`http://127.0.0.1:8080/api/admin/submissions/${id}/reject`, {
    const res = await fetch(`/api/admin/submissions/${id}/reject`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("Pendaftaran ditolak dan dihapus.");
      fetchSubmissions(); // Muat ulang daftar
    } else {
      alert("Gagal menolak.");
    }
  };

  if (loading) return <p>Memuat data pendaftar...</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Verifikasi Influencer</h1>
      
      <div className="space-y-6">
        {submissions.length === 0 ? (
          <p className="text-gray-500">Tidak ada pendaftaran baru yang menunggu.</p>
        ) : (
          submissions.map(sub => (
            <div key={sub.ID} className="bg-white shadow-lg rounded-2xl p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-indigo-600">{sub.name}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1"><Mail size={14}/> {sub.email}</span>
                    {sub.phoneNumber && <span className="flex items-center gap-1"><Phone size={14}/> {sub.phoneNumber}</span>}
                  </div>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button onClick={() => handleApprove(sub.ID)} className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600">
                    <Check size={18}/> Setujui
                  </button>
                  <button onClick={() => handleReject(sub.ID)} className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600">
                    <X size={18}/> Tolak
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Info Detail */}
                <div className="space-y-3">
                  <div><strong>Bio:</strong> <p className="text-gray-700">{sub.bio || '-'}</p></div>
                  <div><strong>Lokasi:</strong> <span className="font-medium">{sub.location || '-'}</span></div>
                  <div><strong>Gender:</strong> <span className="font-medium">{sub.gender || '-'}</span></div>
                  <div><strong>Tgl. Lahir:</strong> <span className="font-medium">{sub.dateOfBirth ? sub.dateOfBirth.split('T')[0] : '-'}</span></div>
                  
                  <h3 className="font-semibold pt-2 border-t">Link Sosial Media:</h3>
                  <div className="flex flex-wrap gap-4">
                    {sub.instagramUrl && <Link href={sub.instagramUrl} target="_blank" className="text-pink-600"><Instagram/></Link>}
                    {sub.tiktokUrl && <Link href={sub.tiktokUrl} target="_blank" className="text-black"><Twitch/></Link>}
                    {sub.youtubeUrl && <Link href={sub.youtubeUrl} target="_blank" className="text-red-600"><Youtube/></Link>}
                    {sub.facebookUrl && <Link href={sub.facebookUrl} target="_blank" className="text-blue-700"><Facebook/></Link>}
                  </div>
                </div>

                {/* Gambar */}
                <div>
                    <h3 className="font-semibold mb-2">Foto Profil</h3>
                    <img 
                        src={sub.profileImageUrl} 
                        alt="Profil" 
                        className="w-full h-auto object-cover rounded-lg border"
                    />
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Screenshot Statistik</h3>
                    <img 
                        src={sub.statsImageUrl} 
                        alt="Statistik" 
                        className="w-full h-auto object-cover rounded-lg border"
                    />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}