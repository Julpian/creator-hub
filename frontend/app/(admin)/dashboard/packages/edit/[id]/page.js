// File: app/(admin)/dashboard/packages/edit/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

async function getPackageDetail(id) {
    const res = await fetch(`http://127.0.0.1:8080/api/packages/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
}

export default function EditPackagePage() {
    const [pkg, setPkg] = useState({ title: '', description: '', price: 0, tier: 'micro' });
    const [newImage, setNewImage] = useState(null); // <-- State untuk file gambar baru
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getPackageDetail(id).then(data => {
                if(data) setPkg(data);
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPkg(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Update data teks terlebih dahulu
        const resText = await fetch(`http://127.0.0.1:8080/api/admin/packages/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ ...pkg, price: Number(pkg.price) }),
        });

        if (!resText.ok) {
            alert('Gagal memperbarui data paket.');
            return;
        }

        // 2. Jika ada gambar baru, upload gambar tersebut
        if (newImage) {
            const formData = new FormData();
            formData.append("image", newImage);

            await fetch(`http://127.0.0.1:8080/api/admin/packages/${id}/upload`, {
                method: "POST",
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
                body: formData,
            });
        }

        alert('Paket berhasil diperbarui!');
        router.push('/dashboard/packages');
        router.refresh();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Edit Paket</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                {/* ... (input untuk Title, Description, Price, Tier tidak berubah) ... */}
                <div><label>Judul Paket</label><input name="title" type="text" value={pkg.title} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required /></div>
                <div><label>Deskripsi</label><textarea name="description" value={pkg.description} onChange={handleChange} className="w-full mt-1 p-2 border rounded" rows="4"></textarea></div>
                <div><label>Harga</label><input name="price" type="number" value={pkg.price} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required /></div>
                <div><label>Tipe (Tier)</label><select name="tier" value={pkg.tier} onChange={handleChange} className="w-full mt-1 p-2 border rounded"><option value="micro">Micro</option><option value="mid-tier">Mid-tier</option><option value="macro">Macro</option><option value="mega">Mega</option></select></div>

                {/* Tampilkan gambar saat ini */}
                {pkg.imageUrl && (
                    <div>
                        <p className="block text-sm font-medium">Gambar Saat Ini:</p>
                        <img src={`http://127.0.0.1:8080${pkg.imageUrl}`} alt={pkg.title} className="mt-2 w-32 h-32 object-cover rounded"/>
                    </div>
                )}
                
                {/* Input untuk mengubah gambar */}
                <div>
                    <label className="block text-sm font-medium">Ubah Gambar Paket</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm"/>
                </div>

                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Update</button>
            </form>
        </div>
    );
}