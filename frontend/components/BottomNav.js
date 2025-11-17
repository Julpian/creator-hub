"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Ikon baru yang lebih universal & modern
import {
  IoHomeOutline,
  IoSearchOutline,
  IoCalendarOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-20 z-50
      bg-gradient-to-r from-[#1E90FF] via-[#1986DF] to-[#00B4FF]
      backdrop-blur-md shadow-[0_-3px_15px_rgba(0,0,0,0.25)]
      border-t border-white/20 flex items-center justify-around px-2"
    >
      {/* 1️⃣ Beranda */}
      <NavItem
        href="/home"
        icon={IoHomeOutline}
        label="Beranda"
        active={isActive("/home")}
      />

      {/* 2️⃣ Eksplor */}
      <NavItem
        href="/rekomendasi"
        icon={MdOutlineExplore}
        label="Eksplor"
        active={isActive("/rekomendasi")}
      />

      {/* 3️⃣ Acara - tombol tengah dengan efek berdenyut */}
      <div className="relative -top-7">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center"
        >
          {/* Cahaya luar */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-300/40 blur-xl"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>

          {/* Tombol utama */}
          <Link
            href="/event"
            className="flex flex-col items-center justify-center 
            bg-white rounded-full shadow-xl w-16 h-16 text-blue-600
            hover:bg-blue-50 transition-all border-4 border-blue-400 z-10"
          >
            <IoCalendarOutline size={28} />
            <span className="text-[11px] font-semibold mt-1">Acara</span>
          </Link>
        </motion.div>
      </div>

      {/* 4️⃣ Cari */}
      <NavItem
        href="/pencarian"
        icon={IoSearchOutline}
        label="Cari"
        active={isActive("/pencarian")}
      />

      {/* 5️⃣ Profil */}
      <NavItem
        href="/profil"
        icon={IoPersonCircleOutline}
        label="Profil"
        active={isActive("/profil")}
      />
    </div>
  );
}

function NavItem({ href, icon: Icon, label, active }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center text-white w-[70px]"
    >
      <Icon
        size={26}
        className={`transition-colors duration-200 ${
          active ? "text-white" : "text-white/70"
        }`}
      />

      <span
        className={`text-[11px] mt-1 transition-all ${
          active ? "font-semibold text-white" : "text-white/70"
        }`}
      >
        {label}
      </span>

      {active && (
        <div className="w-5 h-1 bg-white rounded-full mt-1"></div>
      )}
    </Link>
  );
}
