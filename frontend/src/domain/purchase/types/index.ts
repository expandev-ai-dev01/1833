export interface Purchase {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  purchaseDate: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePurchaseDto {
  name: string;
  quantity: number;
  unitPrice: number;
  purchaseDate: string;
  category?: string;
}

export interface UpdatePurchaseDto extends CreatePurchaseDto {}

export interface PurchaseFilters {
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
}

export interface PurchaseTotalResponse {
  total: number;
  count: number;
}
