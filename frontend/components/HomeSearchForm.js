// File: components/HomeSearchForm.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoSearch, IoLocation } from "react-icons/io5";

export default function HomeSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
    setLocationQuery(searchParams.get("location") || "");
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    searchQuery ? params.set("q", searchQuery) : params.delete("q");
    locationQuery ? params.set("location", locationQuery) : params.delete("location");
    params.delete("page");
    router.push(`/home?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mr-auto w-full sm:w-4/5 md:w-1/2 flex flex-col gap-3 items-start"
    >
      {/* Bagian input pencarian */}
      <div className="flex flex-col md:flex-row items-stretch gap-3 w-full md:w-auto justify-start">
        {/* Input influencer */}
        <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 md:max-w-xs">
          <IoSearch className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Cari influencer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent w-full outline-none text-sm text-gray-700"
          />
        </div>

        {/* Input lokasi */}
        <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 md:max-w-xs">
          <IoLocation className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Berdasarkan kota..."
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            className="bg-transparent w-full outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Tombol cari */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition text-sm shadow-sm"
      >
        <IoSearch size={16} /> Cari
      </button>
    </form>
  );
}
