import { sortTableRows, getNextSortDirection } from '../sort';
import { TableRow } from '@/types/table';

const mockRows: TableRow[] = [
  {
    id: '1',
    name: 'Charlie Brown',
    status: 'PENDING',
    serviceDate: '2024-01-15T00:00:00.000Z',
    lastUpdated: '2024-01-20T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Alice Smith',
    status: 'REJECTED',
    serviceDate: '2024-02-10T00:00:00.000Z',
    lastUpdated: '2024-02-15T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    status: 'CALL',
    serviceDate: '2024-01-05T00:00:00.000Z',
    lastUpdated: '2024-01-10T00:00:00.000Z',
  },
];

describe('sortTableRows', () => {
  it('should sort by name ascending', () => {
    const result = sortTableRows(mockRows, 'name', 'asc');
    expect(result[0].name).toBe('Alice Smith');
    expect(result[1].name).toBe('Bob Johnson');
    expect(result[2].name).toBe('Charlie Brown');
  });

  it('should sort by name descending', () => {
    const result = sortTableRows(mockRows, 'name', 'desc');
    expect(result[0].name).toBe('Charlie Brown');
    expect(result[1].name).toBe('Bob Johnson');
    expect(result[2].name).toBe('Alice Smith');
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
    const result = sortTableRows(mockRows, 'name', null);
    expect(result).toEqual(mockRows);
  });
});

describe('getNextSortDirection', () => {
  it('should return asc when changing field', () => {
    const result = getNextSortDirection('name', 'status', 'desc');
    expect(result).toBe('asc');
  });

  it('should cycle through directions for same field', () => {
    expect(getNextSortDirection('name', 'name', null)).toBe('asc');
    expect(getNextSortDirection('name', 'name', 'asc')).toBe('desc');
    expect(getNextSortDirection('name', 'name', 'desc')).toBe(null);
  });
});
