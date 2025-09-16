export type Status = 'REJECTED' | 'PENDING' | 'CALL' | 'RESUBMITTED';

export interface TableRow {
  id: string;
  name: string;
  status: Status;
  serviceDate: string; // ISO date
  lastUpdated: string; // ISO date
}

export type SortField = 'name' | 'status' | 'serviceDate' | 'lastUpdated';
export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  field: SortField | null;
  direction: SortDirection;
}

export interface FilterState {
  name: string;
  status: Status | 'ALL';
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
