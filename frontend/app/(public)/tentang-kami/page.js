// File: app/(public)/tentang-kami/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoChevronDownOutline,
  IoChatbubbleEllipsesOutline,
  IoPersonAddOutline,
  IoArrowBack,
  IoLogoWhatsapp,
} from "react-icons/io5";

export default function TentangKamiPage() {
  const [showDesc, setShowDesc] = useState(true);

  const adminWhatsAppNumber = "6281234567890";
  const waMessage = encodeURIComponent(
    "Halo Admin Gen Creator Hub, saya ingin bertanya sesuatu."
  );

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16 px-4 relative overflow-hidden">
      
      {/* Header */}
      <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-[#1E90FF] via-[#1986DF] to-[#00B4FF] shadow-md text-white backdrop-blur-md">
        <div className="flex items-center justify-between h-16 px-4 sm:px-8 max-w-5xl mx-auto">
          <Link
            href="/"
            className="hover:text-blue-200 transition-transform active:scale-95"
          >
            <IoArrowBack size={26} />
          </Link>

          <h1 className="text-base sm:text-lg font-semibold tracking-wide text-center flex-1">
            Rekomendasi Influencer
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

      {/* Bayangan lembut di background */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50"></div>

      {/* Wrapper konten utama */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-md sm:max-w-xl"
      >
        {/* Logo mengambang */}
        <div className="flex justify-center mb-[-3rem] z-10 relative">
          <div className="bg-[#1986DF] p-1 rounded-full shadow-lg border border-gray-100">
            <Image
              src="/logo.svg" // ganti sesuai logo kamu
              alt="Gen Creator Hub Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </div>

        {/* Kartu utama */}
        <div className="bg-white rounded-3xl shadow-xl pt-16 pb-8 px-6 sm:px-10 relative z-0 border border-gray-100">
          {/* Judul */}
          <div className="text-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Gen Creator Hub
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Influencer & KOL Management
            </p>
          </div>

          {/* Tombol Toggle */}
          <button
            onClick={() => setShowDesc(!showDesc)}
            className="w-full bg-blue-600 text-white rounded-xl flex items-center justify-between py-3 px-4 text-sm font-semibold shadow-md hover:bg-blue-700 transition"
          >
            <span>Apa itu Gen Creator Hub?</span>
            <IoChevronDownOutline
              size={20}
              className={`transition-transform duration-300 ${
                showDesc ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Deskripsi dengan animasi buka/tutup */}
          <AnimatePresence>
            {showDesc && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-100 rounded-xl mt-4 p-5 text-gray-700 text-sm sm:text-base leading-relaxed">
                  Gen Creator Hub adalah sebuah platform yang menghubungkan brand
                  dengan kreator konten (influencer & KOL) di seluruh Indonesia.
                  Kami membantu bisnis kecil hingga besar untuk menemukan kreator
                  yang tepat dalam mempromosikan produk dan jasa secara efektif,
                  efisien, dan transparan.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Section Bantuan */}
        <div className="bg-blue-600 text-white rounded-3xl mt-8 p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-40"></div>
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold">Butuh bantuan?</h2>
              <p className="text-white/90 text-sm mt-1">
                Kami siap membantu kamu kapan saja!
              </p>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white text-blue-600 font-semibold py-2.5 px-5 rounded-full hover:bg-gray-100 transition">
                <IoChatbubbleEllipsesOutline size={20} />
                Tanya
              </button>
              <button className="flex items-center gap-2 bg-white text-blue-600 font-semibold py-2.5 px-5 rounded-full hover:bg-gray-100 transition">
                <IoPersonAddOutline size={20} />
                Gabung
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
