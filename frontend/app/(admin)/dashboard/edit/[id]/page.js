"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [instagramFollowers, setInstagramFollowers] = useState(0);
  const [tiktokFollowers, setTiktokFollowers] = useState(0);
  const [youtubeSubscribers, setYoutubeSubscribers] = useState(0);

  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [newImage, setNewImage] = useState(null);

  // State kategori
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        // 1️⃣ Ambil semua kategori
        const categoriesRes = await fetch("http://localhost:8080/api/categories");
        const categoriesData = await categoriesRes.json();
        setAllCategories(categoriesData);

        // 2️⃣ Ambil data influencer
        const influencerRes = await fetch(`http://localhost:8080/api/influencers/${id}`);
        if (influencerRes.ok) {
          const influencerData = await influencerRes.json();

          // isi semua field
          setName(influencerData.name || "");
          setBio(influencerData.bio || "");
          setInstagramUrl(influencerData.instagramUrl || "");
          setTiktokUrl(influencerData.tiktokUrl || "");
          setYoutubeUrl(influencerData.youtubeUrl || "");
          setInstagramFollowers(influencerData.instagramFollowers || 0);
          setTiktokFollowers(influencerData.tiktokFollowers || 0);
          setYoutubeSubscribers(influencerData.youtubeSubscribers || 0);
          setCurrentImageUrl(influencerData.imageUrl || "");

          const initialSelectedIds = influencerData.categories?.map((cat) => cat.ID) || [];
          setSelectedCategories(initialSelectedIds);
        }

        setLoading(false);
      };

      fetchData();
    }
  }, [id]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      bio,
      instagramUrl,
      tiktokUrl,
      youtubeUrl,
      instagramFollowers: Number(instagramFollowers),
      tiktokFollowers: Number(tiktokFollowers),
      youtubeSubscribers: Number(youtubeSubscribers),
      category_ids: selectedCategories,
    };

    // 1️⃣ Update data utama
    const res = await fetch(`http://localhost:8080/api/admin/influencers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Gagal memperbarui data influencer.");
      return;
    }

    // 2️⃣ Upload gambar baru jika ada
    if (newImage) {
      const formData = new FormData();
      formData.append("image", newImage);

      await fetch(`http://localhost:8080/api/admin/influencers/${id}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
    }

    alert("Data influencer berhasil diperbarui!");
    router.push("/dashboard");
    router.refresh();
  };

  if (loading) return <p>Loading data...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Influencer</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gambar */}
          {currentImageUrl && (
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">Gambar Saat Ini:</p>
              <img
                src={`http://localhost:8080${currentImageUrl}`}
                alt="Current"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}

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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* URL Sosial Media */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="instagramUrl" className="block text-sm font-medium text-gray-700">
                Instagram URL
              </label>
              <input
                type="text"
                id="instagramUrl"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="tiktokUrl" className="block text-sm font-medium text-gray-700">
                TikTok URL
              </label>
              <input
                type="text"
                id="tiktokUrl"
                value={tiktokUrl}
                onChange={(e) => setTiktokUrl(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700">
                YouTube URL
              </label>
              <input
                type="text"
                id="youtubeUrl"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Jumlah Followers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="instagramFollowers" className="block text-sm font-medium text-gray-700">
                Instagram Followers
              </label>
              <input
                type="number"
                id="instagramFollowers"
                value={instagramFollowers}
                onChange={(e) => setInstagramFollowers(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="tiktokFollowers" className="block text-sm font-medium text-gray-700">
                TikTok Followers
              </label>
              <input
                type="number"
                id="tiktokFollowers"
                value={tiktokFollowers}
                onChange={(e) => setTiktokFollowers(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="youtubeSubscribers" className="block text-sm font-medium text-gray-700">
                YouTube Subscribers
              </label>
              <input
                type="number"
                id="youtubeSubscribers"
                value={youtubeSubscribers}
                onChange={(e) => setYoutubeSubscribers(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Checkbox Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Kategori</label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {allCategories.map((category) => (
                <div key={category.ID} className="flex items-center">
                  <input
                    id={`category-${category.ID}`}
                    type="checkbox"
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
              Ubah Gambar Profil
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 
              file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
          >
            Update Data
          </button>
        </form>
      </div>
    </div>
  );
}
