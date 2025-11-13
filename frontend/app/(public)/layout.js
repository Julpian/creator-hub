// File: app/(public)/layout.js

import { Inter } from "next/font/google";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// Anda tidak perlu metadata di sini, karena sudah ada di root layout

export default function PublicLayout({ children }) {
  return (
    <>
      <TopNav />
      <main className={`flex-grow bg-gray-50 min-h-screen pt-16 ${inter.className}`}>
        {children}
      </main>
      <Footer />
      {/* Tambahan padding bawah untuk scroll */}
      <div className="h-6" />
      {/* Bottom Navigation untuk mobile */}
      <BottomNav />
    </>
  );
}