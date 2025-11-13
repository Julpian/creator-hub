// File: components/InfluencerCardSimple.js
import Link from "next/link";
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
  return (
    <Link
      href={`/influencer/${influencer.ID}`}
      className="block group max-w-xs w-full"
    >
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1">
        
        {/* GAMBAR DENGAN OVERLAY GRADIENT */}
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          {influencer.imageUrl ? (
            <img
              src={influencer.imageUrl}
              alt={influencer.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-gray-50">
              No Image
            </div>
          )}

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-3">
            <h3 className="text-white font-medium text-base sm:text-lg drop-shadow-md truncate max-w-[90%]">
              {influencer.name}
            </h3>
          </div>
        </div>

        {/* INFO DI BAWAH GAMBAR */}
        <div className="p-2 sm:p-3 text-center">
          {influencer.location && (
            <div className="flex items-center justify-center gap-1 text-[11px] text-gray-500 mt-0.5">
              <IoLocationOutline size={12} />
              <span className="truncate max-w-[80%]">{influencer.location}</span>
            </div>
          )}

          {/* SOSMED STATS */}
          <div className="flex justify-center gap-2 mt-1.5 text-gray-600 text-[11px]">
            {influencer.instagramFollowers > 0 && (
              <div className="flex items-center gap-1">
                <IoLogoInstagram className="text-pink-500" size={12} />
                <span>{formatNumber(influencer.instagramFollowers)}</span>
              </div>
            )}
            {influencer.tiktokFollowers > 0 && (
              <div className="flex items-center gap-1">
                <FaTiktok className="text-black" size={12} />
                <span>{formatNumber(influencer.tiktokFollowers)}</span>
              </div>
            )}
            {influencer.youtubeSubscribers > 0 && (
              <div className="flex items-center gap-1">
                <IoLogoYoutube className="text-red-500" size={12} />
                <span>{formatNumber(influencer.youtubeSubscribers)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
