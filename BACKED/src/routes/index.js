import { Router } from 'express';
import authRoutes from './auth.routes.js';
import inquiryRoutes from './inquiry.routes.js';
import applicationRoutes from './application.routes.js';
import clientRoutes from './client.routes.js';
import projectRoutes from './project.routes.js';
import serviceRoutes from './service.routes.js';
import employeeRoutes from './employee.routes.js';
import taskRoutes from './task.routes.js';
import invoiceRoutes from './invoice.routes.js';
import paymentRoutes from './payment.routes.js';
import expenseRoutes from './expense.routes.js';
import messageRoutes from './message.routes.js';
import notificationRoutes from './notification.routes.js';
import attendanceRoutes from './attendance.routes.js';
import sessionRoutes from './session.routes.js';
import analyticsRoutes from './analytics.routes.js';
import systemRoutes from './system.routes.js';

const router = Router();

// Mount API Modules
router.use('/auth', authRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/applications', applicationRoutes);
router.use('/clients', clientRoutes);
router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);
router.use('/employees', employeeRoutes);
router.use('/tasks', taskRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/payments', paymentRoutes);
router.use('/expenses', expenseRoutes);
router.use('/messages', messageRoutes);
router.use('/notifications', notificationRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/sessions', sessionRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/system', systemRoutes);

// Health check alias
router.get('/health', (req, res, next) => {
  req.url = '/health';
  systemRoutes(req, res, next);
});

export default router;
