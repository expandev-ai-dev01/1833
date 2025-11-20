import { getPool } from '@/utils/database';
import {
  PurchaseCreateRequest,
  PurchaseUpdateRequest,
  PurchaseEntity,
  PurchaseListFilters,
  PurchaseTotalRequest,
} from './purchaseTypes';

export async function purchaseCreate(params: PurchaseCreateRequest): Promise<{ id: number }> {
  const pool = await getPool();

  // Calculate total price automatically (BR-001)
  const totalPrice = Number((params.quantity * params.unitPrice).toFixed(2));

  const result = await pool
    .request()
    .input('idAccount', params.idAccount)
    .input('name', params.name)
    .input('quantity', params.quantity)
    .input('unitPrice', params.unitPrice)
    .input('totalPrice', totalPrice)
    .input('purchaseDate', params.purchaseDate)
    .input('category', params.category || null)
    .execute('spPurchaseCreate');

  return result.recordset[0];
}

export async function purchaseUpdate(params: PurchaseUpdateRequest): Promise<void> {
  const pool = await getPool();

  // Recalculate total price automatically (BR-008)
  const totalPrice = Number((params.quantity * params.unitPrice).toFixed(2));

  await pool
    .request()
    .input('id', params.id)
    .input('idAccount', params.idAccount)
    .input('name', params.name)
    .input('quantity', params.quantity)
    .input('unitPrice', params.unitPrice)
    .input('totalPrice', totalPrice)
    .input('purchaseDate', params.purchaseDate)
    .input('category', params.category || null)
    .execute('spPurchaseUpdate');
}

export async function purchaseDelete(params: { id: number; idAccount: number }): Promise<void> {
  const pool = await getPool();
  await pool
    .request()
    .input('id', params.id)
    .input('idAccount', params.idAccount)
    .execute('spPurchaseDelete');
}

export async function purchaseGet(params: {
  id: number;
  idAccount: number;
}): Promise<PurchaseEntity> {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('id', params.id)
    .input('idAccount', params.idAccount)
    .execute('spPurchaseGet');

  if (!result.recordset[0]) {
    throw new Error('Purchase not found');
  }
  return result.recordset[0];
}

export async function purchaseList(params: PurchaseListFilters): Promise<PurchaseEntity[]> {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('idAccount', params.idAccount)
    .input('searchTerm', params.searchTerm || null)
    .input('startDate', params.startDate || null)
    .input('endDate', params.endDate || null)
    .input('category', params.category || null)
    .execute('spPurchaseList');

  return result.recordset;
}

export async function purchaseGetTotal(params: PurchaseTotalRequest): Promise<{ total: number }> {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('idAccount', params.idAccount)
    .input('searchTerm', params.searchTerm || null)
    .input('startDate', params.startDate || null)
    .input('endDate', params.endDate || null)
    .input('category', params.category || null)
    .execute('spPurchaseGetTotal');

  return result.recordset[0];
}
