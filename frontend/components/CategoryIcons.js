'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

async function getCategories() {
  const res = await fetch('http://localhost:8080/api/categories', { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil kategori');
  return res.json();
}

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const searchParams = useSearchParams();
  const activeCategoryId = searchParams.get('category_id');

  useEffect(() => {
    async function loadCategories() {
      try {
        const categories = await getCategories();
        setCategories(categories || []);
      } catch (error) {
        console.error(error);
      }
    }
    loadCategories();
  }, []);

  const createCategoryUrl = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId && params.get('category_id') === categoryId.toString()) {
      params.delete('category_id');
    } else if (categoryId) {
      params.set('category_id', categoryId.toString());
    } else {
      params.delete('category_id');
    }
    params.delete('page');
    return `/?${params.toString()}`;
  };

  return (
    <div className="w-full px-4 py-4">
      {/* 🔹 Judul di atas kategori */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
        Kategori KOL
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 sm:gap-3 min-w-max">
          {/* Tombol Semua */}
          <Link
            href={createCategoryUrl(null)}
            scroll={false}
            className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium border transition-all shadow-sm ${
              !activeCategoryId
                ? 'bg-[#1986DF] text-white border-[#1986DF]'
                : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
            }`}
          >
            All
          </Link>

          {/* Tombol kategori dari API */}
          {categories.map((cat) => (
            <Link
              key={cat.ID}
              href={createCategoryUrl(cat.ID)}
              scroll={false}
              className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium border transition-all shadow-sm ${
                activeCategoryId === cat.ID.toString()
                  ? 'bg-[#1986DF] text-white border-[#1986DF]'
                  : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
