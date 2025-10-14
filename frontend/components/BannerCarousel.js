"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const banners = [
  {
    title: "Mau Konten Kamu Dibayar?",
    description: "Join sekarang di Gen Creator Hub dan mulai hasilkan uang dari kreativitasmu!",
    imageUrl:
      "https://raw.githubusercontent.com/Julpian/aset-GCH/refs/heads/main/headear-1.png",
  },
  {
    title: "Temukan Influencer Terbaik",
    description: "Platform nomor satu untuk menghubungkan brand dan kreator terbaik.",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071",
  },
  {
    title: "Kolaborasi Tanpa Batas",
    description: "Bangun kerja sama yang saling menguntungkan untuk berkembang bersama.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070",
  },
];

export default function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onInit = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("init", onInit);
    onInit();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("init", onInit);
    };
  }, [emblaApi]);

  return (
    <div className="embla relative w-full max-w-6xl mx-auto mt-20">
      <div className="embla__viewport overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="embla__container flex">
          {banners.map((banner, index) => (
            <div className="embla__slide flex-[0_0_100%] relative" key={index}>
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-xl"
              />
              {/* Overlay teks */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 rounded-xl">
                <h2 className="text-white text-2xl sm:text-3xl font-bold mb-1 drop-shadow-md">
                  {banner.title}
                </h2>
                <p className="text-white/90 text-sm sm:text-base">
                  {banner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tombol navigasi */}
      <button
        className="embla__button embla__button--prev"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <IoChevronBack size={22} />
      </button>
      <button
        className="embla__button embla__button--next"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <IoChevronForward size={22} />
      </button>

      {/* Dots indicator */}
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`embla__dot ${index === selectedIndex ? "embla__dot--selected" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
