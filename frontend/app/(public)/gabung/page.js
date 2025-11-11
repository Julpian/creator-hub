"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function GabungPage() {
  const router = useRouter();

  // 🔹 State
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "", email: "", phoneNumber: "", bio: "", location: "",
    gender: "", dateOfBirth: "", category: "",
    instagramUrl: "", tiktokUrl: "", youtubeUrl: "", facebookUrl: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [statsImage, setStatsImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 🔹 Ambil kategori
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) setCategories(await res.json());
        else console.error("Gagal memuat kategori");
      } catch (e) {
        console.error("Error kategori:", e);
      }
    }
    fetchCategories();
  }, []);

  // 🔹 Redirect setelah sukses
  useEffect(() => {
    if (message?.type === "success") {
      const timer = setTimeout(() => router.push("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 🔹 Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Upload file
  const uploadFile = async (submissionId, file, type) => {
    const data = new FormData();
    data.append("image", file);
    const res = await fetch(`/api/join/${submissionId}/upload/${type}`, {
      method: "POST",
      body: data,
    });
    if (!res.ok) throw new Error(`Gagal upload gambar ${type}`);
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.category) {
      setMessage({ type: "error", text: "Nama, Email, dan Kategori wajib diisi." });
      return;
    }

    if (!profileImage || !statsImage) {
      alert("Harap unggah Foto Profil dan Screenshot Statistik Anda.");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const resJson = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!resJson.ok) {
        const err = await resJson.json();
        throw new Error(err.error || "Gagal mengirim data.");
      }

      const data = await resJson.json();
      const submissionId = data.submissionId;

      await Promise.all([
        uploadFile(submissionId, profileImage, "profile"),
        uploadFile(submissionId, statsImage, "stats"),
      ]);

      setFormData({
        name: "", email: "", phoneNumber: "", bio: "", location: "", gender: "", dateOfBirth: "",
        category: "", instagramUrl: "", tiktokUrl: "", youtubeUrl: "", facebookUrl: "",
      });
      document.getElementById("profileImageInput").value = null;
      document.getElementById("statsImageInput").value = null;
      setMessage({ type: "success", text: "Pendaftaran Anda telah diterima! Admin akan meninjau data Anda." });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: `Terjadi kesalahan: ${error.message}` });
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
          <h1 className="text-3xl font-bold text-gray-800">Gabung Menjadi Kreator</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 space-y-8 border border-gray-100">
          
          {/* Informasi Dasar */}
          <section className="space-y-4 border-b pb-6">
            <Input label="Nama Lengkap" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Email (Untuk Verifikasi)" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <Input label="Nomor WhatsApp" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} placeholder="6281234567890" required />
            <Input label="Lokasi (Kota)" name="location" value={formData.location} onChange={handleChange} placeholder="Contoh: Bandung" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Select label="Jenis Kelamin" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Pilih...</option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </Select>
              <Input label="Tanggal Lahir" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            </div>
            <Select label="Kategori Utama Anda" name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Pilih kategori...</option>
              {categories.map((cat) => (
                <option key={cat.ID} value={cat.name}>{cat.name}</option>
              ))}
            </Select>
            <Textarea label="Bio Singkat" name="bio" value={formData.bio} onChange={handleChange} placeholder="Ceritakan tentang diri dan konten Anda..." />
          </section>

          {/* Media Sosial */}
          <section className="space-y-4 border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Media Sosial Anda</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="URL Instagram"
                name="instagramUrl"
                type="url"
                placeholder="https://instagram.com/username"
                value={formData.instagramUrl}
                onChange={handleChange}
              />
              <Input
                label="URL TikTok"
                name="tiktokUrl"
                type="url"
                placeholder="https://tiktok.com/@username"
                value={formData.tiktokUrl}
                onChange={handleChange}
              />
              <Input
                label="URL YouTube"
                name="youtubeUrl"
                type="url"
                placeholder="https://youtube.com/@channel"
                value={formData.youtubeUrl}
                onChange={handleChange}
              />
              <Input
                label="URL Facebook"
                name="facebookUrl"
                type="url"
                placeholder="https://facebook.com/username"
                value={formData.facebookUrl}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Upload */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Upload Gambar</h2>
            <Input label="Foto Profil (Wajib)" id="profileImageInput" type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} required />
            <Input label="Screenshot Statistik (Wajib)" id="statsImageInput" type="file" accept="image/*" onChange={(e) => setStatsImage(e.target.files[0])} required />
            <p className="text-xs text-gray-500 italic">Upload screenshot insight media sosial Anda.</p>
          </section>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md disabled:bg-indigo-300"
          >
            {isLoading ? "Mengirim Data..." : "Kirim Pendaftaran"}
          </button>

          {message && (
            <div
              className={`p-4 rounded-lg text-sm text-center font-medium transition ${
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

/* Components */
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
