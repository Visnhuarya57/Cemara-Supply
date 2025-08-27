"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Key } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-100 to-white">
      {/* Container Utama */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-400 rounded-lg shadow-lg p-8 w-full max-w-md">
          {/* Tombol Kembali */}
          <div className="mb-4">
            <button
              onClick={() => router.push("/")}
              className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-700 transition"
            >
              Kembali
            </button>
          </div>

          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img src="/logo.png" alt="Logo" className="w-32 h-32" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Input Nomor HP */}
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm bg-white">
              <User className="w-5 h-5 mr-2 text-black" />
              <input
                type="text"
                placeholder="Nomor HP"
                className="flex-1 outline-none text-black bg-transparent"
              />
            </div>

            {/* Input Password */}
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm bg-white">
              <Key className="w-5 h-5 mr-2 text-black" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="flex-1 outline-none text-black bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-black"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4"
              />
              <label className="text-black text-sm">Ingat username saya!</label>
            </div>

            {/* Tombol Masuk */}
            <button className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition">
              Masuk
            </button>
          </div>

          {/* Link Bawah */}
          <div className="mt-8 text-center space-y-2 text-sm">
            <hr className="border-gray-400 mb-4" />
            <p className="text-black">
              Belum punya akun?{" "}
              <Link href="/" className="text-orange-600 font-semibold">
                Daftar
              </Link>
            </p>
            <p className="text-black">
              Lupa Password?{" "}
              <Link
                href="/forgot-password"
                className="text-orange-600 font-semibold"
              >
                Klik
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-950 px-6 py-3 text-center text-xs">
        <span>Copyright © 2025 All Right Reserved By CemaraSupply.com &nbsp; | &nbsp; Design By Cemara</span>
      </footer>
    </div>
  );
}
