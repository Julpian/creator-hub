'use client';

import { useEffect, useState } from 'react';

async function getCategories() {
  const res = await fetch('/api/categories', { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil kategori');
  return res.json();
}

async function getKols(categoryId) {
  const url = categoryId ? `/api/kols?category_id=${categoryId}` : '/api/kols';
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil data KOL');
  return res.json();
}

export default function CategoryListWithKols() {
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [kols, setKols] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil kategori saat pertama kali
  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  // Ambil data KOL setiap kali kategori berubah
  useEffect(() => {
    setLoading(true);
    getKols(activeCategoryId)
      .then(setKols)
      .catch(console.error)
      .finally(() => setLoading(false));

    // Update URL tanpa reload
    const params = new URLSearchParams(window.location.search);
    if (activeCategoryId) params.set('category_id', activeCategoryId);
    else params.delete('category_id');
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
  }, [activeCategoryId]);

  return (
    <div className="w-full px-2 sm:px-4 py-4">
      {/* Judul kategori */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
        Kategori KOL
      </h2>

      {/* Tombol kategori */}
      <div className="overflow-x-auto no-scrollbar mb-6">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setActiveCategoryId(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium border shadow-sm transition-all ${
              !activeCategoryId
                ? 'bg-[#1986DF] text-white border-[#1986DF]'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.ID}
              onClick={() => setActiveCategoryId(cat.ID)}
              className={`px-4 py-2 rounded-full text-sm font-medium border shadow-sm transition-all ${
                activeCategoryId === cat.ID
                  ? 'bg-[#1986DF] text-white border-[#1986DF]'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Daftar KOL */}
      {loading ? (
        <p className="text-gray-500 text-center py-10">Memuat data...</p>
      ) : kols.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {kols.map((kol) => (
            <div
              key={kol.id}
              className="border rounded-xl p-3 shadow-sm hover:shadow-md transition"
            >
              <img
                src={kol.image}
                alt={kol.name}
                className="rounded-lg w-full h-32 object-cover mb-2"
              />
              <h3 className="text-sm font-semibold">{kol.name}</h3>
              <p className="text-xs text-gray-500">{kol.category_name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-10">Tidak ada KOL ditemukan.</p>
      )}
    </div>
  );
}
