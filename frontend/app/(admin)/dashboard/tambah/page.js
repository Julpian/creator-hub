"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TambahPage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [tiktokFollowers, setTiktokFollowers] = useState("");
  const [youtubeSubscribers, setYoutubeSubscribers] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const router = useRouter();

  // Ambil kategori
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:8080/api/categories");
      if (res.ok) {
        const data = await res.json();
        setAllCategories(data);
      }
    };
    fetchCategories();
  }, []);

  // Checkbox kategori
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Nama wajib diisi.");
      return;
    }

    const textPayload = {
      name,
      bio,
      instagramUrl,
      tiktokUrl,
      youtubeUrl,
      instagramFollowers: Number(instagramFollowers) || 0,
      tiktokFollowers: Number(tiktokFollowers) || 0,
      youtubeSubscribers: Number(youtubeSubscribers) || 0,
      category_ids: selectedCategories,
    };

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

    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      await fetch(
        `http://localhost:8080/api/admin/influencers/${newInfluencer.ID}/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: formData,
        }
      );
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
          {/* Nama */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama Influencer
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Tulis deskripsi singkat tentang influencer..."
            />
          </div>

          {/* URL Sosial Media */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
              <input
                type="text"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">TikTok URL</label>
              <input
                type="text"
                value={tiktokUrl}
                onChange={(e) => setTiktokUrl(e.target.value)}
                placeholder="https://tiktok.com/@username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/@username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Followers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram Followers</label>
              <input
                type="number"
                value={instagramFollowers}
                onChange={(e) => setInstagramFollowers(e.target.value)}
                placeholder="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">TikTok Followers</label>
              <input
                type="number"
                value={tiktokFollowers}
                onChange={(e) => setTiktokFollowers(e.target.value)}
                placeholder="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">YouTube Subscribers</label>
              <input
                type="number"
                value={youtubeSubscribers}
                onChange={(e) => setYoutubeSubscribers(e.target.value)}
                placeholder="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Kategori */}
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

          {/* Upload Gambar */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Gambar Profil
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                file:rounded-full file:border-0 file:text-sm file:font-semibold 
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
