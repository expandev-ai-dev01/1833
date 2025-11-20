export interface PurchaseEntity {
  id: number;
  idAccount: number;
  name: string;
  price: number;
  purchaseDate: Date;
  category: string | null;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseCreateRequest {
  idAccount: number;
  name: string;
  price: number;
  purchaseDate: Date;
  category?: string | null;
}

export interface PurchaseUpdateRequest extends PurchaseCreateRequest {
  id: number;
}

export interface PurchaseListFilters {
  idAccount: number;
}

export interface MonthlyTotalRequest {
  idAccount: number;
  month: number;
  year: number;
}
