// File: components/TopNav.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  IoSearchOutline,
  IoMenuOutline,
  IoLogoWhatsapp,
  IoCloseOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoFlashOutline,
  IoBriefcaseOutline,
  IoAddCircleOutline,
  IoDocumentTextOutline,
  IoChatbubbleEllipsesOutline,
  IoCalendarOutline, // ✅ Tambahkan ikon Event
} from "react-icons/io5";

export default function TopNav() {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/pencarian?q=${query}`);
      setShowSearch(false);
    }
  };

  const adminWhatsAppNumber = "6281234567890";
  const waMessage = encodeURIComponent("Halo Admin Gen Creator Hub...");

  // ✅ Tambahkan item baru "Event"
  const menuItems = [
    { title: "Home", href: "/home", icon: IoHomeOutline },
    { title: "About", href: "/tentang-kami", icon: IoPersonOutline },
    { title: "Influencer", href: "/pencarian", icon: IoFlashOutline },
    { title: "Package", href: "/package", icon: IoBriefcaseOutline },
    { title: "Event", href: "/event", icon: IoCalendarOutline }, // 🔥 Menu baru di sini!
    {
      title: "Join Influencer",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSfLt9f0bH_dOhJEJlD7LUuOHZ-ourA6IlZbJCLPuoENzPp99A/viewform",
      icon: IoAddCircleOutline,
      external: true,
    },
    { title: "Terms & Conditions", href: "/terms", icon: IoDocumentTextOutline },
    { title: "FAQ", href: "/faq", icon: IoChatbubbleEllipsesOutline },
  ];

  return (
    <>
      {/* ======== TOP NAVIGATION BAR ======== */}
      <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-[#1E90FF] via-[#1986DF] to-[#00B4FF] shadow-md">
        <div className="flex items-center justify-between h-16 px-4 max-w-6xl mx-auto">
          {/* Logo */}
          <Link href="/home" className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={120} height={40} priority />
          </Link>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center bg-white rounded-full px-3 py-1 shadow-inner w-64"
          >
            <input
              type="text"
              placeholder="Cari sesuatu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
            />
            <button type="submit" className="text-gray-600 hover:text-blue-600">
              <IoSearchOutline size={20} />
            </button>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {/* Search Button (Mobile) */}
            <button
              className="p-2 rounded-full text-white hover:bg-white/20 sm:hidden"
              onClick={() => setShowSearch(!showSearch)}
            >
              <IoSearchOutline size={22} />
            </button>

            {/* WhatsApp Contact */}
            <a
              href={`https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/20 transition-all"
            >
              <IoLogoWhatsapp size={22} className="text-white" />
            </a>

            {/* Menu Button */}
            <button
              className="p-2 rounded-full hover:bg-white/20 transition-all text-white"
              title="Menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <IoMenuOutline size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ======== SIDEBAR MENU ======== */}
      <div>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Sidebar Content */}
        <div
          className={`fixed top-0 right-0 w-72 h-full bg-white z-50 shadow-xl transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-lg text-gray-800">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          {/* Sidebar Links */}
          <nav className="p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.title}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
