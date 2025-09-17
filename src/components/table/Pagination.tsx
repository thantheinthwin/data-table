'use client';

import React from 'react';
import { PaginationState } from '@/types/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaginationProps {
  pagination: PaginationState;
  totalItems: number;
  onPaginationChange: (pagination: PaginationState) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showPageInfo?: boolean;
  className?: string;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 25, 50];

export default function Pagination({
  pagination,
  totalItems,
  onPaginationChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  showPageSizeSelector = true,
  showPageInfo = true,
  className = '',
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

  const renderNavigationButton = (
    onClick: () => void,
    disabled: boolean,
    title: string,
    icon: React.ReactNode
  ) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500"
      title={title}
    >
      {icon}
    </button>
  );

  return (
    <div
      className={`flex items-center justify-between mt-6 pt-4 border-t border-gray-200 flex-wrap ${className}`}
    >
      {/* Rows per page selector */}
      {showPageSizeSelector && (
        <div className="flex items-center gap-2">
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={(value) => handlePageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-20 h-10 border border-gray-300 rounded-lg text-[#1A6444] font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">Rows per page</span>
        </div>
      )}

      {/* Page navigation */}
      <div className="flex items-center gap-2">
        {showPageInfo && (
          <span className="text-sm font-semibold text-[#546661]">
            Page {pagination.page} of {totalPages}
          </span>
        )}

        <div className="flex items-center gap-2">
          {/* First page button */}
          {renderNavigationButton(
            () => handlePageChange(1),
            pagination.page === 1,
            'First page',
            <svg
              className="w-4 h-4 text-[#1A6444]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}

          {/* Previous page button */}
          {renderNavigationButton(
            () => handlePageChange(pagination.page - 1),
            pagination.page === 1,
            'Previous page',
            <svg
              className="w-4 h-4 text-[#1A6444]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}

          {/* Next page button */}
          {renderNavigationButton(
            () => handlePageChange(pagination.page + 1),
            pagination.page === totalPages,
            'Next page',
            <svg
              className="w-4 h-4 text-[#1A6444]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}

          {/* Last page button */}
          {renderNavigationButton(
            () => handlePageChange(totalPages),
            pagination.page === totalPages,
            'Last page',
            <svg
              className="w-4 h-4 text-[#1A6444]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414zm6 0a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
