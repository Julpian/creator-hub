// File: app/(public)/rekomendasi/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import InfluencerCard from "@/components/InfluencerCard";

const platformCategoryMap = {
  tiktok: 11,
  instagram: 13,
  youtube: 9,
  facebook: 14,
};

function RekomendasiContent() {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("tiktok");

  useEffect(() => {
    async function fetchRecommended() {
      setLoading(true);
      let url = `/api/influencers?recommended=true&limit=10`;

      const categoryId = platformCategoryMap[activeFilter];
      if (categoryId) url += `&category_id=${categoryId}`;

      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setInfluencers(data.data || []);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommended();
  }, [activeFilter]);

  const FilterButton = ({ filter, children }) => (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => setActiveFilter(filter)}
      className={`px-4 py-2 rounded-full font-medium text-sm text-center transition-all duration-300
        ${
          activeFilter === filter
            ? "bg-blue-600 text-white shadow-lg scale-105"
            : "bg-white text-gray-700 hover:bg-blue-50 shadow"
        }`}
    >
      {children}
    </motion.button>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-gray-100 px-4 pb-10">
      {/* Container animasi utama */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Kategori — Grid Center */}
        <motion.div
          className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {["tiktok", "instagram", "youtube", "facebook"].map((item) => (
            <motion.div
              key={item}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              <FilterButton filter={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </FilterButton>
            </motion.div>
          ))}
        </motion.div>

        {/* Grid Influencer */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="h-48 rounded-2xl bg-white shadow animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              ></motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {influencers.length > 0 ? (
              influencers.map((influencer, index) => (
                <motion.div
                  key={influencer.ID}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.25 }}
                  className="transition-transform duration-300 hover:scale-[1.03]"
                >
                  <InfluencerCard influencer={influencer} />
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-8">
                Tidak ada rekomendasi untuk platform ini.
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}

export default function RekomendasiPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <RekomendasiContent />
    </Suspense>
  );
}
