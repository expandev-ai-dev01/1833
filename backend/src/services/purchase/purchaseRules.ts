import { getPool } from '@/utils/database';
import {
  PurchaseCreateRequest,
  PurchaseUpdateRequest,
  PurchaseEntity,
  MonthlyTotalRequest,
} from './purchaseTypes';

export async function purchaseCreate(params: PurchaseCreateRequest): Promise<{ id: number }> {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('idAccount', params.idAccount)
    .input('name', params.name)
    .input('price', params.price)
    .input('purchaseDate', params.purchaseDate)
    .input('category', params.category || null)
    .execute('spPurchaseCreate');

  return result.recordset[0];
}

export async function purchaseUpdate(params: PurchaseUpdateRequest): Promise<void> {
  const pool = await getPool();
  await pool
    .request()
    .input('id', params.id)
    .input('idAccount', params.idAccount)
    .input('name', params.name)
    .input('price', params.price)
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

export async function purchaseList(params: { idAccount: number }): Promise<PurchaseEntity[]> {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('idAccount', params.idAccount)
    .execute('spPurchaseList');

  return result.recordset;
}

export async function purchaseGetMonthlyTotal(
  params: MonthlyTotalRequest
): Promise<{ total: number }> {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('idAccount', params.idAccount)
    .input('month', params.month)
    .input('year', params.year)
    .execute('spPurchaseGetMonthlyTotal');

  return result.recordset[0];
}
