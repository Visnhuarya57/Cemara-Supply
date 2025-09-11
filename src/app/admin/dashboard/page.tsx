import React from 'react';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdminDashboardPage = () => {
  const stats = [
    {
      title: "Total User",
      value: "1,234",
      change: "+12%",
      changeType: "increase",
      icon: Users,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Total Invoice",
      value: "456",
      change: "+8%",
      changeType: "increase",
      icon: FileText,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      title: "Pendapatan",
      value: "Rp 125.5M",
      change: "+23%",
      changeType: "increase",
      icon: DollarSign,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "Aktifitas",
      value: "89%",
      change: "+5%",
      changeType: "increase",
      icon: Activity,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  const recentActivities = [
    { user: "Budi Santoso", action: "Login ke sistem", time: "2 menit lalu", status: "success" },
    { user: "Siti Aminah", action: "Membuat invoice baru", time: "15 menit lalu", status: "success" },
    { user: "Ahmad Rahman", action: "Update profil", time: "1 jam lalu", status: "warning" },
    { user: "Lisa Permata", action: "Gagal login", time: "2 jam lalu", status: "error" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Selamat Datang, Admin!</h1>
            <p className="text-emerald-100">Berikut ringkasan aktivitas sistem hari ini</p>
          </div>
          <div className="hidden md:block">
            <TrendingUp className="w-16 h-16 text-emerald-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:scale-105">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.lightColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.textColor}`} />
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium text-xs md:text-sm">{stat.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium text-gray-600 mb-1 md:mb-2">{stat.title}</h3>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">vs bulan lalu</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
                {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {activity.status === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                {activity.status === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Aksi Cepat</h2>
          <div className="space-y-3">
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Tambah User</span>
            </button>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Buat Invoice</span>
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Lihat Laporan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;