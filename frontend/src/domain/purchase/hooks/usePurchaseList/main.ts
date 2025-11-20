import { useQuery } from '@tanstack/react-query';
import { purchaseService } from '../../services/purchaseService';
import type { UsePurchaseListOptions, UsePurchaseListReturn } from './types';

/**
 * @hook usePurchaseList
 * @summary Hook to fetch purchase list and total summary
 * @domain purchase
 */
export const usePurchaseList = ({
  filters,
  enabled = true,
}: UsePurchaseListOptions = {}): UsePurchaseListReturn => {
  const queryKey = ['purchases', filters];

  const listQuery = useQuery({
    queryKey,
    queryFn: () => purchaseService.list(filters),
    enabled,
  });

  const totalQuery = useQuery({
    queryKey: ['purchases-total', filters],
    queryFn: () => purchaseService.getTotal(filters),
    enabled,
  });

  return {
    purchases: listQuery.data || [],
    total: totalQuery.data,
    isLoading: listQuery.isLoading || totalQuery.isLoading,
    isError: listQuery.isError || totalQuery.isError,
    error: listQuery.error || totalQuery.error,
    refetch: () => {
      listQuery.refetch();
      totalQuery.refetch();
    },
  };
};
