// File: app/(public)/rekomendasi/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { IoArrowBack, IoSend, IoMenu } from "react-icons/io5";
import InfluencerCard from "@/components/InfluencerCard";

function RekomendasiContent() {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all"); // all, tiktok, instagram, youtube, facebook

  useEffect(() => {
    async function fetchRecommended() {
      setLoading(true);
      let url = `http://127.0.0.1:8080/api/influencers?recommended=true&limit=10`;
      if (activeFilter !== "all") url += `&platform=${activeFilter}`;

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
      className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm 
        ${
          activeFilter === filter
            ? "bg-blue-600 text-white shadow-md scale-105"
            : "bg-white text-gray-700 hover:bg-blue-100"
        }`}
    >
      {children}
    </button>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* HEADER */}
      <header className="bg-blue-600 text-white py-4 px-4 flex items-center justify-between fixed top-0 left-0 w-full z-50 shadow-md">
        <Link href="/" className="hover:text-blue-200 transition">
          <IoArrowBack size={24} />
        </Link>
        <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
          Rekomendasi Influencer
        </h1>
        <div className="flex items-center gap-4">
          <IoSend size={22} className="cursor-pointer hover:text-blue-200" />
          <IoMenu size={26} className="cursor-pointer hover:text-blue-200" />
        </div>
      </header>

      {/* KONTEN */}
      <div className="pt-24 px-4 sm:px-6 lg:px-10">
        {/* FILTER */}
        <div className="flex justify-center flex-wrap gap-3 my-4">
          <FilterButton filter="all">All</FilterButton>
          <FilterButton filter="tiktok">TikTok</FilterButton>
          <FilterButton filter="instagram">Instagram</FilterButton>
          <FilterButton filter="youtube">YouTube</FilterButton>
          <FilterButton filter="facebook">Facebook</FilterButton>
        </div>

        {/* HASIL */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-16">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-44 bg-white rounded-xl shadow animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 pb-16">
            {influencers.length > 0 ? (
              influencers.map((influencer) => (
                <InfluencerCard key={influencer.ID} influencer={influencer} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-8">
                Tidak ada rekomendasi untuk filter ini.
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
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      <RekomendasiContent />
    </Suspense>
  );
}
