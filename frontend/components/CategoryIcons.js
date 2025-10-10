// File: components/CategoryIcons.js
"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  IoFastFoodOutline, 
  IoGameControllerOutline, 
  IoColorPaletteOutline, 
  IoHeartOutline, 
  IoAirplaneOutline,
  IoGridOutline
} from "react-icons/io5";

// Mapping antara nama kategori dari DB dan ikon yang akan ditampilkan
const iconMap = {
  'Food & Beverages': { icon: IoFastFoodOutline, id: 1 },
  'Beauty & Fashion': { icon: IoColorPaletteOutline, id: 8 },
  'Health & Sport': { icon: IoHeartOutline, id: 5 },
  'Travel & Lifestyle': { icon: IoAirplaneOutline, id: 4 },
  'Gaming': { icon: IoGameControllerOutline, id: 6 },
};

// Kategori yang ingin kita tampilkan
const displayCategories = Object.keys(iconMap);

export default function CategoryIcons() {
  const searchParams = useSearchParams();
  const activeCategoryId = searchParams.get('category_id');

  return (
    <div className="flex justify-center space-x-4 sm:space-x-6 my-8">
      {/* Tombol All */}
      <Link href="/" className="flex flex-col items-center text-center group">
        <div className={`w-16 h-16 flex items-center justify-center rounded-full transition-colors ${!activeCategoryId ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 group-hover:bg-blue-100'}`}>
          <IoGridOutline size={32} />
        </div>
        <span className="mt-2 text-sm font-medium">All</span>
      </Link>
      
      {/* 5 Tombol Kategori */}
      {displayCategories.map(name => {
        const category = iconMap[name];
        const isActive = activeCategoryId === String(category.id);
        return (
          <Link key={name} href={`/?category_id=${category.id}`} className="flex flex-col items-center text-center group">
            <div className={`w-16 h-16 flex items-center justify-center rounded-full transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 group-hover:bg-blue-100'}`}>
              <category.icon size={32} />
            </div>
            <span className="mt-2 text-sm font-medium">{name.split(' ')[0]}</span>
          </Link>
        )
      })}
    </div>
  );
}