import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { format } from 'date-fns';

interface PurchaseSummaryProps {
  total: number | undefined;
  count: number | undefined;
  isLoading: boolean;
}

export const PurchaseSummary = ({ total, count, isLoading }: PurchaseSummaryProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-6">
          <LoadingSpinner size="sm" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${(total || 0).toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">{count || 0} items in current view</p>
        </CardContent>
      </Card>
    </div>
  );
};
