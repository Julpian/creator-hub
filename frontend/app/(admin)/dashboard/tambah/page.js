// File: app/(admin)/dashboard/tambah/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TambahPage() {
  const [name, setName] = useState("");
  // State baru untuk menyimpan daftar semua kategori dari API
  const [allCategories, setAllCategories] = useState([]);
  // State baru untuk menyimpan ID kategori yang dicentang
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const [image, setImage] = useState(null);
  const router = useRouter();

  // useEffect akan berjalan saat komponen pertama kali dimuat
  useEffect(() => {
    // Fungsi untuk mengambil daftar kategori dari backend
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:8080/api/categories");
      if (res.ok) {
        const data = await res.json();
        setAllCategories(data);
      }
    };

    fetchCategories();
  }, []); // Array kosong berarti ini hanya berjalan sekali

  // Fungsi yang dijalankan setiap kali checkbox diubah
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      // Jika ID sudah ada di dalam array, hapus (uncheck)
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      }
      // Jika tidak ada, tambahkan (check)
      else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Nama wajib diisi.");
      return;
    }

    // Ubah payload untuk mengirim category_ids
    const textPayload = {
      name,
      category_ids: selectedCategories,
    };

    // Langkah 1: Kirim data teks terlebih dahulu
    const resText = await fetch("http://localhost:8080/api/admin/influencers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(textPayload),
    });

    if (!resText.ok) {
      alert("Gagal menambahkan data influencer.");
      return;
    }
    const newInfluencer = await resText.json();

    // Langkah 2: Unggah gambar jika ada
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      await fetch(`http://localhost:8080/api/admin/influencers/${newInfluencer.ID}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        body: formData,
      });
    }

    alert("Influencer baru berhasil ditambahkan!");
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tambah Influencer Baru</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Influencer</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>

          {/* Ganti input teks kategori dengan daftar checkbox */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Kategori</label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {allCategories.map((category) => (
                <div key={category.ID} className="flex items-center">
                  <input
                    id={`category-${category.ID}`}
                    type="checkbox"
                    value={category.ID}
                    checked={selectedCategories.includes(category.ID)}
                    onChange={() => handleCategoryChange(category.ID)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor={`category-${category.ID}`} className="ml-2 block text-sm text-gray-900">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Gambar Profil</label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"/>
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}