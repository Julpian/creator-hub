'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

async function getCategories() {
  const res = await fetch('/api/categories', { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil kategori');
  return res.json();
}

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
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
    return `/home?${params.toString()}`;
  };

  // Fungsi navigasi tanpa reload dan tanpa scroll ke atas
  const handleCategoryClick = (categoryId) => {
    const newUrl = createCategoryUrl(categoryId);
    router.push(newUrl, { scroll: false }); // ⛔ tidak scroll ke atas
  };

  return (
    <div className="w-full px-1 py-1 sm:px-3 sm:py-3">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
        Kategori KOL
      </h2>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-1 sm:gap-2 min-w-max">
          {/* Tombol All */}
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium border transition-all shadow-sm ${
              !activeCategoryId
                ? 'bg-[#1986DF] text-white border-[#1986DF]'
                : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
            }`}
          >
            All
          </button>

          {/* Tombol kategori dari API */}
          {categories.map((cat) => (
            <button
              key={cat.ID}
              onClick={() => handleCategoryClick(cat.ID)}
              className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium border transition-all shadow-sm ${
                activeCategoryId === cat.ID.toString()
                  ? 'bg-[#1986DF] text-white border-[#1986DF]'
                  : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
