// File: app/(public)/home/page.js
import Link from "next/link";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryIcons from "@/components/CategoryIcons";
import CtaCard from "@/components/CtaCard";
import PackageList from "@/components/PackageList";
import InfluencerCard from "@/components/InfluencerCard";
import BrandCarousel from "@/components/BrandCarousel";
import Testimonials from '@/components/Testimonials';
import PaginationClient from "@/components/PaginationClient";
import HomeSearchForm from "@/components/HomeSearchForm"; // <-- Pastikan ini di-impor

// Fungsi getInfluencers
async function getInfluencers(searchParams) {
  const page = searchParams.page || "1";
  const limit = "10";
  const query = searchParams.q || "";
  const categoryId = searchParams.category_id || "";
  const location = searchParams.location || "";

  const params = new URLSearchParams({ page, limit });
  let endpoint = "influencers"; 

  if (query || location || categoryId) {
    endpoint = "influencers/search";
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    if (categoryId) params.set("category_id", categoryId); 
  }

  const url = `http://127.0.0.1:8080/api/${endpoint}?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil data influencer");
  return res.json();
}

export default async function HomePage({ searchParams }) {
  const currentPage = parseInt(searchParams.page) || 1;
  const { data: influencers, total_data, limit } = await getInfluencers(searchParams);
  const totalPages = Math.ceil(total_data / limit);

  return (
    // Gunakan space-y-8 atau space-y-10 untuk memberi jarak antar section
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center py-6 px-4 sm:px-6">
      <div className="w-full max-w-7xl space-y-10"> 
        
        <section>
          <BannerCarousel />
        </section>

        {/* PASTIKAN BAGIAN INI ADA */}
        <section>
          <HomeSearchForm />
        </section>

        <section>
          <CategoryIcons />
        </section>
        
        {/* Sisa Halaman */}
        {influencers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">😕 Tidak ada influencer yang ditemukan.</p>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
              {influencers.map((influencer) => (
                <InfluencerCard key={influencer.ID} influencer={influencer} />
              ))}
            </section>

            <PaginationClient
              totalPages={totalPages}
              currentPage={currentPage}
              searchQuery={searchParams.q || ""}
              categoryId={searchParams.category_id || ""}
              locationQuery={searchParams.location || ""}
            />
          </>
        )}
        
        <section>
          <CtaCard />
        </section>

        <section>
          <PackageList />
        </section>

        <section>
          <BrandCarousel />
        </section>

        <section>
          <Testimonials />
        </section>

        <div className="h-6" />
      </div>
    </main>
  );
}