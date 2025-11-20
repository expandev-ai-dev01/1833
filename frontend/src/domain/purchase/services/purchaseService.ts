import { authenticatedClient } from '@/core/lib/api';
import type {
  Purchase,
  CreatePurchaseDto,
  UpdatePurchaseDto,
  PurchaseFilters,
  PurchaseTotalResponse,
} from '../types';

/**
 * @service purchaseService
 * @summary Service for managing purchase records
 * @domain purchase
 * @type rest-service
 */
export const purchaseService = {
  /**
   * @endpoint GET /api/v1/internal/purchase
   * @summary List purchases with filters
   */
  async list(filters?: PurchaseFilters): Promise<Purchase[]> {
    const response = await authenticatedClient.get('/purchase', { params: filters });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/purchase/total
   * @summary Get total spent based on filters
   */
  async getTotal(filters?: PurchaseFilters): Promise<PurchaseTotalResponse> {
    const response = await authenticatedClient.get('/purchase/total', { params: filters });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/purchase/:id
   * @summary Get single purchase by ID
   */
  async getById(id: string): Promise<Purchase> {
    const response = await authenticatedClient.get(`/purchase/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/purchase
   * @summary Create new purchase
   */
  async create(data: CreatePurchaseDto): Promise<Purchase> {
    const response = await authenticatedClient.post('/purchase', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/purchase/:id
   * @summary Update existing purchase
   */
  async update(id: string, data: UpdatePurchaseDto): Promise<void> {
    await authenticatedClient.put(`/purchase/${id}`, data);
  },

  /**
   * @endpoint DELETE /api/v1/internal/purchase/:id
   * @summary Delete purchase
   */
  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/purchase/${id}`);
  },
};
