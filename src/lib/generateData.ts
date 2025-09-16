import { faker } from '@faker-js/faker';
import { subMonths, format } from 'date-fns';
import { TableRow, Status } from '@/types/table';

// Set seed for deterministic data generation
faker.seed(12345);

const STATUSES: Status[] = ['REJECTED', 'PENDING', 'CALL', 'RESUBMITTED'];
const STATUS_WEIGHTS = [0.15, 0.35, 0.25, 0.25]; // Weighted distribution

function getWeightedStatus(): Status {
  const random = Math.random();
  let cumulative = 0;

  for (let i = 0; i < STATUSES.length; i++) {
    cumulative += STATUS_WEIGHTS[i];
    if (random <= cumulative) {
      return STATUSES[i];
    }
  }

  return STATUSES[0]; // fallback
}

function generateTableRow(id: number): TableRow {
  // Generate service date within the last 18 months
  const serviceDate = faker.date.between({
    from: subMonths(new Date(), 18),
    to: new Date(),
  });

  // Generate last updated between service date and now
  const lastUpdated = faker.date.between({
    from: serviceDate,
    to: new Date(),
  });

  return {
    id: `row-${id}`,
    name: faker.person.fullName(),
    status: getWeightedStatus(),
    serviceDate: serviceDate.toISOString(),
    lastUpdated: lastUpdated.toISOString(),
  };
}

let cachedData: TableRow[] | null = null;

export function getTableData(): TableRow[] {
  // Return cached data if already generated
  if (cachedData) {
    return cachedData;
  }

  // Generate 250 rows of data
  const data: TableRow[] = [];
  for (let i = 1; i <= 250; i++) {
    data.push(generateTableRow(i));
  }

  // Cache the data
  cachedData = data;
  return data;
}

// Utility function to format dates for display
export function formatDate(isoString: string): string {
  return format(new Date(isoString), 'MMM dd, yyyy');
}

// Utility function to get relative time
export function getRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) {
    return 'Today';
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else {
    const months = Math.floor(diffInDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
}
