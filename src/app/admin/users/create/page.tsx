"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminCreateUser } from '@/hooks/useAdminUser';
import { useCities } from '@/hooks/useCities';
import { UserPayload, UserValidationErrors } from '@/types/ListUsersAdmin';
import { 
  ArrowLeft,
  User, 
  Phone, 
  MapPin, 
  Lock,
  UserCheck,
  Save,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

const CreateUserPage = () => {
  const router = useRouter();
  const { mutate: createUser, isPending, error } = useAdminCreateUser();
  
  const [formData, setFormData] = useState<UserPayload>({
    name: '',
    phoneNumber: '',
    cityId: 0,
    password: '',
    roleId: 0,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<UserValidationErrors>({});
  const [citySearch, setCitySearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [selectedCityName, setSelectedCityName] = useState('');

  // Fetch cities with search
  const { data: citiesData, isLoading: citiesLoading } = useCities(
    citySearch ? { q: citySearch } : undefined
  );

  // Mock data for roles
  const roles = [
    { id: 1, name: 'farmer', label: 'Petani' },
    { id: 2, name: 'manufacturer', label: 'Produsen' },
    { id: 3, name: 'client', label: 'Klien' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert roleId to number
    if (name === 'roleId') {
      const numValue = value ? parseInt(value) : 0;
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof UserPayload]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCitySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCitySearch(value);
    setShowCityDropdown(true);
    
    // If user clears the search, clear the selection
    if (!value) {
      setFormData(prev => ({ ...prev, cityId: 0 }));
      setSelectedCityName('');
    }
  };

  const handleCitySelect = (cityId: number, cityName: string) => {
    setSelectedCityName(cityName);
    setFormData(prev => ({ ...prev, cityId: cityId }));
    setShowCityDropdown(false);
    setCitySearch('');
    
    // Clear validation error
    if (validationErrors.cityId) {
      setValidationErrors(prev => ({ ...prev, cityId: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: UserValidationErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nama harus diisi';
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Nomor telepon harus diisi';
    } else if (!/^(\+62|62|0)[0-9]{9,13}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Format nomor telepon tidak valid';
    }
    
    if (!formData.cityId || formData.cityId === 0) {
      errors.cityId = 'Kota harus dipilih';
    }
    
    if (!formData.roleId || formData.roleId === 0) {
      errors.roleId = 'Role harus dipilih';
    }
    
    if (!formData.password) {
      errors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    createUser(formData, {
      onSuccess: (response) => {
        console.log('User created successfully:', response);
        router.push('/admin/users');
      },
      onError: (error) => {
        console.error('Error creating user:', error);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="text-red-800 font-medium">Gagal Membuat Pengguna</h3>
              <p className="text-red-700 text-sm mt-1">
                {error instanceof Error ? error.message : 'Terjadi kesalahan saat membuat pengguna'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Informasi Pengguna</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    validationErrors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              {validationErrors.name && (
                <p className="text-red-600 text-sm mt-1">{validationErrors.name}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    validationErrors.phoneNumber ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="+628xxxxxxxxx"
                />
              </div>
              {validationErrors.phoneNumber && (
                <p className="text-red-600 text-sm mt-1">{validationErrors.phoneNumber}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label htmlFor="citySearch" className="block text-sm font-medium text-gray-700 mb-2">
                Kota
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <input
                  type="text"
                  id="citySearch"
                  value={citySearch}
                  onChange={handleCitySearch}
                  onFocus={() => setShowCityDropdown(true)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    validationErrors.cityId ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Cari kota..."
                />
                
                {/* Dropdown */}
                {showCityDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {citiesLoading ? (
                      <div className="px-4 py-3 text-center text-gray-500">
                        <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                        Memuat kota...
                      </div>
                    ) : citiesData && citiesData.data.length > 0 ? (
                      citiesData.data.map((city) => (
                        <button
                          key={city.id}
                          type="button"
                          onClick={() => handleCitySelect(city.id, city.name)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-black"
                        >
                          <div className="font-medium">{city.name}</div>
                          <div className="text-sm text-gray-500">{city.province.name}</div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-center text-gray-500">
                        {citySearch ? 'Tidak ada kota yang ditemukan' : 'Ketik untuk mencari kota'}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Click outside to close dropdown */}
                {showCityDropdown && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowCityDropdown(false)}
                  />
                )}
              </div>
              {validationErrors.cityId && (
                <p className="text-red-600 text-sm mt-1">{validationErrors.cityId}</p>
              )}
              {selectedCityName && (
                <p className="text-green-600 text-sm mt-1">✓ {selectedCityName} dipilih</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label htmlFor="roleId" className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  id="roleId"
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    validationErrors.roleId ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                >
                  <option value="">Pilih Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              {validationErrors.roleId && (
                <p className="text-red-600 text-sm mt-1">{validationErrors.roleId}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  validationErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Masukkan password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {validationErrors.password && (
              <p className="text-red-600 text-sm mt-1">{validationErrors.password}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">Password minimal 6 karakter</p>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-6 border-t border-gray-200">
            <Link
              href="/admin/users"
              className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isPending ? 'Menyimpan...' : 'Simpan Pengguna'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;