"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Key } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // ✅ Data dummy
    const dummyUser = {
      phone: "08123456789",
      password: "123456",
      name: "Pak Budi"
    };

    // ✅ Validasi login
    if (phone === dummyUser.phone && password === dummyUser.password) {
      localStorage.setItem("farmerSession", JSON.stringify({ phone: dummyUser.phone, name: dummyUser.name }));
      router.push("/farmer/dashboard"); // ✅ Redirect ke dashboard
    } else {
      alert("Nomor HP atau Password salah!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-100 to-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-400 rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="mb-4">
            <button
              onClick={() => router.push("/")}
              className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-700 transition"
            >
              Kembali
            </button>
          </div>

          <div className="mb-6 flex justify-center">
            <img src="/logo.jpeg" alt="Logo" className="w-32 h-32" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm bg-white">
              <User className="w-5 h-5 mr-2 text-black" />
              <input
                type="text"
                placeholder="Nomor HP"
                className="flex-1 outline-none text-black bg-transparent"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm bg-white">
              <Key className="w-5 h-5 mr-2 text-black" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="flex-1 outline-none text-black bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-black"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4"
              />
              <label className="text-black text-sm">Ingat username saya!</label>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Masuk
            </button>
          </div>

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
              <Link href="/forgot-password" className="text-orange-600 font-semibold">
                Klik
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-green-950 px-6 py-3 text-center text-xs text-gray-400">
        <span>
          Copyright © 2025 All Right Reserved By CemaraSupply.com &nbsp; | &nbsp; Design By Cemara
        </span>
      </footer>
    </div>
  );
}
