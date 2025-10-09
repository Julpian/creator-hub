// app/page.tsx (Next.js 13+ dengan App Router)
async function getInfluencers() {
  const res = await fetch('http://localhost:8080/api/influencers', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Gagal mengambil data');
  }
  return res.json();
}

export default async function Home() {
  const influencers = await getInfluencers();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
          🌟 Creator Hub
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Jelajahi daftar influencer terbaik dan temukan kolaborasi impianmu
        </p>

        {/* Grid daftar influencer */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {influencers.map((influencer) => (
            <div
              key={influencer.ID}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col items-center text-center"
            >
              {/* Foto profil (jika ada) */}
              {influencer.image ? (
                <img
                  src={influencer.image}
                  alt={influencer.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-semibold mb-4 shadow-sm">
                  {influencer.name[0].toUpperCase()}
                </div>
              )}

              {/* Informasi */}
              <h3 className="text-xl font-semibold text-gray-800">{influencer.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{influencer.category}</p>

              {/* Tombol aksi */}
              <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition">
                Lihat Profil
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
