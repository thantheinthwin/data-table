'use client';

import { useState, useEffect } from 'react';
import { Status, FilterState } from '@/types/table';

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const STATUS_OPTIONS: Array<{ value: Status | 'ALL'; label: string }> = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CALL', label: 'Call' },
  { value: 'RESUBMITTED', label: 'Resubmitted' },
  { value: 'REJECTED', label: 'Rejected' },
];

export default function Filters({ filters, onFiltersChange }: FiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.name);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, name: searchValue });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, filters, onFiltersChange]);

  const handleStatusChange = (status: Status | 'ALL') => {
    onFiltersChange({ ...filters, status });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Search by Name
        </label>
        <input
          id="search"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Enter name to search..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="sm:w-48">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status
        </label>
        <select
          id="status"
          value={filters.status}
          onChange={(e) => handleStatusChange(e.target.value as Status | 'ALL')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
