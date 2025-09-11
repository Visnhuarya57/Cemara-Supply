import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { ListInvoicesResponse, InvoiceFilters, InvoiceDetailResponse } from "@/types/ListInvoicesAdmin";
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