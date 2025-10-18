// File: app/page.js
import Link from "next/link";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryIcons from "@/components/CategoryIcons";
import CtaCard from "@/components/CtaCard";
import PackageList from "@/components/PackageList";
import InfluencerCard from "@/components/InfluencerCard";
import BrandCarousel from "@/components/BrandCarousel";
import Testimonials from '@/components/Testimonials';
import PaginationClient from "@/components/PaginationClient";

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
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center py-6 px-4 sm:px-6">
      <div className="w-full max-w-7xl space-y-8"> 
        {/* Jarak antar section pakai space-y-8 biar konsisten & lebih rapat */}

        {/* Banner Carousel */}
        <section>
          <BannerCarousel />
        </section>

        {/* Kategori */}
        <section>
          <CategoryIcons />
        </section>

        {/* Influencer List */}
        {/* Influencer List */}
        {influencers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base sm:text-lg">
              😕 Tidak ada influencer yang ditemukan.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Coba kata kunci lain atau ubah kategori pencarian.
            </p>
          </div>
        ) : (
          <>
            <section
              key={currentPage}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
                        gap-4 sm:gap-5 animate-fadeIn transition-all duration-300 ease-in-out"
            >
              {influencers.map((influencer) => (
                <InfluencerCard key={influencer.ID} influencer={influencer} />
              ))}
            </section>

            {/* Jarak bawah agar pagination tidak mepet */}
            <div className="pb-8" />
          </>
        )}

        {total_data > 0 && (
          <PaginationClient
            totalPages={totalPages}
            currentPage={currentPage}
            searchQuery={searchQuery}
            categoryId={categoryId}
          />
        )}

        {/* CTA & Package List */}
        <section>
          <CtaCard />
        </section>

        <section>
          <PackageList />
        </section>

        {/* Brand Carousel */}
        <section>
          <BrandCarousel />
        </section>

        {/* Testimonials Section */}
        <section>
          <Testimonials />
        </section>

      {/* Tambahan padding bawah untuk scroll */}
      <div className="h-6" />

      </div>
    </main>
  );
}
