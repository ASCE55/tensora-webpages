import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const paymentController = {
  getPayments: async (req, res) => {
    try {
      const { invoiceId, method, search } = req.query;
      let payments = db.getCollection('payments');

      if (invoiceId) {
        payments = payments.filter((p) => p.invoiceId === invoiceId);
      }
      if (method && method !== 'ALL') {
        payments = payments.filter((p) => p.method?.toLowerCase() === method.toLowerCase());
      }
      if (search) {
        const query = search.toLowerCase();
        payments = payments.filter(
          (p) =>
            p.transactionId?.toLowerCase().includes(query) ||
            p.client?.toLowerCase().includes(query) ||
            p.invoiceId?.toLowerCase().includes(query)
        );
      }

      return sendSuccess(res, payments);
    } catch (err) {
      return sendError(res, 'Failed to retrieve payments', 500, err.message);
    }
  },

  createPayment: async (req, res) => {
    try {
      const { invoiceId, client, amount, method, date, transactionId } = req.body;

      if (!amount) {
        return sendError(res, 'Payment amount is required', 400);
      }

      const numAmount = Number(amount) || 0;
      const newPayment = {
        id: `PAY-${Date.now().toString().slice(-3)}`,
        transactionId: transactionId || `TXN-TDS-${Date.now().toString().slice(-5)}`,
        invoiceId: invoiceId || '',
        client: client || 'Enterprise Client',
        amount: numAmount,
        method: method || 'Bank Wire / NEFT',
        date: date || new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'Completed'
      };

      db.insert('payments', newPayment);

      // If tied to an invoice, auto-update invoice paid amount
      if (invoiceId) {
        const invoice = db.findById('invoices', invoiceId);
        if (invoice) {
          const newPaid = (Number(invoice.paidAmount) || 0) + numAmount;
          const status = newPaid >= (Number(invoice.total) || 0) ? 'Paid' : 'Partially Paid';
          db.update('invoices', invoiceId, { paidAmount: newPaid, status });
        }
      }

      return sendSuccess(res, newPayment, 'Payment recorded successfully', 201);
    } catch (err) {
      return sendError(res, 'Failed to record payment', 500, err.message);
    }
  },

  deletePayment: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = db.delete('payments', id);
      if (!deleted) {
        return sendError(res, 'Payment not found', 404);
      }
      return sendSuccess(res, null, 'Payment removed');
    } catch (err) {
      return sendError(res, 'Failed to delete payment', 500, err.message);
    }
  }
};
