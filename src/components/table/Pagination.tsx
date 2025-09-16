'use client';

import { PaginationState } from '@/types/table';

interface PaginationProps {
  pagination: PaginationState;
  totalItems: number;
  onPaginationChange: (pagination: PaginationState) => void;
}

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export default function Pagination({
  pagination,
  totalItems,
  onPaginationChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pagination.pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPaginationChange({ ...pagination, page: newPage });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    onPaginationChange({ page: 1, pageSize: newPageSize });
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span>Showing</span>
        <select
          value={pagination.pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>of {totalItems} results</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Previous
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (pagination.page <= 3) {
              pageNum = i + 1;
            } else if (pagination.page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = pagination.page - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  pageNum === pagination.page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === totalPages}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}
