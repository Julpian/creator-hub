import Link from "next/link";
import { IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";

async function getInfluencerDetail(id) {
  const res = await fetch(`http://localhost:8080/api/influencers/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function InfluencerDetailPage({ params }) {
  const { id } = params;
  const influencer = await getInfluencerDetail(id);

  if (!influencer) {
    return <div className="text-center p-24 text-gray-500">Influencer tidak ditemukan.</div>;
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen">
      {/* Tombol Kembali */}
      <div className="mb-6 flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <IoArrowBackCircle className="text-3xl" />
          <span className="font-medium">Kembali</span>
        </Link>
      </div>

      {/* Kartu Profil */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="md:flex">
          {/* Kolom Kiri: Foto Profil */}
          <div className="md:w-1/3 bg-gradient-to-b from-gray-100 to-gray-50">
            <img
              src={`http://localhost:8080${influencer.imageUrl}`}
              alt={influencer.name}
              className="w-full h-full object-cover rounded-l-3xl"
            />
          </div>

          {/* Kolom Kanan: Detail */}
          <div className="md:w-2/3 p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">
              {influencer.name}
            </h1>

            {/* Kategori */}
            <div className="flex flex-wrap gap-2 mt-3">
              {influencer.categories.map((cat) => (
                <span
                  key={cat.ID}
                  className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full shadow-sm"
                >
                  {cat.name}
                </span>
              ))}
            </div>

            {/* Statistik Sosial Media */}
            <div className="grid grid-cols-3 gap-6 mt-10 border-t border-b py-6">
              {/* Instagram */}
              <div className="text-center hover:scale-105 transition-transform duration-200">
                <IoLogoInstagram className="mx-auto text-4xl text-pink-500 mb-2" />
                <p className="text-2xl font-bold text-gray-800">
                  {influencer.instagramFollowers > 0
                    ? formatNumber(influencer.instagramFollowers)
                    : "-"}
                </p>
                <p className="text-sm text-gray-500">Followers</p>
                {influencer.instagramUrl && (
                  <Link
                    href={influencer.instagramUrl}
                    target="_blank"
                    className="text-xs text-pink-600 hover:underline"
                  >
                    Lihat Profil
                  </Link>
                )}
              </div>

              {/* TikTok */}
              <div className="text-center hover:scale-105 transition-transform duration-200">
                <FaTiktok className="mx-auto text-4xl text-black mb-2" />
                <p className="text-2xl font-bold text-gray-800">
                  {influencer.tiktokFollowers > 0
                    ? formatNumber(influencer.tiktokFollowers)
                    : "-"}
                </p>
                <p className="text-sm text-gray-500">Followers</p>
                {influencer.tiktokUrl && (
                  <Link
                    href={influencer.tiktokUrl}
                    target="_blank"
                    className="text-xs text-gray-700 hover:underline"
                  >
                    Lihat Profil
                  </Link>
                )}
              </div>

              {/* YouTube */}
              <div className="text-center hover:scale-105 transition-transform duration-200">
                <IoLogoYoutube className="mx-auto text-4xl text-red-500 mb-2" />
                <p className="text-2xl font-bold text-gray-800">
                  {influencer.youtubeSubscribers > 0
                    ? formatNumber(influencer.youtubeSubscribers)
                    : "-"}
                </p>
                <p className="text-sm text-gray-500">Subscribers</p>
                {influencer.youtubeUrl && (
                  <Link
                    href={influencer.youtubeUrl}
                    target="_blank"
                    className="text-xs text-red-600 hover:underline"
                  >
                    Lihat Channel
                  </Link>
                )}
              </div>
            </div>

            {/* Tentang */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Tentang</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {influencer.bio || "(Belum ada deskripsi bio.)"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
