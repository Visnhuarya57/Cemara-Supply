// Interface for creating invoice payload
export interface CreateInvoicePayload {
  senderUserId: string;
  receiverUserId: string;
  deliveryDate: string; // ISO date string
  productId: number;
  grade: string;
  size: string;
  qty: number;
  price: number;
}

// Interface for create invoice response
export interface CreateInvoiceResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    transactionNumber: string;
    sender: string;
    receiver: string;
    deliveryDate: string;
    product: string;
    grade: string;
    size: string;
    qty: string;
    price: string;
  };
}

// Interface for user selection (for dropdowns)
export interface UserOption {
  id: string;
  name: string;
  phoneNumber: string;
  role: {
    name: string;
  };
  city: {
    name: string;
  };
}

// Interface for product selection (for dropdowns)
export interface ProductOption {
  id: number;
  name: string;
  price: string;
  landId: number;
  landName: string;
  ownerName: string;
  city: string;
}

// Interface for users list response
export interface UsersListResponse {
  success: boolean;
  data: UserOption[];
}

// Interface for products list response
export interface ProductsListResponse {
  success: boolean;
  data: ProductOption[];
}

// Interface for form validation errors
export interface InvoiceValidationErrors {
  senderUserId?: string;
  receiverUserId?: string;
  deliveryDate?: string;
  productId?: string;
  grade?: string;
  size?: string;
  qty?: string;
  price?: string;
}

// Interface for form state (same as CreateInvoicePayload for now)
export type InvoiceFormData = CreateInvoicePayload;

// Common grade options
export const GRADE_OPTIONS = [
  { value: 'A', label: 'Grade A (Premium)' },
  { value: 'B', label: 'Grade B (Standard)' },
  { value: 'C', label: 'Grade C (Ekonomi)' },
] as const;

// Common size options
export const SIZE_OPTIONS = [
  { value: 'S', label: 'Small (S)' },
  { value: 'M', label: 'Medium (M)' },
  { value: 'L', label: 'Large (L)' },
  { value: 'XL', label: 'Extra Large (XL)' },
  { value: 'Mixed', label: 'Campuran' },
] as const;
