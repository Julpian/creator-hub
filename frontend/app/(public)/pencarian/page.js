"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  IoArrowBack,
  IoSearch,
  IoFilter,
  IoSwapVertical,
  IoLocation,
  IoSend,
  IoMenu,
  IoLogoWhatsapp,
} from "react-icons/io5";
import InfluencerCard from "@/components/InfluencerCard";

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [locationQuery, setLocationQuery] = useState(searchParams.get("location") || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerTitle, setHeaderTitle] = useState("Rekomendasi Untuk Anda");

  const adminWhatsAppNumber = "6281234567890";
  const waMessage = encodeURIComponent(
    "Halo Admin Gen Creator Hub, saya ingin bertanya sesuatu."
  );


  useEffect(() => {
    const queryFromUrl = searchParams.get("q") || "";
    const locationFromUrl = searchParams.get("location") || "";

    setSearchQuery(queryFromUrl);
    setLocationQuery(locationFromUrl);

    async function fetchResults() {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("limit", "12");

      let url = "";
      if (queryFromUrl || locationFromUrl) {
        if (queryFromUrl) params.set("q", queryFromUrl);
        if (locationFromUrl) params.set("location", locationFromUrl);
        url = `http://127.0.0.1:8080/api/influencers/search?${params.toString()}`;
        setHeaderTitle("Hasil Pencarian");
      } else {
        url = `http://127.0.0.1:8080/api/influencers?${params.toString()}`;
        setHeaderTitle("Rekomendasi Untuk Anda");
      }

      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setResults(data.data || []);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (locationQuery) params.set("location", locationQuery);
    router.push(`/pencarian?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* HEADER */}
      <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-[#1E90FF] via-[#1986DF] to-[#00B4FF] shadow-md text-white backdrop-blur-md">
        <div className="flex items-center justify-between h-16 px-4 sm:px-8 max-w-5xl mx-auto">
          <Link
            href="/"
            className="hover:text-blue-200 transition-transform active:scale-95"
          >
            <IoArrowBack size={26} />
          </Link>

          <h1 className="text-base sm:text-lg font-semibold tracking-wide text-center flex-1">
            Cari Influencer
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

      {/* MAIN CONTENT */}
      <div className="pt-5 pb-16 px-6 sm:px-10 w-full max-w-6xl mx-auto">
        {/* FORM PENCARIAN */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-10 space-y-6 border border-gray-100"
        >
          {/* Input Kata Kunci */}
          <div className="flex items-center bg-gray-100 rounded-full px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
            <IoSearch className="text-gray-500 mr-3" size={22} />
            <input
              type="text"
              placeholder="Cari influencer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full outline-none text-gray-700 font-medium"
            />
          </div>

          {/* Input Lokasi */}
          <div className="flex items-center bg-gray-100 rounded-full px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
            <IoLocation className="text-gray-500 mr-3" size={22} />
            <input
              type="text"
              placeholder="Cari berdasarkan kota..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="bg-transparent w-full outline-none text-gray-700 font-medium"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex gap-3">
              <button
                type="button"
                className="flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold py-2.5 px-5 rounded-full hover:bg-blue-100 transition"
              >
                <IoSwapVertical size={18} /> Sort
              </button>
              <button
                type="button"
                className="flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold py-2.5 px-5 rounded-full hover:bg-blue-100 transition"
              >
                <IoFilter size={18} /> Filter
              </button>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2.5 px-8 rounded-full hover:bg-blue-700 transition shadow-sm"
            >
              <IoSearch size={18} /> Cari
            </button>
          </div>
        </form>

        {/* HASIL PENCARIAN */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">
            {headerTitle}
          </h2>

          {loading ? (
            <p className="text-gray-500 text-sm text-center py-6 animate-pulse">
              Memuat data influencer...
            </p>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((influencer) => (
                <InfluencerCard key={influencer.ID} influencer={influencer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-sm">Tidak ada influencer yang ditemukan.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function PencarianPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-500">Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
