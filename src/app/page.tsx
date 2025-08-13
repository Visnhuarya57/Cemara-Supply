import React from "react";
import Link from "next/link";
import { ShieldCheck, QrCode, Database } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-800">
          Digital Trust in Every Spice
        </h1>
        <p className="text-gray-700 mb-10">
          Teknologi blockchain kami memastikan setiap rempah yang sampai ke konsumen sesuai
          dengan hash dan kode QR, menciptakan rantai kepercayaan yang tidak terputus antara
          petani, produsen, mitra bisnis, dan konsumen.
        </p>

        {/* Fitur Utama */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <ShieldCheck className="text-green-600 w-10 h-10 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2 text-green-800">
              Kepercayaan Digital
            </h3>
            <p className="text-gray-600">
              Catatan blockchain yang tidak dapat diubah menjamin transparansi penuh dan
              membangun kepercayaan di seluruh rantai pasok.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <QrCode className="text-blue-600 w-10 h-10 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2 text-blue-800">
              Verifikasi Kode QR
            </h3>
            <p className="text-gray-600">
              Setiap produk memiliki kode QR unik yang dapat dipindai konsumen untuk
              memverifikasi keaslian dan asalnya.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <Database className="text-purple-700 w-10 h-10 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2 text-purple-800">Alat Pencatatan</h3>
            <p className="text-gray-600">
              Alat canggih untuk petani dan produsen mencatat setiap langkah proses rantai
              pasok.
            </p>
          </div>
        </div>

        {/* Tentang Cemara Supply */}
        <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            Tentang Cemara Supply
          </h2>
          <p className="text-gray-700 mb-4">
            Cemara Supply adalah platform rantai pasok berbasis blockchain yang menghadirkan
            transparansi dan ketelusuran penuh dari petani hingga konsumen.
          </p>
          <p className="text-gray-700">
            Platform ini menghubungkan petani, produsen, mitra bisnis, dan konsumen melalui
            jaringan blockchain yang tidak dapat diubah, memastikan setiap rempah dapat
            ditelusuri kembali ke asalnya dengan percaya diri.
          </p>
        </div>

        {/* Tombol Navigasi */}
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/farmer">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
              Dashboard Petani
            </button>
          </Link>
          <Link href="/admin">
            <button className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg">
              Dashboard Admin
            </button>
          </Link>
          <Link href="/customer">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
              Portal Pelanggan
            </button>
          </Link>
          <Link href="/umkm">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg">
              Portal UMKM
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
