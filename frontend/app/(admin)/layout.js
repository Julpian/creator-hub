// File: app/(admin)/layout.js
import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link
                href="/dashboard"
                className="block p-2 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            {/* Nanti kita akan tambahkan link lain di sini */}
          </ul>
        </nav>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}