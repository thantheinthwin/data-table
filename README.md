# Data Table

A responsive data table built with Next.js 15, TypeScript, and Tailwind CSS featuring sorting, filtering, pagination, and 250 rows of generated data.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Architecture

- **Next.js 15** with App Router
- **Client-side processing** for instant interactions
- **URL state persistence** for bookmarkable filters/sorting
- **React Query** for data fetching with loading states
- **Custom table logic** (no heavy libraries)

### Data Flow

1. Server generates 250 rows at build time using Faker.js
2. Client fetches data via React Query with simulated API delay
3. All filtering, sorting, pagination happens in browser
4. State synchronized with URL parameters

## Tradeoffs

**✅ Pros:**

- Small bundle size (custom implementation)
- Instant interactions (client-side processing)
- Bookmarkable state (URL persistence)
- Consistent data (seeded generation)

**❌ Cons:**

- Limited to ~hundreds of rows (not thousands)
- No real-time updates (static data)
- Missing advanced features (column resize, export)
- Basic accessibility (ARIA labels)

## Known Gaps

- Virtual scrolling for large datasets
- Column resizing and reordering
- CSV/JSON export functionality
- Advanced filtering (date ranges, multi-select)
- Server-side processing for 10k+ rows
- Enhanced accessibility features
- Internationalization support
