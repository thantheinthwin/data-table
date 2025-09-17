export type Status = 'REJECTED' | 'PENDING' | 'CALL' | 'RESUBMITTED';
export type PmsSyncStatus = 'NOT_SYNCED' | 'SYNCED';

export interface TableRow {
  id: string;
  patient: string;
  patientId: string;
  serviceDate: string; // ISO date
  insuranceCarrier: string;
  insurancePlan: string;
  insuranceType: 'Primary' | 'Secondary';
  amount: number;
  status: Status;
  lastUpdated: string; // ISO date
  lastUpdatedTime: string; // ISO date
  user: string;
  userInitials: string;
  dateSent: string; // ISO date
  dateSentOrig: string; // ISO date
  pmsSyncStatus: PmsSyncStatus;
  pmsSyncMessage: string;
  provider: string;
  providerId: string;
}

// Generic table types
export type SortDirection = 'asc' | 'desc' | null;

export interface SortState<T = string> {
  field: T | null;
  direction: SortDirection;
}

export interface PaginationState {
  page: number;
  pageSize: number;
}

export interface TableState<T = string, F = Record<string, unknown>> {
  sort: SortState<T>;
  filters: F;
  pagination: PaginationState;
}

// Column configuration types
export interface ColumnConfig<T = Record<string, unknown>> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface FilterConfig<T = Record<string, unknown>> {
  key: keyof T;
  label: string;
  type: 'text' | 'select' | 'date' | 'number';
  options?: Array<{ value: unknown; label: string }>;
  placeholder?: string;
  debounceMs?: number;
}

// Legacy types for backward compatibility
export type SortField = 'patient' | 'status' | 'serviceDate' | 'lastUpdated';

export interface FilterState {
  patient: string;
  status: Status | 'ALL';
  insuranceCarrier: string;
  pmsSyncStatus: PmsSyncStatus | 'ALL';
  provider: string;
}
