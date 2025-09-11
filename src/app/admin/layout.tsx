"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Menu, 
  X, 
  LogOut,
  Settings,
  Bell,
  Search
} from "lucide-react";
import AdminProtected from "./components/AdminProtected";
import { clearAuthToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

const adminNav = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Manajemen User", href: "/admin/users", icon: Users },
  { name: "Manajemen Invoice", href: "/admin/invoices", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearAuthToken();
    router.push("/auth/login/admin");
  };

  return (
    <AdminProtected>
      <div className="flex h-screen bg-gray-50">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar - Fixed Left Navigation */}
        <aside className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-emerald-800 to-emerald-900 text-white 
          transform transition-transform duration-300 ease-in-out shadow-xl
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:shadow-none
        `}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-emerald-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Admin Panel</h1>
                  <p className="text-emerald-200 text-sm">CemaraSupply</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-1 rounded-md hover:bg-emerald-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 py-3 px-4 rounded-xl font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-emerald-600 text-white shadow-lg scale-105' 
                      : 'text-emerald-100 hover:bg-emerald-700 hover:text-white hover:scale-102'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-emerald-700">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full py-3 px-4 rounded-xl text-emerald-100 hover:bg-red-600 hover:text-white transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area - Right Side */}
        <div className="flex-1 flex flex-col md:ml-0">
          {/* Top Header Bar */}
          <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex-shrink-0 shadow-sm">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Page Title - Hidden on mobile, shown on desktop */}
              <div className="hidden md:block">
                <h2 className="text-xl font-semibold text-gray-800">
                  {adminNav.find(item => item.href === pathname)?.name || 'Admin Panel'}
                </h2>
              </div>
              
              {/* Header Right Section */}
              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative hidden lg:block">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
                  />
                </div>
                
                {/* Notification Button */}
                <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                {/* Admin Profile */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-700">Admin</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-gray-50 p-4 lg:p-6">
            <div className="max-w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminProtected>
  );
}