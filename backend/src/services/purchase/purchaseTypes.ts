export interface PurchaseEntity {
  id: number;
  idAccount: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  purchaseDate: Date;
  category: string | null;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseCreateRequest {
  idAccount: number;
  name: string;
  quantity: number;
  unitPrice: number;
  purchaseDate: Date;
  category?: string | null;
}

export interface PurchaseUpdateRequest extends PurchaseCreateRequest {
  id: number;
}

export interface PurchaseListFilters {
  idAccount: number;
  searchTerm?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  category?: string | null;
}

export interface PurchaseTotalRequest {
  idAccount: number;
  searchTerm?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  category?: string | null;
}
