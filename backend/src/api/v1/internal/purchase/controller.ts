import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  CrudController,
  errorResponse,
  StatusGeneralError,
  successResponse,
} from '@/middleware/crud';
import {
  purchaseCreate,
  purchaseUpdate,
  purchaseDelete,
  purchaseGet,
  purchaseList,
  purchaseGetMonthlyTotal,
} from '@/services/purchase';
import { zName, zPrice, zDate, zId } from '@/utils/zodValidation';

const securable = 'PURCHASE';

export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'CREATE' }]);

  const bodySchema = z.object({
    name: zName,
    price: zPrice,
    purchaseDate: zDate,
    category: z.string().optional().nullable(),
  });

  const [validated, error] = await operation.create(req, bodySchema);

  if (!validated) return next(error);

  try {
    const result = await purchaseCreate({
      ...validated.credential,
      ...validated.params,
    });
    res.json(successResponse(result));
  } catch (error: any) {
    res.status(StatusGeneralError).json(errorResponse(error.message));
  }
}

export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'UPDATE' }]);

  const paramsSchema = z.object({ id: zId });
  const bodySchema = z.object({
    name: zName,
    price: zPrice,
    purchaseDate: zDate,
    category: z.string().optional().nullable(),
  });

  const [validated, error] = await operation.update(req, paramsSchema, bodySchema);

  if (!validated) return next(error);

  try {
    await purchaseUpdate({
      ...validated.credential,
      ...validated.params,
    });
    res.json(successResponse({ success: true }));
  } catch (error: any) {
    if (error.message === 'recordNotFound') {
      res.status(404).json(errorResponse('Purchase not found'));
    } else {
      res.status(StatusGeneralError).json(errorResponse(error.message));
    }
  }
}

export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'DELETE' }]);
  const paramsSchema = z.object({ id: zId });

  const [validated, error] = await operation.delete(req, paramsSchema);

  if (!validated) return next(error);

  try {
    await purchaseDelete({
      ...validated.credential,
      ...validated.params,
    });
    res.json(successResponse({ success: true }));
  } catch (error: any) {
    if (error.message === 'recordNotFound') {
      res.status(404).json(errorResponse('Purchase not found'));
    } else {
      res.status(StatusGeneralError).json(errorResponse(error.message));
    }
  }
}

export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'READ' }]);
  const paramsSchema = z.object({ id: zId });

  const [validated, error] = await operation.read(req, paramsSchema);

  if (!validated) return next(error);

  try {
    const result = await purchaseGet({
      ...validated.credential,
      ...validated.params,
    });
    res.json(successResponse(result));
  } catch (error: any) {
    res.status(StatusGeneralError).json(errorResponse(error.message));
  }
}

export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'READ' }]);

  const [validated, error] = await operation.list(req);

  if (!validated) return next(error);

  try {
    const result = await purchaseList(validated.credential);
    res.json(successResponse(result));
  } catch (error: any) {
    res.status(StatusGeneralError).json(errorResponse(error.message));
  }
}

export async function getMonthlyTotalHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'READ' }]);

  // Default to current month/year if not provided
  const now = new Date();
  const querySchema = z.object({
    month: z.coerce
      .number()
      .min(1)
      .max(12)
      .default(now.getMonth() + 1),
    year: z.coerce.number().min(2000).default(now.getFullYear()),
  });

  const [validated, error] = await operation.list(req, querySchema);

  if (!validated) return next(error);

  try {
    const result = await purchaseGetMonthlyTotal({
      ...validated.credential,
      ...validated.params,
    });
    res.json(successResponse(result));
  } catch (error: any) {
    res.status(StatusGeneralError).json(errorResponse(error.message));
  }
}
