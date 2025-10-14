// File: app/(admin)/layout.js
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, LayoutDashboard, Package } from "lucide-react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-300">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p>Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { href: "/dashboard/packages", icon: <Package size={18} />, label: "Kelola Paket" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-gray-100 shadow-lg">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Creator<span className="text-blue-500">Hub</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <SidebarLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-all"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 flex flex-col">
        {/* Header Atas */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-semibold text-gray-800">
            {pathname === "/dashboard"
              ? "Dashboard"
              : pathname.includes("packages")
              ? "Kelola Paket"
              : "Admin"}
          </h1>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </header>

        {/* Isi Konten */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <div className="bg-white rounded-xl shadow p-6 min-h-[70vh] transition-all">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ href, icon, label, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        active
          ? "bg-blue-600 text-white shadow-md"
          : "hover:bg-gray-800 hover:text-white text-gray-300"
      }`}
    >
      <span className="text-gray-400 group-hover:text-white">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
