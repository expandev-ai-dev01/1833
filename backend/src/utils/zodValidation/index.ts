import { z } from 'zod';

export const zName = z.string().min(1).max(100);
export const zDescription = z.string().max(500).optional();
export const zId = z.coerce.number().int().positive();
export const zPrice = z.coerce.number().min(0);
export const zDate = z.coerce.date();
