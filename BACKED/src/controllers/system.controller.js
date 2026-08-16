import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const systemController = {
  getHealth: async (req, res) => {
    try {
      const uptimeSec = Math.floor(process.uptime());
      const healthData = {
        status: 'UP',
        service: 'Tensora Digital Solutions Master API Gateway',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(uptimeSec / 3600)}h ${Math.floor((uptimeSec % 3600) / 60)}m ${uptimeSec % 60}s`,
        memoryUsage: process.memoryUsage(),
        database: {
          status: 'CONNECTED',
          type: 'Persistent JSON Store Engine (ACID File-Backed)',
          collections: {
            clients: db.getCollection('clients').length,
            projects: db.getCollection('projects').length,
            employees: db.getCollection('employees').length,
            services: db.getCollection('services').length,
            tasks: db.getCollection('tasks').length,
            invoices: db.getCollection('invoices').length,
            expenses: db.getCollection('expenses').length,
            inquiries: db.getCollection('inquiries').length,
            applications: db.getCollection('applications').length
          }
        }
      };
      return sendSuccess(res, healthData, 'System operational');
    } catch (err) {
      return sendError(res, 'Healthcheck query failed', 500, err.message);
    }
  },

  getSettings: async (req, res) => {
    try {
      const settings = db.data.settings || {};
      return sendSuccess(res, settings);
    } catch (err) {
      return sendError(res, 'Failed to retrieve settings', 500, err.message);
    }
  },

  updateSettings: async (req, res) => {
    try {
      const updateData = req.body;
      db.data.settings = { ...db.data.settings, ...updateData };
      db.persist();
      return sendSuccess(res, db.data.settings, 'Settings updated');
    } catch (err) {
      return sendError(res, 'Failed to update settings', 500, err.message);
    }
  },

  resetFactoryData: async (req, res) => {
    try {
      db.reset();
      return sendSuccess(res, null, 'Factory demo data restored successfully');
    } catch (err) {
      return sendError(res, 'Failed to reset system data', 500, err.message);
    }
  }
};
