import React from 'react';
import { formatDate, formatCurrency, formatTime } from '@/lib/generateData';
import { CircleAlert, CheckCircle } from 'lucide-react';
import { TableRow, PmsSyncStatus } from '@/types/table';

// Color mappings for different status types
const PMS_SYNC_STATUS_COLORS: Record<PmsSyncStatus, string> = {
  SYNCED: 'bg-green-100 text-green-800',
  NOT_SYNCED: 'bg-gray-100 text-gray-800',
};

const INSURANCE_TYPE_COLORS: Record<'Primary' | 'Secondary', string> = {
  Primary: 'bg-[#EBF9FE] text-[#23A9EB]',
  Secondary: 'bg-[#FCF8CA] text-[#E98E34]',
};

// Generic column renderers
export const columnRenderers = {
  // Patient column with ID
  patient: (value: string, row: TableRow) => (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">ID: {row.patientId}</div>
    </div>
  ),

  // Date formatter
  date: (value: string) => (
    <div className="text-sm text-gray-900">{formatDate(value)}</div>
  ),

  // Date with time
  dateWithTime: (value: string, row: TableRow) => (
    <div className="space-y-2">
      <div className="text-sm text-gray-900">{formatDate(value)}</div>
      <div className="text-sm font-semibold text-gray-500">
        {formatTime(row.lastUpdatedTime)}
      </div>
    </div>
  ),

  // Currency formatter
  currency: (value: number) => (
    <div className="text-sm text-gray-900">{formatCurrency(value)}</div>
  ),

  // Insurance carrier with type badge
  insuranceCarrier: (value: string, row: TableRow) => (
    <div className="space-y-2">
      <div>
        <div className="text-sm text-gray-900">{value}</div>
        <div className="text-sm text-gray-900">{row.insurancePlan}</div>
      </div>
      <div
        className={`mt-1 px-2 py-1 text-sm font-semibold rounded text-center ${INSURANCE_TYPE_COLORS[row.insuranceType]}`}
      >
        {row.insuranceType}
      </div>
    </div>
  ),

  // Status with prefix
  status: (value: string) => (
    <div className="text-sm text-gray-900">NCOF - {value}</div>
  ),

  // User with avatar
  user: (value: string, row: TableRow) => (
    <div className="flex items-center">
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-sm font-medium text-green-800">
          {row.userInitials}
        </span>
      </div>
    </div>
  ),

  // PMS Sync Status with icon and message
  pmsSyncStatus: (value: PmsSyncStatus, row: TableRow) => (
    <div className="flex flex-col">
      <div
        className={`flex gap-1.5 items-center px-2 py-1 text-sm font-semibold justify-center rounded ${PMS_SYNC_STATUS_COLORS[value]}`}
      >
        {value === 'NOT_SYNCED' && <CircleAlert className="w-4 h-4" />}
        {value === 'SYNCED' && <CheckCircle className="w-4 h-4" />}
        {value === 'NOT_SYNCED' ? 'Not synced' : 'Synced'}
      </div>
      <div className="text-sm text-gray-500 mt-1">{row.pmsSyncMessage}</div>
    </div>
  ),

  // Provider with ID
  provider: (value: string, row: TableRow) => (
    <div className="space-y-1">
      <div className="text-sm text-gray-900">{value}</div>
      <div className="text-sm font-semibold text-gray-500">
        ID: {row.providerId}
      </div>
    </div>
  ),

  // Simple text renderer
  text: (value: string) => <div className="text-sm text-gray-900">{value}</div>,

  // Number renderer
  number: (value: number) => (
    <div className="text-sm text-gray-900">{value}</div>
  ),
};

// Utility function to get renderer by type
export function getColumnRenderer(type: string) {
  return (
    columnRenderers[type as keyof typeof columnRenderers] ||
    columnRenderers.text
  );
}
