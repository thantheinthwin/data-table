import { faker } from '@faker-js/faker';
import { subMonths, format } from 'date-fns';
import { TableRow, Status, PmsSyncStatus } from '@/types/table';

// Set seed for deterministic data generation
faker.seed(12345);

const STATUSES: Status[] = ['REJECTED', 'PENDING', 'CALL', 'RESUBMITTED'];
const STATUS_WEIGHTS = [0.15, 0.35, 0.25, 0.25]; // Weighted distribution

const PMS_SYNC_STATUSES: PmsSyncStatus[] = ['SYNCED', 'NOT_SYNCED'];
const PMS_SYNC_WEIGHTS = [0.7, 0.3]; // 70% synced, 30% not synced

const INSURANCE_TYPES = ['Primary', 'Secondary'] as const;
const INSURANCE_TYPE_WEIGHTS = [0.7, 0.3]; // 70% Primary, 30% Secondary

const INSURANCE_CARRIERS = [
  'BCBS OF COLORADO',
  'Aetna',
  'Cigna',
  'UnitedHealthcare',
  'Humana',
  'Kaiser Permanente',
  'Medicare',
  'Medicaid',
  'Anthem',
  'Molina Healthcare',
];

const INSURANCE_PLANS = [
  'FEP PPO INN',
  'HMO Standard',
  'PPO Premium',
  'EPO Basic',
  'POS Standard',
  'HDHP',
  'Medicare Advantage',
  'Medicaid Managed Care',
  'Commercial PPO',
  'Self-Pay',
];

const PROVIDERS = [
  'Dr. Sarah Johnson',
  'Dr. Michael Chen',
  'Dr. Emily Rodriguez',
  'Dr. David Thompson',
  'Dr. Lisa Wang',
  'Dr. James Wilson',
  'Dr. Maria Garcia',
  'Dr. Robert Brown',
  'Dr. Jennifer Davis',
  'Dr. Christopher Lee',
];

const USERS = [
  'admin@clinic.com',
  'nurse1@clinic.com',
  'nurse2@clinic.com',
  'billing@clinic.com',
  'manager@clinic.com',
];

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

function getWeightedPmsSyncStatus(): PmsSyncStatus {
  const random = Math.random();
  let cumulative = 0;

  for (let i = 0; i < PMS_SYNC_STATUSES.length; i++) {
    cumulative += PMS_SYNC_WEIGHTS[i];
    if (random <= cumulative) {
      return PMS_SYNC_STATUSES[i];
    }
  }

  return PMS_SYNC_STATUSES[0]; // fallback
}

function getWeightedInsuranceType(): 'Primary' | 'Secondary' {
  const random = Math.random();
  let cumulative = 0;

  for (let i = 0; i < INSURANCE_TYPES.length; i++) {
    cumulative += INSURANCE_TYPE_WEIGHTS[i];
    if (random <= cumulative) {
      return INSURANCE_TYPES[i];
    }
  }

  return INSURANCE_TYPES[0]; // fallback
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

  // Generate date sent (usually after service date)
  const dateSent = faker.date.between({
    from: serviceDate,
    to: new Date(),
  });

  // Generate original date sent (usually same as date sent, sometimes different)
  const dateSentOrig =
    faker.helpers.maybe(
      () =>
        faker.date.between({
          from: serviceDate,
          to: dateSent,
        }),
      { probability: 0.3 }
    ) || dateSent;

  const patientName = faker.person.fullName();
  const providerName = faker.helpers.arrayElement(PROVIDERS);
  const user = faker.helpers.arrayElement(USERS);
  const insuranceCarrier = faker.helpers.arrayElement(INSURANCE_CARRIERS);
  const insurancePlan = faker.helpers.arrayElement(INSURANCE_PLANS);
  const insuranceType = getWeightedInsuranceType();
  const pmsSyncStatus = getWeightedPmsSyncStatus();

  // Generate initials from names
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  // Generate PMS sync messages
  const getPmsSyncMessage = (status: PmsSyncStatus) => {
    switch (status) {
      case 'NOT_SYNCED':
        return 'Status modified today';
      case 'SYNCED':
        return 'Successfully synced';
      default:
        return '';
    }
  };

  return {
    id: `row-${id}`,
    patient: patientName,
    patientId: faker.string.numeric(5),
    serviceDate: serviceDate.toISOString(),
    insuranceCarrier,
    insurancePlan,
    insuranceType,
    amount: faker.number.float({ min: 50, max: 5000, fractionDigits: 2 }),
    status: getWeightedStatus(),
    lastUpdated: lastUpdated.toISOString(),
    lastUpdatedTime: lastUpdated.toISOString(),
    user,
    userInitials: getInitials(user.split('@')[0]),
    dateSent: dateSent.toISOString(),
    dateSentOrig: dateSentOrig.toISOString(),
    pmsSyncStatus,
    pmsSyncMessage: getPmsSyncMessage(pmsSyncStatus),
    provider: providerName,
    providerId: faker.string.numeric(11),
  };
}

let cachedData: TableRow[] | null = null;

export function getTableData(): TableRow[] {
  // Clear cached data to regenerate with new PMS sync statuses
  cachedData = null;

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

// Utility function to format currency amounts
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Utility function to format time
export function formatTime(isoString: string): string {
  return format(new Date(isoString), 'h:mm a');
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
