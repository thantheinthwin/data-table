# Data Table Component

A responsive data table built with Next.js 15, TypeScript, and Tailwind CSS featuring sorting, filtering, pagination, and 250 rows of generated data.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Sorting**: Click column headers to sort by Name, Status, Service Date, or Last Updated (toggles between asc/desc/none)
- **Filtering**:
  - Text search on Name field (debounced, case-insensitive)
  - Status dropdown filter (All, Pending, Call, Resubmitted, Rejected)
- **Pagination**: Configurable page sizes (10, 25, 50) with Previous/Next controls
- **Smooth Interactions**: Instant filtering, sorting, and pagination without loading delays
- **URL State Persistence**: All filters, sorting, and pagination state stored in URL for bookmarking and sharing
- **Empty States**: Helpful empty state with filter reset action
- **Generated Data**: 250 rows of realistic dummy data generated at build time

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Data Generation**: @faker-js/faker
- **Date Handling**: date-fns
- **Testing**: Jest with @testing-library/react

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd data-table
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### URL Parameters

The table state is automatically stored in the URL, making it bookmarkable and shareable:

- `?search=john` - Filter by name containing "john"
- `?status=PENDING` - Filter by status
- `?sort=name&order=asc` - Sort by name ascending
- `?page=2&pageSize=25` - Go to page 2 with 25 items per page
- `?search=smith&status=CALL&sort=serviceDate&order=desc&page=3` - Combined filters

Example: `http://localhost:3000/?search=john&status=PENDING&sort=name&order=asc&page=2&pageSize=25`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run format       # Format code with Prettier
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (table)/
│   │   └── DataTableClient.tsx    # Main client component with state management
│   ├── globals.css                # Global styles and Tailwind imports
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page (server component)
├── components/
│   ├── table/
│   │   ├── Table.tsx              # Table presentation component
│   │   ├── Filters.tsx            # Search and status filter components
│   │   └── Pagination.tsx         # Pagination controls
│   ├── ui/
│   │   └── Spinner.tsx            # Loading spinner component
│   ├── layout/
│   │   └── PageShell.tsx          # Page layout wrapper
│   └── EmptyState.tsx             # Empty state component
├── lib/
│   ├── generateData.ts            # Data generation utilities
│   ├── sort.ts                    # Sorting utilities
│   └── __tests__/
│       └── sort.test.ts           # Unit tests for sorting
└── types/
    └── table.ts                   # TypeScript type definitions
```

## 🎯 Architecture Notes

### Data Flow

- **Server Component** (`page.tsx`): Generates data at build time using `getTableData()`
- **Client Component** (`DataTableClient.tsx`): Manages all UI state (filters, sorting, pagination)
- **Derived State**: Uses `useMemo` for filtering, sorting, and pagination calculations

### State Management

- **Local State**: React useState for filters, sorting, and pagination
- **Derived Data**: Computed from base data using useMemo hooks
- **Loading Simulation**: Brief loading states for better UX during interactions

### Performance Optimizations

- **Memoization**: Extensive use of useMemo for expensive calculations
- **Debounced Search**: 300ms debounce on name filter input
- **Deterministic Data**: Seeded faker for consistent data generation
- **Efficient Sorting**: Stable sort algorithms with proper type handling

## 🎨 Design Decisions & Tradeoffs

### ✅ Choices Made

1. **Custom Implementation**: Built custom table logic instead of using heavy libraries (AG Grid, MUI DataGrid)
   - **Pro**: Smaller bundle size, full control over functionality
   - **Con**: More development time, missing advanced features

2. **Client-Side Processing**: All filtering, sorting, and pagination happens in the browser
   - **Pro**: Instant interactions, no server requests
   - **Con**: Not suitable for very large datasets (thousands of rows)

3. **Build-Time Data Generation**: Data is generated during build, not runtime
   - **Pro**: Consistent data, faster page loads
   - **Con**: Data doesn't change between deployments

4. **Tailwind CSS v4**: Used latest Tailwind for modern styling approach
   - **Pro**: Excellent DX, consistent design system
   - **Con**: Learning curve for new @theme inline syntax

### 🔄 Possible Improvements

- **Virtual Scrolling**: Handle larger datasets efficiently
- **Column Resizing**: Allow users to adjust column widths
- **Export Functionality**: CSV/JSON export capabilities
- **Advanced Filtering**: Date range filters, multi-select status
- **Server-Side Processing**: For datasets with 10k+ rows

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with default settings

The app is optimized for Vercel deployment with:

- Automatic static optimization
- Build-time data generation
- Edge-compatible code

### Other Platforms

The app can be deployed to any platform that supports Next.js:

```bash
npm run build
npm run start
```

## 🧪 Testing

The project includes unit tests for critical functionality:

```bash
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
```

### Test Coverage

- ✅ Sorting utilities (ascending, descending, null handling)
- ✅ Sort direction cycling logic
- ✅ Data type handling (strings, dates, enums)

## 🐛 Known Limitations

1. **Dataset Size**: Optimized for hundreds of rows, not thousands
2. **Mobile UX**: Table scrolls horizontally on very small screens
3. **Accessibility**: Basic ARIA labels, could be enhanced
4. **Internationalization**: No i18n support currently
5. **Real-time Updates**: Static data, no live updates

## 📝 License

This project is created as a take-home assignment and is available for evaluation purposes.

---

**Note**: This implementation prioritizes clean code, performance, and user experience over feature completeness. It demonstrates proficiency in modern React patterns, TypeScript, and responsive design principles.
