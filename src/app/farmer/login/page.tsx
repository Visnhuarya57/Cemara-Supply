"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Key } from "lucide-react";

export default function FarmerLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 👉 nanti bisa dikoneksikan ke API login
    console.log({ phone, password, remember });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-white px-6">
      
      {/* ======= Back Button ======= */}
      <div className="absolute top-6 left-6">
        <Link
          href="/farmer/terms"
          className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900"
        >
          &lt; Kembali
        </Link>
      </div>

      {/* ======= Logo ======= */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="/logo-sidera.png"
          alt="SIDERA Logo"
          className="w-32 h-32"
        />
      </div>

      {/* ======= Form ======= */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg space-y-4"
      >
        {/* Nomor HP */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <User size={18} />
          </span>
          <input
            type="text"
            placeholder="Nomor HP"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <Key size={18} />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Remember Me */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 border-gray-300"
          />
          Ingat username saya!
        </label>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-semibold"
        >
          Masuk
        </button>

        {/* Links */}
        <div className="text-center text-sm mt-4 space-y-2">
          <p>
            Belum punya akun?{" "}
            <Link href="/farmer/register" className="text-orange-600 hover:underline">
              Daftar
            </Link>
          </p>
          <p>
            Lupa Password?{" "}
            <Link href="/farmer/reset-password" className="text-orange-600 hover:underline">
              Klik
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
