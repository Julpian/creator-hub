"use client";
import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Apa itu Gen Creator Hub?",
      answer:
        "Gen Creator Hub adalah platform kolaborasi antara brand dan influencer yang di rancang untuk memumdahkan promosi produk atau layanan secara lebih efisiensi, aman, dan terukur. Melalui sistem kami, brand dapat menemukan influencer yang sesuai dengan target pasar mereka, sementara influencer dapat mengakses berbagai peluang kerja sama dengan brand ternama.",
    },
    {
      question: "Bagaimana cara bergabung sebagai influencer?",
      answer:
        "Anda dapat mendaftar melalui formulir ‘Join Influencer’ di menu utama. Setelah formulir dikirim, tim Gen Creator Hub akan memverifikasi data Anda. untuk memastikan kelayakan dan kecocokan sebelum akun Anda resmi terdaftar di platform kami.",
    },
    {
      question: "Apakah bergabung di Gen Creator Hub berbayar?",
      answer:
        "Tidak. Pendaftaran sebagai influencer di Gen Creator Hub sepenuhnya gratis. Anda tidak akan dikenakan biaya apapun selama proses pendaftaran hingga bergabung dengan platform kami.",
    },
    {
      question: "Bagaimana sistem kerja sama dengan brand?",
      answer:
        "Gen Creator Hub memfasilitasi kerja sama antara brand dan influencer melalui sistem yang aman, transparansi, dan efisien. setiap kolaborasi dilakukan dengan kontak digital yang melindungi kedua belah pihak. Influencer dapat melihat detail kampanye secara jelas, termasuk target, durasi dan konpensansi."
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-24 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Temukan jawaban dari pertanyaan yang sering diajukan oleh brand dan influencer seputar platform kami.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              <button
                className="flex justify-between items-center w-full p-5 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <IoChevronUp className="text-orange-500" size={20} />
                ) : (
                  <IoChevronDown className="text-gray-500" size={20} />
                )}
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-700 border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
