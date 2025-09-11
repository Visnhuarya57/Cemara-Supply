"use client";

import React, { useState } from 'react';
import { useAdminGetUsers } from '@/hooks/useAdminUser';
import { UserFilters, UserRoleType } from '@/types/ListUsersAdmin';
import {
    Search,
    Filter,
    Users,
    Phone,
    MapPin,
    UserCheck,
    Loader2,
    AlertCircle,
    RefreshCw,
    Plus,
    Eye,
    Edit
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const UsersPage = () => {
    const [filters, setFilters] = useState<UserFilters>({});
    const [searchTerm, setSearchTerm] = useState('');

    const { data, isLoading, error, refetch } = useAdminGetUsers(filters);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setFilters(prev => ({ ...prev, search: value }));
    };

    const handleRoleFilter = (role: UserRoleType | '') => {
        setFilters(prev => ({
            ...prev,
            role: role === '' ? undefined : role
        }));
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'farmer':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'manufacturer':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'client':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getRoleLabel = (role: string) => {
        switch (role) {
            case 'farmer':
                return 'Petani';
            case 'manufacturer':
                return 'Manufacturer';
            case 'client':
                return 'Klien';
            default:
                return role;
        }
    };

    if (error) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gagal Memuat Data</h3>
                <p className="text-gray-600 mb-4">Terjadi kesalahan saat mengambil data pengguna</p>
                <button
                    onClick={() => refetch()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Coba Lagi
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats */}
            {data && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Pengguna</p>
                                <p className="text-xl font-bold text-gray-900">{data.data.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <UserCheck className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Petani</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {data.data.filter(user => user.role.name === 'farmer').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <UserCheck className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Manufacturer</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {data.data.filter(user => user.role.name === 'manufacturer').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <UserCheck className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Klien</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {data.data.filter(user => user.role.name === 'client').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                            <input
                                type="text"
                                placeholder="Cari nama atau nomor telepon..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="text-black w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Role Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-black" />
                        <select
                            value={filters.role || ''}
                            onChange={(e) => handleRoleFilter(e.target.value as UserRoleType | '')}
                            className="text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Semua Role</option>
                            <option value="farmer">Petani</option>
                            <option value="manufacturer">Manufacturer</option>
                            <option value="client">Klien</option>
                        </select>
                    </div>
                    <div>
                        <Link
                            href="/admin/users/create"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Pengguna
                        </Link>
                    </div>
                </div>
            </div>



            {/* Users List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Pengguna</h2>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="flex items-center gap-3">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                            <span className="text-gray-600">Memuat data pengguna...</span>
                        </div>
                    </div>
                ) : data && data.data.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Pengguna
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kontak
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lokasi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-white text-sm font-medium">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                                                {user.phoneNumber}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role.name)}`}>
                                                {getRoleLabel(user.role.name)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                                                {user.city.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <Link href={`/admin/users/${user.id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/users/${user.id}/edit`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada pengguna</h3>
                        <p className="text-gray-600">Belum ada data pengguna yang tersedia</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersPage;