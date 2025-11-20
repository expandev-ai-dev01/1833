import { z } from 'zod';

export const zName = z.string().min(2).max(100);
export const zDescription = z.string().max(500).optional();
export const zId = z.coerce.number().int().positive();
export const zPrice = z.coerce.number().gt(0);
export const zQuantity = z.coerce.number().gt(0);
export const zDate = z.coerce.date();
export const zCategory = z.string().max(50).optional().nullable();
