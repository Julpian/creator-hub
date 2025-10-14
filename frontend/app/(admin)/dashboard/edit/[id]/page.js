"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [instagramFollowers, setInstagramFollowers] = useState(0);
  const [tiktokFollowers, setTiktokFollowers] = useState(0);
  const [youtubeSubscribers, setYoutubeSubscribers] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const categoriesRes = await fetch("http://localhost:8080/api/categories");
        const categoriesData = await categoriesRes.json();
        setAllCategories(categoriesData);

        const influencerRes = await fetch(`http://localhost:8080/api/influencers/${id}`);
        if (influencerRes.ok) {
          const influencerData = await influencerRes.json();
          setName(influencerData.name || "");
          setBio(influencerData.bio || "");
          setLocation(influencerData.location || "");
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
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      bio,
      location,
      instagramUrl,
      tiktokUrl,
      youtubeUrl,
      instagramFollowers: Number(instagramFollowers),
      tiktokFollowers: Number(tiktokFollowers),
      youtubeSubscribers: Number(youtubeSubscribers),
      category_ids: selectedCategories,
    };

    const res = await fetch(`http://localhost:8080/api/admin/influencers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("❌ Gagal memperbarui data influencer.");
      return;
    }

    if (newImage) {
      const formData = new FormData();
      formData.append("image", newImage);

      await fetch(`http://localhost:8080/api/admin/influencers/${id}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        body: formData,
      });
    }

    alert("✅ Data influencer berhasil diperbarui!");
    router.push("/dashboard");
    router.refresh();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600 animate-pulse">Memuat data...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Data Influencer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 space-y-8"
      >
        {/* Gambar Saat Ini */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Gambar Saat Ini
          </label>
          <div className="flex items-center gap-4">
            {currentImageUrl ? (
              <img
                src={`http://localhost:8080${currentImageUrl}`}
                alt="Current"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                Tidak ada gambar
              </div>
            )}

            {imagePreview && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Preview Baru:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
        </div>

        {/* Upload Gambar Baru */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Ubah Gambar Profil
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          />
        </div>

        {/* Nama */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Nama Influencer
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Lokasi */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Lokasi
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Masukkan lokasi influencer"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Tulis deskripsi singkat..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* URL Sosial Media */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Akun Sosial Media
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Instagram URL",
                value: instagramUrl,
                setValue: setInstagramUrl,
                placeholder: "https://instagram.com/username",
              },
              {
                label: "TikTok URL",
                value: tiktokUrl,
                setValue: setTiktokUrl,
                placeholder: "https://tiktok.com/@username",
              },
              {
                label: "YouTube URL",
                value: youtubeUrl,
                setValue: setYoutubeUrl,
                placeholder: "https://youtube.com/@username",
              },
            ].map(({ label, value, setValue, placeholder }) => (
              <div key={label}>
                <label className="block text-gray-700 text-sm mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Statistik Pengikut */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Statistik Pengikut
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Instagram Followers",
                value: instagramFollowers,
                setValue: setInstagramFollowers,
              },
              {
                label: "TikTok Followers",
                value: tiktokFollowers,
                setValue: setTiktokFollowers,
              },
              {
                label: "YouTube Subscribers",
                value: youtubeSubscribers,
                setValue: setYoutubeSubscribers,
              },
            ].map(({ label, value, setValue }) => (
              <div key={label}>
                <label className="block text-gray-700 text-sm mb-1">
                  {label}
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Kategori */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Kategori</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allCategories.map((category) => (
              <label
                key={category.ID}
                className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.ID)}
                  onChange={() => handleCategoryChange(category.ID)}
                  className="accent-blue-600"
                />
                <span className="text-gray-700 text-sm">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tombol Simpan */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition-transform duration-200 hover:scale-[1.02]"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
