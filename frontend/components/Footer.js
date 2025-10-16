// File: components/Footer.js
"use client";

import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
// Note: Untuk icon social media, saya ganti menggunakan SVG dari simpleicons.org atau library serupa untuk tampilan lebih modern dan minimalis.
// Anda bisa install @iconify/react jika belum, atau gunakan SVG inline. Di sini saya gunakan Lucide untuk consistency, tapi modifikasi style agar lebih clean.
// Untuk TikTok, ganti Music menjadi icon yang lebih representatif; Lucide tidak punya TikTok spesifik, jadi gunakan Video atau custom.

import { Facebook, Instagram, Linkedin, Video } from "lucide-react"; // Ganti Music menjadi Video untuk TikTok agar lebih relevan dan tidak jelek.

export default function Footer() {
  const socialMedia = [
    { icon: <Facebook size={20} strokeWidth={1.5} />, href: "https://facebook.com/gencreatorhub" },
    { icon: <Instagram size={20} strokeWidth={1.5} />, href: "https://instagram.com/gencreatorhub" },
    { icon: <Linkedin size={20} strokeWidth={1.5} />, href: "https://linkedin.com/company/gencreatorhub" },
    { icon: <Video size={20} strokeWidth={1.5} />, href: "https://tiktok.com/@gencreatorhub" }, // Ganti ke Video untuk representasi TikTok yang lebih modern.
  ];

  return (
    <footer className="bg-black text-gray-300 px-4 py-8 md:py-12"> {/* Tingkatkan padding untuk spacing lebih minimalis */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"> {/* Lebih lebar max-w, gap lebih besar untuk airy feel */}
        
        {/* Kolom 1: Logo & Deskripsi - Buat lebih ringkas */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Image
            src="/GCH.png"
            alt="Gen Creator Hub"
            width={60}
            height={60}
            className="object-contain mb-4"
          />
          <p className="text-sm leading-6">
            <span className="font-semibold text-white">Gen Creator Hub</span> adalah platform martech yang menyediakan solusi lengkap untuk pemasaran KOL di Instagram, TikTok, dan YouTube — terintegrasi dalam satu sistem cerdas.
          </p>
        </div>

        {/* Kolom 2: Informasi Perusahaan - Rapihkan alamat */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-white font-medium text-base mb-3"> {/* Kurangi font size untuk minimalis */}
            PT Gentra Media Utama
          </h3>
          <p className="text-sm leading-6">
            Ruko Jl. Permata Regency Blok C 15,<br />
            Tugujaya, Kec. Cihideung, Kab. Tasikmalaya,<br />
            Jawa Barat 46115
          </p>
        </div>

        {/* Kolom 3: Kontak - Icon lebih besar dan stroke lebih tipis untuk modern */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-white font-medium text-base mb-3">
            Hubungi Kami
          </h4>
          <ul className="space-y-2 text-sm"> {/* Kurangi space-y untuk tighter */}
            <li>
              <a
                href="mailto:support@GCH.id"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"
              >
                <Mail size={20} strokeWidth={1.5} /> support@GCH.id
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"
              >
                <MessageCircle size={20} strokeWidth={1.5} /> Chat via WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 4: Media Sosial - Icon lebih besar, background transparent agar minimalis */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-white font-medium text-base mb-3">
            Temukan Kami di
          </h4>
          <div className="flex justify-center md:justify-start gap-3"> {/* Gap lebih kecil */}
            {socialMedia.map((sosmed, index) => (
              <a
                key={index}
                href={sosmed.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-800 transition-all duration-300" // Ganti bg-white ke transparent hover bg-gray-800 untuk minimalis dark mode
              >
                {sosmed.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright - Lebih sederhana */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs text-gray-500"> {/* Border lebih subtle */}
        © {new Date().getFullYear()} <span className="text-white">Gen Creator Hub</span>. All rights reserved.
      </div>
    </footer>
  );
}