import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller.js';

const router = Router();

router.get('/kpis', analyticsController.getKPIs);
router.get('/revenue-chart', analyticsController.getRevenueChart);
router.get('/pipeline-distribution', analyticsController.getProjectPipelineDistribution);
router.get('/expense-breakdown', analyticsController.getExpenseBreakdown);
router.get('/reports', analyticsController.generateReport);

export default router;
