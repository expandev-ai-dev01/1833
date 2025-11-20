import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';
import * as purchaseController from '@/api/v1/internal/purchase/controller';

const router = Router();

// Purchase Routes
router.get('/purchase', authMiddleware, purchaseController.listHandler);
router.post('/purchase', authMiddleware, purchaseController.createHandler);
router.get('/purchase/total', authMiddleware, purchaseController.getMonthlyTotalHandler);
router.get('/purchase/:id', authMiddleware, purchaseController.getHandler);
router.put('/purchase/:id', authMiddleware, purchaseController.updateHandler);
router.delete('/purchase/:id', authMiddleware, purchaseController.deleteHandler);

export default router;
