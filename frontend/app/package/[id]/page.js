// File: app/package/[id]/page.js
import Link from "next/link";
import { IoArrowBack, IoLogoWhatsapp } from "react-icons/io5";
import { CheckCircle } from "lucide-react";

const packageFeatures = {
  micro: [
    "10 Micro Influencers",
    "1x Instagram Post",
    "Reach up to 50k audience",
  ],
  "mid-tier": [
    "10 Mid-tier Influencers",
    "1x Instagram Post + Story",
    "Reach up to 200k audience",
  ],
  macro: [
    "10 Macro Influencers",
    "Full Endorsement Package",
    "Reach up to 1M audience",
  ],
  mega: [
    "10 Mega Influencers",
    "Brand Ambassador Package",
    "Reach up to 5M+ audience",
  ],
};

// 🔹 Fetch detail paket
async function getPackageDetail(id) {
  const res = await fetch(`http://127.0.0.1:8080/api/packages/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

export default async function PackageDetailPage({ params }) {
  const { id } = params;
  const pkg = await getPackageDetail(id);

  if (!pkg)
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Paket tidak ditemukan.</p>
      </main>
    );

  const adminWhatsAppNumber = "6281234567890";
  const waMessage = encodeURIComponent(
    `Halo Admin, saya tertarik untuk membeli paket "${pkg.title}".`
  );

  return (
    <main className="bg-gray-50 min-h-screen py-6 sm:py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
        {/* Tombol Kembali */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition font-medium text-sm sm:text-base"
        >
          <IoArrowBack size={18} />
          <span>Kembali</span>
        </Link>

        {/* Card Paket */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-center py-8 px-4 sm:py-10 sm:px-6">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 leading-snug">
              {pkg.title}
            </h1>
            <p className="uppercase tracking-wide text-xs sm:text-sm opacity-90 mb-3">
              {pkg.tier} package
            </p>
            <p className="text-2xl sm:text-4xl font-extrabold">
              {formatPrice(pkg.price)}
            </p>

            <a
              href={`https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-5 px-6 py-2.5 sm:px-8 sm:py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition shadow-md text-sm sm:text-base"
            >
              <IoLogoWhatsapp size={20} />
              Hubungi Admin
            </a>
          </div>

          {/* Konten */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Detail Paket */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Detail Paket
              </h2>
              <ul className="space-y-3">
                {(packageFeatures[pkg.tier] || []).map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-700 text-sm sm:text-base"
                  >
                    <CheckCircle className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Contoh Promosi */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Contoh Promosi
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <img
                  src="https://media.sproutsocial.com/uploads/2023/10/Screenshot-2023-09-25-at-5.04.24-PM.png"
                  alt="Contoh promosi influencer 1: Gymshark haul di TikTok"
                  className="aspect-square rounded-xl object-cover"
                />
                <img
                  src="https://cdn.taggbox.com/v7/taggbox.com/blog/wp-content/uploads/2023/06/Influencer-marketing-campaign.png"
                  alt="Contoh promosi influencer 2: Kampanye multi-platform"
                  className="aspect-square rounded-xl object-cover"
                />
                <img
                  src="https://kadence.com/wp-content/uploads/2023/02/Gymshark.png"
                  alt="Contoh promosi influencer 3: Gymshark di Instagram"
                  className="aspect-square rounded-xl object-cover"
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                (Preview konten promosi influencer akan muncul di sini)
              </p>
            </section>

            {/* Syarat & Ketentuan */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Syarat & Ketentuan
              </h2>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-2 leading-relaxed">
                <li>Pembayaran yang sudah dilakukan tidak dapat ditarik kembali.</li>
                <li>
                  Klien bertanggung jawab penuh atas penggunaan nama brand dan
                  materi yang digunakan.
                </li>
                <li>
                  Materi iklan tidak boleh mengandung unsur SARA, pornografi, atau
                  melanggar hukum.
                </li>
                <li>
                  Dilarang membuat konten yang merugikan citra produk pesaing.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
