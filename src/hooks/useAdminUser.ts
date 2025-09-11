

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { ListUsersResponse, UserFilters, UserPayload, CreateUserResponse } from "@/types/ListUsersAdmin";
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

// Legacy function name for compatibility
export function useAdminGetUser() {
  return useAdminGetUsers();
}