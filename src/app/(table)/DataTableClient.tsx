'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  TableRow,
  SortField,
  SortDirection,
  FilterState,
  PaginationState,
} from '@/types/table';
import { sortTableRows, getNextSortDirection } from '@/lib/sort';
import Filters from '@/components/table/Filters';
import Table from '@/components/table/Table';
import Pagination from '@/components/table/Pagination';
import EmptyState from '@/components/EmptyState';

interface DataTableClientProps {
  initialData: TableRow[];
}

// Utility functions for URL state management
function getUrlState(searchParams: URLSearchParams) {
  return {
    sortField: (searchParams.get('sort') as SortField) || null,
    sortDirection: (searchParams.get('order') as SortDirection) || null,
    filters: {
      name: searchParams.get('search') || '',
      status: (searchParams.get('status') as FilterState['status']) || 'ALL',
    },
    pagination: {
      page: parseInt(searchParams.get('page') || '1', 10),
      pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
    },
  };
}

function updateUrl(
  router: ReturnType<typeof useRouter>,
  pathname: string,
  state: {
    sortField: SortField | null;
    sortDirection: SortDirection;
    filters: FilterState;
    pagination: PaginationState;
  }
) {
  const params = new URLSearchParams();

  if (state.sortField && state.sortDirection) {
    params.set('sort', state.sortField);
    params.set('order', state.sortDirection);
  }

  if (state.filters.name) {
    params.set('search', state.filters.name);
  }

  if (state.filters.status !== 'ALL') {
    params.set('status', state.filters.status);
  }

  if (state.pagination.page > 1) {
    params.set('page', state.pagination.page.toString());
  }

  if (state.pagination.pageSize !== 10) {
    params.set('pageSize', state.pagination.pageSize.toString());
  }

  const queryString = params.toString();
  const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

  router.replace(newUrl, { scroll: false });
}

export default function DataTableClient({ initialData }: DataTableClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = '/';

  // Initialize state from URL parameters
  const urlState = getUrlState(searchParams);
  const [sortField, setSortField] = useState<SortField | null>(
    urlState.sortField
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    urlState.sortDirection
  );
  const [filters, setFilters] = useState<FilterState>(urlState.filters);
  const [pagination, setPagination] = useState<PaginationState>(
    urlState.pagination
  );

  // Update URL when state changes
  useEffect(() => {
    updateUrl(router, pathname, {
      sortField,
      sortDirection,
      filters,
      pagination,
    });
  }, [sortField, sortDirection, filters, pagination, router, pathname]);

  // Filter data
  const filteredData = useMemo(() => {
    return initialData.filter((row) => {
      const matchesName = row.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchesStatus =
        filters.status === 'ALL' || row.status === filters.status;
      return matchesName && matchesStatus;
    });
  }, [initialData, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (sortField && sortDirection) {
      return sortTableRows(filteredData, sortField, sortDirection);
    }
    return filteredData;
  }, [filteredData, sortField, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, pagination]);

  const handleSort = useCallback(
    (field: SortField) => {
      const newDirection = getNextSortDirection(
        sortField,
        field,
        sortDirection
      );
      setSortField(field);
      setSortDirection(newDirection);
      setPagination((prev) => ({ ...prev, page: 1 }));
    },
    [sortField, sortDirection]
  );

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const handlePaginationChange = useCallback(
    (newPagination: PaginationState) => {
      setPagination(newPagination);
    },
    []
  );

  const handleResetFilters = useCallback(() => {
    setFilters({ name: '', status: 'ALL' });
    setSortField(null);
    setSortDirection(null);
    setPagination({ page: 1, pageSize: 10 });
    // Clear URL parameters
    router.replace('/', { scroll: false });
  }, [router]);

  if (filteredData.length === 0) {
    return (
      <>
        <Filters filters={filters} onFiltersChange={handleFiltersChange} />
        <EmptyState onReset={handleResetFilters} />
      </>
    );
  }

  return (
    <>
      <Filters filters={filters} onFiltersChange={handleFiltersChange} />

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <Table
          rows={paginatedData}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>

      <Pagination
        pagination={pagination}
        totalItems={filteredData.length}
        onPaginationChange={handlePaginationChange}
      />
    </>
  );
}
