// File: app/(public)/layout.js

import { Inter } from "next/font/google";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

// Anda tidak perlu metadata di sini, karena sudah ada di root layout

export default function PublicLayout({ children }) {
  return (
    <>
      <TopNav />
      <main className="pt-16 pb-16">
        {children}
      </main>
      <BottomNav />
    </>
  );
}