"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Import scanner secara dinamis
const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false }
);

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export default function Dashboard() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [openCamera, setOpenCamera] = useState(false);

  const productDatabase: Record<string, Product> = {
    "123456": { id: "123456", name: "Produk A", price: 50000, description: "Produk A berkualitas tinggi" },
    "789101": { id: "789101", name: "Produk B", price: 75000, description: "Produk B dengan fitur lengkap" },
  };

  const handleScan = (err: any, result: any) => {
    if (result) {
      setScannedData(result.text);
      setOpenCamera(false);

      const foundProduct = productDatabase[result.text];
      setProduct(foundProduct || null);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard Customer</h1>

      {!openCamera && (
        <button
          onClick={() => setOpenCamera(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Buka Kamera untuk Scan Produk
        </button>
      )}

      {openCamera && (
        <div className="w-full max-w-md mx-auto">
          <BarcodeScannerComponent
            width={400}
            height={300}
            onUpdate={handleScan}
          />
          <p className="text-center text-gray-600 mt-2">
            Arahkan kamera ke barcode/QR produk
          </p>
        </div>
      )}

      {scannedData && (
        <div>
          <h2 className="text-xl font-semibold">Hasil Scan:</h2>
          <p>Kode: {scannedData}</p>
        </div>
      )}

      {product ? (
        <div className="mt-4 border p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-gray-600">Harga: Rp {product.price.toLocaleString()}</p>
          <p className="mt-2">{product.description}</p>
        </div>
      ) : (
        scannedData && (
          <p className="text-red-500 mt-4">Produk tidak ditemukan di database.</p>
        )
      )}
    </div>
  );
}
