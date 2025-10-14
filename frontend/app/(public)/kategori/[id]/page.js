// File: app/kategori/[id]/page.js
import Link from 'next/link';
import { IoArrowBack } from "react-icons/io5";

// Fungsi untuk mengambil data influencer berdasarkan ID kategori
async function getInfluencersByCategory(categoryId) {
  // Kita tidak perlu pagination di sini untuk sementara
  const url = `http://localhost:8080/api/influencers?category_id=${categoryId}&limit=100`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil data");
  return res.json();
}

// Fungsi untuk mengambil detail kategori (untuk mendapatkan namanya)
async function getCategoryDetail(categoryId) {
  const res = await fetch(`http://localhost:8080/api/categories`); // Asumsi belum ada endpoint /api/categories/:id
  if (!res.ok) return { name: "Kategori" };
  const categories = await res.json();
  const category = categories.find(cat => cat.ID == categoryId);
  return category || { name: "Kategori" };
}

export default async function CategoryPage({ params }) {
  const { id: categoryId } = params;
  const { data: influencers } = await getInfluencersByCategory(categoryId);
  const category = await getCategoryDetail(categoryId);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-6xl">
        {/* Tombol Back dan Judul Halaman */}
        <header className="relative text-center mb-10">
          <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100">
            <IoArrowBack size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">
            Kategori: <span className="text-indigo-600">{category.name}</span>
          </h1>
        </header>

        {/* Grid Influencer (sama seperti di halaman utama) */}
        {influencers.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada influencer dalam kategori ini.</p>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {influencers.map((influencer) => (
              <div key={influencer.ID} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                {/* ... (Kode kartu influencer bisa Anda salin dari app/page.js) ... */}
                <img src={`http://localhost:8080${influencer.imageUrl}`} alt={influencer.name} className="w-full h-56 object-cover"/>
                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{influencer.name}</h3>
                  <Link href={`/influencer/${influencer.ID}`} className="inline-block mt-4 px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}