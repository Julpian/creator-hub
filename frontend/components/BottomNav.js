"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  IoHomeOutline,
  IoSearchOutline,
  IoPeopleOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { MdOutlineRecommend } from "react-icons/md";

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <div
      className="fixed bottom-0 left-0 z-50 w-full h-20 
      bg-gradient-to-r from-[#1E90FF]/90 via-[#1986DF]/90 to-[#00B4FF]/90 
      backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.1)] 
      border-t border-white/10 flex items-center justify-around"
    >
      {/* 1️⃣ Home */}
      <NavItem
        href="/home"
        icon={IoHomeOutline}
        label="Home"
        active={isActive("/home")}
      />

      {/* 2️⃣ Rekomendasi */}
      <NavItem
        href="/rekomendasi"
        icon={MdOutlineRecommend}
        label="Rekomendasi"
        active={isActive("/rekomendasi")}
      />

      {/* 3️⃣ EVENT — tombol tengah dengan animasi berdenyut */}
      <div className="relative -top-6">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center"
        >
          {/* Lingkaran cahaya luar */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400/40 blur-md"
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>

          {/* Tombol utama */}
          <Link
            href="/event"
            className="flex flex-col items-center justify-center bg-white rounded-full 
            shadow-lg w-16 h-16 text-blue-600 hover:bg-blue-50 transition-all 
            border-4 border-blue-400 relative z-10"
          >
            <IoCalendarOutline size={28} />
            <span className="text-[11px] font-semibold mt-1">Event</span>
          </Link>
        </motion.div>
      </div>

      {/* 4️⃣ Pencarian */}
      <NavItem
        href="/pencarian"
        icon={IoSearchOutline}
        label="Pencarian"
        active={isActive("/pencarian")}
      />

      {/* 5️⃣ About */}
      <NavItem
        href="/tentang-kami"
        icon={IoPeopleOutline}
        label="About Us"
        active={isActive("/tentang-kami")}
      />
    </div>
  );
}

function NavItem({ href, icon: Icon, label, active }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center text-white group relative"
    >
      <Icon
        size={24}
        className={`mb-1 transition-colors ${
          active ? "text-white" : "text-white/70 group-hover:text-white"
        }`}
      />
      <span
        className={`text-xs ${
          active ? "font-semibold text-white" : "text-white/70 group-hover:text-white"
        }`}
      >
        {label}
      </span>
      {active && (
        <div className="absolute bottom-0 w-6 h-0.5 bg-white rounded-full"></div>
      )}
    </Link>
  );
}
