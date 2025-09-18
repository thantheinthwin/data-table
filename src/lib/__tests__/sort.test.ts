import { sortTableRows, getNextSortDirection } from '../sort';
import { TableRow } from '@/types/table';

const mockRows: TableRow[] = [
  {
    id: '1',
    patient: 'Charlie Brown',
    patientId: 'P001',
    serviceDate: '2024-01-15T00:00:00.000Z',
    insuranceCarrier: 'Blue Cross',
    insurancePlan: 'Standard',
    insuranceType: 'Primary',
    amount: 150.0,
    status: 'PENDING',
    lastUpdated: '2024-01-20T00:00:00.000Z',
    lastUpdatedTime: '2024-01-20T00:00:00.000Z',
    user: 'John Doe',
    userInitials: 'JD',
    dateSent: '2024-01-15T00:00:00.000Z',
    dateSentOrig: '2024-01-15T00:00:00.000Z',
    pmsSyncStatus: 'NOT_SYNCED',
    pmsSyncMessage: '',
    provider: 'Dr. Smith',
    providerId: 'PR001',
  },
  {
    id: '2',
    patient: 'Alice Smith',
    patientId: 'P002',
    serviceDate: '2024-02-10T00:00:00.000Z',
    insuranceCarrier: 'Aetna',
    insurancePlan: 'Premium',
    insuranceType: 'Primary',
    amount: 200.0,
    status: 'REJECTED',
    lastUpdated: '2024-02-15T00:00:00.000Z',
    lastUpdatedTime: '2024-02-15T00:00:00.000Z',
    user: 'Jane Doe',
    userInitials: 'JD',
    dateSent: '2024-02-10T00:00:00.000Z',
    dateSentOrig: '2024-02-10T00:00:00.000Z',
    pmsSyncStatus: 'SYNCED',
    pmsSyncMessage: 'Success',
    provider: 'Dr. Johnson',
    providerId: 'PR002',
  },
  {
    id: '3',
    patient: 'Bob Johnson',
    patientId: 'P003',
    serviceDate: '2024-01-05T00:00:00.000Z',
    insuranceCarrier: 'Cigna',
    insurancePlan: 'Basic',
    insuranceType: 'Secondary',
    amount: 100.0,
    status: 'CALL',
    lastUpdated: '2024-01-10T00:00:00.000Z',
    lastUpdatedTime: '2024-01-10T00:00:00.000Z',
    user: 'Bob Smith',
    userInitials: 'BS',
    dateSent: '2024-01-05T00:00:00.000Z',
    dateSentOrig: '2024-01-05T00:00:00.000Z',
    pmsSyncStatus: 'NOT_SYNCED',
    pmsSyncMessage: '',
    provider: 'Dr. Wilson',
    providerId: 'PR003',
  },
];

describe('sortTableRows', () => {
  it('should sort by patient ascending', () => {
    const result = sortTableRows(mockRows, 'patient', 'asc');
    expect(result[0].patient).toBe('Alice Smith');
    expect(result[1].patient).toBe('Bob Johnson');
    expect(result[2].patient).toBe('Charlie Brown');
  });

  it('should sort by patient descending', () => {
    const result = sortTableRows(mockRows, 'patient', 'desc');
    expect(result[0].patient).toBe('Charlie Brown');
    expect(result[1].patient).toBe('Bob Johnson');
    expect(result[2].patient).toBe('Alice Smith');
  });

  it('should sort by status ascending', () => {
    const result = sortTableRows(mockRows, 'status', 'asc');
    expect(result[0].status).toBe('PENDING');
    expect(result[1].status).toBe('CALL');
    expect(result[2].status).toBe('REJECTED');
  });

  it('should sort by service date ascending', () => {
    const result = sortTableRows(mockRows, 'serviceDate', 'asc');
    expect(result[0].id).toBe('3'); // Bob - earliest date
    expect(result[1].id).toBe('1'); // Charlie
    expect(result[2].id).toBe('2'); // Alice - latest date
  });

  it('should return original array when direction is null', () => {
    const result = sortTableRows(mockRows, 'patient', null);
    expect(result).toEqual(mockRows);
  });
});

describe('getNextSortDirection', () => {
  it('should return asc when changing field', () => {
    const result = getNextSortDirection('patient', 'status', 'desc');
    expect(result).toBe('asc');
  });

  it('should cycle through directions for same field', () => {
    expect(getNextSortDirection('patient', 'patient', null)).toBe('asc');
    expect(getNextSortDirection('patient', 'patient', 'asc')).toBe('desc');
    expect(getNextSortDirection('patient', 'patient', 'desc')).toBe(null);
  });
});
