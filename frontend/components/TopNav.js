"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  IoSearchOutline,
  IoPaperPlaneOutline,
  IoMenuOutline,
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

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-16 bg-[#1986DF] shadow-md px-4">
      <div className="flex items-center justify-between h-full max-w-6xl mx-auto">
        
        {/* Logo SVG (lebih besar & proporsional) */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg" // pastikan file di /public/logo.svg
            alt="GenCreator Logo"
            width={130}
            height={130}
            priority
            className="object-contain"
          />
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 mx-4 max-w-md hidden sm:block"
        >
          <div className="relative">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari kreator, konten, atau kategori..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-gray-800 placeholder-gray-400 border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-200"
            />
          </div>
        </form>

        {/* Icon Buttons */}
        <div className="flex items-center space-x-3">
          <button
            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            title="Pesan"
          >
            <IoPaperPlaneOutline size={22} />
          </button>
          <button
            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            title="Menu"
          >
            <IoMenuOutline size={26} />
          </button>
        </div>
      </div>
    </header>
  );
}
