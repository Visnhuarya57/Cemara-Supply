"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAdminGetUserDetail, useAdminEditUser, useGetCities, useGetRoles } from '@/hooks/useAdminUser';
import { EditUserPayload } from '@/types/UserDetail';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  AlertCircle, 
  User, 
  Phone, 
  MapPin, 
  Briefcase,
  Lock,
  FileText,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const EditUserPage = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const { data: userDetail, isLoading: isUserLoading, error: userError } = useAdminGetUserDetail(userId);
  const { data: citiesData, isLoading: isCitiesLoading } = useGetCities();
  const { data: rolesData, isLoading: isRolesLoading } = useGetRoles();
  const editUserMutation = useAdminEditUser();

  const [formData, setFormData] = useState<EditUserPayload>({
    name: '',
    phoneNumber: '',
    cityId: 0,
    roleId: 0,
    password: '',
    description: '',
    status: 'active'
  });

  const [errors, setErrors] = useState<Partial<EditUserPayload>>({});
  const [showPasswordField, setShowPasswordField] = useState(false);

  // Populate form when user data is loaded
  useEffect(() => {
    if (userDetail?.success && userDetail.data) {
      const user = userDetail.data;
      setFormData({
        name: user.name,
        phoneNumber: user.phoneNumber,
        cityId: user.city.id,
        roleId: user.role.id,
        password: '',
        description: '',
        status: 'active' // Default since we don't have this in the response
      });
    }
  }, [userDetail]);

  const handleInputChange = (field: keyof EditUserPayload, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EditUserPayload> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama harus diisi';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Nomor telepon harus diisi';
    } else if (!/^(\+62|62|0)[0-9]{8,12}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Format nomor telepon tidak valid';
    }

    if (!formData.cityId || formData.cityId === 0) {
      newErrors.cityId = 0; // Just mark as error
    }

    if (!formData.roleId || formData.roleId === 0) {
      newErrors.roleId = 0; // Just mark as error
    }

    if (showPasswordField && (!formData.password || formData.password.length < 6)) {
      newErrors.password = 'Password minimal 6 karakter';
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
      const payload: EditUserPayload = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        cityId: formData.cityId,
        roleId: formData.roleId,
        description: formData.description,
        status: formData.status
      };

      // Only include password if it's being changed
      if (showPasswordField && formData.password) {
        payload.password = formData.password;
      }

      await editUserMutation.mutateAsync({ userId, userData: payload });
      router.push(`/admin/users/${userId}`);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const isLoading = isUserLoading || isCitiesLoading || isRolesLoading;

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

  if (userError || !userDetail?.success) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600">Gagal memuat data pengguna</p>
          <Button onClick={() => router.back()} className="mt-4">
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  const cities = citiesData?.data || [];
  const roles = rolesData?.data || [];

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
          <h1 className="text-2xl font-bold text-gray-900">Edit Pengguna</h1>
          <p className="text-gray-600">Ubah informasi pengguna</p>
        </div>
      </div>

      {/* Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Informasi Dasar
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nama Lengkap *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nomor Telepon *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="contoh: +6281234567890"
                    className={`pl-10 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Kota *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={formData.cityId}
                    onChange={(e) => handleInputChange('cityId', parseInt(e.target.value))}
                    className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.cityId ? 'border-red-500' : ''
                    }`}
                  >
                    <option value={0}>Pilih Kota</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.cityId && (
                  <p className="text-sm text-red-600">Kota harus dipilih</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Role *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={formData.roleId}
                    onChange={(e) => handleInputChange('roleId', parseInt(e.target.value))}
                    className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.roleId ? 'border-red-500' : ''
                    }`}
                  >
                    <option value={0}>Pilih Role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.roleId && (
                  <p className="text-sm text-red-600">Role harus dipilih</p>
                )}
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Keamanan & Status
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Password Baru
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPasswordField(!showPasswordField)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {showPasswordField ? 'Batalkan' : 'Ubah Password'}
                  </button>
                </div>
                {showPasswordField && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Masukkan password baru"
                      className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive' | 'banned')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                  <option value="banned">Diblokir</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Informasi Tambahan
            </h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Masukkan deskripsi atau catatan tambahan..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="submit"
              disabled={editUserMutation.isPending}
              className="flex items-center gap-2"
            >
              {editUserMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {editUserMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
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
      </Card>
    </div>
  );
};

export default EditUserPage;
