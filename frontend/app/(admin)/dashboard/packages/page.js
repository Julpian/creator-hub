// File: app/(admin)/dashboard/packages/page.js
import Link from 'next/link';
import DeletePackageButton from '@/components/DeletePackageButton';

async function getPackages() {
    const res = await fetch('http://127.0.0.1:8080/api/packages', { cache: 'no-store' });
    if (!res.ok) throw new Error("Gagal mengambil data paket");
    return res.json();
}

const formatPrice = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

export default async function PackagesDashboard() {
    const packages = await getPackages() || [];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Kelola Paket</h1>
                <Link href="/dashboard/packages/tambah" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Tambah Paket Baru
                </Link>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            {/* 1. TAMBAHKAN KOLOM GAMBAR */}
                            <th className="p-3 text-left">Gambar</th> 
                            <th className="p-3 text-left">Judul Paket</th>
                            <th className="p-3 text-left">Tipe</th>
                            <th className="p-3 text-left">Harga</th>
                            <th className="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map(pkg => (
                            <tr key={pkg.ID} className="border-b last:border-none">
                                {/* 2. TAMPILKAN GAMBAR DI SINI */}
                                <td className="p-3">
                                    {pkg.imageUrl ? (
                                        <img
                                            src={`http://127.0.0.1:8080${pkg.imageUrl}`}
                                            alt={pkg.title}
                                            className="w-24 h-24 object-cover rounded-lg border"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 bg-gray-100 flex items-center justify-center text-xs text-gray-400 rounded-lg border">
                                            No Image
                                        </div>
                                    )}
                                </td>
                                <td className="p-3 font-medium">{pkg.title}</td>
                                <td className="p-3 capitalize">{pkg.tier}</td>
                                <td className="p-3">{formatPrice(pkg.price)}</td>
                                <td className="p-3">
                                    <div className="flex justify-center gap-2">
                                        <Link href={`/dashboard/packages/edit/${pkg.ID}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm">
                                            Edit
                                        </Link>
                                        <DeletePackageButton id={pkg.ID} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}