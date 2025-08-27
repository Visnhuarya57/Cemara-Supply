"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Tambahkan logika kirim request ke backend
    alert(`Nomor telepon dikirim: ${phone}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-sky-200">
      {/* Content Utama */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[420px] flex flex-col items-center">
          {/* Icon */}
          <img
            src="/icon-keypad.png"
            alt="keypad"
            className="w-32 h-32 mb-6"
          />

          {/* Text */}
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            Masukkan No Telepon kamu!
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <input
              type="text"
              placeholder="08xxxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />

            <div className="flex justify-between gap-4">
              <Link
                href="/Login"
                className="flex-1 bg-black text-white text-center py-3 rounded-md font-medium hover:opacity-90"
              >
                Kembali
              </Link>
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-950 px-6 py-3 text-center text-xs text-gray-400">
        <span>Copyright © 2025 All Right Reserved By CemaraSupply.com &nbsp; | &nbsp; Design By Cemara</span>
      </footer>
    </div>
  );
}
