// File: app/(public)/rekomendasi/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
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

  const FilterButton = ({ filter, children }) => (
    <button
      onClick={() => setActiveFilter(filter)}
      className={`px-4 py-2 rounded-full font-medium text-sm text-center transition-all duration-300
        ${
          activeFilter === filter
            ? "bg-blue-600 text-white shadow-lg scale-105"
            : "bg-white text-gray-700 hover:bg-blue-50 shadow"
        }`}
    >
      {children}
    </button>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-gray-100 px-4 pb-10">
      {/* Judul halaman */}
      <h1 className="text-lg font-semibold text-center py-4">
        Rekomendasi Influencer
      </h1>

      {/* Kategori — Grid Center */}
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-6">
        <FilterButton filter="tiktok">TikTok</FilterButton>
        <FilterButton filter="instagram">Instagram</FilterButton>
        <FilterButton filter="youtube">YouTube</FilterButton>
        <FilterButton filter="facebook">Facebook</FilterButton>
      </div>

      {/* Grid Influencer */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-white shadow animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
    </main>
  );
}

export default function RekomendasiPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <RekomendasiContent />
    </Suspense>
  );
}
