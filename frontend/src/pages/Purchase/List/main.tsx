import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePurchaseList } from '@/domain/purchase/hooks/usePurchaseList';
import { usePurchaseMutations } from '@/domain/purchase/hooks/usePurchaseMutations';
import { PurchaseList } from '@/domain/purchase/components/PurchaseList';
import { PurchaseSummary } from '@/domain/purchase/components/PurchaseSummary';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { ErrorMessage } from '@/core/components/ErrorMessage';

export const PurchaseListPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    startDate: '',
    endDate: '',
    category: '',
  });

  const { purchases, total, isLoading, error } = usePurchaseList({
    filters: {
      searchTerm: filters.searchTerm || undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
      category: filters.category || undefined,
    },
  });

  const { deletePurchase, isDeleting } = usePurchaseMutations();

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (error) {
    return <ErrorMessage title="Error loading purchases" message="Please try again later." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Purchases</h1>
        <Link to="/dashboard/purchases/new">
          <Button>Add New Purchase</Button>
        </Link>
      </div>

      <PurchaseSummary total={total?.total} count={total?.count} isLoading={isLoading} />

      <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search products..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="Filter by category..."
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
          />
        </div>
      </div>

      <PurchaseList
        purchases={purchases}
        isLoading={isLoading}
        onDelete={deletePurchase}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default PurchaseListPage;
