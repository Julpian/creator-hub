"use client";

import Link from "next/link";
import {
  IoLogoInstagram,
  IoLogoYoutube,
  IoDocumentTextOutline,
  IoAddOutline,
  IoStar,
} from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";

const formatNumber = (num) => {
  if (!num) return 0;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
  return num;
};

export default function InfluencerCard({ influencer }) {
  const adminWhatsAppNumber = "6285705007752";
  const waMessage = encodeURIComponent(
    `Halo Admin Gen Creator Hub, saya tertarik untuk bekerjasama dengan ${influencer.name}.`
  );

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden 
      w-full transition-all duration-300 hover:-translate-y-1 relative flex flex-col">
      
      {/* BADGE REKOMENDASI */}
      {influencer.isRecommended && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <IoStar size={12} />
          <span>Rekomendasi</span>
        </div>
      )}

      {/* FOTO */}
      <div className="flex flex-col items-center p-4 sm:p-5 relative">
        {influencer.imageUrl ? (
          <img
            src={influencer.imageUrl}
            alt={influencer.name}
            className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-2xl mb-3 sm:mb-4 transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gray-100 flex items-center justify-center text-gray-400 rounded-2xl mb-3 sm:mb-4">
            No Image
          </div>
        )}

        {/* NAMA & FOLLOWERS */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 text-center flex items-center justify-center gap-1">
          {influencer.name}
          {influencer.isRecommended && (
            <span className="ml-1 text-[#8A5CF6]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a10 10 0 1 1-7.07 2.93A10 10 0 0 1 12 2Zm4.3 8.3a1 1 0 0 0-1.42-1.42l-3.89 3.89-1.3-1.3a1 1 0 0 0-1.42 1.42l2 2a1 1 0 0 0 1.42 0l4.61-4.59Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
        </h3>

        <p className="text-xs text-gray-500 text-center">
          {influencer.location || "Unknown Location"}
        </p>

        <p className="text-sm text-gray-900 font-medium mt-1">
          <span className="text-base sm:text-lg font-semibold">
            {formatNumber(
              influencer.instagramFollowers ||
                influencer.youtubeSubscribers ||
                influencer.tiktokFollowers
            )}
          </span>{" "}
          Followers
        </p>
      </div>

      {/* GARIS PEMBATAS */}
      <div className="border-t border-gray-100"></div>

      {/* SOSIAL MEDIA */}
      <div className="flex justify-center gap-4 py-3 text-gray-700 text-lg sm:text-xl">
        {influencer.instagramFollowers > 0 && (
          <IoLogoInstagram className="hover:text-pink-500 transition" />
        )}
        {influencer.tiktokFollowers > 0 && (
          <FaTiktok className="hover:text-gray-800 transition" />
        )}
        {influencer.youtubeSubscribers > 0 && (
          <IoLogoYoutube className="hover:text-red-500 transition" />
        )}
      </div>

      {/* KATEGORI */}
      {influencer.Categories && influencer.Categories.length > 0 && (
        <div className="flex justify-center">
          <span className="bg-blue-50 text-blue-600 text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3">
            {influencer.Categories[0].name}
          </span>
        </div>
      )}

      {/* HARGA */}
      {influencer.price && (
        <div className="text-center mb-2 sm:mb-0">
          <p className="text-[10px] sm:text-xs text-gray-400">Advertising Price</p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">
            ${influencer.price}
          </p>
        </div>
      )}

      {/* TOMBOL */}
      <div className="p-3 sm:p-4 flex items-center justify-between gap-2 mt-auto">
        <a
          href={`https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-md shadow-amber-500 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm sm:text-base font-semibold hover:scale-[1.03] transition-transform duration-200"
        >
          Book Now
        </a>

        <Link
          href={`/influencer/${influencer.ID}`}
          className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-[#1986DF] text-white rounded-full hover:bg-[#1475C4] transition-all"
          title="Lihat Detail"
        >
          <IoDocumentTextOutline size={20} className="sm:size-[22px]" />
          <IoAddOutline
            size={10}
            className="absolute bottom-[5px] right-[5px] text-white sm:size-[12px]"
          />
        </Link>
      </div>
    </div>
  );
}
