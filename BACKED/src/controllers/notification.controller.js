import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const notificationController = {
  getNotifications: async (req, res) => {
    try {
      const notifications = db.getCollection('notifications');
      return sendSuccess(res, notifications);
    } catch (err) {
      return sendError(res, 'Failed to retrieve notifications', 500, err.message);
    }
  },

  markRead: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = db.update('notifications', id, { read: true });
      if (!updated) {
        return sendError(res, 'Notification not found', 404);
      }
      return sendSuccess(res, updated, 'Notification marked as read');
    } catch (err) {
      return sendError(res, 'Failed to update notification', 500, err.message);
    }
  },

  markAllRead: async (req, res) => {
    try {
      const notifs = db.getCollection('notifications');
      const updated = notifs.map((n) => ({ ...n, read: true }));
      db.setCollection('notifications', updated);
      return sendSuccess(res, updated, 'All notifications marked as read');
    } catch (err) {
      return sendError(res, 'Failed to mark all as read', 500, err.message);
    }
  },

  clearAll: async (req, res) => {
    try {
      db.setCollection('notifications', []);
      return sendSuccess(res, [], 'Notifications cleared');
    } catch (err) {
      return sendError(res, 'Failed to clear notifications', 500, err.message);
    }
  }
};
