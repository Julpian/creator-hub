// File: app/page.js
import Link from "next/link";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryIcons from "@/components/CategoryIcons";
import CtaCard from "@/components/CtaCard";
import PackageList from '@/components/PackageList';
import InfluencerCard from "@/components/InfluencerCard"; // <-- 1. Impor komponen baru

// Fungsi getInfluencers tidak berubah
async function getInfluencers(page = 1, query = "", categoryId = "") {
  const limit = 10;
  let url = `http://127.0.0.1:8080/api/influencers?page=${page}&limit=${limit}`;

  if (query) {
    url = `http://127.0.0.1:8080/api/influencers/search?q=${query}&page=${page}&limit=${limit}`;
  } else if (categoryId) {
    url = `http://127.0.0.1:8080/api/influencers?category_id=${categoryId}&page=${page}&limit=${limit}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil data influencer");
  return res.json();
}

export default async function Home({ searchParams }) {
  const currentPage = parseInt(searchParams.page) || 1;
  const searchQuery = searchParams.q || "";
  const categoryId = searchParams.category_id || "";

  const { data: influencers, total_data, limit } = await getInfluencers(
    currentPage,
    searchQuery,
    categoryId
  );
  const totalPages = Math.ceil(total_data / limit);

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-7xl">

        <section className="mb-8">
          <BannerCarousel />
        </section>

        <section className="mb-10">
          <CategoryIcons />
        </section>
        
        {influencers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">😕 Tidak ada influencer yang ditemukan.</p>
            <p className="text-sm text-gray-400 mt-2">Coba kata kunci lain atau ubah kategori pencarian.</p>
          </div>
        )}

        {/* 2. Gunakan komponen InfluencerCard di sini */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
          {influencers.map((influencer) => (
            <InfluencerCard key={influencer.ID} influencer={influencer} />
          ))}
        </section>

        {total_data > 0 && (
          <nav className="flex justify-center items-center my-12 space-x-4">
            <Link href={`/?q=${searchQuery}&category_id=${categoryId}&page=${currentPage - 1}`} scroll={false} className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${currentPage <= 1 ? "pointer-events-none text-gray-400 bg-gray-100" : "bg-white text-gray-700 hover:bg-indigo-50 border-gray-300"}`}>← Sebelumnya</Link>
            <span className="text-gray-600 text-sm">Halaman <span className="font-semibold">{currentPage}</span> dari {totalPages}</span>
            <Link href={`/?q=${searchQuery}&category_id=${categoryId}&page=${currentPage + 1}`} scroll={false} className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${currentPage >= totalPages ? "pointer-events-none text-gray-400 bg-gray-100" : "bg-white text-gray-700 hover:bg-indigo-50 border-gray-300"}`}>Selanjutnya →</Link>
          </nav>
        )}
        
        <div className="mt-8">
          <CtaCard />
        </div>

        <div className="mt-14">
          <PackageList />
        </div>
      </div>
    </main>
  );
}