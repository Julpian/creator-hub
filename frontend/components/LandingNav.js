// File: components/LandingNav.js
import Link from 'next/link';
import Image from 'next/image';

export default function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Gen Creator Hub Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Menu Navigasi (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/home" className="text-gray-600 hover:text-indigo-600 font-medium transition">
            Fitur
          </Link>
          <Link href="/tentang-kami" className="text-gray-600 hover:text-indigo-600 font-medium transition">
            Tentang Kami
          </Link>
          {/* Link ke halaman paket jika ada, atau scroll ke section */}
          <Link href="/#paket" className="text-gray-600 hover:text-indigo-600 font-medium transition"> 
            Paket
          </Link>
          <Link href="/login" className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition">
            Login Admin
          </Link>
        </div>

        {/* Tombol Menu Mobile (Placeholder) */}
        <div className="md:hidden">
          <button className="text-gray-600 p-2 rounded hover:bg-gray-100">
            {/* Ganti dengan ikon hamburger nanti */}
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
}