"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, Facebook, Instagram, Linkedin, Video } from "lucide-react";

export default function Footer() {
  const socialMedia = [
    { icon: <Facebook size={18} />, href: "https://facebook.com/gencreatorhub" },
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/gencreatorhub/" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/company/gencreatorhub" },
    { icon: <Video size={18} />, href: "https://tiktok.com/@gencreatorhub" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-10 py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 text-gray-700 text-sm">
        {/* Kolom 1: Logo + Deskripsi */}
        <div className="flex flex-col items-start space-y-3">
          <Link href="/" className="flex items-center group">
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
          </Link>

          {/* Logo partner */}
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-xs text-gray-500">Powered by</p>
            <Image
              src="/gentra.id.png"
              alt="Gentra.id Logo"
              width={70}
              height={25}
              className="object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>

          <p className="text-xs leading-relaxed text-gray-600 max-w-xs">
            Platform cerdas yang mempermudah kolaborasi antara brand dan influencer secara efisien dan terintegrasi.
          </p>

          {/* sosial media */}
          <div className="flex space-x-3 mt-2">
            {socialMedia.map((s, i) => (
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

        {/* Kolom 2: Info Perusahaan */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            PT Gentra Media Utama
          </h3>
          <p className="text-xs leading-relaxed text-gray-600">
            Setra Royal Residence C9,<br />
            Empangsari, Kec. Tawang,<br />
            Kota Tasikmalaya, 46113
          </p>
        </div>

        {/* Kolom 3: Contact */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Contact Us
          </h3>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center">
              <Mail className="text-orange-500 mr-2" size={15} />
              <a href="mailto:support@GCH.id" className="hover:text-orange-600 transition-colors">
                support@GCH.id
              </a>
            </li>
            <li className="flex items-center">
              <MessageCircle className="text-orange-500 mr-2" size={15} />
              <a
                href="https://wa.me/6281111018811"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-600 transition-colors"
              >
                Chat via WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 4: Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-orange-600 transition-colors">
                Home
              </Link>
            </li>
            <li><a href="#about" className="hover:text-orange-600 transition-colors">About</a></li>
            <li><a href="#services" className="hover:text-orange-600 transition-colors">Services</a></li>
            <li><a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a></li>
          </ul>
        </div>

      </div>

      {/* Garis bawah */}
      <div className="border-t border-gray-200 mt-10 pt-4 text-center text-xs text-gray-500">
        © {currentYear} <span className="text-gray-900 font-semibold">PT Gentra Media Utama</span>. All rights reserved.
      </div>
    </footer>
  );
}
