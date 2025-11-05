"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "Maysa Aulia R",
    role: "Influencer",
    imageUrl: "/testimonials/maysa.jpg",
    stars: 5,
    quote:
      "Parah sih, manajemen ini keren banget! 😍 Job-nya banyak, respon admin cepet, dan yang paling penting ga ada potongan fee! Cairan juga super ngebut, pokoknya recommended banget 🔥🔥",
  },
  {
    name: "Brand Skincare XYZ",
    role: "Brand Partner",
    imageUrl: "/testimonials/rozi.png",
    stars: 5,
    quote:
      "Kerjasama dengan Gen Creator Hub sangat memuaskan. Mereka menyediakan talenta yang sesuai dengan brief kami dan prosesnya sangat transparan. Penjualan kami meningkat 20% selama kampanye!",
  },
  {
    name: "Agung Hapsah",
    role: "Content Creator",
    imageUrl: "/testimonials/lutfi.jpg",
    stars: 5,
    quote:
      "Sebagai kreator, menemukan platform yang adil dan mendukung itu langka. Gen Creator Hub adalah salah satunya. Prosesnya mudah dan pembayarannya selalu tepat waktu. Sangat membantu!",
  },
];

const StarRating = ({ count }) => (
  <div className="flex text-yellow-400 mt-1">
    {[...Array(count)].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M10.868 2.884c.321-.662 1.215-.662 1.536 0l1.828 3.782a1 1 0 00.753.548h3.98a1 1 0 01.707 1.707l-3.22 2.34a1 1 0 00-.364 1.118l1.22 4.286a1 1 0 01-1.528 1.18l-3.415-2.5a1 1 0 00-1.176 0l-3.415 2.5a1 1 0 01-1.528-1.18l1.22-4.286a1 1 0 00-.364-1.118L2.093 8.921a1 1 0 01.707-1.707h3.98a1 1 0 00.753-.548l1.828-3.782z"
          clipRule="evenodd"
        />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Judul */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          Apa Kata Mereka Tentang{" "}
          <span className="text-green-600">Gen Creator Hub?</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-14 text-lg">
          Cerita nyata dari para kreator dan brand partner yang sudah bekerja sama 💬
        </p>

        {/* Carousel */}
        <div className="flex overflow-x-auto gap-8 snap-x snap-mandatory scroll-smooth pb-8 scrollbar-hide px-2">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full md:w-[600px] lg:w-[700px] mx-auto snap-center 
                         bg-white p-10 rounded-3xl shadow-lg border border-gray-100 
                         transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="flex flex-col items-center md:flex-row md:items-center mb-6 gap-4">
                <Image
                  src={t.imageUrl}
                  alt={t.name}
                  width={72}
                  height={72}
                  className="w-20 h-20 rounded-full object-cover shadow-md"
                />
                <div className="text-center md:text-left">
                  <p className="font-bold text-gray-800 text-lg">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                  <StarRating count={t.stars} />
                </div>
              </div>

              {/* Isi Testimoni */}
              <p className="text-gray-600 leading-relaxed italic text-lg text-center md:text-left">
                “{t.quote}”
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Latar belakang lembut */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/70 to-white pointer-events-none" />
    </section>
  );
}
