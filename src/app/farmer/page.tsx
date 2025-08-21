"use client";
import { useState } from "react";
import Link from "next/link";

export default function FarmerTerms() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [language, setLanguage] = useState<"en" | "id">("en");

  const isAgreed = agreeTerms && agreePrivacy;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white flex flex-col items-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 space-y-6">
        
        {/* ======= Top Buttons ======= */}
        <div className="flex justify-between items-center">
          {/* Kembali Button */}
          <Link
            href="/"
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            &lt; {language === "en" ? "Back" : "Kembali"}
          </Link>

          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === "en" ? "id" : "en")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {language === "en" ? "Bahasa Indonesia" : "English"}
          </button>
        </div>

        {/* ======= Header ======= */}
        <h1 className="text-center text-2xl font-bold text-green-700">Cemara Supply</h1>
        <h2 className="text-xl text-black font-semibold text-center">
          {language === "en"
            ? "Farmer Platform Term & Condition"
            : "Syarat & Ketentuan Platform Petani"}
        </h2>

        {/* ======= Content Terms ======= */}
        <div className="text-sm text-gray-700 space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {language === "en" ? (
            <>
              <p>
                <strong>1. Platform Usage Terms</strong> <br />– 1.1 Account Responsibility: You are responsible for maintaining the security of your account credentials and all activities that occur under your account.<br />
                – 1.2 Accurate Information: All information provided must be accurate, complete, and current. False information may result in account suspension.<br />
                – 1.3 Authorized Use: The platform may only be used for legitimate agricultural business purposes in accordance with our guidelines.<br />
                – 1.4 Prohibited Activities: Users may not engage in fraudulent activities, misrepresent products, or violate any applicable laws.
              </p>
              <p>
                <strong>2. Product Quality & Standards</strong> <br />– 2.1 Quality Assurance: All products must meet the specified quality standards and certifications as outlined in the platform guidelines.<br />
                – 2.2 Product Documentation: Farmers must provide accurate documentation including harvest dates, processing methods, and quality certificates.<br />
                – 2.3 Video Evidence: Video documentation of product condition may be required for verification purposes.<br />
                – 2.4 Rejection Rights: Cemara Supply reserves the right to reject products that do not meet quality standards.
              </p>
              <p>
                <strong>3. Blockchain & Data Security</strong> <br />– 3.1 Immutable Records: All transactions and product information are recorded on the blockchain and cannot be altered once confirmed.<br />
                – 3.2 Hash Verification: Each product batch receives a unique hash code for traceability and authenticity verification.<br />
                – 3.3 Data Transparency: Product information may be shared with customers and logistics partners for transparency purposes.<br />
                – 3.4 Privacy Protection: Personal farmer information is protected and only shared as necessary for business operations.
              </p>
              <p>
                <strong>4. Payment & Financial Terms</strong> <br />– 4.1 Payment Processing: Payments are processed according to agreed schedules and quality acceptance.<br />
                – 4.2 Price Agreements: Prices are determined based on quality grades and market conditions at time of delivery.<br />
                – 4.3 Currency & Fees: All transactions are conducted in the agreed currency with applicable processing fees disclosed.<br />
                – 4.4 Dispute Resolution: Payment disputes will be resolved through our established mediation process.
              </p>
              <p>
                <strong>5. Legal & Compliance</strong> <br />– 5.1 Governing Law: These terms are governed by Indonesian law and subject to local agricultural regulations.<br />
                – 5.2 Amendments: Terms may be updated with 30 days advance notice to all users.<br />
                – 5.3 Severability: If any provision is found invalid, the remaining terms continue to apply.<br />
                – 5.4 Contact: For questions about these terms, contact support@cemarasupply.com.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Ketentuan Penggunaan Platform</strong> <br />– 1.1 Tanggung Jawab Akun: Anda bertanggung jawab menjaga keamanan kredensial akun dan seluruh aktivitas yang terjadi di bawah akun Anda.<br />
                – 1.2 Informasi Akurat: Semua informasi yang diberikan harus akurat, lengkap, dan terbaru. Informasi palsu dapat mengakibatkan penangguhan akun.<br />
                – 1.3 Penggunaan Sah: Platform hanya boleh digunakan untuk tujuan bisnis pertanian yang sah sesuai dengan pedoman kami.<br />
                – 1.4 Aktivitas Terlarang: Pengguna dilarang melakukan aktivitas penipuan, salah merepresentasikan produk, atau melanggar hukum yang berlaku.
              </p>
              <p>
                <strong>2. Kualitas & Standar Produk</strong> <br />– 2.1 Jaminan Kualitas: Semua produk harus memenuhi standar kualitas yang ditentukan dan sertifikasi sesuai pedoman platform.<br />
                – 2.2 Dokumentasi Produk: Petani wajib memberikan dokumentasi akurat termasuk tanggal panen, metode pengolahan, dan sertifikat kualitas.<br />
                – 2.3 Bukti Video: Dokumentasi video kondisi produk mungkin diperlukan untuk proses verifikasi.<br />
                – 2.4 Hak Penolakan: Cemara Supply berhak menolak produk yang tidak memenuhi standar kualitas.
              </p>
              <p>
                <strong>3. Blockchain & Keamanan Data</strong> <br />– 3.1 Catatan Tidak Dapat Diubah: Semua transaksi dan informasi produk dicatat di blockchain dan tidak dapat diubah setelah dikonfirmasi.<br />
                – 3.2 Verifikasi Hash: Setiap batch produk menerima kode hash unik untuk pelacakan dan verifikasi keaslian.<br />
                – 3.3 Transparansi Data: Informasi produk dapat dibagikan dengan pelanggan dan mitra logistik untuk transparansi.<br />
                – 3.4 Perlindungan Privasi: Informasi pribadi petani dilindungi dan hanya dibagikan bila diperlukan untuk operasional bisnis.
              </p>
              <p>
                <strong>4. Pembayaran & Ketentuan Finansial</strong> <br />– 4.1 Pemrosesan Pembayaran: Pembayaran diproses sesuai jadwal yang disepakati dan penerimaan kualitas.<br />
                – 4.2 Kesepakatan Harga: Harga ditentukan berdasarkan kualitas produk dan kondisi pasar saat pengiriman.<br />
                – 4.3 Mata Uang & Biaya: Semua transaksi dilakukan dalam mata uang yang disepakati dengan biaya pemrosesan yang berlaku.<br />
                – 4.4 Penyelesaian Sengketa: Sengketa pembayaran akan diselesaikan melalui proses mediasi yang telah ditetapkan.
              </p>
              <p>
                <strong>5. Hukum & Kepatuhan</strong> <br />– 5.1 Hukum yang Berlaku: Syarat ini diatur oleh hukum Indonesia dan tunduk pada regulasi pertanian setempat.<br />
                – 5.2 Perubahan: Syarat dapat diperbarui dengan pemberitahuan 30 hari sebelumnya kepada semua pengguna.<br />
                – 5.3 Keterpisahan: Jika ada ketentuan yang dinyatakan tidak sah, ketentuan lainnya tetap berlaku.<br />
                – 5.4 Kontak: Untuk pertanyaan tentang syarat ini, hubungi support@cemarasupply.com.
              </p>
            </>
          )}
        </div>

        {/* ======= Privacy Policy ======= */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner text-sm text-gray-700">
          <h3 className="font-semibold mb-2">
            {language === "en" ? "Privacy Policy Summary" : "Ringkasan Kebijakan Privasi"}
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {language === "en" ? (
              <>
                <li>Data Collection: We collect information necessary for agricultural supply chain operations including product details, quality data, and contact information.</li>
                <li>Data Usage: Your data is used to facilitate transactions, ensure product traceability, and improve our services.</li>
                <li>Data Sharing: Product information may be shared with customers for transparency. Personal information is kept confidential.</li>
                <li>Data Security: We use blockchain technology and industry-standard security measures to protect your information.</li>
                <li>Your Rights: You have the right to access, correct, or delete your personal information subject to legal requirements.</li>
              </>
            ) : (
              <>
                <li>Pengumpulan Data: Kami mengumpulkan informasi yang diperlukan untuk rantai pasokan pertanian termasuk detail produk, data kualitas, dan informasi kontak.</li>
                <li>Penggunaan Data: Data Anda digunakan untuk memfasilitasi transaksi, memastikan keterlacakan produk, dan meningkatkan layanan kami.</li>
                <li>Berbagi Data: Informasi produk dapat dibagikan kepada pelanggan demi transparansi. Informasi pribadi tetap dijaga kerahasiaannya.</li>
                <li>Keamanan Data: Kami menggunakan teknologi blockchain dan standar keamanan industri untuk melindungi informasi Anda.</li>
                <li>Hak Anda: Anda berhak mengakses, memperbaiki, atau menghapus data pribadi Anda sesuai ketentuan hukum.</li>
              </>
            )}
          </ul>
        </div>

        {/* ======= Agreement Confirmation ======= */}
        <div className="bg-gray-50 p-4 rounded-xl shadow text-sm text-gray-800">
          <h3 className="font-semibold mb-2">
            {language === "en" ? "Agreement Confirmation" : "Konfirmasi Persetujuan"}
          </h3>
          <p className="mb-2">
            {language === "en"
              ? "Please confirm your acceptance of all terms to proceed"
              : "Silakan konfirmasi persetujuan Anda terhadap semua syarat untuk melanjutkan"}
          </p>

          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span>
              {language === "en"
                ? "I have read and agree to the Terms and Conditions of the Cemara Supply platform."
                : "Saya telah membaca dan menyetujui Syarat dan Ketentuan platform Cemara Supply."}
            </span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={agreePrivacy}
              onChange={(e) => setAgreePrivacy(e.target.checked)}
            />
            <span>
              {language === "en"
                ? "I have read and agree to the Privacy Policy and consent to data processing as described."
                : "Saya telah membaca dan menyetujui Kebijakan Privasi serta menyetujui pemrosesan data sebagaimana dijelaskan."}
            </span>
          </label>
        </div>

        {/* ======= Bottom Buttons ======= */}
        <div className="flex justify-between">
          <Link
            href="/"
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            &lt; {language === "en" ? "Back" : "Kembali"}
          </Link>

          {isAgreed ? (
            <Link
                href="/farmer/login"   // ✅ arahkan ke folder login yang benar
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
                {language === "en" ? "Continue to Login" : "Lanjut Login"}
            </Link>
            ) : (
            <button
                disabled
                className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
            >
                {language === "en" ? "Continue to Login" : "Lanjut Login"}
            </button>
            )}
        </div>
      </div>
    </div>
  );
}
