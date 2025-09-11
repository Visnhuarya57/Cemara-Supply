export interface AdminLoginRole {
  id: number;
  name: string;
  description: string;
}

export interface AdminLoginCity {
  id: number;
  name: string;
}

export interface AdminLoginUser {
  id: string;
  name: string;
  slug: string;
  phoneNumber: string;
  description: string;
  cityId: number;
  status: string;
  roleId: number;
  publicKey: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  role: AdminLoginRole;
  city: AdminLoginCity;
}

export interface AdminLoginData {
  user: AdminLoginUser;
  token: string;
  tokenType: string;
  expiresIn: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  data: AdminLoginData | null;
}
