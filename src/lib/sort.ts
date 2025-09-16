import { TableRow, SortField, SortDirection } from '@/types/table';

export function compareValues(
  a: string | number,
  b: string | number,
  direction: SortDirection
): number {
  if (direction === null) return 0;

  let result = 0;

  if (a < b) result = -1;
  else if (a > b) result = 1;
  else result = 0;

  return direction === 'desc' ? -result : result;
}

export function sortTableRows(
  rows: TableRow[],
  field: SortField,
  direction: SortDirection
): TableRow[] {
  if (direction === null) return rows;

  return [...rows].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (field) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        return compareValues(aValue, bValue, direction);

      case 'status':
        // Sort by status label in a stable order
        const statusOrder = ['PENDING', 'CALL', 'RESUBMITTED', 'REJECTED'];
        aValue = statusOrder.indexOf(a.status);
        bValue = statusOrder.indexOf(b.status);
        return compareValues(aValue, bValue, direction);

      case 'serviceDate':
      case 'lastUpdated':
        aValue = new Date(a[field]).getTime();
        bValue = new Date(b[field]).getTime();
        return compareValues(aValue, bValue, direction);

      default:
        return 0;
    }
  });
}

export function getNextSortDirection(
  currentField: SortField | null,
  newField: SortField,
  currentDirection: SortDirection
): SortDirection {
  if (currentField !== newField) {
    return 'asc';
  }

  switch (currentDirection) {
    case null:
      return 'asc';
    case 'asc':
      return 'desc';
    case 'desc':
      return null;
    default:
      return 'asc';
  }
}
