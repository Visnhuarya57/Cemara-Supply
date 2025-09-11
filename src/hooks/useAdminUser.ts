

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { ListUsersResponse, UserFilters, UserPayload, CreateUserResponse } from "@/types/ListUsersAdmin";
import { 
  UserDetailResponse, 
  EditUserPayload, 
  EditUserResponse, 
  CitiesResponse, 
  RolesResponse 
} from "@/types/UserDetail";
import { getAuthToken } from "@/utils/auth";

// API function to get users
const fetchUsers = async (filters?: UserFilters): Promise<ListUsersResponse> => {
  const token = getAuthToken();
  
  const params = new URLSearchParams();
  if (filters?.role) params.append('role', filters.role);
  if (filters?.city) params.append('city', filters.city);
  if (filters?.search) params.append('search', filters.search);
  
  const queryString = params.toString();
  const url = `/api/admin/users${queryString ? `?${queryString}` : ''}`;
  
  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

// API function to create user
const createUser = async (userData: UserPayload): Promise<CreateUserResponse> => {
  const token = getAuthToken();
  
  const response = await api.post('/api/admin/users', userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

// API function to get user detail
const fetchUserDetail = async (userId: string): Promise<UserDetailResponse> => {
  const token = getAuthToken();
  
  const response = await api.get(`/api/admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

// API function to edit user
const editUser = async (userId: string, userData: EditUserPayload): Promise<EditUserResponse> => {
  const token = getAuthToken();
  
  const response = await api.put(`/api/admin/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

// API function to get cities
const fetchCities = async (): Promise<CitiesResponse> => {
  const token = getAuthToken();
  
  const response = await api.get('/api/cities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

// API function to get roles
const fetchRoles = async (): Promise<RolesResponse> => {
  const token = getAuthToken();
  
  const response = await api.get('/api/roles', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

// Hook to get users list
export function useAdminGetUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: ['admin-users', filters],
    queryFn: () => fetchUsers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

// Hook to create user
export function useAdminCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}

// Hook to get user detail
export function useAdminGetUserDetail(userId: string) {
  return useQuery({
    queryKey: ['admin-user-detail', userId],
    queryFn: () => fetchUserDetail(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

// Hook to edit user
export function useAdminEditUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, userData }: { userId: string; userData: EditUserPayload }) => 
      editUser(userId, userData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch users list and specific user detail
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-user-detail', variables.userId] });
    },
  });
}

// Hook to get cities
export function useGetCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
  });
}

// Hook to get roles
export function useGetRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
  });
}

// Legacy function name for compatibility
export function useAdminGetUser() {
  return useAdminGetUsers();
}