import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const expenseController = {
  getExpenses: async (req, res) => {
    try {
      const { category, search } = req.query;
      let expenses = db.getCollection('expenses');

      if (category && category !== 'ALL') {
        expenses = expenses.filter((e) => e.category?.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const query = search.toLowerCase();
        expenses = expenses.filter(
          (e) =>
            e.title?.toLowerCase().includes(query) ||
            e.vendor?.toLowerCase().includes(query) ||
            e.category?.toLowerCase().includes(query) ||
            e.id?.toLowerCase().includes(query)
        );
      }

      return sendSuccess(res, expenses);
    } catch (err) {
      return sendError(res, 'Failed to retrieve expenses', 500, err.message);
    }
  },

  createExpense: async (req, res) => {
    try {
      const { title, category, amount, vendor, date, receipt } = req.body;

      if (!title || !amount) {
        return sendError(res, 'Expense title and amount are required', 400);
      }

      const newExpense = {
        id: `EXP-${Date.now().toString().slice(-3)}`,
        title,
        category: category || 'Hosting',
        amount: Number(amount) || 0,
        vendor: vendor || 'Corporate Vendor',
        date: date || new Date().toISOString().split('T')[0],
        status: 'Paid',
        receipt: receipt || `REC-TDS-${Date.now().toString().slice(-4)}`
      };

      db.insert('expenses', newExpense);
      return sendSuccess(res, newExpense, 'Expense recorded', 201);
    } catch (err) {
      return sendError(res, 'Failed to create expense', 500, err.message);
    }
  },

  updateExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      if (updateData.amount !== undefined) {
        updateData.amount = Number(updateData.amount);
      }

      const updated = db.update('expenses', id, updateData);
      if (!updated) {
        return sendError(res, 'Expense not found', 404);
      }

      return sendSuccess(res, updated, 'Expense updated');
    } catch (err) {
      return sendError(res, 'Failed to update expense', 500, err.message);
    }
  },

  deleteExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = db.delete('expenses', id);
      if (!deleted) {
        return sendError(res, 'Expense not found', 404);
      }
      return sendSuccess(res, null, 'Expense deleted');
    } catch (err) {
      return sendError(res, 'Failed to delete expense', 500, err.message);
    }
  }
};
