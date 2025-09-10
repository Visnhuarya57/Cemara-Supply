"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, MapPin, Leaf, X, Package } from "lucide-react";

type Farmer = {
  id: number;
  name: string;
  product: string;
  city: string;
  rating: number;
  phone: string;
};

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  phone: string;
};

export default function CustomerDashboard() {
  const router = useRouter();

  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ data user login simulasi
  const profile = { name: "user", phone: "6281234567890", city: "Bandung" };
  const initials = profile.name.charAt(0).toUpperCase();

  // 🚀 simulasi ambil data dari API
  useEffect(() => {
    const dummyFarmers: Farmer[] = [
      {
        id: 1,
        name: "Pak Budi",
        product: "Beras Organik",
        city: "Bandung",
        rating: 4.7,
        phone: "6281234567890",
      },
      {
        id: 2,
        name: "Bu Sari",
        product: "Jagung Manis",
        city: "Yogyakarta",
        rating: 4.5,
        phone: "6281234567890",
      },
    ];
    setFarmers(dummyFarmers);

    const dummyProducts: Product[] = [
      {
        id: 1,
        name: "Keripik Singkong Pedas",
        category: "Snack",
        price: "Rp 15.000",
        rating: 4.8,
        phone: "6281234567890",
      },
      {
        id: 2,
        name: "Minyak Kelapa Murni",
        category: "Kesehatan",
        price: "Rp 50.000",
        rating: 4.6,
        phone: "6281234567890",
      },
      {
        id: 3,
        name: "Teh Rempah Nusantara",
        category: "Minuman",
        price: "Rp 25.000",
        rating: 4.9,
        phone: "6281234567890",
      },
    ];
    setProducts(dummyProducts);
  }, []);

  // ✅ carousel auto-slide setiap 4 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ fungsi direct ke WhatsApp
  const handleOrder = (phone: string, product: string) => {
    const message = encodeURIComponent(
      `Halo, saya tertarik ingin memesan ${product}. Apakah tersedia?`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  // ✅ fungsi logout
  const handleLogout = () => {
    router.push("/"); // redirect ke landing page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col">
      {/* 🔹 Header */}
      <header className="flex justify-between items-center bg-white shadow px-6 py-4 relative">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-green-700">Cemara Supply</h1>
          <span className="text-gray-700 text-sm">Customer Dashboard</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
              {initials}
            </div>
            <span className="font-semibold text-black">{profile.name}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-20">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-600"
                onClick={() => {
                  setEditProfileOpen(true);
                  setMenuOpen(false);
                }}
              >
                Edit Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 🔹 Carousel */}
      <div className="relative w-full h-48 bg-green-100 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="w-full flex-shrink-0 flex items-center justify-center text-2xl font-bold text-green-700">
            Selamat Datang, {profile.name} 👋
          </div>
          <div className="w-full flex-shrink-0 flex items-center justify-center text-xl text-green-800 font-semibold">
            Promo UMKM: Rempah-rempah Nusantara 🌿
          </div>
          <div className="w-full flex-shrink-0 flex items-center justify-center text-xl text-green-800 font-semibold">
            Dukung Produk Lokal Cemara Supply Indonesia 🇮🇩
          </div>
        </div>

        {/* 🔹 Indicator */}
        <div className="absolute bottom-2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                currentSlide === i ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* 🔹 Konten Dashboard */}
      <div className="p-6 flex-grow">
        {/* Daftar Petani */}
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
          Daftar Petani
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {farmers.map((farmer) => (
            <div
              key={farmer.id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-2">
                {farmer.name}
              </h2>

              <div className="flex items-center text-gray-700 mb-2">
                <Leaf className="w-5 h-5 mr-2 text-green-500" />
                <span>{farmer.product}</span>
              </div>

              <div className="flex items-center text-gray-700 mb-2">
                <MapPin className="w-5 h-5 mr-2 text-red-500" />
                <span>{farmer.city}</span>
              </div>

              <div className="flex items-center text-yellow-500 mb-4">
                <Star className="w-5 h-5 mr-1" />
                <span>{farmer.rating} / 5</span>
              </div>

              <button
                onClick={() => handleOrder(farmer.phone, farmer.product)}
                className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Hubungi via WhatsApp
              </button>
            </div>
          ))}
        </div>

        {/* Daftar Produk Jadi */}
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
          Daftar Produk Jadi Cemara Supply
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-2">
                {product.name}
              </h2>

              <div className="flex items-center text-gray-700 mb-2">
                <Package className="w-5 h-5 mr-2 text-blue-500" />
                <span>{product.category}</span>
              </div>

              <div className="flex items-center text-gray-700 mb-2">
                <span className="font-semibold text-green-600">
                  {product.price}
                </span>
              </div>

              <div className="flex items-center text-yellow-500 mb-4">
                <Star className="w-5 h-5 mr-1" />
                <span>{product.rating} / 5</span>
              </div>

              <button
                onClick={() => handleOrder(product.phone, product.name)}
                className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Beli Produk
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Footer */}
      <footer className="bg-green-950 px-6 py-3 text-center text-xs text-gray-400">
        <span>
          Copyright © 2025 All Right Reserved By CemaraSupply.com &nbsp; | &nbsp;
          Design By Cemara
        </span>
      </footer>

      {/* 🔹 Modal Edit Profile */}
      {editProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setEditProfileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-green-700">
              Edit Profile
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Nama</label>
                <input
                  type="text"
                  defaultValue={profile.name}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  defaultValue={profile.phone}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  defaultValue={profile.city}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <button
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              onClick={() => setEditProfileOpen(false)}
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
