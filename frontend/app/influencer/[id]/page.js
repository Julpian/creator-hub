"use client";

import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

export default function DetailInfluencerPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/bg-creatorhub.png')", // ganti sesuai tempat kamu simpan
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Back Button */}
        <Link
          href="/rekomendasi"
          className="flex items-center gap-2 text-gray-700 hover:text-black transition mb-4"
        >
          <IoArrowBack size={22} />
          <span>Kembali ke Daftar</span>
        </Link>

        {/* Profile Container */}
        <div className="backdrop-blur-xl bg-white/60 rounded-2xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="w-full h-48 bg-gradient-to-b from-transparent to-white/60 flex justify-center items-end pb-10 relative">
            <div className="absolute -bottom-12">
              <Image
                src="/assets/profile.jpg" // ganti sesuai foto kamu
                alt="profile"
                width={130}
                height={130}
                className="rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Name + Tags */}
          <div className="pt-16 px-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">salzhap</h1>

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                Travel & Lifestyle
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                Beauty & Fashion
              </span>
              <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                TikToker
              </span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                Instagram
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 px-8 py-4 grid grid-cols-3 text-center border-t border-gray-200">

            <div>
              <Image
                src="/icons/instagram.svg"
                width={26}
                height={26}
                className="mx-auto mb-1"
                alt="IG"
              />
              <p className="text-xl font-bold">16K</p>
              <p className="text-gray-600 text-sm">Followers</p>
            </div>

            <div>
              <Image
                src="/icons/tiktok.svg"
                width={26}
                height={26}
                className="mx-auto mb-1"
                alt="TikTok"
              />
              <p className="text-xl font-bold">12K</p>
              <p className="text-gray-600 text-sm">Followers</p>
            </div>

            <div>
              <Image
                src="/icons/youtube.svg"
                width={28}
                height={28}
                className="mx-auto mb-1"
                alt="YT"
              />
              <p className="text-xl font-bold">-</p>
              <p className="text-gray-600 text-sm">Subscribers</p>
            </div>

          </div>

          {/* About */}
          <div className="px-8 py-8">
            <h2 className="text-xl font-semibold text-gray-900">Tentang</h2>
            <p className="text-gray-600 mt-2 italic">
              (Belum ada deskripsi bio.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
