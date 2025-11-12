"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const brands = [
  { src: "/brands/maxim.png", alt: "Maxim" },
  { src: "/brands/liputan6.png", alt: "Liputan 6" },
  { src: "/brands/suara.svg", alt: "Suara.com" },
  { src: "/brands/tokopedia.png", alt: "Tokopedia" },
  { src: "/brands/blibli.png", alt: "Blibli" },
];

export default function BrandCarousel() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 via-white to-indigo-50 overflow-hidden border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Judul */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">
            Klien Kami
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
            Dipercaya oleh berbagai brand ternama
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            Mereka telah berkolaborasi bersama kami untuk menjangkau audiens
            yang lebih luas.
          </p>
        </div>

        {/* Marquee */}
        <Marquee
          pauseOnHover
          gradient={false}
          speed={40}
          className="flex items-center"
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="mx-12 flex items-center justify-center transition-transform transform hover:scale-110 duration-300"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md p-4 transition-all border border-gray-100 hover:border-indigo-100">
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  width={160}
                  height={50}
                  className="object-contain max-h-12 opacity-80 hover:opacity-100 transition duration-300"
                  priority
                />
              </div>
            </div>
          ))}
        </Marquee>

        {/* Cahaya efek blur di bawah */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60%] h-24 bg-indigo-200/20 blur-3xl rounded-full pointer-events-none" />
      </div>
    </section>
  );
}
