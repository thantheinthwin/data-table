'use client';

import { useState, useRef } from 'react';
import { Status, FilterState, PmsSyncStatus } from '@/types/table';

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

const PMS_SYNC_STATUS_OPTIONS: Array<{
  value: PmsSyncStatus | 'ALL';
  label: string;
}> = [
  { value: 'ALL', label: 'All Sync Statuses' },
  { value: 'SYNCED', label: 'Synced' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'NOT_SYNCED', label: 'Not Synced' },
];

export default function Filters({ filters, onFiltersChange }: FiltersProps) {
  const [patientSearchValue, setPatientSearchValue] = useState(filters.patient);
  const [insuranceSearchValue, setInsuranceSearchValue] = useState(
    filters.insuranceCarrier
  );
  const [providerSearchValue, setProviderSearchValue] = useState(
    filters.provider
  );
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedUpdateFilters = (field: keyof FilterState, value: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      onFiltersChange({ ...filters, [field]: value });
    }, 300);
  };

  const handlePatientSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPatientSearchValue(value);
    debouncedUpdateFilters('patient', value);
  };

  const handleInsuranceSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setInsuranceSearchValue(value);
    debouncedUpdateFilters('insuranceCarrier', value);
  };

  const handleProviderSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setProviderSearchValue(value);
    debouncedUpdateFilters('provider', value);
  };

  const handleStatusChange = (status: Status | 'ALL') => {
    onFiltersChange({ ...filters, status });
  };

  const handlePmsSyncStatusChange = (pmsSyncStatus: PmsSyncStatus | 'ALL') => {
    onFiltersChange({ ...filters, pmsSyncStatus });
  };

  return (
    <div className="space-y-4 mb-6">
      {/* First row - Patient and Status filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="patient-search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search by Patient
          </label>
          <input
            id="patient-search"
            type="text"
            value={patientSearchValue}
            onChange={handlePatientSearchChange}
            placeholder="Enter patient name to search..."
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
            onChange={(e) =>
              handleStatusChange(e.target.value as Status | 'ALL')
            }
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

      {/* Second row - Insurance and PMS Sync Status filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="insurance-search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search by Insurance Carrier
          </label>
          <input
            id="insurance-search"
            type="text"
            value={insuranceSearchValue}
            onChange={handleInsuranceSearchChange}
            placeholder="Enter insurance carrier to search..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="sm:w-48">
          <label
            htmlFor="pms-sync-status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            PMS Sync Status
          </label>
          <select
            id="pms-sync-status"
            value={filters.pmsSyncStatus}
            onChange={(e) =>
              handlePmsSyncStatusChange(e.target.value as PmsSyncStatus | 'ALL')
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {PMS_SYNC_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Third row - Provider filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="provider-search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search by Provider
          </label>
          <input
            id="provider-search"
            type="text"
            value={providerSearchValue}
            onChange={handleProviderSearchChange}
            placeholder="Enter provider name to search..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="sm:w-48"></div> {/* Empty div for spacing */}
      </div>
    </div>
  );
}
