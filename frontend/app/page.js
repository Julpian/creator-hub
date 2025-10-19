// File: LandingPage_GenCreatorHub.jsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50/30 to-pink-50/40 text-gray-900">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-48 -left-48 w-[420px] h-[420px] bg-indigo-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[520px] h-[520px] bg-pink-200/30 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[url('/textures/noise.png')] opacity-[0.04] mix-blend-overlay" />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
          <Image
            src="/GCHub.svg"
            alt="Gen Creator Hub"
            width={140}
            height={60}
            className="object-contain h-10 md:h-12 w-auto"
          />

          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-700">
            {["Home", "Services", "Our Works", "Creators"].map((item, i) => (
              <Link
                key={i}
                href={item === "Home" ? "#" : `#${item.toLowerCase().replace(" ", "")}`}
                className="hover:text-indigo-600 transition-colors"
              >
                {item}
              </Link>
            ))}
            <Link
              href="#"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow hover:scale-105 hover:shadow-lg transition-all"
            >
              Login
            </Link>
          </nav>

          <div className="md:hidden">
            <button className="px-4 py-2 rounded bg-indigo-100 text-indigo-700 font-medium">
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full pt-28 md:pt-32 pb-16 bg-gradient-to-br from-[#F9FAFF] via-[#FFF9FB] to-[#F1F4FF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Influencers Build a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#C73AFF]">
                Big Vision
              </span>{" "}
              Over Time
            </h1>

            <p className="text-gray-600 max-w-md md:max-w-lg mx-auto md:mx-0 leading-relaxed">
              Jangan hanya mengandalkan tools otomatis. Jadilah manusia dan bangun
              komunitas yang autentik — <b>Gen Creator Hub</b> membantu menghubungkan
              brand dengan kreator yang tepat melalui analisis data, tren, dan insight
              kreatif yang relevan untuk pertumbuhan bersama.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
              <Link
                href="/home"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:scale-[1.03] transition-transform"
              >
                Temukan Kreator
              </Link>
              <button className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 text-gray-800 shadow hover:bg-gray-50 transition">
                <span className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full">
                  ▶
                </span>
                Watch how we work
              </button>
            </div>

            {/* Indicators */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-gray-700 text-sm mt-6">
              {["Identification", "Strategy & Planning", "Trend Analysis"].map((text) => (
                <span key={text} className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Right Visual Area */}
          <div className="relative w-full flex justify-center md:justify-end">
            {/* Grid Pattern */}
            <div className="relative grid grid-cols-3 grid-rows-3 gap-3 w-[330px] sm:w-[400px] lg:w-[460px]">
              {/* Kotak 1 - FB */}
              <div className="bg-blue-100 rounded-2xl flex items-center justify-center aspect-square">
                <Image src="/icons/facebook.png" alt="Facebook" width={90} height={90} />
              </div>

              {/* Kotak 2 - Ornamen */}
              <div className="bg-yellow-200 rounded-2xl flex items-center justify-center aspect-square">
                <div className="w-1/2 h-1/2 rounded-full border-[8px] border-yellow-500"></div>
              </div>

              {/* Kotak 3 - Influencer */}
              <div className="relative bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
                <Image
                  src="/hero/influencer1.svg"
                  alt="Influencer"
                  width={120}
                  height={120}
                  className="rounded-full object-cover z-10"
                />
              </div>

              {/* Kotak 4 - Tiktok */}
              <div className="bg-purple-200 rounded-2xl flex items-center justify-center aspect-square">
                <Image src="/icons/tiktok.png" alt="TikTok" width={80} height={80} />
              </div>

              {/* Kotak 5 - Ornamen Tengah */}
              <div className="bg-blue-200 rounded-2xl flex items-center justify-center aspect-square">
                <div className="w-2/3 h-2/3 rounded-full border-[10px] border-blue-500"></div>
              </div>

              {/* Kotak 6 - Influencer */}
              <div className="relative bg-gradient-to-br from-yellow-100 to-orange-50 rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
                <Image
                  src="/hero/influencer2.png"
                  alt="Influencer"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              </div>

              {/* Kotak 7 - Instagram */}
              <div className="bg-gradient-to-br from-pink-200 to-yellow-200 rounded-2xl flex items-center justify-center aspect-square">
                <Image src="/icons/instagram.png" alt="Instagram" width={90} height={90} />
              </div>

              {/* Kotak 8 - Ornamen */}
              <div className="bg-orange-100 rounded-2xl flex items-center justify-center aspect-square">
                <div className="rotate-45 w-1/2 h-1/2 border-[8px] border-orange-400"></div>
              </div>

              {/* Kotak 9 - Influencer */}
              <div className="relative bg-gradient-to-br from-purple-100 to-pink-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
                <Image
                  src="/hero/influencer3.png"
                  alt="Influencer"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Efek cahaya latar */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/10 via-[#C73AFF]/10 to-[#FF6BD6]/10 blur-3xl"></div>
      </section>

      {/* Services */}
      <section id="services" className="w-full py-16 bg-gradient-to-br from-white to-blue-50/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Our Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Affiliate & Conversion",
                desc: "Optimasi kampanye afiliasi dan pengukuran hasil yang nyata berbasis data.",
              },
              {
                title: "Online Event",
                desc: "Kami bantu wujudkan event online yang menarik, kreatif, dan berdampak.",
              },
              {
                title: "Product Placement",
                desc: "Koneksikan produk Anda dengan kreator relevan untuk exposure maksimal.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center md:text-left"
              >
                <h4 className="font-semibold mb-2 text-lg text-gray-900">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-10 border-t border-gray-100 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-600 text-sm">
          <div className="flex items-center gap-3">
            <Image src="/GCHub.svg" alt="logo" width={110} height={36} />
            <p>© {new Date().getFullYear()} Gen Creator Hub. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-indigo-600 transition">Privacy</Link>
            <Link href="#" className="hover:text-indigo-600 transition">Terms</Link>
            <Link href="#" className="hover:text-indigo-600 transition">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
