import { useMutation, useQueryClient } from '@tanstack/react-query';
import { purchaseService } from '../../services/purchaseService';
import type { UsePurchaseMutationsReturn } from './types';

/**
 * @hook usePurchaseMutations
 * @summary Hook for purchase CRUD operations
 * @domain purchase
 */
export const usePurchaseMutations = (): UsePurchaseMutationsReturn => {
  const queryClient = useQueryClient();

  const invalidatePurchases = () => {
    queryClient.invalidateQueries({ queryKey: ['purchases'] });
    queryClient.invalidateQueries({ queryKey: ['purchases-total'] });
  };

  const createMutation = useMutation({
    mutationFn: purchaseService.create,
    onSuccess: invalidatePurchases,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => purchaseService.update(id, data),
    onSuccess: invalidatePurchases,
  });

  const deleteMutation = useMutation({
    mutationFn: purchaseService.delete,
    onSuccess: invalidatePurchases,
  });

  return {
    createPurchase: createMutation.mutateAsync,
    updatePurchase: updateMutation.mutateAsync,
    deletePurchase: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
