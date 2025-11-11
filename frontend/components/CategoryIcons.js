'use client';

import { useEffect, useState } from 'react';

async function getCategories() {
  const res = await fetch('/api/categories', { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil kategori');
  return res.json();
}

export default function CategoryList({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (error) {
        console.error(error);
      }
    }
    loadCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId((prev) => (prev === categoryId ? null : categoryId));
    if (onCategorySelect) {
      onCategorySelect(categoryId); // lempar event ke parent kalau kamu mau filter data
    }
  };

  return (
    <div className="w-full px-1 py-1 sm:px-3 sm:py-3">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
        Kategori KOL
      </h2>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-1 sm:gap-2 min-w-max">
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

          {categories.map((cat) => (
            <button
              key={cat.ID}
              onClick={() => handleCategoryClick(cat.ID)}
              className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium border transition-all shadow-sm ${
                activeCategoryId === cat.ID
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
