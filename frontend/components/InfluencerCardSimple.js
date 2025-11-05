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
    <Link href={`/influencer/${influencer.ID}`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1">
        
        {/* GAMBAR DENGAN OVERLAY GRADIENT */}
        <div className="relative w-full aspect-square overflow-hidden">
          {influencer.imageUrl ? (
            <img
              src={`http://127.0.0.1:8080${influencer.imageUrl}`}
              alt={influencer.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-50">
              No Image
            </div>
          )}

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-4">
            <h3 className="text-white font-semibold text-lg sm:text-xl drop-shadow-md">
              {influencer.name}
            </h3>
          </div>
        </div>

        {/* INFO DI BAWAH GAMBAR */}
        <div className="p-3 sm:p-4 text-center">
          {influencer.location && (
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
              <IoLocationOutline />
              <span>{influencer.location}</span>
            </div>
          )}

          {/* SOSMED STATS */}
          <div className="flex justify-center gap-2 mt-2 text-gray-600 text-xs">
            {influencer.instagramFollowers > 0 && (
              <div className="flex items-center gap-1">
                <IoLogoInstagram className="text-pink-500" />
                <span>{formatNumber(influencer.instagramFollowers)}</span>
              </div>
            )}
            {influencer.tiktokFollowers > 0 && (
              <div className="flex items-center gap-1">
                <FaTiktok className="text-black" />
                <span>{formatNumber(influencer.tiktokFollowers)}</span>
              </div>
            )}
            {influencer.youtubeSubscribers > 0 && (
              <div className="flex items-center gap-1">
                <IoLogoYoutube className="text-red-500" />
                <span>{formatNumber(influencer.youtubeSubscribers)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
