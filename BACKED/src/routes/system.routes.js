import { Router } from 'express';
import { systemController } from '../controllers/system.controller.js';

const router = Router();

router.get('/health', systemController.getHealth);
router.get('/settings', systemController.getSettings);
router.put('/settings', systemController.updateSettings);
router.post('/reset', systemController.resetFactoryData);

export default router;
