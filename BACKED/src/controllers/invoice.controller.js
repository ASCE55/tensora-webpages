import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const invoiceController = {
  getInvoices: async (req, res) => {
    try {
      const { status, clientId, search } = req.query;
      let invoices = db.getCollection('invoices');

      if (status && status !== 'ALL') {
        invoices = invoices.filter((i) => i.status?.toLowerCase() === status.toLowerCase());
      }
      if (clientId) {
        invoices = invoices.filter((i) => i.clientId === clientId);
      }
      if (search) {
        const query = search.toLowerCase();
        invoices = invoices.filter(
          (i) =>
            i.invoiceNumber?.toLowerCase().includes(query) ||
            i.client?.toLowerCase().includes(query) ||
            i.project?.toLowerCase().includes(query) ||
            i.id?.toLowerCase().includes(query)
        );
      }

      return sendSuccess(res, invoices);
    } catch (err) {
      return sendError(res, 'Failed to retrieve invoices', 500, err.message);
    }
  },

  getInvoiceById: async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = db.findById('invoices', id);
      if (!invoice) {
        return sendError(res, 'Invoice not found', 404);
      }
      return sendSuccess(res, invoice);
    } catch (err) {
      return sendError(res, 'Failed to fetch invoice', 500, err.message);
    }
  },

  createInvoice: async (req, res) => {
    try {
      const { client, clientId, project, projectId, subtotal, taxRate = 18, items, status, issueDate, dueDate, paidAmount } = req.body;

      if (!client || !subtotal) {
        return sendError(res, 'Client name and subtotal are required', 400);
      }

      const numSubtotal = Number(subtotal) || 0;
      const numTaxRate = Number(taxRate) || 18;
      const taxAmount = (numSubtotal * numTaxRate) / 100;
      const total = numSubtotal + taxAmount;

      const newInvoice = {
        id: `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-3)}`,
        invoiceNumber: `TDS/${new Date().getFullYear()}/${Date.now().toString().slice(-4)}`,
        client,
        clientId: clientId || '',
        project: project || 'General Deliverables',
        projectId: projectId || '',
        subtotal: numSubtotal,
        taxRate: numTaxRate,
        taxAmount,
        total,
        paidAmount: status === 'Paid' ? total : (Number(paidAmount) || 0),
        status: status || 'Pending',
        issueDate: issueDate || new Date().toISOString().split('T')[0],
        dueDate: dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        items: Array.isArray(items) && items.length > 0 ? items : [{ description: 'Professional IT Services', quantity: 1, rate: numSubtotal, amount: numSubtotal }]
      };

      db.insert('invoices', newInvoice);
      return sendSuccess(res, newInvoice, 'Invoice generated successfully', 201);
    } catch (err) {
      return sendError(res, 'Failed to create invoice', 500, err.message);
    }
  },

  updateInvoice: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      if (updateData.subtotal !== undefined || updateData.taxRate !== undefined) {
        const current = db.findById('invoices', id) || {};
        const numSubtotal = Number(updateData.subtotal !== undefined ? updateData.subtotal : current.subtotal) || 0;
        const numTaxRate = Number(updateData.taxRate !== undefined ? updateData.taxRate : current.taxRate) || 18;
        updateData.taxAmount = (numSubtotal * numTaxRate) / 100;
        updateData.total = numSubtotal + updateData.taxAmount;
      }

      if (updateData.status === 'Paid' && updateData.total) {
        updateData.paidAmount = updateData.total;
      }

      const updated = db.update('invoices', id, updateData);
      if (!updated) {
        return sendError(res, 'Invoice not found', 404);
      }

      return sendSuccess(res, updated, 'Invoice updated');
    } catch (err) {
      return sendError(res, 'Failed to update invoice', 500, err.message);
    }
  },

  deleteInvoice: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = db.delete('invoices', id);
      if (!deleted) {
        return sendError(res, 'Invoice not found', 404);
      }
      return sendSuccess(res, null, 'Invoice deleted');
    } catch (err) {
      return sendError(res, 'Failed to delete invoice', 500, err.message);
    }
  }
};
