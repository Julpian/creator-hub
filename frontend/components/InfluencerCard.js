// File: components/InfluencerCard.js
import Link from "next/link";
import { IoLogoInstagram, IoLogoYoutube, IoLocationOutline } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";

// Fungsi formatNumber bisa kita letakkan di sini juga
const formatNumber = (num) => {
    if (!num) return 0;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num;
};

// Komponen menerima satu 'influencer' sebagai prop
export default function InfluencerCard({ influencer }) {
  const adminWhatsAppNumber = "6285705007752"; // Sesuaikan nomor Anda
  const waMessage = encodeURIComponent(
    `Halo Admin Gen Creator Hub, saya tertarik untuk bekerjasama dengan ${influencer.name}.`
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1">
      <div className="relative w-full aspect-[3/2.5] overflow-hidden bg-gray-50">
        {influencer.imageUrl ? (
          <img src={`http://127.0.0.1:8080${influencer.imageUrl}`} alt={influencer.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"/>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Image</div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col text-center flex-grow">
        <h3 className="text-sm sm:text-lg font-semibold text-gray-800 truncate">{influencer.name}</h3>
        
        {/* --- TAMPILKAN LOKASI DI SINI --- */}
        {influencer.location && (
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
            <IoLocationOutline />
            <span>{influencer.location}</span>
          </div>
        )}

        <div className="flex justify-center gap-3 mt-2 text-gray-600 text-xs sm:text-sm">
          {influencer.instagramFollowers > 0 && (
            <div className="flex items-center gap-1"><IoLogoInstagram className="text-pink-500 text-sm" /><span>{formatNumber(influencer.instagramFollowers)}</span></div>
          )}
          {influencer.tiktokFollowers > 0 && (
            <div className="flex items-center gap-1"><FaTiktok className="text-black text-sm" /><span>{formatNumber(influencer.tiktokFollowers)}</span></div>
          )}
          {influencer.youtubeSubscribers > 0 && (
            <div className="flex items-center gap-1"><IoLogoYoutube className="text-red-500 text-sm" /><span>{formatNumber(influencer.youtubeSubscribers)}</span></div>
          )}
        </div>

        {influencer.Categories && influencer.Categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mt-2">
            {influencer.Categories.map((cat) => (<span key={cat.ID} className="bg-indigo-50 text-indigo-700 text-[10px] sm:text-xs font-medium px-2.5 py-[2px] rounded-full">{cat.name}</span>))}
          </div>
        )}

        <div className="mt-auto pt-3 flex justify-center gap-2">
          <Link
            href={`/influencer/${influencer.ID}`}
            className="flex-1 text-center bg-[#1986DF] text-white px-3 py-1.5 rounded-lg hover:bg-[#1475C4] text-xs sm:text-sm font-medium transition"
          >
            Detail
          </Link>
         <a
            href={`https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-[#1986DF] text-white px-3 py-1.5 rounded-lg hover:bg-[#1475C4] text-xs sm:text-sm font-medium transition"
          >
            Kolaborasi
          </a>
        </div>
      </div>
    </div>
  );
}