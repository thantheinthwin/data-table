import { Suspense } from 'react';
import PageShell from '@/components/layout/PageShell';
import DataTableClient from './(table)/DataTableClient';
import Spinner from '@/components/ui/Spinner';

export default function Home() {
  return (
    <PageShell>
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" />
          </div>
        }
      >
        <DataTableClient />
      </Suspense>
    </PageShell>
  );
}
