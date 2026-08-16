import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', authController.login);
router.post('/google', authController.loginWithGoogle);
router.get('/me', authenticate, authController.getMe);
router.post('/logout', authController.logout);

export default router;
