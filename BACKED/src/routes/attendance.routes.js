import { Router } from 'express';
import { attendanceController } from '../controllers/attendance.controller.js';

const router = Router();

router.get('/', attendanceController.getAttendance);
router.post('/punch-in', attendanceController.punchIn);
router.post('/punch-out', attendanceController.punchOut);

export default router;
