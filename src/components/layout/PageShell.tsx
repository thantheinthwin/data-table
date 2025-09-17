import { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[#D8E3D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Data Table</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your data with sorting, filtering, and pagination.
            </p>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
