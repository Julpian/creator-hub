// File: app/(admin)/dashboard/edit/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPage() {
  const [name, setName] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [newImage, setNewImage] = useState(null);
  
  // State baru untuk kategori
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const [loading, setLoading] = useState(true); // State untuk loading
  
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // useEffect untuk mengambil SEMUA data yang dibutuhkan saat halaman dimuat
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        // 1. Ambil daftar semua kategori
        const categoriesRes = await fetch("http://localhost:8080/api/categories");
        const categoriesData = await categoriesRes.json();
        setAllCategories(categoriesData);

        // 2. Ambil data influencer yang spesifik
        const influencerRes = await fetch(`http://localhost:8080/api/influencers/${id}`);
        if (influencerRes.ok) {
          const influencerData = await influencerRes.json();
          setName(influencerData.name);
          setCurrentImageUrl(influencerData.imageUrl);
          
          // 3. Set checkbox yang aktif berdasarkan data influencer
          // Kita ambil ID dari setiap kategori yang dimiliki influencer
          const initialSelectedIds = influencerData.categories.map(cat => cat.ID);
          setSelectedCategories(initialSelectedIds);
        }
        setLoading(false); // Selesai loading
      };
      fetchData();
    }
  }, [id]);

  // Fungsi ini sama persis seperti di halaman "Tambah"
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Langkah 1: Update data teks (nama & kategori)
    const resText = await fetch(`http://localhost:8080/api/admin/influencers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      // Kirim payload yang baru
      body: JSON.stringify({ name, category_ids: selectedCategories }),
    });

    if (!resText.ok) {
      alert("Gagal memperbarui data teks.");
      return;
    }

    // Langkah 2: Unggah gambar baru jika ada
    if (newImage) {
      const formData = new FormData();
      formData.append("image", newImage);
      await fetch(`http://localhost:8080/api/admin/influencers/${id}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        body: formData,
      });
    }

    alert("Data berhasil diperbarui!");
    router.push("/dashboard");
    router.refresh();
  };
  
  if (loading) {
    return <p>Loading data...</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Influencer</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentImageUrl && (
            <div className="mb-4">
              <p className="block text-sm font-medium text-gray-700 mb-2">Gambar Saat Ini:</p>
              <img src={`http://localhost:8080${currentImageUrl}`} alt="Current" className="w-32 h-32 object-cover rounded"/>
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Influencer</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
          </div>

          {/* Daftar Checkbox Kategori */}
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
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Ubah Gambar Profil</label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"/>
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg">
            Update Data
          </button>
        </form>
      </div>
    </div>
  );
}