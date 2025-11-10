"use client";
import Image from "next/image";
import Link from "next/link";

export default function SummitPage() {
  return (
    <main className="bg-gray-900 text-white font-sans scroll-smooth">
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-md z-50 shadow-md">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Gen Creator Hub"
              width={40}
              height={40}
            />
            <span className="font-bold text-lg text-orange-400">
              GEN CREATOR HUB
            </span>
          </Link>

          {/* Nav Menu */}
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-orange-400 transition">
              Home
            </Link>
            <Link href="#tentang" className="hover:text-orange-400 transition">
              Informasi
            </Link>
            <Link href="#contact" className="hover:text-orange-400 transition">
              Contact
            </Link>
            <a
              href="https://wa.me/6281234567890"
              className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold hover:bg-green-600 transition"
            >
              WhatsApp
            </a>
          </div>
        </nav>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero/summit-bg.jpg" // ganti nanti dengan gambar kamu
            alt="Influencer Summit Background"
            fill
            className="object-cover brightness-50"
          />
        </div>

        {/* Overlay konten */}
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3">
            Influencer <span className="text-sky-400">Summit</span>{" "}
            <span className="text-orange-400">2025</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            empowering growth creating impact
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
            <div className="bg-gray-800/70 px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="text-sky-400 font-semibold">300+</span> Influencer
              & Media
            </div>
            <div className="bg-gray-800/70 px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📅 Rabu, 17 Desember 2025</span>
            </div>
            <div className="bg-gray-800/70 px-4 py-2 rounded-lg flex items-center gap-2">
              <span>🏨 Hotel Harmoni, Kota Tasikmalaya</span>
            </div>
          </div>

          {/* Tagline kategori */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="bg-pink-600 px-3 py-1 rounded-full text-sm">
              Workshop
            </span>
            <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm text-gray-900">
              Brand Creator Networking
            </span>
            <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
              Gen Award
            </span>
            <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
              Entertainment
            </span>
          </div>

          {/* Tombol utama */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold text-white transition"
            >
              Download Proposal
            </a>
            <a
              href="#contact"
              className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-semibold text-gray-900 transition"
            >
              Hubungi Kami
            </a>
            <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
              <a
                href="#"
                className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Daftar Brand
              </a>
              <a
                href="#"
                className="bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Daftar Peserta
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TENTANG EVENT ===== */}
      <section
        id="tentang"
        className="bg-white text-gray-800 py-20 px-6 md:px-16"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Tentang Event
          </h2>
          <p className="text-lg leading-relaxed mb-10">
            <strong>Influencer Summit</strong> merupakan event yang
            mempertemukan para influencer, brand, media, dan pelaku industri
            digital untuk berjejaring, berbagi wawasan, dan membangun kolaborasi
            strategis.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Tujuan & Manfaat
          </h3>
          <ul className="space-y-3 text-lg leading-relaxed list-disc list-inside">
            <li>
              Memberdayakan kreator agar memiliki kapasitas, wawasan, dan
              mindset pertumbuhan dalam industri digital.
            </li>
            <li>
              Mendorong kolaborasi antara kreator, brand, dan komunitas untuk
              menciptakan dampak sosial dan ekonomi yang positif.
            </li>
            <li>
              Membuka peluang aktivasi dan eksposur brand di komunitas kreatif
              digital.
            </li>
            <li>
              Membangun ekosistem kreatif yang berkelanjutan melalui kegiatan
              edukasi, networking, dan apresiasi.
            </li>
          </ul>

          {/* Ikon di bawah teks */}
          <div className="mt-12 flex justify-center">
            <Image
              src="/icons/kolaborasi.png" // ganti dengan ikon 3 orang warna oranye–ungu
              alt="Kolaborasi Icon"
              width={160}
              height={160}
            />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        id="contact"
        className="bg-gray-900 text-gray-400 py-10 text-center text-sm"
      >
        <p>
          © {new Date().getFullYear()} Gen Creator Hub — Influencer Summit 2025
        </p>
      </footer>
    </main>
  );
}
