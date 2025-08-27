import React from "react";
import Link from "next/link";
import { ShieldCheck, QrCode, Database } from "lucide-react";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
   <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-900">
      {/* ======= NAVBAR ======= */}
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="text-2xl font-extrabold text-green-600">Cemara Supply</div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
          <a href="#" className="hover:text-gray-900">About Us</a>
          <a href="#" className="hover:text-gray-900">Product</a>
          <a href="#" className="hover:text-gray-900">Contact</a>
        </nav>

        {/* 🔗 Tombol Sign In diarahkan ke /login */}
        <Link
          href="/Login"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
        >
          Sign In
        </Link>
      </header>

      {/* ======= HERO ======= */}
      <section className="relative max-w-6xl mx-auto px-6 pt-10 pb-20 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Start Your Business <br /> With Cemara Supply
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Trusted Spice Procurement With a Digital Tracking System.
          </p>
        </div>

        {/* Illustration (concentric circles + dots) */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-[320px] h-[320px]">
            {/* rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-100 to-sky-200" />
            <div className="absolute inset-6 rounded-full border-[20px] border-sky-100/70" />
            <div className="absolute inset-16 rounded-full border-[20px] border-sky-100/60" />
            <div className="absolute inset-24 rounded-full border-[20px] border-sky-100/50" />
            {/* dots */}
            <span className="absolute -top-2 right-8 w-4 h-4 rounded-full bg-orange-400" />
            <span className="absolute bottom-4 right-0 w-6 h-6 rounded-full bg-sky-300" />
            <span className="absolute top-16 left-6 w-10 h-10 rounded-full bg-orange-200" />
          </div>
        </div>
      </section>

  {/* ======= ABOUT US ======= */}
      <section className="max-w-6xl mx-auto px-6 pt-8 pb-4">
        <h2 className="text-2xl font-bold">About Us</h2>
        <p className="text-sm text-gray-600 mt-1">
          (APA ITU CEMARA SUPPLY)
        </p>
        <br></br>
        <br></br>
        <h2 className="text-2xl font-bold">Testimoni</h2>
        {/* <p className="text-sm text-gray-600 mt-1">
          (APA ITU CEMARA SUPPLY)
        </p> */}

        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {/* Card template */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="aspect-[4/3] bg-gray-200">
              <img src="/about1.jpg" alt="Petani" className="w-full h-full object-cover"/>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Petani Terpercaya</span>
              </div>
              <div className="mt-1 font-semibold">(Teks buat Petani)</div>
              <div className="text-sky-600 text-sm mt-1">Rp 6.705.000 <span className="text-gray-500">/orang</span></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="aspect-[4/3] bg-gray-200">
              <img src="/about2.jpg" alt="UMKM" className="w-full h-full object-cover"/>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Pemberdayaan UMKM</span>
              </div>
              <div className="mt-1 font-semibold">(Teks buat UMKM)</div>
              <div className="text-gray-600 text-sm mt-1">Rp 1.205.000 </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="aspect-[4/3] bg-gray-200">
              <img src="/about3.jpg" alt="Customer" className="w-full h-full object-cover"/>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Customer</span>
              </div>
              <div className="mt-1 font-semibold">(Teks Buat Customer)</div>
              <div className="text-sky-600 text-sm mt-1">Rp 605.000 </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="aspect-[4/3] bg-gray-200">
              <img src="/about4.jpg" alt="QR Code" className="w-full h-full object-cover"/>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>QR Code</span>
              </div>
              <div className="mt-1 font-semibold">(Teks Buat QR Code)</div>
              <div className="text-sky-600 text-sm mt-1">Rp 1.400.000 </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= WHY CHOOSE US ======= */}
      <section className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-10">
        {/* Left copy */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-2">Why Choose Us</h2>
          <p className="text-gray-600">
            Enjoy different experiences in every place you visit and discover new and affordable
            adventures of course.
          </p>
        </div>

        {/* Right cards */}
        <div className="md:col-span-2 space-y-5">
          {/* Card 1 */}
          <div className="flex items-start gap-4 rounded-xl bg-gray-100 shadow-sm px-5 py-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-sky-200 grid place-items-center">
              {/* simple inline icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-sky-700 fill-current">
                <path d="M12 2l3 7h7l-5.5 4 2.1 7L12 17l-6.6 3 2.1-7L2 9h7z"/>
              </svg>
            </div>
            <div>
              <div className="font-semibold">Digital Trust</div>
              <p className="text-gray-600 text-sm mt-1">
                Catatan blockchain yang tidak dapat diubah memastikan transparansi dan kepercayaan penuh di
                seluruh rantai pasokan.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <Link href="/verify" passHref>
              <div className="cursor-pointer flex items-start gap-4 rounded-xl bg-gray-100 shadow-sm px-5 py-4 hover:bg-green-200 transition">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-orange-200 grid place-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                      className="text-orange-700" viewBox="0 0 24 24">
                    <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm6 0h2v2h-2V5zm0 4h2v2h-2V9zm4-4h2v2h-2V5zm0 4h2v2h-2V9zm4-4h2v2h-2V5zm0 4h2v2h-2V9zm-8 4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm4 0h2v2h-2v-2zm-8 4h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">QR Code Verification (Cek Disini)</div>
                  <p className="text-gray-600 text-sm mt-1">
                    Setiap produk dilengkapi kode QR unik yang dapat dipindai konsumen untuk
                    memverifikasi keaslian dan asal.
                  </p>
                </div>
              </div>
          </Link>

          {/* Card 3 */}
          <div className="flex items-start gap-4 rounded-xl bg-gray-100 shadow-sm px-5 py-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-violet-200 grid place-items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-violet-700 fill-current">
                <path d="M4 4h16v4H4V4zm0 6h10v4H4v-4zm0 6h16v4H4v-4z"/>
              </svg>
            </div>
            <div>
              <div className="font-semibold">Recording Tool</div>
              <p className="text-gray-600 text-sm mt-1">
                Alat canggih bagi petani dan produsen untuk mencatat setiap langkah proses rantai pasokan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======= CTA / ROLE ======= */}
      <section className="text-center px-6 pt-10 pb-14">
        <h2 className="text-2xl font-bold">Daftar Sekarang</h2>
        <p className="text-gray-600 mt-2">
          Enjoy different experiences in every place you visit and discover new and affordable adventures of course.
        </p>

        <div className="mt-8 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Farmer */}
          <a
            href="/farmer"
            className="rounded-2xl bg-green-600 text-white px-6 py-6 text-left shadow hover:opacity-60 transition"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-white/20 grid place-items-center">🌿</span>
              <div className="text-xl font-semibold">Petani</div>
            </div>
            <div className="mt-2 text-sm opacity-90">
              Vitae donec pellentesque a aliquam et ultricies auctor.
            </div>
          </a>

          {/* Customer */}
          <a
            href="/customer"
            className="rounded-2xl bg-sky-500 text-white px-6 py-6 text-left shadow hover:opacity-60 transition"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-white/20 grid place-items-center">🛒</span>
              <div className="text-xl font-semibold">Customer</div>
            </div>
            <div className="mt-2 text-sm opacity-90">
              Vitae donec pellentesque a aliquam et ultricies auctor.
            </div>
          </a>

          {/* UMKM */}
          <a
            href="/umkm"
            className="rounded-2xl bg-fuchsia-600 text-white px-6 py-6 text-left shadow hover:opacity-60 transition"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-white/20 grid place-items-center">🏷️</span>
              <div className="text-xl font-semibold">UMKM</div>
            </div>
            <div className="mt-2 text-sm opacity-90">
              Vitae donec pellentesque a aliquam et ultricies auctor.
            </div>
          </a>
        </div>
      </section>

      {/* ======= NEWSLETTER BAND ======= */}
      <section className="bg-gradient-to-b from-green-900 to-green-950 text-white">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Bagian Kiri: Judul */}
            <div>
              <h3 className="text-lg font-semibold">Subscribe to Newsletter</h3>
              <p className="text-sm text-white/70">For Your New Information</p>
            </div>

            {/* Bagian Kanan: Form */}
            <form className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your Phone Number..."
                className="flex-1 rounded-l-full px-5 py-3 bg-dark/80 border border-white/60 text-dark hover:bg-white/20 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-r-full bg-white/10 border border-white/60 px-6 py-3 hover:bg-white/20"
              >
                Subscribe
              </button>
            </form>

          </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer className="bg-green-950 text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-2 grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-white font-extrabold text-xl">Cemara Supply</div>
            <p className="text-sm mt-2">Trusted spice procurement with digital tracking system.</p>
             <div className="flex items-center gap-4 mt-4 text-white text-2xl">
                <a href="https://www.instagram.com/cemarasupply_1?igsh=MTQwNjllaDVkOG42cA==" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <FaTiktok />
                </a>
                <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaXTwitter />
                </a>
              </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-1 text-sm">
              <li>Home</li>
              <li>About us</li>
              <li>Services</li>
              <li>Careers</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-1 text-sm">
              <li>Community</li>
              <li>Video Tutorials</li>
              <li>API Documentation</li>
              <li>Security Reports</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Help</h4>
            <ul className="space-y-1 text-sm">
              <li>Customer Support</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <p className="max-w-6xl mx-auto px-6 py-3 text-center text-xs text-gray-400">
            Copyright © 2025 All Right Reserved By CemaraSupply.com &nbsp; | &nbsp; Design By Cemara
          </p>
        </div>
      </footer>
    </main>
  );
}
