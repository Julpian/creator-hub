'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

async function getCategories() {
  const res = await fetch('/api/categories', { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil kategori');
  return res.json();
}

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const searchParams = useSearchParams();
  const [activeCategoryId, setActiveCategoryId] = useState(searchParams.get('category_id'));

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

  // 🔹 Update URL tanpa reload atau scroll ke atas
  const updateUrlWithoutReload = (newParams) => {
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleCategoryClick = (categoryId) => {
    const params = new URLSearchParams(window.location.search);

    if (categoryId && params.get('category_id') === categoryId.toString()) {
      params.delete('category_id');
      setActiveCategoryId(null);
    } else if (categoryId) {
      params.set('category_id', categoryId.toString());
      setActiveCategoryId(categoryId.toString());
    } else {
      params.delete('category_id');
      setActiveCategoryId(null);
    }

    params.delete('page');
    updateUrlWithoutReload(params);
  };

  return (
    <div className="w-full px-1 py-1 sm:px-3 sm:py-3">
      {/* Judul di atas kategori */}
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
