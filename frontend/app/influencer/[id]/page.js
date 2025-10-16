// File: app/influencer/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Icons
import { IoLogoInstagram, IoLogoYoutube, IoArrowBack } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";

// =====================================
// Fetch detail influencer
// =====================================
async function getInfluencerDetail(id) {
  const res = await fetch(`http://localhost:8080/api/influencers/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

// =====================================
// Komponen Utama
// =====================================
export default function InfluencerDetailPage() {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const [open, setOpen] = useState(false);

  // Ambil data dari API
  useEffect(() => {
    if (id) {
      getInfluencerDetail(id).then(setInfluencer);
    }
  }, [id]);

  if (!influencer) {
    return <div className="text-center p-24 text-gray-500">Loading...</div>;
  }

  // Fungsi bantu format angka followers
  const formatNumber = (num) => {
    if (!num) return "-";
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
    return num.toLocaleString();
  };

  // =====================================
  // Render Halaman Detail Influencer
  // =====================================
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Tombol Kembali */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            <IoArrowBack size={20} />
            <span>Kembali ke Daftar</span>
          </Link>
        </div>

        {/* --- KARTU PROFIL --- */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cover Background */}
          <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-200" />

          {/* Foto Profil */}
          <div className="relative px-6 pb-8">
            <div className="absolute left-1/2 -translate-x-1/2 -mt-20">
              <button onClick={() => setOpen(true)} className="cursor-pointer">
                <img
                  src={`http://localhost:8080${influencer.imageUrl}`}
                  alt={influencer.name}
                  className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
                />
              </button>
            </div>

            {/* Nama & Kategori */}
            <div className="pt-20 text-center">
              <h1 className="text-4xl font-bold text-gray-800">{influencer.name}</h1>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {influencer.categories.map((cat) => (
                  <span
                    key={cat.ID}
                    className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Statistik Sosial Media */}
            <div className="grid grid-cols-3 gap-4 mt-8 border-t pt-6 pb-4">
              {/* Instagram */}
              <SocialStat
                icon={<IoLogoInstagram className="text-pink-500" />}
                count={influencer.instagramFollowers}
                label="Followers"
                link={influencer.instagramUrl}
                color="pink"
                text="Lihat Profil"
              />

              {/* TikTok */}
              <SocialStat
                icon={<FaTiktok className="text-black" />}
                count={influencer.tiktokFollowers}
                label="Followers"
                link={influencer.tiktokUrl}
                color="gray"
                text="Lihat Profil"
              />

              {/* YouTube */}
              <SocialStat
                icon={<IoLogoYoutube className="text-red-500" />}
                count={influencer.youtubeSubscribers}
                label="Subscribers"
                link={influencer.youtubeUrl}
                color="red"
                text="Lihat Channel"
              />
            </div>

            {/* Tentang */}
            <div className="mt-8 border-t pt-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Tentang</h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
                {influencer.bio || "(Belum ada deskripsi bio.)"}
              </p>
            </div>
          </div>
        </div>

        {/* --- PORTOFOLIO --- */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Portofolio</h2>

          {influencer.portfolioImages?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {influencer.portfolioImages.map((img, index) => (
                <button
                  key={img.ID || index}
                  onClick={() => setOpen(true)}
                  className="relative aspect-square"
                >
                  <img
                    src={`http://127.0.0.1:8080${img.imageUrl}`}
                    alt={img.description || `Portofolio ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-md hover:opacity-90 transition"
                  />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Belum ada portofolio yang diunggah.</p>
          )}
        </div>
      </div>

      {/* --- LIGHTBOX --- */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          { src: `http://127.0.0.1:8080${influencer.imageUrl}` },
          ...(influencer.portfolioImages?.map((img) => ({
            src: `http://127.0.0.1:8080${img.imageUrl}`,
          })) || []),
        ]}
      />
    </div>
  );
}

// =====================================
// Komponen kecil untuk kotak sosial media
// =====================================
function SocialStat({ icon, count, label, link, color, text }) {
  const formatted = count ? formatShort(count) : "-";

  return (
    <a
      href={link || "#"}
      target={link ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="text-center group"
    >
      <div className="flex justify-center mb-1 text-4xl text-gray-400 group-hover:scale-110 transition">
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-800">{formatted}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {link && (
        <span className={`text-xs text-${color}-600 hover:underline block mt-1`}>
          {text}
        </span>
      )}
    </a>
  );
}

// Format singkat (K / M)
function formatShort(num) {
  if (!num) return "-";
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toString();
}
