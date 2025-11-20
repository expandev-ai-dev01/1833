import type { CreatePurchaseDto, UpdatePurchaseDto, Purchase } from '../../types';

export interface UsePurchaseMutationsReturn {
  createPurchase: (data: CreatePurchaseDto) => Promise<Purchase>;
  updatePurchase: (params: { id: string; data: UpdatePurchaseDto }) => Promise<void>;
  deletePurchase: (id: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}
