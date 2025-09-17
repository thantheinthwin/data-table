'use client';

import { PaginationState } from '@/types/table';

interface PaginationProps {
  pagination: PaginationState;
  totalItems: number;
  onPaginationChange: (pagination: PaginationState) => void;
}

const PAGE_SIZE_OPTIONS = [10, 20, 25, 50];

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
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
      {/* Rows per page selector */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={pagination.pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-green-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrows */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <div className="flex flex-col">
              <svg
                className="w-3 h-3 text-green-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="w-3 h-3 text-green-700 -mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <span className="text-sm text-gray-500">Rows per page</span>
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-green-700 font-medium">
          Page {pagination.page} of {totalPages}
        </span>

        <div className="flex items-center gap-1">
          {/* First page button */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={pagination.page === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500"
            title="First page"
          >
            <svg
              className="w-4 h-4 text-green-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Previous page button */}
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500"
            title="Previous page"
          >
            <svg
              className="w-4 h-4 text-green-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Next page button */}
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500"
            title="Next page"
          >
            <svg
              className="w-4 h-4 text-green-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Last page button */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={pagination.page === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500"
            title="Last page"
          >
            <svg
              className="w-4 h-4 text-green-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414zm6 0a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
