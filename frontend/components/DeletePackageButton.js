// File: components/DeletePackageButton.js
"use client";
import { useRouter } from "next/navigation";

export default function DeletePackageButton({ id }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus paket ini?")) return;

    const res = await fetch(`http://127.0.0.1:8080/api/admin/packages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });

    if (res.ok) {
      alert("Paket berhasil dihapus!");
      router.refresh();
    } else {
      alert("Gagal menghapus paket.");
    }
  };

  return <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Hapus</button>;
}