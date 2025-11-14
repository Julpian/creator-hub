// File: app/(public)/rekomendasi/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import {
  IoArrowBack,
  IoLogoWhatsapp,
  IoLogoTiktok,
  IoLogoInstagram,
  IoLogoYoutube,
  IoLogoFacebook,
} from "react-icons/io5";
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

      let url = `/api/influencers?recommended=true&limit=10`;
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

  const iconMap = {
    tiktok: <IoLogoTiktok size={22} />,
    instagram: <IoLogoInstagram size={22} />,
    youtube: <IoLogoYoutube size={22} />,
    facebook: <IoLogoFacebook size={22} />,
  };

  const FilterButton = ({ filter }) => (
    <button
      onClick={() => setActiveFilter(filter)}
      className={`p-3 rounded-full border flex items-center justify-center transition-all duration-300
        ${
          activeFilter === filter
            ? "bg-blue-600 text-white shadow-lg scale-105 border-blue-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
        }`}
    >
      {iconMap[filter]}
    </button>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-gray-100">
      {/* HEADER */}
      <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-[#1E90FF] via-[#1986DF] to-[#00B4FF] shadow-md text-white backdrop-blur-md">
        <div className="flex items-center justify-between h-16 px-4 sm:px-8 max-w-5xl mx-auto">
          <Link
            href="/home"
            className="hover:text-blue-200 transition-transform active:scale-95"
          >
            <IoArrowBack size={26} />
          </Link>

          <h1 className="text-base sm:text-lg font-semibold tracking-wide flex-1 text-center">
            Rekomendasi Influencer
          </h1>

          <a
            href={`https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"
          >
            <IoLogoWhatsapp size={22} className="text-white" />
          </a>
        </div>
      </header>

      {/* CONTENT */}
      <div className="pt-5 px-3 sm:px-6 lg:px-10 max-w-5xl mx-auto">

        {/* FILTER ICONS */}
        <div className="flex justify-center gap-3 sm:gap-5 my-4 sm:my-6 overflow-x-auto scrollbar-hide">
          <FilterButton filter="tiktok" />
          <FilterButton filter="instagram" />
          <FilterButton filter="youtube" />
          <FilterButton filter="facebook" />
        </div>

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-16">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 sm:h-56 bg-white rounded-2xl shadow animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-16">
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
