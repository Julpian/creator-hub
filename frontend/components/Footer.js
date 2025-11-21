"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const socialMedia = [
    {
      href: "https://facebook.com/gencreatorhub",
      label: "Facebook",
      svg: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 
          24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 
          4.659-4.788 1.325 0 2.464.099 2.796.143v3.24h-1.918c-1.504 
          0-1.795.715-1.795 1.763v2.314h3.587l-.467 3.622h-3.12V24h6.116C23.403 
          24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
        </svg>
      )
    },
    {
      href: "https://www.instagram.com/gencreatorhub/",
      label: "Instagram",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 
          3.608 1.325.975.975 1.262 2.242 1.324 3.608.058 1.266.07 
          1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 
          2.633-1.324 3.608-.975.975-2.242 1.262-3.608 
          1.324-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.324-.975-.975-1.262-2.242-1.324-3.608C2.175 
          15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 
          1.324-3.608.975-.975 2.242-1.262 3.608-1.324C8.416 2.175 8.796 
          2.163 12 2.163zm0 3.675a6.162 6.162 0 100 12.324 6.162 6.162 0 
          000-12.324zm7.2-.865a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
        </svg>
      )
    },
    {
      href: "https://linkedin.com/company/gencreatorhub",
      label: "LinkedIn",
      svg: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 
          2.5S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 
          2.48 2.5zM.24 24h4.52V7.98H.24V24zM7.92 
          7.98v16.02h4.52v-8.4c0-2.22.42-4.38 
          3.18-4.38 2.72 0 2.76 2.52 2.76 4.52V24H23V15.02c0-4.92-1.08-8.7-6.96-8.7-2.82 
          0-4.2 1.56-4.9 2.7h-.06V7.98H7.92z"/>
        </svg>
      )
    },
    {
      href: "https://tiktok.com/@gencreatorhub",
      label: "TikTok",
      svg: (
        <svg width="18" height="18" viewBox="0 0 48 48" fill="currentColor">
          <path d="M33.54 10.09c2 1.43 4.09 2.31 6.46 
          2.55V4.57C37.85 4.1 35.61 3 33.54 1.5v8.59zM20.24 
          14.74c-5.52 0-10 4.48-10 10s4.48 10 10 
          10c5.52 0 10-4.48 10-10v-9.03c-2.05 0-4.06-.63-5.77-1.8v10.83c0 
          2.74-2.23 4.97-4.97 4.97s-4.97-2.23-4.97-4.97 2.23-4.97 4.97-4.97c.44 
          0 .87.06 1.28.17v-6.1c-.42-.04-.85-.07-1.28-.07z"/>
        </svg>
      )
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-10 py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 text-gray-700 text-sm">
        
        {/* Kolom 1 */}
        <div className="flex flex-col items-start space-y-3">
          <Link href="/" className="flex items-center group">
            <Image
              src="/GCHub.svg"
              alt="Gen Creator Hub Logo"
              width={38}
              height={38}
            />
            <span className="ml-2 text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
              Gen Creator Hub
            </span>
          </Link>

          {/* Partner */}
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

          {/* Sosial Media */}
          <div className="flex space-x-3 mt-2">
            {socialMedia.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-1.5 rounded-full border border-gray-200 hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Kolom 2 */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            PT Gentra Media Utama
          </h3>
          <p className="text-xs leading-relaxed text-gray-600">
            Empangsari, Kec. Tawang,<br />
            Kota Tasikmalaya, 46113
          </p>
        </div>

        {/* Kolom 3 Contact */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Contact Us
          </h3>
          <ul className="space-y-2 text-xs">

            {/* Email */}
            <li className="flex items-center">
              <svg width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 
                2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 
                2-2V6c0-1.1-.9-2-2-2zm0 
                4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>

              <a href="mailto:support@GCH.id" className="hover:text-orange-600 transition-colors">
                support@GCH.id
              </a>
            </li>

            {/* WA */}
            <li className="flex items-center">
              <svg width="17" height="17" fill="currentColor" className="mr-2" viewBox="0 0 32 32">
                <path d="M16 3C9.4 3 4 8.4 4 
                15c0 2.5.8 4.8 2.1 6.7L4 29l7.5-2c1.8 1 
                3.9 1.5 6.5 1.5 6.6 0 12-5.4 12-12S22.6 
                3 16 3zm0 22.5c-2.1 0-4-.6-5.6-1.7l-.4-.2-4.4 
                1.2 1.2-4.3-.3-.4C5.5 18.5 5 16.8 5 
                15c0-6 5-11 11-11s11 5 11 11-5 
                10.5-11 10.5zm5.2-7.9c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 
                1-.9 1.1-.2.1-.3.1-.6 0-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 
                0-.5.1-.6.1-.1.3-.3.4-.4.2-.2.3-.3.4-.5.1-.2 
                0-.4 0-.5-.1-.1-.7-1.6-.9-2.1-.2-.5-.4-.4-.6-.4h-.5c-.2 
                0-.5.1-.7.3-.2.3-1 1-1 2.4s1 2.8 
                1.1 3c.1.2 2.1 3.2 5.2 4.5.7.3 1.2.5 
                1.6.6.7.2 1.3.2 1.7.1.5-.1 1.7-.7 
                2-1.4s.3-1.2.2-1.4c-.2-.1-.5-.2-.8-.3z"/>
              </svg>

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

        {/* Kolom 4 */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
            <li><a href="#about" className="hover:text-orange-600 transition-colors">About</a></li>
            <li><a href="#services" className="hover:text-orange-600 transition-colors">Services</a></li>
            <li><a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-200 mt-10 pt-4 text-center text-xs text-gray-500">
        © {currentYear} <span className="text-gray-900 font-semibold">PT Gentra Media Utama</span>. All rights reserved.
      </div>
    </footer>
  );
}
