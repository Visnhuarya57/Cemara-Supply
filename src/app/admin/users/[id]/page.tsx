"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAdminGetUserDetail } from '@/hooks/useAdminUser';
import { 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar,
  Package,
  TrendingUp,
  ArrowLeft,
  Edit,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DetailUserPage = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const { data, isLoading, error } = useAdminGetUserDetail(userId);

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
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
    switch (role.toLowerCase()) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(parseInt(amount));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Memuat detail pengguna...</span>
        </div>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600">Gagal memuat detail pengguna</p>
          <Button onClick={() => router.back()} className="mt-4">
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  const user = data.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detail Pengguna</h1>
            <p className="text-gray-600">Informasi lengkap pengguna</p>
          </div>
        </div>
        <Link href={`/admin/users/${userId}/edit`}>
          <Button className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit Pengguna
          </Button>
        </Link>
      </div>

      {/* User Info Card */}
      <Card className="p-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <Badge className={getRoleColor(user.role.name)}>
                {getRoleLabel(user.role.name)}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{user.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{user.city.name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>ID: {user.id}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Lands Section (Only for farmers) */}
      {user.role.name.toLowerCase() === 'farmer' && user.lands && user.lands.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Lahan Pertanian</h3>
          <div className="grid gap-4">
            {user.lands.map((land) => (
              <Card key={land.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">{land.name}</h4>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{land.city.name}</span>
                  </div>
                </div>
                
                {land.products && land.products.length > 0 && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Produk ({land.products.length})
                    </h5>
                    <div className="grid gap-3">
                      {land.products.map((product) => (
                        <div key={product.id} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <h6 className="font-medium text-gray-900">{product.name}</h6>
                            <span className="text-sm font-medium text-green-600">
                              {formatCurrency(product.price)}/kg
                            </span>
                          </div>
                          
                          {product.latestHarvest && (
                            <div className="text-sm text-gray-600 space-y-1">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  Panen: {formatDate(product.latestHarvest.harvestDateStart)} - {formatDate(product.latestHarvest.harvestDateEnd)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <TrendingUp className="w-3 h-3" />
                                <span>
                                  Hasil: {product.latestHarvest.harvestQtyStart} kg → {product.latestHarvest.harvestQtyEnd} kg
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                Tanam: {formatDate(product.latestHarvest.plantingDate)}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty state for non-farmers or farmers without lands */}
      {(user.role.name.toLowerCase() !== 'farmer' || !user.lands || user.lands.length === 0) && (
        <Card className="p-8 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {user.role.name.toLowerCase() === 'farmer' 
              ? 'Belum Ada Lahan Terdaftar' 
              : 'Data Tambahan Tidak Tersedia'
            }
          </h3>
          <p className="text-gray-600">
            {user.role.name.toLowerCase() === 'farmer' 
              ? 'Pengguna ini belum memiliki lahan pertanian yang terdaftar'
              : 'Tidak ada data tambahan untuk role ini'
            }
          </p>
        </Card>
      )}
    </div>
  );
};

export default DetailUserPage;