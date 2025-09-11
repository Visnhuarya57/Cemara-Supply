// Interface for user role
export interface UserRole {
  name: "farmer" | "manufacturer" | "client";
}

// Interface for user city
export interface UserCity {
  name: string;
}

// Interface for individual user data
export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  role: UserRole;
  city: UserCity;
}

// Interface for the complete API response
export interface ListUsersResponse {
  success: boolean;
  message: string;
  data: User[];
}

// Type for user role names (useful for filtering/validation)
export type UserRoleType = "farmer" | "manufacturer" | "client";

// Interface for user list with pagination (if needed in the future)
export interface PaginatedUsersResponse extends ListUsersResponse {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Interface for user filters (useful for search/filter functionality)
export interface UserFilters {
  role?: UserRoleType;
  city?: string;
  search?: string;
}

// Interface for create/update user payload
export interface UserPayload {
  name: string;
  phoneNumber: string;
  roleId: number;
  cityId: number;
  password: string;
}

// Interface for create user response
export interface CreateUserResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    phoneNumber: string;
    role: UserRole;
    city: UserCity;
  };
}

// Interface for form validation errors
export interface UserValidationErrors {
  name?: string;
  phoneNumber?: string;
  roleId?: number;
  cityId?: number;
  password?: string;
}