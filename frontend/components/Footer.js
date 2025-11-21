"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const socialMedia = [
    {
      href: "https://facebook.com/gencreatorhub",
      label: "Facebook",
      icon: "/footer/facebook.png",
    },
    {
      href: "https://www.instagram.com/gencreatorhub/",
      label: "Instagram",
      icon: "/footer/instagram.png",
    },
    {
      href: "https://linkedin.com/company/gencreatorhub",
      label: "LinkedIn",
      icon: "/footer/linkedin.png",
    },
    {
      href: "https://tiktok.com/@gencreatorhub",
      label: "TikTok",
      icon: "/footer/tiktok.png",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-10 py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 text-gray-700 text-sm">

        {/* Kolom 1: Logo & Deskripsi */}
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

          {/* Powered By */}
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

          {/* Social media icons */}
          <div className="flex space-x-3 mt-2">
            {socialMedia.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-1.5 rounded-full border border-gray-200 hover:border-orange-500 transition group"
              >
                <Image
                  src={s.icon}
                  alt={s.label}
                  width={18}
                  height={18}
                  className="opacity-80 group-hover:opacity-100 transition"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Kolom 2: Alamat Perusahaan */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            PT Gentra Media Utama
          </h3>
          <p className="text-xs leading-relaxed text-gray-600">
            Empangsari, Kec. Tawang,<br />
            Kota Tasikmalaya, 46113
          </p>
        </div>

        {/* Kolom 3: Kontak */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Contact Us
          </h3>
          <ul className="space-y-2 text-xs">

            {/* Email */}
            <li className="flex items-center">
              <Image
                src="/footer/email.png"
                alt="Email Icon"
                width={16}
                height={16}
                className="mr-2 opacity-80"
              />
              <a
                href="mailto:support@GCH.id"
                className="hover:text-orange-600 transition-colors"
              >
                support@GCH.id
              </a>
            </li>

            {/* WhatsApp */}
            <li className="flex items-center">
              <Image
                src="/footer/whatsapp.png"
                alt="WhatsApp Icon"
                width={17}
                height={17}
                className="mr-2 opacity-80"
              />
              <a
                href="https://wa.me/6281111018811"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-600 transition-colors"
              >
                WhatsApp Support
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
            <li>
              <a href="#about" className="hover:text-orange-600 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-orange-600 transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-orange-600 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 mt-10 pt-4 text-center text-xs text-gray-500">
        © {currentYear} <span className="text-gray-900 font-semibold">PT Gentra Media Utama</span>. All rights reserved.
      </div>
    </footer>
  );
}
