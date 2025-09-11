"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  useAdminCreateInvoice, 
  useGetUsersForInvoice, 
  useGetProductsForInvoice 
} from '@/hooks/useAdminInvoice';
import { CreateInvoicePayload, InvoiceValidationErrors, GRADE_OPTIONS, SIZE_OPTIONS } from '@/types/CreateInvoice';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  User, 
  Package, 
  Calendar,
  DollarSign,
  Users,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const CreateInvoicePage = () => {
  const router = useRouter();
  
  const { data: usersData, isLoading: isUsersLoading } = useGetUsersForInvoice();
  const { data: productsData, isLoading: isProductsLoading } = useGetProductsForInvoice();
  const createInvoiceMutation = useAdminCreateInvoice();

  const [formData, setFormData] = useState<CreateInvoicePayload>({
    senderUserId: '',
    receiverUserId: '',
    deliveryDate: '',
    productId: 0,
    grade: '',
    size: '',
    qty: 0,
    price: 0
  });

  const [errors, setErrors] = useState<InvoiceValidationErrors>({});

  const users = usersData?.data || [];
  const products = productsData?.data || [];

  const handleInputChange = (field: keyof CreateInvoicePayload, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: InvoiceValidationErrors = {};

    if (!formData.senderUserId) {
      newErrors.senderUserId = 'Pengirim harus dipilih';
    }

    if (!formData.receiverUserId) {
      newErrors.receiverUserId = 'Penerima harus dipilih';
    }

    if (formData.senderUserId === formData.receiverUserId) {
      newErrors.receiverUserId = 'Penerima harus berbeda dengan pengirim';
    }

    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'Tanggal pengiriman harus diisi';
    } else {
      const selectedDate = new Date(formData.deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.deliveryDate = 'Tanggal pengiriman tidak boleh di masa lalu';
      }
    }

    if (!formData.productId || formData.productId === 0) {
      newErrors.productId = 'Produk harus dipilih';
    }

    if (!formData.grade) {
      newErrors.grade = 'Grade harus dipilih';
    }

    if (!formData.size) {
      newErrors.size = 'Ukuran harus dipilih';
    }

    if (!formData.qty || formData.qty <= 0) {
      newErrors.qty = 'Kuantitas harus lebih dari 0';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Harga harus lebih dari 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await createInvoiceMutation.mutateAsync(formData);
      router.push('/admin/invoices');
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const isLoading = isUsersLoading || isProductsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Memuat data...</span>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalAmount = formData.qty * formData.price;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buat Invoice Baru</h1>
          <p className="text-gray-600">Tambah invoice transaksi baru</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sender and Receiver Section */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" />
            Pengirim & Penerima
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Pengirim *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={formData.senderUserId}
                  onChange={(e) => handleInputChange('senderUserId', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.senderUserId ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Pilih Pengirim</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.role.name} ({user.city.name})
                    </option>
                  ))}
                </select>
              </div>
              {errors.senderUserId && (
                <p className="text-sm text-red-600">{errors.senderUserId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Penerima *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={formData.receiverUserId}
                  onChange={(e) => handleInputChange('receiverUserId', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.receiverUserId ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Pilih Penerima</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.role.name} ({user.city.name})
                    </option>
                  ))}
                </select>
              </div>
              {errors.receiverUserId && (
                <p className="text-sm text-red-600">{errors.receiverUserId}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Product Details Section */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
            <Package className="w-5 h-5" />
            Detail Produk
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Produk *
              </label>
              <div className="relative">
                <ShoppingCart className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={formData.productId}
                  onChange={(e) => handleInputChange('productId', parseInt(e.target.value))}
                  className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.productId ? 'border-red-500' : ''
                  }`}
                >
                  <option value={0}>Pilih Produk</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {product.ownerName} ({product.city})
                    </option>
                  ))}
                </select>
              </div>
              {errors.productId && (
                <p className="text-sm text-red-600">{errors.productId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tanggal Pengiriman *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                  className={`pl-10 ${errors.deliveryDate ? 'border-red-500' : ''}`}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.deliveryDate && (
                <p className="text-sm text-red-600">{errors.deliveryDate}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Grade *
              </label>
              <select
                value={formData.grade}
                onChange={(e) => handleInputChange('grade', e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.grade ? 'border-red-500' : ''
                }`}
              >
                <option value="">Pilih Grade</option>
                {GRADE_OPTIONS.map((grade) => (
                  <option key={grade.value} value={grade.value}>
                    {grade.label}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p className="text-sm text-red-600">{errors.grade}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Ukuran *
              </label>
              <select
                value={formData.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.size ? 'border-red-500' : ''
                }`}
              >
                <option value="">Pilih Ukuran</option>
                {SIZE_OPTIONS.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
              {errors.size && (
                <p className="text-sm text-red-600">{errors.size}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Quantity and Price Section */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5" />
            Kuantitas & Harga
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Kuantitas (kg) *
              </label>
              <Input
                type="number"
                value={formData.qty || ''}
                onChange={(e) => handleInputChange('qty', parseFloat(e.target.value) || 0)}
                placeholder="0"
                min="0"
                step="0.1"
                className={errors.qty ? 'border-red-500' : ''}
              />
              {errors.qty && (
                <p className="text-sm text-red-600">{errors.qty}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Harga per kg (IDR) *
              </label>
              <Input
                type="number"
                value={formData.price || ''}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                placeholder="0"
                min="0"
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Total Harga
              </label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 font-medium">
                {formatCurrency(totalAmount)}
              </div>
            </div>
          </div>
        </Card>

        {/* Submit Section */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            type="submit"
            disabled={createInvoiceMutation.isPending}
            className="flex items-center gap-2"
          >
            {createInvoiceMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {createInvoiceMutation.isPending ? 'Membuat Invoice...' : 'Buat Invoice'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoicePage;