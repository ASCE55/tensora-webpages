import { Router } from 'express';
import { sessionController } from '../controllers/session.controller.js';

const router = Router();

router.get('/', sessionController.getSessions);
router.post('/', sessionController.recordSession);
router.delete('/', sessionController.clearSessions);

export default router;
