/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
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
    return <ChevronsUpDown className="w-4 h-4 text-gray-400 shrink-0" />;
  }

  if (sortDirection === 'asc') {
    return <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />;
  }

  if (sortDirection === 'desc') {
    return <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />;
  }

  return <ChevronsUpDown className="w-4 h-4 text-gray-400 shrink-0" />;
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
