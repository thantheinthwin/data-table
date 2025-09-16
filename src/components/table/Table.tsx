'use client';

import { TableRow, SortField, SortDirection } from '@/types/table';
import { formatDate, getRelativeTime } from '@/lib/generateData';

interface TableProps {
  rows: TableRow[];
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CALL: 'bg-blue-100 text-blue-800',
  RESUBMITTED: 'bg-purple-100 text-purple-800',
  REJECTED: 'bg-red-100 text-red-800',
};

function SortIcon({
  field,
  sortField,
  sortDirection,
}: {
  field: SortField;
  sortField: SortField | null;
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

export default function Table({
  rows,
  sortField,
  sortDirection,
  onSort,
}: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('name')}
            >
              <div className="flex items-center gap-2">
                Name
                <SortIcon
                  field="name"
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('status')}
            >
              <div className="flex items-center gap-2">
                Status
                <SortIcon
                  field="status"
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('serviceDate')}
            >
              <div className="flex items-center gap-2">
                Service Date
                <SortIcon
                  field="serviceDate"
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('lastUpdated')}
            >
              <div className="flex items-center gap-2">
                Last Updated
                <SortIcon
                  field="lastUpdated"
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[row.status]}`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(row.serviceDate)}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                title={formatDate(row.lastUpdated)}
              >
                {getRelativeTime(row.lastUpdated)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
