"use client";

import Image from "next/image";
import { Mail, MessageCircle, Facebook, Instagram, Linkedin, Video } from "lucide-react";

export default function Footer() {
  const socialMedia = [
    { icon: <Facebook size={20} strokeWidth={1.5} />, href: "https://facebook.com/gencreatorhub" },
    { icon: <Instagram size={20} strokeWidth={1.5} />, href: "https://instagram.com/gencreatorhub" },
    { icon: <Linkedin size={20} strokeWidth={1.5} />, href: "https://linkedin.com/company/gencreatorhub" },
    { icon: <Video size={20} strokeWidth={1.5} />, href: "https://tiktok.com/@gencreatorhub" },
  ];

  return (
    <footer className="bg-white text-gray-700 w-full border-t border-gray-200">
      <div className="max-w-lg md:max-w-6xl mx-auto px-5 sm:px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">

          {/* Kolom 1: Logo & Deskripsi */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/GCHub.svg"
              alt="Gen Creator Hub"
              width={60}
              height={60}
              className="object-contain mb-4"
            />
            <p className="text-sm leading-6 text-gray-600">
              <span className="font-semibold text-gray-900">Gen Creator Hub</span> adalah platform martech yang menyediakan solusi lengkap untuk pemasaran KOL di Instagram, TikTok, dan YouTube — terintegrasi dalam satu sistem cerdas.
            </p>
          </div>

          {/* Kolom 2: Info Perusahaan */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-gray-900 font-semibold text-base mb-3">
              PT Gentra Media Utama
            </h3>
            <p className="text-sm leading-6 text-gray-600">
              Setra Royal Residence C9,<br />
              Empangsari, Kec. Tawang, Kota Tasikmalaya, 46113
            </p>
          </div>

          {/* Kolom 3: Kontak */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-gray-900 font-semibold text-base mb-3">
              Hubungi Kami
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:support@GCH.id"
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-blue-600 transition-colors"
                >
                  <Mail size={20} strokeWidth={1.5} /> support@GCH.id
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-blue-600 transition-colors"
                >
                  <MessageCircle size={20} strokeWidth={1.5} /> Chat via WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Media Sosial */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-gray-900 font-semibold text-base mb-3">
              Temukan Kami di
            </h4>
            <div className="flex justify-center md:justify-start gap-3">
              {socialMedia.map((sosmed, index) => (
                <a
                  key={index}
                  href={sosmed.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all duration-300"
                >
                  {sosmed.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Garis bawah dan copyright */}
        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="text-gray-900 font-medium">PT Gentra Media Utama</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
