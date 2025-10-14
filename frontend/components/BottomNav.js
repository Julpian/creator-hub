"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoHomeOutline,
  IoSearchOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { MdOutlineRecommend } from "react-icons/md";

const navItems = [
  { href: "/", icon: IoHomeOutline, label: "Home" },
  { href: "/rekomendasi", icon: MdOutlineRecommend, label: "Rekomendasi" },
  { href: "/pencarian", icon: IoSearchOutline, label: "Pencarian" },
  { href: "/tentang-kami", icon: IoPeopleOutline, label: "About Us" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 
      bg-gradient-to-r from-[#1E90FF]/90 via-[#1986DF]/90 to-[#00B4FF]/90 
      backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.1)] 
      border-t border-white/10">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 group transition-all duration-200"
            >
              <item.icon
                className={`w-6 h-6 mb-1 transition-all duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-white/70 group-hover:text-white"
                }`}
              />
              <span
                className={`text-xs transition-colors duration-200 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-white/70 group-hover:text-white"
                }`}
              >
                {item.label}
              </span>

              {/* Indicator bar di bawah icon untuk halaman aktif */}
              {isActive && (
                <div className="absolute bottom-0 w-10 h-0.5 bg-white rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
