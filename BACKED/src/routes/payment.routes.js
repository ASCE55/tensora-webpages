import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller.js';

const router = Router();

router.get('/', paymentController.getPayments);
router.post('/', paymentController.createPayment);
router.delete('/:id', paymentController.deletePayment);

export default router;
