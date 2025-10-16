"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  IoSearchOutline,
  IoMenuOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";

export default function TopNav() {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false); // 🔹 Tambahan untuk toggle search di mobile
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/pencarian?q=${query}`);
      setShowSearch(false); // Tutup setelah pencarian di mobile
    }
  };

  const adminWhatsAppNumber = "6281234567890";
  const waMessage = encodeURIComponent(
    "Halo Admin Gen Creator Hub, saya ingin bertanya sesuatu."
  );

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-[#1E90FF] via-[#1986DF] to-[#00B4FF] shadow-md">
      <div className="flex items-center justify-between h-16 px-4 max-w-6xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="GenCreator Logo"
            width={120}
            height={40}
            priority
            className="object-contain"
          />
        </Link>

        {/* 🔹 Search bar untuk layar besar */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex flex-1 mx-4 max-w-md"
        >
          <div className="relative w-full">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari kreator..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 text-sm text-gray-800 placeholder-gray-500 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </form>

        {/* 🔹 Ikon kanan */}
        <div className="flex items-center space-x-2">
          {/* Tombol Search untuk mobile */}
          <button
            className="p-2 rounded-full sm:hidden hover:bg-white/20 transition-colors text-white"
            title="Cari"
            onClick={() => setShowSearch(!showSearch)}
          >
            <IoSearchOutline size={22} />
          </button>

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

          {/* Menu */}
          <button
            className="p-2 rounded-full hover:bg-white/20 transition-all text-white"
            title="Menu"
          >
            <IoMenuOutline size={24} />
          </button>
        </div>
      </div>

      {/* 🔹 Search bar muncul di bawah navbar ketika di mobile */}
      {showSearch && (
        <div className="px-4 pb-3 bg-[#f8fafc] sm:hidden border-t border-gray-100">
          <form onSubmit={handleSearch} className="relative w-full mt-2">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari kreator..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 text-sm text-gray-800 placeholder-gray-500 border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </form>
        </div>
      )}
    </header>
  );
}
