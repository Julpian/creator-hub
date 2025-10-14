// File: components/TopNav.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  IoSearchOutline,
  IoMenuOutline,
  IoLogoWhatsapp, // <-- 1. Impor ikon WhatsApp
} from "react-icons/io5";

export default function TopNav() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${query}`);
    }
  };

  // Ganti dengan nomor WhatsApp admin Anda
  const adminWhatsAppNumber = "6281234567890";
  const waMessage = encodeURIComponent("Halo Admin Gen Creator Hub, saya ingin bertanya sesuatu.");

  return (
    // PERUBAHAN: Ganti warna header menjadi putih dengan shadow
    <header className="fixed top-0 left-0 z-50 w-full h-16 bg-gradient-to-r from-[#1E90FF]/90 via-[#1986DF]/90 to-[#00B4FF]/90 backdrop-blur-sm shadow-md px-4">
      <div className="flex items-center justify-between h-full max-w-6xl mx-auto">
        
        {/* PERUBAHAN: Sesuaikan ukuran Logo agar lebih proporsional */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg" // Pastikan file ada di /public/logo.svg
            alt="GenCreator Logo"
            width={120} // Ukuran lebih pas untuk header
            height={40}
            priority
            className="object-contain"
          />
        </Link>

        {/* Search Bar untuk layar medium ke atas */}
        <form
          onSubmit={handleSearch}
          className="flex-1 mx-4 max-w-md hidden sm:flex" // Tampil di layar sm ke atas
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

        {/* Icon Buttons */}
        <div className="flex items-center space-x-2">
          {/* PERUBAHAN: Ikon Search khusus untuk mobile */}
          <button className="p-2 rounded-full sm:hidden hover:bg-gray-100 transition-colors text-gray-600" title="Cari">
            <IoSearchOutline size={24} />
          </button>

          {/* PERUBAHAN: Ganti ikon Pesan dengan WhatsApp */}
          <a
            href={`https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"
            title="Hubungi via WhatsApp"
          >
            <IoLogoWhatsapp size={24} className="text-white" />
          </a>
          <button
            className="p-2 rounded-full hover:bg-white/10 transition-all"
            title="Menu"
          >
            <IoMenuOutline
              size={26}
              className="text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.6)]"
            />
          </button>
        </div>
      </div>
    </header>
  );
}