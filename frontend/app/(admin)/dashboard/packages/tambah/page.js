"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahPackagePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [tier, setTier] = useState("micro");
  const [image, setImage] = useState(null); // <-- state gambar baru
  const router = useRouter();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Kirim data teks dulu
      const resText = await fetch("http://127.0.0.1:8080/api/admin/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          tier,
        }),
      });

      if (!resText.ok) {
        alert("Gagal menambahkan paket.");
        return;
      }

      // Dapatkan ID dari paket baru yang dibuat
      const created = await resText.json();
      const newPackageId = created.id || created.ID;

      // 2️⃣ Jika ada gambar, upload ke endpoint upload
      if (image && newPackageId) {
        const formData = new FormData();
        formData.append("image", image);

        const resImage = await fetch(
          `http://127.0.0.1:8080/api/admin/packages/${newPackageId}/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: formData,
          }
        );

        if (!resImage.ok) {
          alert("Data paket berhasil ditambah, tetapi gagal mengunggah gambar.");
        }
      }

      alert("Paket baru berhasil ditambahkan!");
      router.push("/dashboard/packages");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menambahkan paket.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tambah Paket Baru</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md space-y-4"
      >
        {/* Input untuk Title, Description, Price, Tier */}
        <div>
          <label className="block font-medium">Judul Paket</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Harga</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Tipe (Tier)</label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="micro">Micro</option>
            <option value="mid-tier">Mid-tier</option>
            <option value="macro">Macro</option>
            <option value="mega">Mega</option>
          </select>
        </div>

        {/* Input untuk gambar */}
        <div>
          <label className="block font-medium">Upload Gambar Paket</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm"
          />
        </div>

        {/* Preview gambar */}
        {image && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Preview Gambar:</p>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
