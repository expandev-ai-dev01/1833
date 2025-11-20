import type { Purchase, PurchaseFilters, PurchaseTotalResponse } from '../../types';

export interface UsePurchaseListOptions {
  filters?: PurchaseFilters;
  enabled?: boolean;
}

export interface UsePurchaseListReturn {
  purchases: Purchase[];
  total: PurchaseTotalResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}
