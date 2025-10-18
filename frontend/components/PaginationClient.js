"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationClient({
  totalPages,
  currentPage,
  searchQuery,
  categoryId,
}) {
  const router = useRouter();
  const params = useSearchParams();

  const handlePageChange = (page) => {
    const query = new URLSearchParams(params);
    query.set("page", page);
    if (searchQuery) query.set("q", searchQuery);
    if (categoryId) query.set("category_id", categoryId);
    router.push(`/?${query.toString()}`, { scroll: false });
  };

  return (
    <nav className="flex justify-center items-center gap-2 my-8">
      {/* Tombol Sebelumnya */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`px-3 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-all duration-200 ${
          currentPage <= 1
            ? "pointer-events-none text-gray-400 bg-gray-100"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-[#1986DF]/10 hover:border-[#1986DF] hover:text-[#1986DF] shadow-sm"
        }`}
      >
        ← <span className="hidden sm:inline">Sebelumnya</span>
      </button>

      {/* Nomor Halaman */}
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
              currentPage === i + 1
                ? "bg-[#1986DF] text-white shadow-md scale-105"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-[#1986DF]/10 hover:text-[#1986DF] hover:border-[#1986DF]"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Tombol Selanjutnya */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-3 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-all duration-200 ${
          currentPage >= totalPages
            ? "pointer-events-none text-gray-400 bg-gray-100"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-[#1986DF]/10 hover:border-[#1986DF] hover:text-[#1986DF] shadow-sm"
        }`}
      >
        <span className="hidden sm:inline">Selanjutnya</span> →
      </button>
    </nav>
  );
}
