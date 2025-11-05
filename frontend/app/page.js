// File: LandingPage_GenCreatorHub.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Globe, Phone, Mail, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import InfluencerCardSimple from "../components/InfluencerCardSimple"; 



export default function LandingPage() {
  const currentYear = new Date().getFullYear();
  const [isOpen, setIsOpen] = useState(false);

  // 2. Tambahkan state untuk influencers
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);

  const socialLinks = [
    { icon: <Instagram size={18} />, href: "https://instagram.com/gencreatorhub" },
    { icon: <Facebook size={18} />, href: "https://facebook.com/gencreatorhub" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/company/gencreatorhub" },
    { icon: <Youtube size={18} />, href: "https://youtube.com/@gencreatorhub" },
  ];

  const services = [
    {
      icon: "/icons/target.png",
      title: "Influencer & Media Marketing",
      desc: "Kolaborasi dengan influencer multi-tier untuk meningkatkan visibilitas dan engagement brand.",
    },
    {
      icon: "/icons/handshake.png",
      title: "Endorsement Campaign",
      desc: "Promosi melalui Story, Reels, dan Tiktok dengan influencer yang relevan dengan audiens Anda.",
    },
    {
      icon: "/icons/phone.png",
      title: "Sosial Media Handling",
      desc: "Kelola akun media sosial secara profesional dengan strategi kreatif dan analisis performa.",
    },
    {
      icon: "/icons/news.png",
      title: "Media & Event Collaboration",
      desc: "Publikasi di media sosial digital serta kolaborasi event untuk memperkuat kehadiran brand.",
    },
    {
      icon: "/icons/camera.png",
      title: "Creative Production",
      desc: "Produksi video dan konten visual yang estetik untuk memperkuat identitas brand.",
    },
    {
      icon: "/icons/trophy.png",
      title: "Influencer Summit",
      desc: "Event seru untuk influencer berjejaring dan beraktivitas bareng.",
    },
  ];

  // 3. Tambahkan useEffect untuk fetch data
  useEffect(() => {
    async function fetchRecommended() {
      try {
        // Ambil 10 influencer yang direkomendasikan
        const res = await fetch(
          `http://127.0.0.1:8080/api/influencers?recommended=true&limit=10`
        );
        if (res.ok) {
          const data = await res.json();
          setInfluencers(data.data || []);
        }
      } catch (error) {
        console.error("Gagal mengambil data rekomendasi:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecommended();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <div className="overflow-hidden">
      <main className="relative w-screen overflow-hidden flex flex-col text-gray-900 bg-white">
        {/* Background Glows */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute -top-48 -left-48 w-[420px] h-[420px] bg-indigo-200/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-80px] right-[-80px] w-[520px] h-[520px] bg-white rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[url('/textures/noise.png')] opacity-[0.04] mix-blend-overlay" />
        </div>

        {/* Navbar */}
        <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-100">
          <div className="max-w-full mx-auto flex items-center justify-between px-5 py-3">
            {/* Logo */}
            <Image
              src="/GCHub.svg"
              alt="Gen Creator Hub"
              width={140}
              height={60}
              className="object-contain h-10 md:h-12 w-auto"
            />

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-700">
              {["Home", "About", "Services"].map((item, i) => (
                <Link
                  key={i}
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {item}
                </Link>
              ))}
              <Link
                href="/home"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow hover:scale-105 hover:shadow-lg transition-all"
              >
                Temukan Kreator
              </Link>
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            className={`md:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <nav className="flex flex-col items-center gap-4 py-4 text-gray-700 font-medium">
              {["Home", "About", "Services"].map((item, i) => (
                <Link
                  key={i}
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {item}
                </Link>
              ))}
              <Link
                href="#"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow hover:scale-105 hover:shadow-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Temukan Kreator
              </Link>
            </nav>
          </div>
        </header>
        {/* Hero Section */}
        <section
          className="mt-10 w-full pt-24 pb-12 bg-white relative overflow-hidden"
          id="home"
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative z-10">
            {/* Left Content */}
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900">
                Influencer Build a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#C73AFF]">
                  Big Vision
                </span>{" "}
                Over Time
              </h1>

              <p className="text-gray-600 max-w-md md:max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
                Jangan hanya mengandalkan tools otomatis — jadilah manusia dan bangun
                komunitas yang autentik.{" "}
                <b className="text-gray-800">Gen Creator Hub</b> membantu
                menghubungkan brand dengan kreator yang relevan untuk pertumbuhan
                bersama.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mt-3">
                <Link
                  href="/home"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-tr-3xl rounded-bl-3xl shadow-md shadow-amber-500 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:scale-[1.03] transition-transform"
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
            </div>

            {/* Right Visual Area */}
            <div className="relative w-full flex justify-center md:justify-end">
              <Image
              src="/desain-gift.gif"
              alt="hero"
              width={1000}
              height={1000}
              className="w-full max-w-sm md:max-w-md"
            />
            </div>
          </div>
        </section>

        <section
          id="about"
          className="w-full bg-white  py-16 px-6"
        >
          <div className="max-w-6xl mx-auto text-gray-700">
            {/* Judul */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
                Tentang Gen Creator Hub
              </h2>
              <p className="text-sm uppercase tracking-widest text-indigo-500 font-semibold">
                Influencer & Media Marketing
              </p>
            </div>

            {/* Konten utama */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Teks */}
              <div className="flex-1 space-y-6">
                <p className="leading-relaxed">
                  <span className="font-semibold text-indigo-700">
                    Gen Creator Hub
                  </span>{" "}
                  bertujuan untuk menjembatani brand dengan influencer melalui
                  kolaborasi yang efektif. Platform ini memfasilitasi
                  komunikasi, mempertemukan brand dengan influencer, KOL, dan
                  kreator yang tepat, serta membantu dalam merancang kampanye
                  yang kreatif dan relevan.
                </p>

                <p className="leading-relaxed">
                  Dengan pendekatan yang terstruktur, kami berupaya meningkatkan
                  visibilitas brand dan memberikan nilai tambah bagi influencer
                  dalam menciptakan konten.
                </p>

                <h3 className="font-semibold text-lg text-gray-900">
                  Bagaimana Cara Kerja Gen Creator Hub?
                </h3>
                <p className="leading-relaxed">
                  GCH membantu menghubungkan brand dengan influencer yang tepat
                  dengan memanfaatkan fitur advanced targeting options dan
                  polling. Brand dapat memilih influencer berdasarkan
                  demografis, psikografis, geografis, dan segmentasi lain.
                </p>

                <h3 className="font-semibold text-lg text-gray-900">
                  Influencer Bagaimana yang Tersedia?
                </h3>
                <p className="leading-relaxed">
                  GCH memiliki influencer dan KOL dari segala tier — mulai dari
                  <span className="font-medium text-indigo-600">
                    {" "}
                    nano, micro, mid-tier, macro,{" "}
                  </span>
                  dan
                  <span className="font-medium text-indigo-600"> mega.</span>
                </p>
              </div>

              {/* Gambar ilustrasi */}
              <div className="flex-1 flex justify-center">
                <Image
                  src="/about-gch.png" // ganti dengan gambar kamu, misalnya yang di-upload
                  alt="Tentang Gen Creator Hub"
                  width={400}
                  height={400}
                  className="rounded-xl shadow-lg w-full max-w-sm md:max-w-md object-contain"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Services */}
        <section
          className="bg-white py-20 px-6 md:px-16 text-center"
          id="services"
        >
          <h2 className="text-3xl font-bold mb-3">Our Core Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Kami menyediakan layanan untuk membantu brand dan kreator berkembang
            bersama dalam dunia digital yang dinamis
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center text-center"
              >
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={60}
                  height={60}
                  className="mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Influencer Section */}
        <section id="influencers" className="bg-white py-16 px-6 md:px-16 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Influencer Unggulan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              Temukan influencer terbaik kami yang siap berkolaborasi...
            </p>

            {/* 4. Ganti data dummy dengan data dari state */}
            {loading ? (
              <p className="text-gray-500">Memuat influencer...</p>
            ) : (
              <div className="space-y-6">
                {/* Baris 1 */}
                <div className="overflow-hidden">
                  <div className="flex gap-4 animate-scroll-right">
                    {/* Gandakan data untuk efek looping mulus */}
                    {[...influencers, ...influencers].map((influencer, i) => (
                      <InfluencerCardSimple
                        key={`row1-${influencer.ID}-${i}`}
                        influencer={influencer}
                      />
                    ))}
                  </div>
                </div>

                {/* Baris 2 */}
                <div className="overflow-hidden">
                  <div className="flex gap-4 animate-scroll-left">
                    {/* Gandakan data untuk efek looping mulus */}
                    {[...influencers, ...influencers].map((influencer, i) => (
                       <InfluencerCardSimple
                        key={`row2-${influencer.ID}-${i}`}
                        influencer={influencer}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <style jsx>{`
            @keyframes scrollRight {
              0% {
                transform: translateX(-50%);
              }
              100% {
                transform: translateX(0%);
              }
            }

            @keyframes scrollLeft {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .animate-scroll-right {
              animation: scrollRight 40s linear infinite;
            }

            .animate-scroll-left {
              animation: scrollLeft 40s linear infinite;
            }

            /* Perkecil ukuran card */
            #influencers .flex > * {
              flex: 0 0 auto;
              width: 180px; /* sebelumnya 240px */
              transform: scale(0.9);
              transition: transform 0.3s ease;
            }

            /* Efek hover biar tetap elegan */
            #influencers .flex > *:hover {
              transform: scale(0.95);
            }

            /* Sembunyikan tombol kolaborasi & detail */
            button.bg-lime-300,
            button.bg-blue-500 {
              display: none !important;
            }

            /* Responsif di layar kecil */
            @media (max-width: 768px) {
              #influencers .flex > * {
                width: 150px;
                transform: scale(0.85);
              }
            }
          `}</style>
        </section>

        {/* Footer */}
        <footer className="w-full bg-white border-t border-gray-100 mt-10 py-10 md:py-12">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 text-gray-700 text-sm">

            {/* Kolom 1: Logo & Deskripsi */}
            <div className="flex flex-col items-start space-y-3">
              {/* Logo utama */}
              <a href="/home" className="flex items-center group">
                <Image
                  src="/GCHub.svg"
                  alt="Gen Creator Hub Logo"
                  width={38}
                  height={38}
                  className="object-contain"
                />
                <span className="ml-2 text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  Gen Creator Hub
                </span>
              </a>

              {/* Logo partner */}
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-xs text-gray-500">Partnered by</p>
                <Image
                  src="/gentra.id.png"
                  alt="Gentra.id Logo"
                  width={70}
                  height={25}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>

              <p className="text-xs leading-relaxed text-gray-600 max-w-xs">
                Platform martech yang menghubungkan brand dengan influencer melalui sistem terintegrasi, efisien, dan cerdas.
              </p>

              {/* Sosial media */}
              <div className="flex space-x-3 mt-2">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full border border-gray-200 hover:border-orange-500 hover:text-orange-500 transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Kolom 2: Contact Us */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Contact Us
              </h3>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center">
                  <Mail className="text-orange-500 mr-2" size={15} />
                  <a href="mailto:gentracreatorhub@gmail.com" className="hover:text-orange-600 transition-colors">
                    gentracreatorhub@gmail.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Globe className="text-orange-500 mr-2" size={15} />
                  <a href="https://gencreatorhub.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">
                    gencreatorhub.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="text-orange-500 mr-2" size={15} />
                  <a href="https://wa.me/6281324511998" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">
                    0813-2451-1998 (WhatsApp)
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Quick Links
              </h3>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="hover:text-orange-600 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-orange-600 transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-orange-600 transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Kolom 4: Call to Action */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Bergabunglah Bersama Kami
              </h3>
              <p className="text-xs leading-relaxed text-gray-600">
                Siap memperluas jangkauan brand Anda atau berkolaborasi dengan influencer terbaik? Hubungi kami sekarang juga!
              </p>
              <button
                className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-xs uppercase tracking-wide shadow-sm hover:shadow-md hover:from-orange-600 hover:to-red-700 transition-all"
              >
                Mulai Sekarang
              </button>
            </div>
          </div>

          {/* Garis Bawah */}
          <div className="border-t border-gray-200 mt-10 pt-4 text-center text-xs text-gray-500">
            © {currentYear} <span className="text-gray-900 font-semibold">PT Gentra Media Utama</span>. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
