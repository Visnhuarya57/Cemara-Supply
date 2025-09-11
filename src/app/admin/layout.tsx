"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import AdminProtected from "./components/AdminProtected";
import { clearAuthToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const adminNav = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Invoices", href: "/admin/invoices", icon: FileText },
];

interface AdminUser {
  name: string;
  role: {
    name: string;
  };
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Retrieve admin user data from localStorage
    const adminUserData = localStorage.getItem('admin_user');
    if (adminUserData) {
      try {
        const parsedData = JSON.parse(adminUserData);
        setAdminUser(parsedData);
      } catch (error) {
        console.error('Error parsing admin user data:', error);
      }
    }
  }, []);

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
          flex flex-col
        `}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-emerald-700 flex-shrink-0">
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
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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

          {/* Logout Button - Fixed at Bottom */}
          <div className="p-4 border-t border-emerald-700 flex-shrink-0">
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
        <div className="flex-1 flex flex-col md:ml-0 min-w-0">
          {/* Top Header Bar */}
          <header className="bg-card border-b border-border px-4 lg:px-6 py-4 flex-shrink-0 shadow-sm">
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
                {/* Notification Button */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-foreground" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
                </Button>

                {/* Admin Profile */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-700">
                      {adminUser?.role?.name || 'Admin'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {adminUser?.name || 'Administrator'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-background p-4 lg:p-6 min-w-0">
            <div className="max-w-7xl mx-auto w-full min-w-0">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminProtected>
  );
}