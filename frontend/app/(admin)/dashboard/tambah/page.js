"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TambahPage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState(""); // 🔹 Jenis Kelamin
  const [dateOfBirth, setDateOfBirth] = useState(""); // 🔹 Tanggal Lahir
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Nama wajib diisi.");
      return;
    }

    const textPayload = {
      name,
      bio,
      location,
      gender, // ✅ tambahkan gender
      dateOfBirth, // ✅ tambahkan dateOfBirth
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Tambah Influencer Baru
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 space-y-8"
      >
        {/* Nama */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Nama Influencer
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama influencer"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* 🔹 Jenis Kelamin & Tanggal Lahir */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Jenis Kelamin */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Jenis Kelamin
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
            </select>
          </div>

          {/* Tanggal Lahir */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Tanggal Lahir
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              min="1950-01-01"
              max={new Date().toISOString().split("T")[0]} // 🔹 Batas: 1950 - sekarang
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
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
            placeholder="Contoh: Jakarta, Bandung, Surabaya..."
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

        {/* Sosial Media */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Akun Sosial Media
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[ 
              { label: "Instagram URL", value: instagramUrl, setValue: setInstagramUrl, placeholder: "https://instagram.com/username" },
              { label: "TikTok URL", value: tiktokUrl, setValue: setTiktokUrl, placeholder: "https://tiktok.com/@username" },
              { label: "YouTube URL", value: youtubeUrl, setValue: setYoutubeUrl, placeholder: "https://youtube.com/@username" },
            ].map(({ label, value, setValue, placeholder }) => (
              <div key={label}>
                <label className="block text-gray-700 text-sm mb-1">{label}</label>
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

        {/* Followers */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Statistik Pengikut
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[ 
              { label: "Instagram Followers", value: instagramFollowers, setValue: setInstagramFollowers },
              { label: "TikTok Followers", value: tiktokFollowers, setValue: setTiktokFollowers },
              { label: "YouTube Subscribers", value: youtubeSubscribers, setValue: setYoutubeSubscribers },
            ].map(({ label, value, setValue }) => (
              <div key={label}>
                <label className="block text-gray-700 text-sm mb-1">{label}</label>
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

        {/* Upload Gambar */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Gambar Profil
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* Tombol Simpan */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-transform duration-200 hover:scale-[1.02]"
          >
            Simpan Influencer
          </button>
        </div>
      </form>
    </div>
  );
}
