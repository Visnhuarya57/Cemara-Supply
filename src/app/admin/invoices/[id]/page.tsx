"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAdminGetInvoiceDetail, downloadInvoice } from '@/hooks/useAdminInvoice';
import {
  ArrowLeft,
  FileText,
  Calendar,
  User,
  Package,
  Loader2,
  AlertCircle,
  RefreshCw,
  Download,
  Edit,
  Star,
  Weight,
  Hash,
  DollarSign
} from 'lucide-react';

const DetailInvoicesPage = () => {
  const params = useParams();
  const invoiceId = params.id as string;
  const [isDownloading, setIsDownloading] = useState(false);

  const { data, isLoading, error, refetch } = useAdminGetInvoiceDetail(invoiceId);

  const handleDownloadPDF = async () => {
    if (!data) return;
    
    try {
      setIsDownloading(true);
      await downloadInvoice(invoiceId, data.data.transactionNumber);
    } catch (error) {
      console.error('Failed to download PDF:', error);
      // You can add a toast notification here
      alert('Gagal mengunduh PDF. Silakan coba lagi.');
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: string) => {
    const numPrice = parseInt(price);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(numPrice);
  };

  const getTotalPrice = () => {
    if (!data) return 0;
    const qty = parseInt(data.data.qty);
    const price = parseInt(data.data.price);
    return qty * price;
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
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gagal Memuat Data</h3>
        <p className="text-gray-600 mb-4">Terjadi kesalahan saat mengambil detail invoice</p>
        <div className="flex gap-3">
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
          <Link
            href="/admin/invoices"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Memuat detail invoice...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
        <FileText className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Invoice Tidak Ditemukan</h3>
        <p className="text-gray-600 mb-4">Invoice dengan ID {invoiceId} tidak ditemukan</p>
        <Link
          href="/admin/invoices"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Invoice
        </Link>
      </div>
    );
  }

  const invoice = data.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/invoices"
            className="flex text-black items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detail Invoice</h1>
            <p className="text-gray-600 mt-1">{invoice.transactionNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className={`w-4 h-4 ${isDownloading ? 'animate-spin' : ''}`} />
            {isDownloading ? 'Mengunduh...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-3">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(invoice.deliveryDate)}`}>
          {getStatusLabel(invoice.deliveryDate)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transaction Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Transaksi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nomor Transaksi</label>
                  <div className="flex items-center gap-2 mt-1">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 font-medium">{invoice.transactionNumber}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Pengirim</label>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{invoice.sender}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Penerima</label>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{invoice.receiver}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Tanggal Pengiriman</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{formatDate(invoice.deliveryDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detail Produk</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nama Produk</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Package className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 font-medium">{invoice.product}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Grade</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{invoice.grade}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Ukuran</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Weight className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{invoice.size}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Jumlah</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{invoice.qty} unit</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Harga per Unit</label>
                  <div className="flex items-center gap-2 mt-1">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{formatPrice(invoice.price)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Price Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Harga</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Harga per unit:</span>
                <span className="text-gray-900">{formatPrice(invoice.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jumlah:</span>
                <span className="text-gray-900">{invoice.qty} unit</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-blue-600">{formatPrice(getTotalPrice().toString())}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Timeline */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Invoice Dibuat</p>
                  <p className="text-xs text-gray-500">Status: Terjadwal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pengiriman</p>
                  <p className="text-xs text-gray-500">{formatDate(invoice.deliveryDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInvoicesPage;