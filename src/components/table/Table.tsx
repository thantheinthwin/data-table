/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { ColumnConfig, SortDirection } from '@/types/table';

interface TableProps<T = Record<string, any>, S = keyof T> {
  rows: T[];
  columns: ColumnConfig<T>[];
  sortField: S | null;
  sortDirection: SortDirection;
  onSort: (field: S) => void;
  className?: string;
}

function SortIcon<T, S = keyof T>({
  field,
  sortField,
  sortDirection,
}: {
  field: S;
  sortField: S | null;
  sortDirection: SortDirection;
}) {
  if (sortField !== field) {
    return (
      <svg
        className="w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    );
  }

  if (sortDirection === 'asc') {
    return (
      <svg
        className="w-4 h-4 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    );
  }

  if (sortDirection === 'desc') {
    return (
      <svg
        className="w-4 h-4 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );
  }

  return null;
}

export default function Table<T extends Record<string, any>, S = keyof T>({
  rows,
  columns,
  sortField,
  sortDirection,
  onSort,
  className = '',
}: TableProps<T, S>) {
  return (
    <div
      className={`overflow-x-auto rounded-lg shadow border border-border ${className}`}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className={`px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider ${
                  column.sortable
                    ? 'cursor-pointer hover:bg-gray-100 transition-colors'
                    : ''
                } ${column.headerClassName || ''}`}
                onClick={
                  column.sortable ? () => onSort(column.key as S) : undefined
                }
              >
                <div className="flex items-center gap-2">
                  {typeof column.label === 'string'
                    ? column.label
                    : column.label}
                  {column.sortable && (
                    <SortIcon
                      field={column.key as S}
                      sortField={sortField}
                      sortDirection={sortDirection}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr
              key={(row as any).id || index}
              className="hover:bg-gray-50 transition-colors"
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key] || '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
