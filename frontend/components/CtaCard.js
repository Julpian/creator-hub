"use client";

import { IoChatbubblesOutline, IoPersonAddOutline } from "react-icons/io5";
import { motion } from "framer-motion";

export default function CtaCard() {
  const adminWhatsAppNumber = "6281234567890";

  const messageTanya = encodeURIComponent("Halo Admin Gen Creator Hub, saya ingin bertanya sesuatu.");
  const messageGabung = encodeURIComponent("Halo Admin, saya tertarik untuk bergabung sebagai influencer di Gen Creator Hub.");

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white my-10 shadow-lg">
      {/* 🔵 Background efek */}
      <div className="absolute inset-0">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full mix-blend-overlay opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-6 w-32 h-32 bg-pink-400 rounded-full mix-blend-overlay opacity-20 blur-lg"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 text-center px-5 py-10 sm:py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-4"
        >
          Masih Bingung? 🤔
          <br />
          <span className="text-yellow-300">Yuk Tanya atau Gabung Sekarang!</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-white/90 max-w-xl mx-auto mb-6 text-sm sm:text-base"
        >
          Kami siap membantu kamu mengenal lebih jauh tentang <strong>Gen Creator Hub</strong>.  
          Hubungi admin langsung via WhatsApp dan mulai langkah pertama jadi kreator sukses 🚀
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3"
        >
          {/* Tombol Tanya */}
          <a
            href={`https://wa.me/${adminWhatsAppNumber}?text=${messageTanya}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#1986DF] px-6 py-2.5 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200"
          >
            <IoChatbubblesOutline size={20} className="group-hover:animate-bounce" />
            <span>Tanya Admin</span>
          </a>

          {/* Tombol Gabung */}
          <a
            href={`https://wa.me/${adminWhatsAppNumber}?text=${messageGabung}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1986DF] text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:bg-[#1475C4] hover:scale-105 transition-transform duration-200"
          >
            <IoPersonAddOutline size={20} className="group-hover:rotate-12 transition-transform" />
            <span>Gabung Sekarang</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
