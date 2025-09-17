'use client';

import { TableRow, SortField, SortDirection } from '@/types/table';
import { formatDate, formatCurrency, formatTime } from '@/lib/generateData';

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
  PENDING: 'bg-yellow-100 text-yellow-800',
  FAILED: 'bg-red-100 text-red-800',
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
    <div className="overflow-x-auto">
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
                <div className="text-sm text-gray-500">
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
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded-full ${PMS_SYNC_STATUS_COLORS[row.pmsSyncStatus]}`}
                    >
                      {row.pmsSyncStatus === 'NOT_SYNCED' && (
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {row.pmsSyncStatus === 'SYNCED' && (
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {row.pmsSyncStatus === 'PENDING' && (
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {row.pmsSyncStatus === 'FAILED' && (
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {row.pmsSyncStatus === 'NOT_SYNCED'
                        ? 'Not synced'
                        : row.pmsSyncStatus}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {row.pmsSyncMessage}
                  </div>
                </div>
              </td>

              {/* Provider */}
              <td className="px-6 py-4 whitespace-nowrap space-y-1">
                <div className="text-sm font-medium text-gray-900">
                  {row.provider}
                </div>
                <div className="text-sm text-gray-500">
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
