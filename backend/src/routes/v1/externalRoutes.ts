import { Router } from 'express';
import * as healthController from '@/api/v1/external/public/health/controller';

const router = Router();

router.get('/health', healthController.checkHandler);

export default router;
