import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const inquiryController = {
  // Public website inquiry submission
  submitInquiry: async (req, res) => {
    try {
      const { name, email, phone, company, service, budget, message } = req.body;

      if (!name || !email) {
        return sendError(res, 'Name and Email are required fields.', 400);
      }

      // 1. Create and persist inquiry
      const newInquiry = {
        id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        email,
        phone: phone || '',
        company: company || '',
        service: service || 'Web Development',
        budget: budget || 'Custom Quote',
        message: message || '',
        status: 'New',
        createdAt: new Date().toISOString()
      };
      db.insert('inquiries', newInquiry);

      // 2. Automatically create/update Client Lead in CRM
      const clients = db.getCollection('clients');
      const existingClientIdx = clients.findIndex(
        (c) => c.email?.toLowerCase() === email.toLowerCase()
      );

      let clientLead;
      if (existingClientIdx >= 0) {
        clients[existingClientIdx] = {
          ...clients[existingClientIdx],
          name: name || clients[existingClientIdx].name,
          company: company || clients[existingClientIdx].company,
          phone: phone || clients[existingClientIdx].phone,
          service: service || clients[existingClientIdx].service
        };
        clientLead = clients[existingClientIdx];
        db.persist();
      } else {
        clientLead = {
          id: `CLT-${Date.now().toString().slice(-4)}`,
          name,
          company: company || `${name}'s Organization`,
          email,
          phone: phone || 'Pending Info',
          address: `Budget: ${budget || 'Custom'}`,
          service: service || 'Web Development',
          status: 'Active',
          joinedDate: new Date().toISOString().split('T')[0],
          projectsCount: 1,
          revenue: 0,
          avatar: `https://images.unsplash.com/photo-${1534528741775 + (clients.length % 5)}?w=120&auto=format&fit=crop&q=80`
        };
        db.insert('clients', clientLead);
      }

      // 3. Create real-time notification for Dashboard admins
      const newNotification = {
        id: `NOTIF-${Date.now().toString().slice(-4)}`,
        title: `New Client Lead: ${name}`,
        message: `Submitted an inquiry for ${service || 'General Services'} (${budget || 'Quote Requested'}).`,
        time: 'Just now',
        read: false,
        type: 'inquiry'
      };
      db.insert('notifications', newNotification);

      return sendSuccess(res, {
        inquiry: newInquiry,
        client: clientLead
      }, 'Inquiry submitted successfully. Our team will contact you shortly.', 201);
    } catch (err) {
      return sendError(res, 'Failed to submit inquiry', 500, err.message);
    }
  },

  getInquiries: async (req, res) => {
    try {
      const { status, search } = req.query;
      let list = db.getCollection('inquiries');

      if (status && status !== 'ALL') {
        list = list.filter((i) => i.status?.toLowerCase() === status.toLowerCase());
      }

      if (search) {
        const query = search.toLowerCase();
        list = list.filter(
          (i) =>
            i.name?.toLowerCase().includes(query) ||
            i.email?.toLowerCase().includes(query) ||
            i.company?.toLowerCase().includes(query) ||
            i.service?.toLowerCase().includes(query) ||
            i.id?.toLowerCase().includes(query)
        );
      }

      return sendSuccess(res, list);
    } catch (err) {
      return sendError(res, 'Failed to retrieve inquiries', 500, err.message);
    }
  },

  getInquiryById: async (req, res) => {
    try {
      const { id } = req.params;
      const inquiry = db.findById('inquiries', id);
      if (!inquiry) {
        return sendError(res, 'Inquiry not found', 404);
      }
      return sendSuccess(res, inquiry);
    } catch (err) {
      return sendError(res, 'Failed to fetch inquiry', 500, err.message);
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return sendError(res, 'Status is required', 400);
      }

      const updated = db.update('inquiries', id, { status });
      if (!updated) {
        return sendError(res, 'Inquiry not found', 404);
      }

      return sendSuccess(res, updated, `Inquiry status updated to ${status}`);
    } catch (err) {
      return sendError(res, 'Failed to update inquiry status', 500, err.message);
    }
  },

  deleteInquiry: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = db.delete('inquiries', id);
      if (!deleted) {
        return sendError(res, 'Inquiry not found', 404);
      }
      return sendSuccess(res, null, 'Inquiry deleted successfully');
    } catch (err) {
      return sendError(res, 'Failed to delete inquiry', 500, err.message);
    }
  }
};
