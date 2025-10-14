import Link from "next/link";

async function getPackages() {
  const res = await fetch("http://127.0.0.1:8080/api/packages", { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil data paket");
  return res.json();
}

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const tierStyles = {
  micro: "border-cyan-500",
  "mid-tier": "border-blue-500",
  macro: "border-indigo-500",
  mega: "border-purple-500",
};

const packageFeatures = {
  micro: ["10 Micro Influencers", "1x Instagram Post", "Reach up to 50k"],
  "mid-tier": ["10 Mid-tier Influencers", "1x IG Post + Story", "Reach up to 200k"],
  macro: ["10 Macro Influencers", "Full Endorsement Package", "Reach up to 1M"],
  mega: ["10 Mega Influencers", "Brand Ambassador Package", "Reach up to 5M+"],
};

export default async function PackageList() {
  const packages = (await getPackages()) || [];

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Package Influencer</h2>
        <Link
          href="/packages"
          className="text-xs sm:text-sm font-medium text-indigo-600 hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      {/* 🔹 Ukuran grid sudah disesuaikan: 2 mobile, 3 tablet, 4 desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.ID}
            className={`bg-white rounded-xl shadow-md border-t-4 ${
              tierStyles[pkg.tier] || "border-gray-300"
            } p-4 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
          >
            {/* Gambar Paket */}
            <div className="mb-3">
              {pkg.imageUrl ? (
                <img
                  src={`http://127.0.0.1:8080${pkg.imageUrl}`}
                  alt={pkg.title}
                  className="w-full h-28 sm:h-32 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-28 sm:h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-xs rounded-lg">
                  No Image
                </div>
              )}
            </div>

            <div className="flex-grow text-center sm:text-left">
              <span className="font-semibold text-indigo-600 uppercase text-[10px] sm:text-xs tracking-wide">
                {pkg.tier}
              </span>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base mt-1 line-clamp-2">
                {pkg.title}
              </h3>
              <p className="font-bold text-gray-900 text-sm sm:text-lg mt-2">
                {formatPrice(pkg.price)}
              </p>

              <ul className="mt-3 space-y-1 text-gray-600 text-[10px] sm:text-xs">
                {(packageFeatures[pkg.tier] || []).map((feature, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-green-500 text-xs sm:text-sm mt-[2px]">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <Link
                href={`/package/${pkg.ID}`}
                className="block w-full text-center bg-indigo-600 text-white py-1.5 sm:py-2 rounded-lg font-medium hover:bg-indigo-700 text-xs sm:text-sm"
              >
                View Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
