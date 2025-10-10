// File: app/(admin)/layout.js
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Anda telah logout.");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-blue-600 tracking-tight">
            Admin Panel
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Kelola data & kontrol sistem
          </p>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-1">
          <SidebarLink href="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          {/* Tambahkan menu lain di sini */}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

/** Komponen untuk link sidebar */
function SidebarLink({ href, icon, label }) {
  const isActive = typeof window !== "undefined" && window.location.pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-100 text-blue-700 font-medium"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
