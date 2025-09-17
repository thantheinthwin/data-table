import React from 'react';
import {
  ColumnConfig,
  FilterConfig,
  TableRow,
  FilterState,
} from '@/types/table';
import { CheckCircle, CircleAlert } from 'lucide-react';

// Column configuration for the current table
export const tableColumns: ColumnConfig<TableRow>[] = [
  {
    key: 'patient',
    label: 'Patient',
    sortable: true,
    render: (value, row) => (
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">ID: {row.patientId}</div>
      </div>
    ),
  },
  {
    key: 'serviceDate',
    label: 'Service Date',
    sortable: true,
    render: (value) => (
      <div className="text-sm text-gray-900">
        {new Date(value).toLocaleDateString()}
      </div>
    ),
  },
  {
    key: 'insuranceCarrier',
    label: 'Insurance Carrier',
    render: (value, row) => (
      <div className="space-y-2">
        <div>
          <div className="text-sm text-gray-900">{value}</div>
          <div className="text-sm text-gray-900">{row.insurancePlan}</div>
        </div>
        <div
          className={`mt-1 px-2 py-1 text-sm font-semibold rounded text-center ${
            row.insuranceType === 'Primary'
              ? 'bg-[#EBF9FE] text-[#23A9EB]'
              : 'bg-[#FCF8CA] text-[#E98E34]'
          }`}
        >
          {row.insuranceType}
        </div>
      </div>
    ),
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (value) => (
      <div className="text-sm text-gray-900">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value as number)}
      </div>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (value) => (
      <div className="text-sm text-gray-900">NCOF - {value}</div>
    ),
  },
  {
    key: 'lastUpdated',
    label: 'Last Updated',
    sortable: true,
    render: (value, row) => (
      <div className="space-y-2">
        <div className="text-sm text-gray-900">
          {new Date(value).toLocaleDateString()}
        </div>
        <div className="text-sm font-semibold text-gray-500">
          {new Date(row.lastUpdatedTime).toLocaleTimeString()}
        </div>
      </div>
    ),
  },
  {
    key: 'user',
    label: 'User',
    render: (value, row) => (
      <div className="flex items-center">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-green-800">
            {row.userInitials}
          </span>
        </div>
      </div>
    ),
  },
  {
    key: 'dateSent',
    label: 'Date Sent',
    render: (value) => (
      <div className="text-sm text-gray-900">
        {new Date(value).toLocaleDateString()}
      </div>
    ),
  },
  {
    key: 'dateSentOrig',
    label: 'Date Sent Orig',
    render: (value) => (
      <div className="text-sm text-gray-900">
        {new Date(value).toLocaleDateString()}
      </div>
    ),
  },
  {
    key: 'pmsSyncStatus',
    label: 'PMS Sync Status',
    render: (value, row) => (
      <div className="flex flex-col">
        <div
          className={`flex gap-1.5 items-center px-2 py-1 text-sm font-semibold justify-center rounded ${
            value === 'SYNCED'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value === 'NOT_SYNCED' && (
            <CircleAlert className="w-4 h-4" />
          )}
          {value === 'SYNCED' && (
            <CheckCircle className="w-4 h-4" />
          )}
          {value === 'NOT_SYNCED' ? 'Not synced' : 'Synced'}
        </div>
        <div className="text-sm text-gray-500 mt-1">{row.pmsSyncMessage}</div>
      </div>
    ),
  },
  {
    key: 'provider',
    label: 'Provider',
    render: (value, row) => (
      <div className="space-y-1">
        <div className="text-sm text-gray-900">{value}</div>
        <div className="text-sm font-semibold text-gray-500">
          ID: {row.providerId}
        </div>
      </div>
    ),
  },
];

// Filter configuration
export const filterConfigs: FilterConfig<FilterState>[] = [
  {
    key: 'patient',
    label: 'Search by Name',
    type: 'text',
    placeholder: 'Enter name to search...',
    debounceMs: 300,
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'ALL', label: 'All Statuses' },
      { value: 'REJECTED', label: 'Rejected' },
      { value: 'PENDING', label: 'Pending' },
      { value: 'CALL', label: 'Call' },
      { value: 'RESUBMITTED', label: 'Resubmitted' },
    ],
  },
];
