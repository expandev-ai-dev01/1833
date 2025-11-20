import type { Purchase } from '../../types';

export interface UsePurchaseOptions {
  id?: string;
  enabled?: boolean;
}

export interface UsePurchaseReturn {
  purchase: Purchase | undefined;
  isLoading: boolean;
  error: unknown;
}
