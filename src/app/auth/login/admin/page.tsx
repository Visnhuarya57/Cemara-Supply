"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Key, Shield } from "lucide-react";
import { useAdminLogin } from "@/hooks/useAdminLogin";
import { saveAuthToken, getAuthToken } from "@/utils/auth";
import Image from "next/image";

const queryClient = new QueryClient();

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const loginMutation = useAdminLogin();

  // Redirect if already logged in
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { phoneNumber, password, admin: true },
      {
        onSuccess: (data) => {
          if (data.success && data.data) {
            saveAuthToken(data.data.token, data.data.user);
            router.push("/admin/dashboard");
          } else {
            alert(data.message || "Login gagal");
          }
        },
        onError: (error: Error) => {
          console.error("Login error:", error);
          alert("Terjadi kesalahan saat login. Silakan coba lagi.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      {/* Container Utama */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-green-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <Shield className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600 text-sm">Masuk ke panel administrasi</p>
        </div>

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image src="/logo.jpeg" alt="Logo" width={96} height={96} className="rounded-lg" />
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Input Nomor HP */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nomor HP</label>
            <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-3 shadow-sm bg-white focus-within:border-green-500 transition-colors">
              <User className="w-5 h-5 mr-3 text-gray-400" />
              <input
                type="text"
                placeholder="Contoh: +6281234567890"
                className="flex-1 outline-none text-gray-700 bg-transparent"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Input Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-3 shadow-sm bg-white focus-within:border-green-500 transition-colors">
              <Key className="w-5 h-5 mr-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className="flex-1 outline-none text-gray-700 bg-transparent"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label className="text-gray-700 text-sm">Ingat saya</label>
          </div>

          {/* Tombol Masuk */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loginMutation.status === "pending"}
          >
            {loginMutation.status === "pending" ? "Memproses..." : "Masuk Admin"}
          </button>
        </form>

        {/* Link Bawah */}
        <div className="mt-8 text-center space-y-3 text-sm">
          <div className="border-t border-gray-200 pt-6">
            <Link
              href="/"
              className="text-green-600 font-medium hover:text-green-700 transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
          <p className="text-gray-500">
            Lupa Password?{" "}
            <Link
              href="/forgot-password"
              className="text-green-600 font-medium hover:text-green-700 transition-colors"
            >
              Reset Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );
}
