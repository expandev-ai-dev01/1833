import { Request, Response } from 'express';
import { successResponse } from '@/middleware/crud';

export async function checkHandler(req: Request, res: Response): Promise<void> {
  res.json(
    successResponse({
      status: 'healthy',
      service: 'FoodTrack API',
      version: process.env.API_VERSION || 'v1',
    })
  );
}
