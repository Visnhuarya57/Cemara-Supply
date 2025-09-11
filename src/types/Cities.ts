// Interface for province data
export interface Province {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Interface for city data
export interface City {
  id: number;
  name: string;
  provinceId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  province: Province;
}

// Interface for cities API response
export interface CitiesResponse {
  success: boolean;
  message: string;
  data: City[];
}

// Interface for city filters
export interface CityFilters {
  q?: string; // search query
}
