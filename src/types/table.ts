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

export type SortField = 'patient' | 'status' | 'serviceDate' | 'lastUpdated';
export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  field: SortField | null;
  direction: SortDirection;
}

export interface FilterState {
  patient: string;
  status: Status | 'ALL';
  insuranceCarrier: string;
  pmsSyncStatus: PmsSyncStatus | 'ALL';
  provider: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
}

export interface TableState {
  sort: SortState;
  filters: FilterState;
  pagination: PaginationState;
}
