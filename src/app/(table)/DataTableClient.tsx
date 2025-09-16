'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  TableRow,
  SortField,
  SortDirection,
  FilterState,
  PaginationState,
  TableState,
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
function getUrlState(searchParams: URLSearchParams): TableState {
  return {
    sort: {
      field: (searchParams.get('sort') as SortField) || null,
      direction: (searchParams.get('order') as SortDirection) || null,
    },
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
  state: TableState
) {
  const params = new URLSearchParams();

  if (state.sort.field && state.sort.direction) {
    params.set('sort', state.sort.field);
    params.set('order', state.sort.direction);
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
  const [tableState, setTableState] = useState<TableState>(urlState);

  // Helper function to update state and URL atomically
  const updateTableState = useCallback(
    (updates: Partial<TableState>) => {
      setTableState((prevState) => {
        const newState = { ...prevState, ...updates };
        updateUrl(router, pathname, newState);
        return newState;
      });
    },
    [router, pathname]
  );

  // Filter data
  const filteredData = useMemo(() => {
    return initialData.filter((row) => {
      const matchesName = row.name
        .toLowerCase()
        .includes(tableState.filters.name.toLowerCase());
      const matchesStatus =
        tableState.filters.status === 'ALL' ||
        row.status === tableState.filters.status;
      return matchesName && matchesStatus;
    });
  }, [initialData, tableState.filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (tableState.sort.field && tableState.sort.direction) {
      return sortTableRows(
        filteredData,
        tableState.sort.field,
        tableState.sort.direction
      );
    }
    return filteredData;
  }, [filteredData, tableState.sort]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex =
      (tableState.pagination.page - 1) * tableState.pagination.pageSize;
    const endIndex = startIndex + tableState.pagination.pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, tableState.pagination]);

  const handleSort = useCallback(
    (field: SortField) => {
      const newDirection = getNextSortDirection(
        tableState.sort.field,
        field,
        tableState.sort.direction
      );
      updateTableState({
        sort: { field, direction: newDirection },
        pagination: { ...tableState.pagination, page: 1 },
      });
    },
    [tableState.sort, tableState.pagination, updateTableState]
  );

  const handleFiltersChange = useCallback(
    (newFilters: FilterState) => {
      updateTableState({
        filters: newFilters,
        pagination: { ...tableState.pagination, page: 1 },
      });
    },
    [tableState.pagination, updateTableState]
  );

  const handlePaginationChange = useCallback(
    (newPagination: PaginationState) => {
      updateTableState({
        pagination: newPagination,
      });
    },
    [updateTableState]
  );

  const handleResetFilters = useCallback(() => {
    updateTableState({
      filters: { name: '', status: 'ALL' },
      sort: { field: null, direction: null },
      pagination: { page: 1, pageSize: 10 },
    });
  }, [updateTableState]);

  if (filteredData.length === 0) {
    return (
      <>
        <Filters
          filters={tableState.filters}
          onFiltersChange={handleFiltersChange}
        />
        <EmptyState onReset={handleResetFilters} />
      </>
    );
  }

  return (
    <>
      <Filters
        filters={tableState.filters}
        onFiltersChange={handleFiltersChange}
      />

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <Table
          rows={paginatedData}
          sortField={tableState.sort.field}
          sortDirection={tableState.sort.direction}
          onSort={handleSort}
        />
      </div>

      <Pagination
        pagination={tableState.pagination}
        totalItems={filteredData.length}
        onPaginationChange={handlePaginationChange}
      />
    </>
  );
}
