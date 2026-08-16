import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const attendanceController = {
  getAttendance: async (req, res) => {
    try {
      const { employeeId, date } = req.query;
      let logs = db.getCollection('attendance');

      if (employeeId) {
        logs = logs.filter((a) => a.employeeId === employeeId);
      }
      if (date) {
        logs = logs.filter((a) => a.date === date);
      }

      return sendSuccess(res, logs);
    } catch (err) {
      return sendError(res, 'Failed to retrieve attendance logs', 500, err.message);
    }
  },

  punchIn: async (req, res) => {
    try {
      const employeeId = req.user?.id || req.body.employeeId || 'TDS001';
      const today = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const logs = db.getCollection('attendance');
      const existingIdx = logs.findIndex((a) => a.date === today && a.employeeId === employeeId);

      let record;
      if (existingIdx >= 0) {
        logs[existingIdx] = {
          ...logs[existingIdx],
          checkIn: timeStr,
          status: 'Present'
        };
        record = logs[existingIdx];
        db.persist();
      } else {
        record = {
          id: `ATT-${Date.now().toString().slice(-2)}`,
          employeeId,
          date: today,
          checkIn: timeStr,
          checkOut: '—',
          hours: 'In Progress',
          status: 'Present'
        };
        db.insert('attendance', record);
      }

      return sendSuccess(res, record, `Shift Punched In at ${timeStr}`);
    } catch (err) {
      return sendError(res, 'Failed to punch in', 500, err.message);
    }
  },

  punchOut: async (req, res) => {
    try {
      const employeeId = req.user?.id || req.body.employeeId || 'TDS001';
      const today = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const logs = db.getCollection('attendance');
      const existingIdx = logs.findIndex((a) => a.date === today && a.employeeId === employeeId);

      if (existingIdx === -1) {
        return sendError(res, 'No check-in record found for today. Please punch in first.', 400);
      }

      logs[existingIdx] = {
        ...logs[existingIdx],
        checkOut: timeStr,
        hours: '8h 30m'
      };
      db.persist();

      return sendSuccess(res, logs[existingIdx], `Shift Punched Out at ${timeStr}`);
    } catch (err) {
      return sendError(res, 'Failed to punch out', 500, err.message);
    }
  }
};
