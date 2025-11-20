/**
 * @module purchase
 * @summary Domain module for managing food purchases
 * @domain purchase
 * @version 1.0.0
 */

export * from './components/PurchaseList';
export * from './components/PurchaseForm';
export * from './components/PurchaseSummary';
export * from './hooks/usePurchaseList';
export * from './hooks/usePurchase';
export * from './hooks/usePurchaseMutations';
export * from './services/purchaseService';
export * from './types';

export const moduleMetadata = {
  name: 'purchase',
  domain: 'functional',
  version: '1.0.0',
  description: 'Manages food purchase records and monthly totals',
} as const;
