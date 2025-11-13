"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Clock } from "lucide-react";

export default function EventPage() {
  const events = [
    {
      id: 1,
      title: "Gen Creator Summit 2025",
      date: "20 Desember 2025",
      time: "09.00 - 16.00 WIB",
      location: "Bandung Techno Park",
      image: "/images/event-summit.jpg",
      description:
        "Konferensi besar tahunan untuk para kreator, influencer, dan brand untuk berkolaborasi dan membangun masa depan digital bersama.",
      link: "#",
    },
    {
      id: 2,
      title: "Creator Growth Workshop",
      date: "15 Januari 2026",
      time: "13.00 - 17.00 WIB",
      location: "Online via Zoom",
      image: "/images/event-workshop.jpg",
      description:
        "Pelatihan eksklusif untuk meningkatkan strategi personal branding, konten, dan kerjasama brand.",
      link: "#",
    },
    {
      id: 3,
      title: "Influencer Connect Meet-Up",
      date: "2 Februari 2026",
      time: "10.00 - 15.00 WIB",
      location: "Jakarta Creative Space",
      image: "/images/event-meetup.jpg",
      description:
        "Pertemuan komunitas influencer Gen Creator Hub — networking, kolaborasi, dan sharing pengalaman nyata di dunia digital.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 sm:px-10 py-24 font-sans">
      {/* HEADER SECTION */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Event Gen Creator Hub
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Temukan berbagai event, workshop, dan pertemuan kreatif yang
          diselenggarakan untuk mendukung pertumbuhan kreator dan influencer.
        </p>
      </motion.div>

      {/* EVENT CARDS */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            {/* Event Image */}
            <div className="relative h-56 w-full">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {event.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {event.description}
              </p>

              {/* Event Info */}
              <div className="space-y-1 text-sm text-gray-500 mb-4">
                <p className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-blue-500" />{" "}
                  {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-blue-500" /> {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" />{" "}
                  {event.location}
                </p>
              </div>

              {/* Button */}
              <Link
                href={event.link}
                className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-all"
              >
                Lihat Detail
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
