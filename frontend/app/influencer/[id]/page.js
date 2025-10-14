// File: app/influencer/[id]/page.js
"use client";

import Link from "next/link";
import { IoLogoInstagram, IoLogoYoutube, IoArrowBack } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

async function getInfluencerDetail(id) {
  const res = await fetch(`http://localhost:8080/api/influencers/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default function InfluencerDetailPage() { 
  const { id } = useParams(); 
  const [influencer, setInfluencer] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await getInfluencerDetail(id);
        setInfluencer(data);
      };
      fetchData();
    }
  }, [id]);

  if (!influencer) {
    return <div className="text-center p-24 text-gray-500">Loading...</div>;
  }
  
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toLocaleString();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Tombol Kembali */}
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors">
            <IoArrowBack size={20} />
            <span>Kembali ke Daftar</span>
          </Link>
        </div>

        {/* --- KARTU PROFIL BARU --- */}
        <div className="bg-white rounded-2xl shadow-lg">
          {/* Cover Image Placeholder */}
          <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-200 rounded-t-2xl"></div>

          <div className="relative px-6 pb-8">
            {/* Foto Profil (Lingkaran & Tumpang Tindih) */}
            <div className="absolute left-1/2 -translate-x-1/2 -mt-20">
              <button onClick={() => setOpen(true)} className="cursor-pointer">
                <img
                  src={`http://localhost:8080${influencer.imageUrl}`}
                  alt={influencer.name}
                  className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
                />
              </button>
            </div>

            {/* Konten Detail (di bawah foto) */}
            <div className="pt-20 text-center">
              {/* Nama */}
              <h1 className="text-4xl font-bold text-gray-800">{influencer.name}</h1>

              {/* Kategori */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {influencer.categories.map((cat) => (
                  <span key={cat.ID} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Statistik Sosial Media */}
            {/* PERBAIKAN: Selalu tampilkan div statistik, tapi isi dengan placeholder jika data 0 */}
            <div className="grid grid-cols-3 gap-4 mt-8 border-t pt-6 pb-4"> {/* Tambah pb-4 */}
              {/* Instagram */}
              <a href={influencer.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-center group">
                <IoLogoInstagram className="mx-auto text-4xl text-gray-400 group-hover:text-pink-500 transition-colors mb-1" />
                <p className="text-2xl font-bold text-gray-800">{influencer.instagramFollowers > 0 ? formatNumber(influencer.instagramFollowers) : "-"}</p>
                <p className="text-sm text-gray-500">Followers</p>
                {influencer.instagramUrl && (
                  <span className="text-xs text-pink-600 hover:underline block mt-1">Lihat Profil</span>
                )}
              </a>
              {/* TikTok */}
              <a href={influencer.tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-center group">
                <FaTiktok className="mx-auto text-4xl text-gray-400 group-hover:text-black transition-colors mb-1" />
                <p className="text-2xl font-bold text-gray-800">{influencer.tiktokFollowers > 0 ? formatNumber(influencer.tiktokFollowers) : "-"}</p>
                <p className="text-sm text-gray-500">Followers</p>
                {influencer.tiktokUrl && (
                  <span className="text-xs text-gray-700 hover:underline block mt-1">Lihat Profil</span>
                )}
              </a>
              {/* YouTube */}
              <a href={influencer.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-center group">
                <IoLogoYoutube className="mx-auto text-4xl text-gray-400 group-hover:text-red-500 transition-colors mb-1" />
                <p className="text-2xl font-bold text-gray-800">{influencer.youtubeSubscribers > 0 ? formatNumber(influencer.youtubeSubscribers) : "-"}</p>
                <p className="text-sm text-gray-500">Subscribers</p>
                {influencer.youtubeUrl && (
                  <span className="text-xs text-red-600 hover:underline block mt-1">Lihat Channel</span>
                )}
              </a>
            </div>

            {/* Tentang */}
            {/* PERBAIKAN: Selalu tampilkan div Tentang */}
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Tentang</h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
                {influencer.bio || "(Belum ada deskripsi bio.)"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Komponen Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: `http://localhost:8080${influencer.imageUrl}` }]}
      />
    </div>
  );
}