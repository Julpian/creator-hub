// File: app/(public)/home/loading.js
import Image from 'next/image';

export default function HomeLoading() {
  return (
    // Container ini akan mengisi ruang di antara TopNav dan BottomNav
    // dan menempatkan semuanya di tengah.
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)]">
      {/* 128px adalah estimasi tinggi TopNav + BottomNav */}
      
      <div className="text-center">
        {/* Logo Anda */}
        <Image 
          src="/logo.svg" // Pastikan path logo ini benar
          alt="Memuat Gen Creator Hub..."
          width={160}
          height={160}
          className="mx-auto object-contain"
        />
        
        {/* Animasi 3 Titik Berdenyut */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <span className="h-3 w-3 bg-indigo-600 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
          <span className="h-3 w-3 bg-indigo-600 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
          <span className="h-3 w-3 bg-indigo-600 rounded-full animate-pulse"></span>
        </div>
        
        <p className="text-gray-500 text-lg mt-4 font-medium">
          Memuat Kreator...
        </p>
      </div>
    </div>
  );
}