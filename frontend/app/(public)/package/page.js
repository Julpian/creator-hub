"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

const tierStyles = {
  micro: "border-cyan-500",
  "mid-tier": "border-blue-500",
  macro: "border-indigo-500",
  mega: "border-purple-500",
};

const packageFeatures = {
  micro: ["10 Micro Influencers", "1x Instagram Post", "Reach up to 50k"],
  "mid-tier": ["10 Mid-tier Influencers", "1x IG Post + Story", "Reach up to 200k"],
  macro: ["10 Macro Influencers", "Full Endorsement Package", "Reach up to 1M"],
  mega: ["10 Mega Influencers", "Brand Ambassador Package", "Reach up to 5M+"],
};

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("/api/packages", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Gagal mengambil data paket");
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPackages();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Paket Influencer
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Pilih paket kolaborasi terbaik untuk kampanye brand Anda bersama para influencer.
          Kami menyediakan berbagai level influencer sesuai kebutuhan promosi Anda.
        </p>
      </div>

      {/* Grid Paket */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <div
              key={pkg.ID}
              className={`bg-white rounded-2xl shadow-md border-t-4 ${
                tierStyles[pkg.tier] || "border-gray-300"
              } p-6 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
            >
              {/* Gambar Paket */}
              <div className="mb-4">
                {pkg.imageUrl ? (
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
                    No Image
                  </div>
                )}
              </div>

              {/* Informasi Paket */}
              <div className="flex-grow">
                <span className="font-semibold text-indigo-600 uppercase text-xs tracking-wide">
                  {pkg.tier}
                </span>
                <h3 className="font-semibold text-gray-900 text-lg mt-1 line-clamp-2">
                  {pkg.title}
                </h3>
                <p className="font-bold text-gray-800 text-xl mt-2">
                  {formatPrice(pkg.price)}
                </p>

                <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                  {(packageFeatures[pkg.tier] || []).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 text-base mt-[2px]">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tombol Detail */}
              <div className="mt-6">
                <Link
                  href={`/package/${pkg.ID}`}
                  className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition text-sm"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            Tidak ada data paket yang tersedia.
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <p className="text-gray-600 text-sm mb-4">
          Ingin paket khusus untuk kebutuhan kampanye Anda?
        </p>
        <Link
          href="/contact"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Hubungi Kami
        </Link>
      </div>
    </section>
  );
}
