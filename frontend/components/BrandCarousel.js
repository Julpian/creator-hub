"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const brands = [
  { src: "/brands/maxim.png", alt: "Maxim" },
  { src: "/brands/liputan6.png", alt: "Liputan 6" },
  { src: "/brands/suara.svg", alt: "Suara.com" },
];

export default function BrandCarousel() {
  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-2 sm:px-6">
        {/* Judul */}
        <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">
          Brand Mitra Kami
        </h2>

        {/* Marquee untuk efek berjalan */}
        <Marquee
          pauseOnHover
          gradient={false}
          speed={35}
          className="flex items-center space-x-12"
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="mx-10 flex items-center justify-center opacity-70 hover:opacity-100 transition duration-300"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                width={140}
                height={40}
                className="object-contain max-h-10 sm:max-h-12"
                priority
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
