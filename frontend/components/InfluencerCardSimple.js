// File: components/InfluencerCardSimple.js
"use client";
import { useRouter } from "next/navigation";
import {
  IoLogoInstagram,
  IoLogoYoutube,
  IoLocationOutline,
} from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";

const formatNumber = (num) => {
  if (!num) return 0;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num;
};

export default function InfluencerCardSimple({ influencer }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/influencer/${influencer.ID}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer block group w-full max-w-[150px] sm:max-w-[180px] select-none"
    >
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1">
        
        {/* GAMBAR */}
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          {influencer.imageUrl ? (
            <img
              src={influencer.imageUrl}
              alt={influencer.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] bg-gray-50">
              No Image
            </div>
          )}

          {/* OVERLAY NAMA */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-2">
            <h3 className="text-white font-medium text-[12px] sm:text-[13px] drop-shadow-md truncate max-w-[90%]">
              {influencer.name}
            </h3>
          </div>
        </div>

        {/* INFO */}
        <div className="p-1.5 sm:p-2 text-center">
          {influencer.location && (
            <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 mt-[2px]">
              <IoLocationOutline size={10} />
              <span className="truncate max-w-[75%]">{influencer.location}</span>
            </div>
          )}

          {/* SOSMED */}
          <div className="flex justify-center gap-1.5 mt-1 text-gray-600 text-[10px]">
            {influencer.instagramFollowers > 0 && (
              <div className="flex items-center gap-[2px]">
                <IoLogoInstagram className="text-pink-500" size={10} />
                <span>{formatNumber(influencer.instagramFollowers)}</span>
              </div>
            )}
            {influencer.tiktokFollowers > 0 && (
              <div className="flex items-center gap-[2px]">
                <FaTiktok className="text-black" size={10} />
                <span>{formatNumber(influencer.tiktokFollowers)}</span>
              </div>
            )}
            {influencer.youtubeSubscribers > 0 && (
              <div className="flex items-center gap-[2px]">
                <IoLogoYoutube className="text-red-500" size={10} />
                <span>{formatNumber(influencer.youtubeSubscribers)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
