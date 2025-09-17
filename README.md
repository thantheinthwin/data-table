# Data Table

A responsive healthcare data table built with Next.js 15, TypeScript, and Tailwind CSS featuring sorting, filtering, pagination, and 250 rows of realistic medical billing data.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

- **Responsive Design**: Mobile-first table with horizontal scrolling
- **Real-time Filtering**: Search by patient name, filter by status
- **Multi-column Sorting**: Click headers to sort by any column
- **Pagination**: Navigate through large datasets efficiently
- **URL State Persistence**: Bookmarkable filters and sorting state
- **Loading States**: Smooth loading indicators with React Query
- **Type Safety**: Full TypeScript coverage with strict typing

## Architecture

- **Next.js 15** with App Router and Turbopack
- **React 19** with modern hooks and concurrent features
- **TanStack Query** for data fetching and caching
- **Tailwind CSS 4** for styling with custom design system
- **Radix UI** for accessible select components
- **Faker.js** for realistic test data generation
- **Date-fns** for date formatting and manipulation

### Data Flow

1. **Data Generation**: 250 rows of realistic healthcare billing data generated with Faker.js
2. **API Simulation**: React Query fetches data with simulated network delay (800ms)
3. **Client-side Processing**: All filtering, sorting, and pagination happens in the browser
4. **State Management**: URL parameters sync with table state for bookmarkable URLs
5. **Caching**: React Query handles data caching and background updates

### Table Columns

- **Patient**: Name with patient ID
- **Service Date**: Formatted date display
- **Insurance**: Carrier, plan, and type (Primary/Secondary) with color coding
- **Amount**: Currency-formatted billing amounts
- **Status**: NCOF status with visual indicators
- **Last Updated**: Date and time with relative formatting
- **User**: Avatar with user initials
- **Date Sent**: Original and current send dates
- **PMS Sync Status**: Sync status with icons and messages
- **Provider**: Provider name with ID

## Development

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run format       # Format code with Prettier
```

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (table)/           # Route group for table page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── table/            # Table-specific components
│   ├── ui/               # Base UI components
│   └── providers/        # React context providers
├── lib/                  # Utility libraries
│   ├── api/              # API functions and React Query hooks
│   ├── table/            # Table configuration and renderers
│   └── generateData.ts   # Data generation utilities
└── types/                # TypeScript type definitions
```

## Tradeoffs

**✅ Pros:**

- **Performance**: Client-side processing provides instant interactions
- **Bundle Size**: Custom implementation keeps bundle small (~331kB)
- **Developer Experience**: Full TypeScript coverage with strict typing
- **User Experience**: Bookmarkable URLs and smooth loading states
- **Maintainability**: Clean architecture with separation of concerns

**❌ Cons:**

- **Scalability**: Limited to hundreds of rows (not thousands)
- **Real-time**: No live data updates (static generated data)
- **Features**: Missing advanced features like column resize, export
- **Accessibility**: Basic ARIA implementation (could be enhanced)

## Known Limitations

- **Virtual Scrolling**: Not implemented for large datasets
- **Column Management**: No resizing, reordering, or hiding
- **Export Functionality**: No CSV/JSON export capabilities
- **Advanced Filtering**: Limited to text search and single-select
- **Server-side Processing**: All processing happens client-side
- **Internationalization**: No i18n support
- **Advanced Accessibility**: Could benefit from more ARIA features

## Technology Stack

- **Framework**: Next.js 15.5.3 with Turbopack
- **Runtime**: React 19.1.0 with concurrent features
- **Styling**: Tailwind CSS 4 with custom design tokens
- **Data Fetching**: TanStack Query 5.89.0
- **UI Components**: Radix UI for accessible primitives
- **Testing**: Jest with Testing Library
- **Code Quality**: ESLint, Prettier, TypeScript 5
- **Data Generation**: Faker.js 10.0.0 with seeded generation
