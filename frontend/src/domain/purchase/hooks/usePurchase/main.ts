import { useQuery } from '@tanstack/react-query';
import { purchaseService } from '../../services/purchaseService';
import type { UsePurchaseOptions, UsePurchaseReturn } from './types';

/**
 * @hook usePurchase
 * @summary Hook to fetch a single purchase
 * @domain purchase
 */
export const usePurchase = ({ id, enabled = true }: UsePurchaseOptions): UsePurchaseReturn => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['purchase', id],
    queryFn: () => purchaseService.getById(id!),
    enabled: enabled && !!id,
  });

  return {
    purchase: data,
    isLoading,
    error,
  };
};
