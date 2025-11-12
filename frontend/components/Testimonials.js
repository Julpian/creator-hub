"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Maysa Aulia R",
    role: "Influencer",
    imageUrl: "/testimonials/maysa.jpg",
    stars: 5,
    quote:
      "Parah sih, manajemen ini keren banget! Job-nya banyak, respon admin cepet, dan yang paling penting ga ada potongan fee! Cairan juga super ngebut, pokoknya recommended banget!",
  },
  {
    name: "Brand Skincare XYZ",
    role: "Brand Partner",
    imageUrl: "/testimonials/rozi.png",
    stars: 5,
    quote:
      "Kerjasama dengan Gen Creator Hub sangat memuaskan. Mereka menyediakan talenta yang sesuai dengan brief kami dan prosesnya sangat transparan. Penjualan kami meningkat signifikan selama kampanye.",
  },
  {
    name: "Agung Hapsah",
    role: "Content Creator",
    imageUrl: "/testimonials/lutfi.jpg",
    stars: 5,
    quote:
      "Sebagai kreator, menemukan platform yang adil dan mendukung itu langka. Gen Creator Hub adalah salah satunya. Prosesnya mudah dan pembayarannya selalu tepat waktu.",
  },
];

const StarRating = ({ count }) => (
  <div className="flex text-gray-800 mt-1">
    {[...Array(count)].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M10.868 2.884c.321-.662 1.215-.662 1.536 0l1.828 3.782a1 1 0 00.753.548h3.98a1 1 0 01.707 1.707l-3.22 2.34a1 1 0 00-.364 1.118l1.22 4.286a1 1 0 01-1.528 1.18l-3.415-2.5a1 1 0 00-1.176 0l-3.415 2.5a1 1 0 01-1.528-1.18l1.22-4.286a1 1 0 00-.364-1.118L2.093 8.921a1 1 0 01.707-1.707h3.98a1 1 0 00.753-.548l1.828-3.782z"
          clipRule="evenodd"
        />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Ganti testimoni otomatis setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Judul */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Apa Kata Mereka Tentang Gen Creator Hub
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-14 text-lg">
          Cerita nyata dari para kreator dan brand partner yang sudah bekerja sama.
        </p>

        {/* Slider Testimoni */}
        <div className="relative min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-10 shadow-md mx-auto w-full md:w-[600px]"
            >
              <div className="flex flex-col items-center mb-6">
                <Image
                  src={testimonials[index].imageUrl}
                  alt={testimonials[index].name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover shadow-md mb-3"
                />
                <p className="font-semibold text-gray-900 text-lg">
                  {testimonials[index].name}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonials[index].role}
                </p>
                <StarRating count={testimonials[index].stars} />
              </div>

              <p className="text-gray-700 leading-relaxed italic text-lg">
                “{testimonials[index].quote}”
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indikator Bawah */}
        <div className="flex justify-center mt-6 space-x-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index ? "bg-gray-900 scale-110" : "bg-gray-400/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Efek background lembut */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[60%] h-[300px] bg-gray-200/30 blur-3xl rounded-full -z-10" />
    </section>
  );
}
