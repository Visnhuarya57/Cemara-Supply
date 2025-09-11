"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminGetInvoices, downloadInvoice } from '@/hooks/useAdminInvoice';
import { InvoiceFilters } from '@/types/ListInvoicesAdmin';
import {
    Search,
    FileText,
    Calendar,
    User,
    Package,
    Loader2,
    AlertCircle,
    RefreshCw,
    Plus,
    Eye,
    Download,
    ArrowUpDown
} from 'lucide-react';

const InvoicesPage = () => {
    const [filters, setFilters] = useState<InvoiceFilters>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [downloadingId, setDownloadingId] = useState<number | null>(null);

    const { data, isLoading, error, refetch } = useAdminGetInvoices(filters);

    const handleDownloadPDF = async (invoiceId: number, transactionNumber: string) => {
        try {
            setDownloadingId(invoiceId);
            await downloadInvoice(invoiceId, transactionNumber);
        } catch (error) {
            console.error('Failed to download PDF:', error);
            alert('Gagal mengunduh PDF. Silakan coba lagi.');
        } finally {
            setDownloadingId(null);
        }
    }; const handleSearch = (value: string) => {
        setSearchTerm(value);
        setFilters(prev => ({ ...prev, search: value }));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (deliveryDate: string) => {
        const today = new Date();
        const delivery = new Date(deliveryDate);

        if (delivery < today) {
            return 'bg-green-100 text-green-800 border-green-200';
        } else if (delivery.getTime() - today.getTime() <= 7 * 24 * 60 * 60 * 1000) {
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        } else {
            return 'bg-blue-100 text-blue-800 border-blue-200';
        }
    };

    const getStatusLabel = (deliveryDate: string) => {
        const today = new Date();
        const delivery = new Date(deliveryDate);

        if (delivery < today) {
            return 'Terkirim';
        } else if (delivery.getTime() - today.getTime() <= 7 * 24 * 60 * 60 * 1000) {
            return 'Segera';
        } else {
            return 'Terjadwal';
        }
    };

    if (error) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center text-black">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gagal Memuat Data</h3>
                <p className="text-gray-600 mb-4">Terjadi kesalahan saat mengambil data invoice</p>
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
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Invoice</p>
                                <p className="text-xl font-bold text-gray-900">{data.data.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Terkirim</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {data.data.filter(invoice => new Date(invoice.deliveryDate) < new Date()).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Segera</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {data.data.filter(invoice => {
                                        const today = new Date();
                                        const delivery = new Date(invoice.deliveryDate);
                                        return delivery >= today && delivery.getTime() - today.getTime() <= 7 * 24 * 60 * 60 * 1000;
                                    }).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Terjadwal</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {data.data.filter(invoice => {
                                        const today = new Date();
                                        const delivery = new Date(invoice.deliveryDate);
                                        return delivery.getTime() - today.getTime() > 7 * 24 * 60 * 60 * 1000;
                                    }).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari nomor transaksi, pengirim, atau penerima..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    
                    {/* Action Button */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/admin/invoices/create"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Buat Invoice Baru
                        </Link>
                    </div>
                </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Invoice</h2>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="flex items-center gap-3">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                            <span className="text-gray-600">Memuat data invoice...</span>
                        </div>
                    </div>
                ) : data && data.data.length > 0 ? (
                    <div className="overflow-x-auto min-w-0">
                        <table className="w-full min-w-[1000px]">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <span>No. Transaksi</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Pengirim
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Penerima
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Produk
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal Kirim
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.data.map((invoice) => (
                                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <FileText className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {invoice.transactionNumber}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <User className="w-4 h-4 text-gray-400 mr-2" />
                                                {invoice.sender}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <User className="w-4 h-4 text-gray-400 mr-2" />
                                                {invoice.receiver}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <Package className="w-4 h-4 text-gray-400 mr-2" />
                                                {invoice.product}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                                {formatDate(invoice.deliveryDate)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(invoice.deliveryDate)}`}>
                                                {getStatusLabel(invoice.deliveryDate)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                <Link href={`/admin/invoices/${invoice.id}`} className="text-blue-600 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-50 transition-colors hover:cursor-pointer">
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDownloadPDF(invoice.id, invoice.transactionNumber)}
                                                    disabled={downloadingId === invoice.id}
                                                    className="text-green-600 hover:text-green-900 p-1 rounded-lg hover:bg-green-50 transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Download className={`w-4 h-4 ${downloadingId === invoice.id ? 'animate-spin' : ''}`} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada invoice</h3>
                        <p className="text-gray-600 mb-4">Belum ada data invoice yang tersedia</p>
                        <Link
                            href="/admin/invoices/create"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Buat Invoice Pertama
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvoicesPage;