"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomeLoading() {
  const [show, setShow] = useState(true);

  // Hilangkan animasi setelah 5 detik
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animasi Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.1, 1],
              opacity: 1,
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <Image
              src="/logo.svg"
              alt="Gen Creator Hub"
              width={160}
              height={160}
              className="object-contain drop-shadow-lg"
            />
          </motion.div>

          {/* Gelombang / Ring Animasi */}
          <motion.div
            className="absolute w-48 h-48 border-4 border-indigo-500 rounded-full"
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* Teks Loading */}
          <motion.p
            className="text-gray-600 text-lg mt-10 font-medium tracking-wide relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-400 bg-clip-text text-transparent animate-[shimmer_2s_infinite]">
              Memuat Kreator...
            </span>
          </motion.p>

          {/* Keyframes shimmer */}
          <style jsx>{`
            @keyframes shimmer {
              0% {
                background-position: -200% center;
              }
              100% {
                background-position: 200% center;
              }
            }
            span {
              background-size: 200% auto;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
