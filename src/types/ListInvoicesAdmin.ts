// Interface for individual invoice data
export interface Invoice {
  id: number;
  transactionNumber: string;
  sender: string;
  receiver: string;
  product: string;
  deliveryDate: string; // ISO date string
}

// Interface for detailed invoice data (from detail API)
export interface InvoiceDetail {
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
}

// Interface for the complete API response
export interface ListInvoicesResponse {
  success: boolean;
  message: string;
  data: Invoice[];
}

// Interface for invoice detail API response
export interface InvoiceDetailResponse {
  success: boolean;
  message: string;
  data: InvoiceDetail;
}

// Interface for invoice list with pagination (if needed in the future)
export interface PaginatedInvoicesResponse extends ListInvoicesResponse {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Interface for invoice filters (useful for search/filter functionality)
export interface InvoiceFilters {
  sender?: string;
  receiver?: string;
  product?: string;
  transactionNumber?: string;
  deliveryDateFrom?: string;
  deliveryDateTo?: string;
  search?: string;
}

// Interface for invoice status (if status tracking is added later)
export interface InvoiceStatus {
  id: number;
  name: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  label: string;
}

// Extended invoice interface with status (for future use)
export interface InvoiceWithStatus extends Invoice {
  status?: InvoiceStatus;
  createdAt?: string;
  updatedAt?: string;
}

// Interface for create/update invoice payload
export interface InvoicePayload {
  transactionNumber: string;
  senderId: string;
  receiverId: string;
  productId: string;
  deliveryDate: string;
}

// Interface for invoice summary/statistics
export interface InvoiceSummary {
  totalInvoices: number;
  pendingInvoices: number;
  deliveredInvoices: number;
  totalValue?: number;
}

// Type for invoice sorting options
export type InvoiceSortField = "id" | "transactionNumber" | "sender" | "receiver" | "product" | "deliveryDate";
export type SortOrder = "asc" | "desc";

// Interface for invoice sorting
export interface InvoiceSort {
  field: InvoiceSortField;
  order: SortOrder;
}