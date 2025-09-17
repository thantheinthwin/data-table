import { useQuery } from '@tanstack/react-query';
import { getTableData } from '@/lib/generateData';
import { TableRow } from '@/types/table';

// Simulate API delay for demonstration
const simulateApiDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// API function to fetch table data
export async function fetchTableData(): Promise<TableRow[]> {
  await simulateApiDelay(800); // Simulate network delay
  return getTableData();
}

// React Query hook for fetching table data
export function useTableData() {
  return useQuery({
    queryKey: ['tableData'],
    queryFn: fetchTableData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Query keys for consistent cache management
export const tableDataKeys = {
  all: ['tableData'] as const,
  lists: () => [...tableDataKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...tableDataKeys.lists(), { filters }] as const,
} as const;
