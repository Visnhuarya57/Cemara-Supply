import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { AdminLoginResponse } from "@/types/LoginAdmin";

export interface AdminLoginPayload {
  phoneNumber: string;
  password: string;
  admin: boolean;
}

export function useAdminLogin() {
  return useMutation<AdminLoginResponse, Error, AdminLoginPayload>({
    mutationFn: async (payload: AdminLoginPayload) => {
      const { data } = await api.post<AdminLoginResponse>("/api/auth/login", payload);
      return data;
    },
  });
}
