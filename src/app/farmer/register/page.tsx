"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Key, MapPin } from "lucide-react";

export default function FarmerRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // 🚀 Ambil data kota dari API Postman
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("https://api.example.com/cities"); // ganti endpoint dengan punya kamu
        const data = await res.json();
        setCities(data.map((city: any) => city.name));
      } catch (error) {
        console.error("Gagal ambil data kota:", error);
      }
    };

    fetchCities();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 👉 koneksi ke API register
    console.log({ name, phone, location, password, confirmPassword, remember });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* ======= Main Content ======= */}
      <div className="flex flex-col md:flex-row flex-grow items-center justify-center px-6">
        {/* ======= Logo di kiri ======= */}
        <div className="flex justify-center md:justify-end w-full md:w-1/2 mb-6 md:mb-0">
          <img src="/logo.jpeg" alt="SIDERA Logo" className="w-64 h-64" />
        </div>

        {/* ======= Form di kanan ======= */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          {/* Tombol Kembali */}
          <div className="w-full max-w-sm mb-4">
            <Link
              href="/"
              className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-700 transition"
            >
              Kembali
            </Link>
          </div>

          <h2 className="text-3xl font-bold mb-6">Daftar</h2>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-white p-6 rounded-xl space-y-4 text-black"
          >
            {/* Nama */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-700">
                <User size={18} />
              </span>
              <input
                type="text"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-400 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                required
              />
            </div>

            {/* Nomor HP */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-700">
                <User size={18} />
              </span>
              <input
                type="text"
                placeholder="Nomor HP"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-400 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                required
              />
            </div>

            {/* Lokasi Sawah (Dropdown) */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-700">
                <MapPin size={18} />
              </span>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-400 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                required
              >
                <option value="">Pilih Lokasi Sawah</option>
                {cities.map((city, idx) => (
                  <option key={idx} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-700">
                <Key size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-400 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-700 hover:text-gray-900"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Ulang Password */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-700">
                <Key size={18} />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Ulang Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-400 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute inset-y-0 right-3 flex items-center text-gray-700 hover:text-gray-900"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 border-gray-400"
              />
              Ingat akun saya!
            </label>

            {/* Button Daftar */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-semibold"
            >
              Daftar
            </button>
          </form>

          {/* Link ke Login */}
          <div className="text-center text-sm mt-6 border-t pt-4 w-full max-w-sm">
            <p>
              Sudah punya akun?{" "}
              <Link href="/farmer/login" className="text-orange-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ======= Footer ======= */}
      <footer className="bg-green-950 px-6 py-3 text-center text-xs text-gray-400">
        <span>
          Copyright © 2025 All Right Reserved By CemaraSupply.com &nbsp; | &nbsp;
          Design By Cemara
        </span>
      </footer>
    </div>
  );
}
