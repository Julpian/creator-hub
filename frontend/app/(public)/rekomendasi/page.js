// File: app/(public)/rekomendasi/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { IoArrowBack, IoLogoWhatsapp, IoSend, IoMenu } from "react-icons/io5";
import InfluencerCard from "@/components/InfluencerCard";

const platformCategoryMap = {
  tiktok: 11,
  instagram: 13,
  youtube: 9,
  facebook: 14,
};

function RekomendasiContent() {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("tiktok");

  const adminWhatsAppNumber = "6281234567890";
  const waMessage = encodeURIComponent(
    "Halo Admin Gen Creator Hub, saya ingin bertanya sesuatu."
  );

  useEffect(() => {
    async function fetchRecommended() {
      setLoading(true);
      let url = `http://127.0.0.1:8080/api/influencers?recommended=true&limit=10`;

      const categoryId = platformCategoryMap[activeFilter];
      if (categoryId) url += `&category_id=${categoryId}`;

      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setInfluencers(data.data || []);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommended();
  }, [activeFilter]);

  const FilterButton = ({ filter, children }) => (
    <button
      onClick={() => setActiveFilter(filter)}
      className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300
        ${
          activeFilter === filter
            ? "bg-blue-600 text-white shadow-lg scale-105"
            : "bg-white text-gray-700 hover:bg-blue-50 shadow-sm"
        }`}
    >
      {children}
    </button>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-[#1E90FF] via-[#1986DF] to-[#00B4FF] shadow-md text-white backdrop-blur-md">
        <div className="flex items-center justify-between h-16 px-4 sm:px-8 max-w-5xl mx-auto">
          <Link
            href="/"
            className="hover:text-blue-200 transition-transform active:scale-95"
          >
            <IoArrowBack size={26} />
          </Link>

          <h1 className="text-base sm:text-lg font-semibold tracking-wide text-center flex-1">
            Rekomendasi Influencer
          </h1>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"
            title="Hubungi via WhatsApp"
          >
            <IoLogoWhatsapp size={22} className="text-white" />
          </a>
        </div>
      </header>

      {/* Konten */}
      <div className="pt-5 px-3 sm:px-6 lg:px-10 max-w-5xl mx-auto">
        {/* Filter */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 my-4 sm:my-5 flex-nowrap overflow-x-auto scrollbar-hide">
          <FilterButton filter="tiktok">TikTok</FilterButton>
          <FilterButton filter="instagram">Instagram</FilterButton>
          <FilterButton filter="youtube">YouTube</FilterButton>
          <FilterButton filter="facebook">Facebook</FilterButton>
        </div>

        {/* Grid Hasil */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 pb-16">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-48 sm:h-56 rounded-2xl bg-white shadow animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 pb-16">
            {influencers.length > 0 ? (
              influencers.map((influencer) => (
                <div
                  key={influencer.ID}
                  className="transition-transform duration-300 hover:scale-[1.03]"
                >
                  <InfluencerCard influencer={influencer} />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-8">
                Tidak ada rekomendasi untuk platform ini.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function RekomendasiPage() {
  return (
    <Suspense
      fallback={<div className="p-6 text-center text-gray-600">Loading...</div>}
    >
      <RekomendasiContent />
    </Suspense>
  );
}
