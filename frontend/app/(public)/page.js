'use client';

import { useState, useEffect } from 'react';
import BannerCarousel from '@/components/BannerCarousel';
import CategoryIcons from '@/components/CategoryIcons';
import CtaCard from '@/components/CtaCard';
import PackageList from '@/components/PackageList';
import InfluencerCard from '@/components/InfluencerCard';
import BrandCarousel from '@/components/BrandCarousel';
import Testimonials from '@/components/Testimonials';
import PaginationClient from '@/components/PaginationClient';

export default function Home() {
  const [influencers, setInfluencers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fungsi ambil data
  async function getInfluencers(page = 1, query = '', categoryId = '') {
    try {
      setLoading(true);
      const limit = 10;
      let url = `http://127.0.0.1:8080/api/influencers?page=${page}&limit=${limit}`;

      if (query) {
        url = `http://127.0.0.1:8080/api/influencers/search?q=${query}&page=${page}&limit=${limit}`;
      } else if (categoryId) {
        url = `http://127.0.0.1:8080/api/influencers?category_id=${categoryId}&page=${page}&limit=${limit}`;
      }

      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('Gagal mengambil data influencer');

      const data = await res.json();
      setInfluencers(data.data || []);
      setTotalPages(Math.ceil(data.total_data / data.limit));
    } catch (err) {
      console.error(err);
      setInfluencers([]);
    } finally {
      setLoading(false);
    }
  }

  // 🔁 Ambil data saat kategori, halaman, atau query berubah
  useEffect(() => {
    getInfluencers(currentPage, searchQuery, categoryId);
  }, [currentPage, searchQuery, categoryId]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center py-6 px-4 sm:px-6">
      <div className="w-full max-w-7xl space-y-8">

        {/* Banner */}
        <section>
          <BannerCarousel />
        </section>

        {/* Kategori */}
        <section>
          <CategoryIcons
            activeCategory={categoryId}
            onCategorySelect={(id) => {
              setCategoryId(id);
              setCurrentPage(1);
              // Tetap di posisi sekarang, tidak scroll ke atas
            }}
          />
        </section>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[#1986DF]"></div>
          </div>
        ) : influencers.length === 0 ? (
          <div className="text-center py-12 animate-fadeIn">
            <p className="text-gray-500 text-base sm:text-lg">
              😕 Tidak ada influencer yang ditemukan.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Coba kata kunci lain atau ubah kategori pencarian.
            </p>
          </div>
        ) : (
          <>
            {/* Influencer List */}
            <section
              key={categoryId + currentPage}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
                         gap-4 sm:gap-5 animate-fadeIn transition-all duration-500 ease-in-out"
            >
              {influencers.map((influencer) => (
                <InfluencerCard key={influencer.ID} influencer={influencer} />
              ))}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationClient
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  // Tidak scroll ke atas, hanya ubah data
                }}
              />
            )}
          </>
        )}

        {/* CTA */}
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
