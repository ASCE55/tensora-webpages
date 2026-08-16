import { Router } from 'express';
import { applicationController } from '../controllers/application.controller.js';

const router = Router();

// Public application submission
router.post('/', applicationController.submitApplication);

// Admin review
router.get('/', applicationController.getApplications);
router.patch('/:id/status', applicationController.updateStatus);
router.delete('/:id', applicationController.deleteApplication);

export default router;
