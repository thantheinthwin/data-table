'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  SortField,
  SortDirection,
  FilterState,
  PaginationState,
  TableState,
} from '@/types/table';
import { sortTableRows, getNextSortDirection } from '@/lib/sort';
import { useTableData } from '@/lib/api/tableData';
import Filters from '@/components/table/Filters';
import Table from '@/components/table/Table';
import Pagination from '@/components/table/Pagination';
import EmptyState from '@/components/EmptyState';
import Spinner from '@/components/ui/Spinner';

// Utility functions for URL state management
function getUrlState(searchParams: URLSearchParams): TableState {
  return {
    sort: {
      field: (searchParams.get('sort') as SortField) || null,
      direction: (searchParams.get('order') as SortDirection) || null,
    },
    filters: {
      patient: searchParams.get('patient') || '',
      status: (searchParams.get('status') as FilterState['status']) || 'ALL',
      insuranceCarrier: searchParams.get('insuranceCarrier') || '',
      pmsSyncStatus:
        (searchParams.get('pmsSyncStatus') as FilterState['pmsSyncStatus']) ||
        'ALL',
      provider: searchParams.get('provider') || '',
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

  if (state.filters.patient) {
    params.set('patient', state.filters.patient);
  }

  if (state.filters.status !== 'ALL') {
    params.set('status', state.filters.status);
  }

  if (state.filters.insuranceCarrier) {
    params.set('insuranceCarrier', state.filters.insuranceCarrier);
  }

  if (state.filters.pmsSyncStatus !== 'ALL') {
    params.set('pmsSyncStatus', state.filters.pmsSyncStatus);
  }

  if (state.filters.provider) {
    params.set('provider', state.filters.provider);
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

export default function DataTableClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = '/';

  // Fetch data using React Query
  const { data: tableData, isLoading, isError, error } = useTableData();

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
    if (!tableData) return [];
    return tableData.filter((row) => {
      const matchesPatient = row.patient
        .toLowerCase()
        .includes(tableState.filters.patient.toLowerCase());
      const matchesStatus =
        tableState.filters.status === 'ALL' ||
        row.status === tableState.filters.status;
      const matchesInsuranceCarrier = row.insuranceCarrier
        .toLowerCase()
        .includes(tableState.filters.insuranceCarrier.toLowerCase());
      const matchesPmsSyncStatus =
        tableState.filters.pmsSyncStatus === 'ALL' ||
        row.pmsSyncStatus === tableState.filters.pmsSyncStatus;
      const matchesProvider = row.provider
        .toLowerCase()
        .includes(tableState.filters.provider.toLowerCase());

      return (
        matchesPatient &&
        matchesStatus &&
        matchesInsuranceCarrier &&
        matchesPmsSyncStatus &&
        matchesProvider
      );
    });
  }, [tableData, tableState.filters]);

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
      filters: {
        patient: '',
        status: 'ALL',
        insuranceCarrier: '',
        pmsSyncStatus: 'ALL',
        provider: '',
      },
      sort: { field: null, direction: null },
      pagination: { page: 1, pageSize: 10 },
    });
  }, [updateTableState]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600">Loading table data...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Error loading data
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No data state (after successful load but no filtered results)
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
