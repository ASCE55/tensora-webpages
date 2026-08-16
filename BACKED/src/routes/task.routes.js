import { Router } from 'express';
import { taskController } from '../controllers/task.controller.js';

const router = Router();

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.patch('/:id/status', taskController.moveTaskStatus);
router.post('/:id/comments', taskController.addComment);
router.delete('/:id', taskController.deleteTask);

export default router;
