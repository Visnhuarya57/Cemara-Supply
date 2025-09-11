import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { ListInvoicesResponse, InvoiceFilters, InvoiceDetailResponse } from "@/types/ListInvoicesAdmin";
import { 
  CreateInvoicePayload, 
  CreateInvoiceResponse, 
  UsersListResponse, 
  ProductsListResponse 
} from "@/types/CreateInvoice";
import { getAuthToken } from "@/utils/auth";

// API function to get invoices
const fetchInvoices = async (filters?: InvoiceFilters): Promise<ListInvoicesResponse> => {
  const token = getAuthToken();
  
  const params = new URLSearchParams();
  if (filters?.sender) params.append('sender', filters.sender);
  if (filters?.receiver) params.append('receiver', filters.receiver);
  if (filters?.product) params.append('product', filters.product);
  if (filters?.transactionNumber) params.append('transactionNumber', filters.transactionNumber);
  if (filters?.deliveryDateFrom) params.append('deliveryDateFrom', filters.deliveryDateFrom);
  if (filters?.deliveryDateTo) params.append('deliveryDateTo', filters.deliveryDateTo);
  if (filters?.search) params.append('search', filters.search);
  
  const queryString = params.toString();
  const url = `/api/admin/invoices${queryString ? `?${queryString}` : ''}`;
  
  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

// API function to get invoice detail
const fetchInvoiceDetail = async (id: string | number): Promise<InvoiceDetailResponse> => {
  const token = getAuthToken();
  
  const response = await api.get(`/api/admin/invoices/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

// API function to download invoice PDF
const downloadInvoicePDF = async (id: string | number): Promise<Blob> => {
  const token = getAuthToken();
  
  const response = await api.get(`/api/admin/invoices/${id}/download`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob', // Important for PDF downloads
  });
  
  return response.data;
};

// API function to create invoice
const createInvoice = async (invoiceData: CreateInvoicePayload): Promise<CreateInvoiceResponse> => {
  const token = getAuthToken();
  
  const response = await api.post('/api/admin/invoices', invoiceData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  
  return response.data;
};

// API function to get users for invoice creation
const fetchUsersForInvoice = async (): Promise<UsersListResponse> => {
  const token = getAuthToken();
  
  const response = await api.get('/api/admin/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

// API function to get products for invoice creation
const fetchProductsForInvoice = async (): Promise<ProductsListResponse> => {
  const token = getAuthToken();
  
  const response = await api.get('/api/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

// Hook to get invoices list
export function useAdminGetInvoices(filters?: InvoiceFilters) {
  return useQuery({
    queryKey: ['admin-invoices', filters],
    queryFn: () => fetchInvoices(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

// Hook to get invoice detail
export function useAdminGetInvoiceDetail(id: string | number) {
  return useQuery({
    queryKey: ['admin-invoice-detail', id],
    queryFn: () => fetchInvoiceDetail(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!id, // Only run query if id exists
  });
}

// Function to download invoice PDF (not a hook, just a utility function)
export async function downloadInvoice(id: string | number, transactionNumber?: string) {
  try {
    const blob = await downloadInvoicePDF(id);
    
    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary anchor element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${transactionNumber || id}.pdf`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error downloading invoice:', error);
    throw error;
  }
}

// Hook to create invoice
export function useAdminCreateInvoice() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      // Invalidate and refetch invoices list
      queryClient.invalidateQueries({ queryKey: ['admin-invoices'] });
    },
  });
}

// Hook to get users for invoice creation
export function useGetUsersForInvoice() {
  return useQuery({
    queryKey: ['users-for-invoice'],
    queryFn: fetchUsersForInvoice,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
}

// Hook to get products for invoice creation
export function useGetProductsForInvoice() {
  return useQuery({
    queryKey: ['products-for-invoice'],
    queryFn: fetchProductsForInvoice,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
}