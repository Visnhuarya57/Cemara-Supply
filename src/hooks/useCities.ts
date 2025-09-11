import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { CitiesResponse, CityFilters } from "@/types/Cities";

// API function to get cities
const fetchCities = async (filters?: CityFilters): Promise<CitiesResponse> => {
  const params = new URLSearchParams();
  if (filters?.q) params.append('q', filters.q);
  
  const queryString = params.toString();
  const url = `/api/reference/cities${queryString ? `?${queryString}` : ''}`;
  
  const response = await api.get(url);
  return response.data;
};

// Hook to get cities list
export function useCities(filters?: CityFilters) {
  return useQuery({
    queryKey: ['cities', filters],
    queryFn: () => fetchCities(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes (cities don't change often)
    refetchOnWindowFocus: false,
  });
}
