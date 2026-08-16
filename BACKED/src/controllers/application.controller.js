import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const applicationController = {
  // Public job application submission
  submitApplication: async (req, res) => {
    try {
      const { name, email, phone, jobId, jobTitle, department, portfolio, resumeLink, coverNote } = req.body;

      if (!name || !email || !resumeLink) {
        return sendError(res, 'Name, email, and resume link are required.', 400);
      }

      const newApplication = {
        id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        email,
        phone: phone || '',
        jobId: jobId || 'GENERAL',
        jobTitle: jobTitle || 'General Application',
        department: department || 'Engineering',
        portfolio: portfolio || '',
        resumeLink,
        coverNote: coverNote || '',
        status: 'Reviewing',
        appliedAt: new Date().toISOString()
      };

      db.insert('applications', newApplication);

      // Create notification for admin
      const notif = {
        id: `NOTIF-${Date.now().toString().slice(-4)}`,
        title: `New Job Application: ${name}`,
        message: `Applied for ${jobTitle || 'Role'} (${department || 'General'}).`,
        time: 'Just now',
        read: false,
        type: 'application'
      };
      db.insert('notifications', notif);

      return sendSuccess(res, newApplication, 'Application submitted successfully', 201);
    } catch (err) {
      return sendError(res, 'Failed to submit application', 500, err.message);
    }
  },

  getApplications: async (req, res) => {
    try {
      const { department, status } = req.query;
      let apps = db.getCollection('applications');

      if (department && department !== 'ALL') {
        apps = apps.filter((a) => a.department?.toLowerCase() === department.toLowerCase());
      }
      if (status) {
        apps = apps.filter((a) => a.status?.toLowerCase() === status.toLowerCase());
      }

      return sendSuccess(res, apps);
    } catch (err) {
      return sendError(res, 'Failed to retrieve applications', 500, err.message);
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = db.update('applications', id, { status });
      if (!updated) {
        return sendError(res, 'Application not found', 404);
      }

      return sendSuccess(res, updated, 'Application status updated');
    } catch (err) {
      return sendError(res, 'Failed to update application status', 500, err.message);
    }
  },

  deleteApplication: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = db.delete('applications', id);
      if (!deleted) {
        return sendError(res, 'Application not found', 404);
      }
      return sendSuccess(res, null, 'Application removed');
    } catch (err) {
      return sendError(res, 'Failed to delete application', 500, err.message);
    }
  }
};
