'use client';

import { useState, useRef, useEffect } from 'react';
import { Status, FilterState } from '@/types/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const STATUS_OPTIONS: Array<{ value: Status | 'ALL'; label: string }> = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CALL', label: 'Call' },
  { value: 'RESUBMITTED', label: 'Resubmitted' },
];

export default function Filters({ filters, onFiltersChange }: FiltersProps) {
  const [nameSearchValue, setNameSearchValue] = useState(filters.patient);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync local state with filters prop changes (e.g., when reset is called)
  useEffect(() => {
    setNameSearchValue(filters.patient);
  }, [filters.patient]);

  const debouncedUpdateFilters = (field: keyof FilterState, value: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      onFiltersChange({ ...filters, [field]: value });
    }, 300);
  };

  const handleNameSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameSearchValue(value);
    debouncedUpdateFilters('patient', value);
  };

  const handleStatusChange = (status: Status | 'ALL') => {
    onFiltersChange({ ...filters, status });
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="name-search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search by Name
          </label>
          <Input
            id="name-search"
            type="text"
            value={nameSearchValue}
            onChange={handleNameSearchChange}
            placeholder="Enter name to search..."
            className="text-gray-700 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500"
          />
        </div>

        <div className="sm:w-48">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <Select
            value={filters.status}
            onValueChange={(value) =>
              handleStatusChange(value as Status | 'ALL')
            }
          >
            <SelectTrigger className="h-10 border border-gray-300 rounded-lg font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
