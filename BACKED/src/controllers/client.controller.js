import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const clientController = {
  getClients: async (req, res) => {
    try {
      const { search, status } = req.query;
      let clients = db.getCollection('clients');

      if (status && status !== 'ALL') {
        clients = clients.filter((c) => c.status?.toLowerCase() === status.toLowerCase());
      }

      if (search) {
        const query = search.toLowerCase();
        clients = clients.filter(
          (c) =>
            c.name?.toLowerCase().includes(query) ||
            c.company?.toLowerCase().includes(query) ||
            c.email?.toLowerCase().includes(query) ||
            c.phone?.toLowerCase().includes(query) ||
            c.service?.toLowerCase().includes(query) ||
            c.id?.toLowerCase().includes(query)
        );
      }

      return sendSuccess(res, clients);
    } catch (err) {
      return sendError(res, 'Failed to fetch clients', 500, err.message);
    }
  },

  getClientById: async (req, res) => {
    try {
      const { id } = req.params;
      const client = db.findById('clients', id);
      if (!client) {
        return sendError(res, 'Client not found', 404);
      }

      // Populate associated projects and invoices
      const projects = db.find('projects', (p) => p.client === client.company || p.client === client.name || p.clientId === client.id);
      const invoices = db.find('invoices', (i) => i.client === client.company || i.client === client.name || i.clientId === client.id);

      return sendSuccess(res, {
        ...client,
        projects,
        invoices
      });
    } catch (err) {
      return sendError(res, 'Failed to retrieve client details', 500, err.message);
    }
  },

  createClient: async (req, res) => {
    try {
      const { name, company, email, phone, address, service, status, revenue, avatar } = req.body;

      if (!name || !email) {
        return sendError(res, 'Client name and email are required', 400);
      }

      const newClient = {
        id: `CLT-${Date.now().toString().slice(-4)}`,
        name,
        company: company || `${name}'s Organization`,
        email,
        phone: phone || 'Pending Info',
        address: address || '',
        service: service || 'Web Development',
        status: status || 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        projectsCount: 0,
        revenue: Number(revenue) || 0,
        avatar: avatar || `https://images.unsplash.com/photo-${1534528741775 + (db.getCollection('clients').length % 5)}?w=120&auto=format&fit=crop&q=80`
      };

      db.insert('clients', newClient);
      return sendSuccess(res, newClient, 'Client registered successfully', 201);
    } catch (err) {
      return sendError(res, 'Failed to register client', 500, err.message);
    }
  },

  updateClient: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      if (updateData.revenue !== undefined) {
        updateData.revenue = Number(updateData.revenue);
      }

      const updated = db.update('clients', id, updateData);
      if (!updated) {
        return sendError(res, 'Client not found', 404);
      }

      return sendSuccess(res, updated, 'Client record updated');
    } catch (err) {
      return sendError(res, 'Failed to update client', 500, err.message);
    }
  },

  deleteClient: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = db.delete('clients', id);
      if (!deleted) {
        return sendError(res, 'Client not found', 404);
      }
      return sendSuccess(res, null, 'Client removed successfully');
    } catch (err) {
      return sendError(res, 'Failed to delete client', 500, err.message);
    }
  }
};
