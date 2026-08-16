import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const sessionController = {
  getSessions: async (req, res) => {
    try {
      const { employeeId, status } = req.query;
      let sessions = db.getCollection('loginSessions');

      if (employeeId) {
        sessions = sessions.filter((s) => s.employeeId === employeeId);
      }
      if (status) {
        sessions = sessions.filter((s) => s.status?.toLowerCase() === status.toLowerCase());
      }

      return sendSuccess(res, sessions);
    } catch (err) {
      return sendError(res, 'Failed to retrieve login sessions', 500, err.message);
    }
  },

  recordSession: async (req, res) => {
    try {
      const { employeeId, employeeName, department, designation, ipAddress, device } = req.body;

      const now = new Date();
      const formattedTime = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
      const sessionId = `SES-${Date.now().toString().slice(-4)}`;

      const newSession = {
        id: sessionId,
        employeeId: employeeId || req.user?.id || 'TDS001',
        employeeName: employeeName || req.user?.name || 'Tensora User',
        department: department || 'Engineering',
        designation: designation || 'Specialist',
        loginTime: formattedTime,
        loginTimestamp: now.getTime(),
        logoutTime: '—',
        duration: 'Active Now',
        ipAddress: ipAddress || req.ip || '192.168.1.50',
        device: device || (req.headers['user-agent']?.includes('Mac') ? 'macOS / Chrome' : 'Windows 11 / Chrome'),
        status: 'Active'
      };

      db.insert('loginSessions', newSession);
      return sendSuccess(res, newSession, 'Session recorded', 201);
    } catch (err) {
      return sendError(res, 'Failed to record session', 500, err.message);
    }
  },

  clearSessions: async (req, res) => {
    try {
      db.setCollection('loginSessions', []);
      return sendSuccess(res, [], 'Login sessions history cleared');
    } catch (err) {
      return sendError(res, 'Failed to clear sessions', 500, err.message);
    }
  }
};
