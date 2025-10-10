// File: app/page.js
import Link from "next/link";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryIcons from "@/components/CategoryIcons";

/* 🔹 Fungsi untuk mengambil data influencer (dengan opsi pencarian & kategori) */
async function getInfluencers(page = 1, query = "", categoryId = "") {
  const limit = 9;
  let url = `http://localhost:8080/api/influencers?page=${page}&limit=${limit}`;

  if (query) {
    url = `http://localhost:8080/api/influencers/search?q=${query}&page=${page}&limit=${limit}`;
  } else if (categoryId) {
    url = `http://localhost:8080/api/influencers?category_id=${categoryId}&page=${page}&limit=${limit}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil data influencer");

  return res.json();
}

/* 🏠 Halaman Utama */
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
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-6xl">
        {/* 🧠 Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 tracking-tight">
            Creator <span className="text-indigo-600">Hub</span>
          </h1>
          <p className="text-lg text-gray-500 mt-3">
            Temukan{" "}
            <span className="font-medium text-indigo-600">
              influencer terbaik
            </span>{" "}
            untuk kolaborasi kamu 💫
          </p>
        </header>

        {/* 🎞️ Banner */}
        <section className="mb-8">
          <BannerCarousel />
        </section>

        {/* 🏷️ Kategori */}
        <section className="mb-10">
          <CategoryIcons />
        </section>

        {/* 🚫 Tidak ada hasil */}
        {influencers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              😕 Tidak ada influencer yang ditemukan.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Coba kata kunci lain atau ubah kategori pencarian.
            </p>
          </div>
        )}

        {/* 📦 Daftar Influencer */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {influencers.map((influencer) => (
            <div
              key={influencer.ID}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* 🖼️ Gambar */}
              {influencer.imageUrl ? (
                <img
                  src={`http://localhost:8080${influencer.imageUrl}`}
                  alt={influencer.name}
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              {/* 📋 Detail */}
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-gray-800 truncate">
                  {influencer.name}
                </h3>

                {/* 🏷️ Kategori (relasi backend) */}
                {influencer.Categories && influencer.Categories.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {influencer.Categories.map((cat) => (
                      <span
                        key={cat.ID}
                        className="bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/influencer/${influencer.ID}`}
                  className="inline-block mt-5 px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* 📄 Pagination */}
        {total_data > 0 && (
          <nav className="flex justify-center items-center mt-12 space-x-4">
            {/* Tombol Sebelumnya */}
            <Link
              href={`/?q=${searchQuery}&category_id=${categoryId}&page=${currentPage - 1}`}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                currentPage <= 1
                  ? "pointer-events-none text-gray-400 bg-gray-100"
                  : "bg-white text-gray-700 hover:bg-indigo-50 border-gray-300"
              }`}
            >
              ← Sebelumnya
            </Link>

            {/* Info Halaman */}
            <span className="text-gray-600 text-sm">
              Halaman <span className="font-semibold">{currentPage}</span> dari{" "}
              {totalPages}
            </span>

            {/* Tombol Selanjutnya */}
            <Link
              href={`/?q=${searchQuery}&category_id=${categoryId}&page=${currentPage + 1}`}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                currentPage >= totalPages
                  ? "pointer-events-none text-gray-400 bg-gray-100"
                  : "bg-white text-gray-700 hover:bg-indigo-50 border-gray-300"
              }`}
            >
              Selanjutnya →
            </Link>
          </nav>
        )}
      </div>
    </main>
  );
}
