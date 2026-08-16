import { Router } from 'express';
import { inquiryController } from '../controllers/inquiry.controller.js';

const router = Router();

// Public submission
router.post('/', inquiryController.submitInquiry);

// Admin retrieval & updates
router.get('/', inquiryController.getInquiries);
router.get('/:id', inquiryController.getInquiryById);
router.patch('/:id/status', inquiryController.updateStatus);
router.delete('/:id', inquiryController.deleteInquiry);

export default router;
