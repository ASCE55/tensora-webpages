import { Router } from 'express';
import { expenseController } from '../controllers/expense.controller.js';

const router = Router();

router.get('/', expenseController.getExpenses);
router.post('/', expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

export default router;
