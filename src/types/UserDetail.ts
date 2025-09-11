// Extended interfaces for user detail view
export interface DetailedUserRole {
  id: number;
  name: string;
}

export interface DetailedUserCity {
  id: number;
  name: string;
}

export interface ProductHarvest {
  id: number;
  productId: number;
  plantingDate: string;
  harvestDateStart: string;
  harvestDateEnd: string;
  harvestQtyStart: string;
  harvestQtyEnd: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LandProduct {
  id: number;
  name: string;
  price: string;
  latestHarvest: ProductHarvest | null;
}

export interface UserLand {
  id: number;
  name: string;
  city: DetailedUserCity;
  products: LandProduct[];
}

export interface DetailedUser {
  id: string;
  name: string;
  phoneNumber: string;
  role: DetailedUserRole;
  city: DetailedUserCity;
  lands: UserLand[];
}

export interface UserDetailResponse {
  success: boolean;
  message: string;
  data: DetailedUser;
}

// Interface for edit user payload
export interface EditUserPayload {
  name: string;
  phoneNumber: string;
  cityId: number;
  password?: string;
  roleId: number;
  description?: string;
  status: 'active' | 'inactive' | 'banned';
}

export interface EditUserResponse {
  success: boolean;
  message: string;
  data?: DetailedUser;
}

// Interface for cities and roles lists
export interface City {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface CitiesResponse {
  success: boolean;
  data: City[];
}

export interface RolesResponse {
  success: boolean;
  data: Role[];
}
