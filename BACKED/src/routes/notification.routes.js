import { Router } from 'express';
import { notificationController } from '../controllers/notification.controller.js';

const router = Router();

router.get('/', notificationController.getNotifications);
router.patch('/:id/read', notificationController.markRead);
router.post('/read-all', notificationController.markAllRead);
router.delete('/', notificationController.clearAll);

export default router;
