"use client";

import { useState } from "react";

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState("influencer");

  return (
    <section className="min-h-screen bg-white py-16 px-6 md:px-16 text-gray-700">
      <div className="max-w-5xl mx-auto">
        {/* Judul */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Syarat dan Ketentuan penggunaan platform Gen Creator Hub.  
          Silakan pilih kategori sesuai peran Anda.
        </p>

        {/* Tab Navigasi */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab("influencer")}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                activeTab === "influencer"
                  ? "bg-orange-500 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Influencer
            </button>
            <button
              onClick={() => setActiveTab("brand")}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                activeTab === "brand"
                  ? "bg-orange-500 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Brand
            </button>
          </div>
        </div>

        {/* Konten Terms */}
        <div className="space-y-8 text-base leading-relaxed">
          {activeTab === "influencer" ? (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                A. Syarat & Ketentuan untuk Influencer
              </h2>

              <section className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">1. Pendaftaran dan Akun</h3>
                  <p>Influencer wajib memberikan data pribadi yang benar dan hanya boleh memiliki satu akun.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">2. Kewajiban Influencer</h3>
                  <p>Influencer harus mengikuti brief dari brand, tidak boleh mengunggah konten yang melanggar hukum, dan bertanggung jawab atas konten yang dipublikasikan.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">3. Kompensasi dan Pembayaran</h3>
                  <p>Pembayaran diberikan setelah pekerjaan disetujui oleh brand, melalui sistem Gen Creator Hub yang aman tanpa potongan biaya.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">4. Kepemilikan Konten</h3>
                  <p>Hak cipta konten tetap milik influencer, namun dapat digunakan oleh brand dan Gen Creator Hub dengan izin influencer.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">5. Sanksi dan Pelanggaran</h3>
                  <p>Influencer yang melanggar ketentuan dapat dikenakan sanksi berupa peringatan, pembekuan akun, atau pemutusan kerja sama.</p>
                </div>
              </section>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                B. Syarat & Ketentuan untuk Brand
              </h2>

              <section className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">1. Pendaftaran dan Verifikasi</h3>
                  <p>Brand wajib memberikan data perusahaan yang sah dan bersedia melalui proses verifikasi oleh Gen Creator Hub.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">2. Ketentuan Kampanye</h3>
                  <p>Brand harus memberikan brief yang jelas dan tidak boleh memuat materi yang melanggar hukum atau diskriminatif.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">3. Pembayaran</h3>
                  <p>Pembayaran dilakukan melalui sistem resmi Gen Creator Hub sesuai dengan waktu dan nominal yang disepakati.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">4. Hak Penggunaan Konten</h3>
                  <p>Brand hanya dapat menggunakan konten influencer sesuai kesepakatan kampanye dan dilarang menggunakannya di luar izin tertulis.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">5. Pelanggaran dan Sanksi</h3>
                  <p>Brand yang melanggar akan dikenakan pembatasan akses, pemblokiran akun, atau pelaporan ke pihak berwenang.</p>
                </div>
              </section>
            </div>
          )}

          {/* Bagian Umum */}
          <div className="border-t border-gray-200 pt-6 mt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              C. Ketentuan Umum
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              <li>Gen Creator Hub dapat memperbarui syarat & ketentuan ini sewaktu-waktu tanpa pemberitahuan.</li>
              <li>Dengan menggunakan layanan ini, pengguna dianggap menyetujui seluruh isi dokumen ini.</li>
              <li>Syarat & Ketentuan ini tunduk pada hukum Republik Indonesia.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
