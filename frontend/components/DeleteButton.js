// File: components/DeleteButton.js
"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    // Konfirmasi sebelum menghapus
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      return;
    }

    const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
    if (!token) {
      alert("Anda tidak terautentikasi. Silakan login kembali.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/admin/influencers/${id}`, {
        method: 'DELETE',
        headers: {
          // Sertakan token di header Authorization
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Data berhasil dihapus!");
        router.refresh(); // Refresh halaman untuk melihat data terbaru
      } else {
        alert("Gagal menghapus data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menghapus data.");
    }
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
      Hapus
    </button>
  );
}