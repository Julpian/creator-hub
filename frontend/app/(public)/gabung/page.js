"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function GabungPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    bio: "",
    location: "",
    gender: "",
    dateOfBirth: "",
    category: "",
    instagramUrl: "",
    tiktokUrl: "",
    youtubeUrl: "",
    facebookUrl: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [statsImage, setStatsImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFile = async (submissionId, file, type) => {
    const data = new FormData();
    data.append("image", file);
   // await fetch(`http://127.0.0.1:8080/api/join/${submissionId}/upload/${type}`, {
    await fetch(`/api/join/${submissionId}/upload/${type}`, {
      method: "POST",
      body: data,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profileImage || !statsImage) {
      alert("Harap unggah Foto Profil dan Screenshot Statistik Anda.");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      //const resJson = await fetch("http://127.0.0.1:8080/api/join", {
      const resJson = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!resJson.ok) {
        const err = await resJson.json();
        setMessage({
          type: "error",
          text: `Gagal mendaftar: ${err.error || "Periksa kembali data Anda."}`,
        });
        setIsLoading(false);
        return;
      }

      const data = await resJson.json();
      const submissionId = data.submissionId;

      await uploadFile(submissionId, profileImage, "profile");
      await uploadFile(submissionId, statsImage, "stats");

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        bio: "",
        location: "",
        gender: "",
        dateOfBirth: "",
        category: "",
        instagramUrl: "",
        tiktokUrl: "",
        youtubeUrl: "",
        facebookUrl: "",
      });
      setProfileImage(null);
      setStatsImage(null);
      document.getElementById("profileImageInput").value = null;
      document.getElementById("statsImageInput").value = null;

      setMessage({
        type: "success",
        text: "Pendaftaran Anda telah diterima! Admin akan meninjau data Anda.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Terjadi kesalahan saat mengirimkan data.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="p-2 rounded-full hover:bg-gray-200 transition">
            <IoArrowBack size={22} className="text-gray-700" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Gabung Menjadi Kreator
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-8 border border-gray-100"
        >
          <p className="text-gray-600 text-sm leading-relaxed">
            Lengkapi data di bawah ini untuk bergabung. Setelah dikirim, admin akan meninjau data Anda sebelum akun ditampilkan secara publik.
          </p>

          {/* Informasi Dasar */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Informasi Dasar
            </h2>
            <Input label="Nama Lengkap" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Email (Untuk Verifikasi)" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <Input label="Nomor WhatsApp Aktif" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} placeholder="081234567890" required />
            <Input label="Lokasi (Kota)" name="location" value={formData.location} onChange={handleChange} placeholder="Contoh: Bandung" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Select label="Jenis Kelamin" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Pilih...</option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </Select>
              <Input label="Tanggal Lahir" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            </div>
            <Select label="Kategori Kreator" name="category" value={formData.category} onChange={handleChange}>
              <option value="">Pilih Kategori...</option>
              {[
                "Food & Beverages",
                "Technology",
                "Entertainment",
                "Travel & Lifestyle",
                "Health & Sport",
                "Gaming",
                "Content Creator",
                "Beauty & Fashion",
                "Youtuber",
                "DJ & Musician",
                "TikToker",
                "Mom & Kids",
                "Instagram",
                "Facebook",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            <Textarea label="Bio Singkat" name="bio" value={formData.bio} onChange={handleChange} placeholder="Ceritakan tentang diri dan konten Anda..." />
          </section>

          {/* Upload Gambar */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Upload Gambar</h2>
            <Input
              label="Foto Profil (Wajib)"
              id="profileImageInput"
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              required
            />
            <Input
              label="Screenshot Statistik (Wajib)"
              id="statsImageInput"
              type="file"
              accept="image/*"
              onChange={(e) => setStatsImage(e.target.files[0])}
              required
            />
            <p className="text-xs text-gray-500 italic">
              Upload screenshot insight Instagram, TikTok, atau YouTube Anda untuk validasi data.
            </p>
          </section>

          {/* Akun Sosial Media */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Akun Sosial Media</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Instagram URL" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/username" />
              <Input label="TikTok URL" name="tiktokUrl" value={formData.tiktokUrl} onChange={handleChange} placeholder="https://tiktok.com/@username" />
              <Input label="YouTube URL" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} placeholder="https://youtube.com/@username" />
              <Input label="Facebook URL" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} placeholder="https://facebook.com/username" />
            </div>
          </section>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md disabled:bg-indigo-300"
          >
            {isLoading ? "Mengirim..." : "Kirim Pendaftaran"}
          </button>

          {/* Pesan */}
          {message && (
            <div
              className={`p-4 rounded-lg text-sm text-center ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

/* 🔹 Komponen Form */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
      />
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        {...props}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm bg-white"
      >
        {children}
      </select>
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
      />
    </div>
  );
}
