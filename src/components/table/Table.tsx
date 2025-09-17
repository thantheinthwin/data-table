'use client';

import { TableRow, SortField, SortDirection } from '@/types/table';
import { formatDate, formatCurrency, formatTime } from '@/lib/generateData';
import { CircleAlert, CheckCircle } from 'lucide-react';

interface TableProps {
  rows: TableRow[];
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

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

const PMS_SYNC_STATUS_COLORS = {
  SYNCED: 'bg-green-100 text-green-800',
  NOT_SYNCED: 'bg-gray-100 text-gray-800',
};

const INSURANCE_TYPE_COLORS = {
  Primary: 'bg-[#EBF9FE] text-[#23A9EB]',
  Secondary: 'bg-[#FCF8CA] text-[#E98E34]',
};

export default function Table({
  rows,
  sortField,
  sortDirection,
  onSort,
}: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('patient')}
            >
              <div className="flex items-center gap-2">
                Patient
                <SortIcon
                  field="patient"
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
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
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
            >
              Insurance Carrier
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
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
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
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
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
            >
              User
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
            >
              Date Sent
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
            >
              <div className="text-center">
                <div>Date Sent</div>
                <div>Orig</div>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
            >
              PMS Sync Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
            >
              Provider
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              {/* Patient */}
              <td className="px-6 py-4 whitespace-nowrap space-y-1">
                <div className="text-sm font-medium text-gray-900">
                  {row.patient}
                </div>
                <div className="text-sm text-gray-500">ID: {row.patientId}</div>
              </td>

              {/* Service Date */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(row.serviceDate)}
              </td>

              {/* Insurance Carrier */}
              <td className="px-6 py-4 whitespace-nowrap space-y-2">
                <div>
                  <div className="text-sm text-gray-900">
                    {row.insuranceCarrier}
                  </div>
                  <div className="text-sm text-gray-900">
                    {row.insurancePlan}
                  </div>
                </div>
                <div
                  className={`mt-1 px-2 py-1 text-sm font-semibold rounded text-center ${INSURANCE_TYPE_COLORS[row.insuranceType]}`}
                >
                  {row.insuranceType}
                </div>
              </td>

              {/* Amount */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(row.amount)}
              </td>

              {/* Status */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                NCOF - {row.status}
              </td>

              {/* Last Updated */}
              <td className="px-6 py-4 whitespace-nowrap space-y-2">
                <div className="text-sm text-gray-900">
                  {formatDate(row.lastUpdated)}
                </div>
                <div className="text-sm font-semibold text-gray-500">
                  {formatTime(row.lastUpdatedTime)}
                </div>
              </td>

              {/* User */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-800">
                      {row.userInitials}
                    </span>
                  </div>
                </div>
              </td>

              {/* Date Sent */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(row.dateSent)}
              </td>

              {/* Date Sent Orig */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(row.dateSentOrig)}
              </td>

              {/* PMS Sync Status */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div
                    className={`flex gap-1.5 items-center px-2 py-1 text-sm font-semibold justify-center rounded ${PMS_SYNC_STATUS_COLORS[row.pmsSyncStatus]}`}
                  >
                    {row.pmsSyncStatus === 'NOT_SYNCED' && (
                      <CircleAlert className="w-4 h-4" />
                    )}
                    {row.pmsSyncStatus === 'SYNCED' && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {row.pmsSyncStatus === 'NOT_SYNCED'
                      ? 'Not synced'
                      : 'Synced'}
                  </div>

                  <div className="text-sm text-gray-500 mt-1">
                    {row.pmsSyncMessage}
                  </div>
                </div>
              </td>

              {/* Provider */}
              <td className="px-6 py-4 whitespace-nowrap space-y-1">
                <div className="text-sm text-gray-900">{row.provider}</div>
                <div className="text-sm font-semibold text-gray-500">
                  ID: {row.providerId}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
