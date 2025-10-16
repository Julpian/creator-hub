// File: app/(admin)/dashboard/edit/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Trash2, Upload, Loader2 } from "lucide-react";

// ====================================================================
// 🔹 Komponen: Manajemen Portofolio Influencer
// ====================================================================
function PortfolioManager({ influencerId, initialImages = [] }) {
  const [images, setImages] = useState(initialImages);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (images.length >= 2) {
      alert("⚠️ Maksimal 2 gambar diperbolehkan. Hapus gambar lama terlebih dahulu.");
      return;
    }

    if (!newImage) {
      alert("Pilih gambar terlebih dahulu.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", newImage);
    formData.append("description", description);

    try {
      const res = await fetch(
        `http://127.0.0.1:8080/api/admin/influencers/${influencerId}/portfolio`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Gagal upload gambar");

      const newData = await res.json();
      setImages((prev) => [...prev, newData]);
      setNewImage(null);
      setImagePreview(null);
      setDescription("");
      document.getElementById("portfolio-upload").value = "";
    } catch (err) {
      console.error(err);
      alert("❌ Gagal mengunggah gambar portofolio.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!confirm("Yakin ingin menghapus gambar ini?")) return;
    setDeletingId(imageId);

    try {
      const res = await fetch(`http://127.0.0.1:8080/api/admin/portfolio/${imageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });

      if (!res.ok) throw new Error("Gagal hapus gambar");
      setImages((prev) => prev.filter((img) => img.ID !== imageId));
    } catch (err) {
      console.error(err);
      alert("❌ Terjadi kesalahan saat menghapus gambar.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-10 border-t pt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        📸 Portofolio Influencer (Maks. 2 Gambar)
      </h2>

      {/* Form Upload */}
      <form
        onSubmit={handleUpload}
        className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4 mb-6"
      >
        <div>
          <label className="font-medium text-gray-700 mb-2 block">Tambah Gambar Baru</label>
          <input
            id="portfolio-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600 
                       file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                       file:border-0 file:text-sm file:font-medium 
                       file:bg-blue-50 file:text-blue-700 
                       hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        {imagePreview && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Preview Gambar:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border shadow-sm"
            />
          </div>
        )}

        <div>
          <label className="block text-gray-700 text-sm mb-1">Deskripsi (Opsional)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tambahkan deskripsi singkat..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isUploading || images.length >= 2}
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white 
                      ${isUploading || images.length >= 2
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 transition"}`}
        >
          {isUploading ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload size={16} />}
          {isUploading ? "Mengunggah..." : "Unggah Gambar"}
        </button>
      </form>

      {/* Daftar Gambar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-sm">
            Belum ada gambar portofolio.
          </p>
        ) : (
          images.map((img) => (
            <div
              key={img.ID}
              className={`relative group aspect-square transition-opacity rounded-lg overflow-hidden border ${
                deletingId === img.ID ? "opacity-50" : "opacity-100"
              }`}
            >
              <img
                src={`http://127.0.0.1:8080${img.imageUrl}`}
                alt={img.description || "Portfolio"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(img.ID)}
                  disabled={deletingId}
                  className="p-2 rounded-full bg-red-600/80 text-white hover:bg-red-700 transition disabled:bg-gray-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {img.description && (
                <div className="absolute bottom-0 bg-black/60 text-white text-xs text-center w-full py-1">
                  {img.description}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ====================================================================
// 🔹 Komponen Utama: Edit Data Influencer (Sudah Diperbarui)
// ====================================================================
export default function EditPage() {
  const router = useRouter();
  const { id } = useParams();

  const [influencer, setInfluencer] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const [catRes, infRes] = await Promise.all([
          fetch("http://127.0.0.1:8080/api/categories"),
          fetch(`http://127.0.0.1:8080/api/influencers/${id}`),
        ]);

        const cats = await catRes.json();
        setAllCategories(cats);

        if (infRes.ok) {
          const infData = await infRes.json();

          // Format tanggal lahir agar cocok untuk input type="date"
          if (infData.dateOfBirth) {
            infData.dateOfBirth = infData.dateOfBirth.split("T")[0];
          }

          setInfluencer(infData);
          setSelectedCategories(infData.categories?.map((c) => c.ID) || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      // Jika inputnya adalah checkbox, gunakan 'checked' (boolean).
      // Jika bukan, gunakan 'value' (string).
      setInfluencer((prev) => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
      }));
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: influencer.name,
      bio: influencer.bio,
      location: influencer.location,
      isRecommended: influencer.isRecommended || false, // Pastikan ini adalah boolean
      instagramUrl: influencer.instagramUrl,
      tiktokUrl: influencer.tiktokUrl,
      youtubeUrl: influencer.youtubeUrl,
      gender: influencer.gender,
      dateOfBirth: influencer.dateOfBirth,
      instagramFollowers: Number(influencer.instagramFollowers) || 0,
      tiktokFollowers: Number(influencer.tiktokFollowers) || 0,
      youtubeSubscribers: Number(influencer.youtubeSubscribers) || 0,
      category_ids: selectedCategories,
    };

    // Tambahkan URL hanya jika tidak kosong
    // Hapus field URL yang kosong agar validasi omitempty bekerja
    if (!payload.instagramUrl) delete payload.instagramUrl;
    if (!payload.tiktokUrl) delete payload.tiktokUrl;
    if (!payload.youtubeUrl) delete payload.youtubeUrl;
    if (influencer.dateOfBirth) payload.dateOfBirth = influencer.dateOfBirth;
    if (influencer.gender) payload.gender = influencer.gender;
    // --- BATAS PERUBAHAN ---

    const res = await fetch(`http://127.0.0.1:8080/api/admin/influencers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
        // Ambil dan tampilkan detail error dari backend
        const errorData = await res.json();
        console.error("Backend validation error:", errorData);

        alert("❌ Gagal memperbarui data influencer. Cek console (F12) untuk detail.");
        return;
    }

    if (newImage) {
      const formData = new FormData();
      formData.append("image", newImage);
      await fetch(`http://127.0.0.1:8080/api/admin/influencers/${id}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        body: formData,
      });
    }

    alert("✅ Data influencer berhasil diperbarui!");
    router.push("/dashboard");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Memuat data...
      </div>
    );

  if (!influencer)
    return <p className="text-center text-gray-500">Data influencer tidak ditemukan.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        ✏️ Edit Influencer: {influencer.name}
      </h1>

      {/* Form utama */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-8 space-y-6 border border-gray-100"
      >
        {/* Gambar Profil */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">Gambar Profil</label>
          <div className="flex items-center gap-4">
            {influencer.imageUrl && !imagePreview && (
              <img
                src={`http://127.0.0.1:8080${influencer.imageUrl}`}
                alt="Current"
                className="w-32 h-32 object-cover rounded-lg border shadow-sm"
              />
            )}
            {imagePreview && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Preview Baru:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-4 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                       file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Informasi Dasar */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Nama" name="name" value={influencer.name} onChange={handleInputChange} />
          <Input
            label="Lokasi"
            name="location"
            value={influencer.location}
            onChange={handleInputChange}
            placeholder="Contoh: Jakarta"
          />
        </div>

        {/* Jenis Kelamin & Tanggal Lahir */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Jenis Kelamin</label>
            <select
              name="gender"
              value={influencer.gender || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
            </select>
          </div>
          <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Tanggal Lahir
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={influencer.dateOfBirth || ""}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            min="1960-01-01"
            max={new Date().toISOString().split("T")[0]} // batas maksimal hari ini
          />
        </div>
        </div>

        <Textarea
          label="Bio"
          name="bio"
          value={influencer.bio}
          onChange={handleInputChange}
          placeholder="Tulis deskripsi singkat..."
        />

        {/* --- TAMBAHKAN CHECKBOX REKOMENDASI DI SINI --- */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <label className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-blue-800">Jadikan Rekomendasi</span>
                <input
                    type="checkbox"
                    name="isRecommended"
                    checked={influencer.isRecommended || false}
                    onChange={handleInputChange}
                    className="h-6 w-6 accent-blue-600"
                />
            </label>
            <p className="text-xs text-blue-600 mt-1">
                Influencer ini akan muncul di halaman Rekomendasi.
            </p>
        </div>

        {/* Sosial Media */}
        <h2 className="text-lg font-semibold text-gray-800">Akun & Statistik</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Input label="Instagram URL" name="instagramUrl" value={influencer.instagramUrl} onChange={handleInputChange} />
          <Input label="TikTok URL" name="tiktokUrl" value={influencer.tiktokUrl} onChange={handleInputChange} />
          <Input label="YouTube URL" name="youtubeUrl" value={influencer.youtubeUrl} onChange={handleInputChange} />
          <Input label="Instagram Followers" name="instagramFollowers" type="number" value={influencer.instagramFollowers} onChange={handleInputChange} />
          <Input label="TikTok Followers" name="tiktokFollowers" type="number" value={influencer.tiktokFollowers} onChange={handleInputChange} />
          <Input label="YouTube Subscribers" name="youtubeSubscribers" type="number" value={influencer.youtubeSubscribers} onChange={handleInputChange} />
        </div>

        {/* Kategori */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Kategori</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allCategories.map((cat) => (
              <label
                key={cat.ID}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer ${
                  selectedCategories.includes(cat.ID)
                    ? "bg-blue-100 border-blue-400"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.ID)}
                  onChange={() => handleCategoryChange(cat.ID)}
                  className="accent-blue-600"
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
        >
          💾 Simpan Perubahan
        </button>
      </form>

      {/* Komponen Portofolio */}
      <div className="bg-white shadow-md rounded-2xl p-8 mt-10 border border-gray-100">
        <PortfolioManager influencerId={id} initialImages={influencer.portfolioImages || []} />
      </div>
    </div>
  );
}

// ====================================================================
// 🔹 Komponen kecil untuk Input & Textarea
// ====================================================================
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
  );
}
