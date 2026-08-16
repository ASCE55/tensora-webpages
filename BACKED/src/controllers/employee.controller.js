import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const employeeController = {
  getEmployees: async (req, res) => {
    try {
      const { department, search } = req.query;
      let employees = db.getCollection('employees');

      if (department && department !== 'ALL') {
        employees = employees.filter((e) => e.department?.toLowerCase() === department.toLowerCase());
      }
      if (search) {
        const query = search.toLowerCase();
        employees = employees.filter(
          (e) =>
            e.name?.toLowerCase().includes(query) ||
            e.email?.toLowerCase().includes(query) ||
            e.department?.toLowerCase().includes(query) ||
            e.designation?.toLowerCase().includes(query) ||
            e.id?.toLowerCase().includes(query)
        );
      }

      // Safe copy without passwords
      const sanitized = employees.map((e) => {
        const copy = { ...e };
        delete copy.password;
        return copy;
      });

      return sendSuccess(res, sanitized);
    } catch (err) {
      return sendError(res, 'Failed to retrieve employees', 500, err.message);
    }
  },

  getEmployeeById: async (req, res) => {
    try {
      const { id } = req.params;
      const emp = db.findById('employees', id);
      if (!emp) {
        return sendError(res, 'Employee not found', 404);
      }

      const copy = { ...emp };
      delete copy.password;

      // Populate assigned tasks
      const tasks = db.find('tasks', (t) => t.assignedToId === emp.id || t.assignedTo === emp.name);

      return sendSuccess(res, { ...copy, tasks });
    } catch (err) {
      return sendError(res, 'Failed to fetch employee details', 500, err.message);
    }
  },

  createEmployee: async (req, res) => {
    try {
      const { id, username, name, email, password, role, department, designation, phone, salary, rating, skills } = req.body;

      if (!name || !email) {
        return sendError(res, 'Employee name and email are required', 400);
      }

      const employees = db.getCollection('employees');
      const defaultId = `TDS${(employees.length + 1).toString().padStart(3, '0')}`;
      const empId = id?.trim() ? id.trim().toUpperCase() : defaultId;

      const newEmployee = {
        id: empId,
        username: username?.trim() || empId,
        name,
        email,
        password: password || 'user123',
        role: role || 'user',
        department: department || 'Full Stack Engineering',
        designation: designation || 'Software Engineer',
        phone: phone || '+91 99000 00000',
        salary: salary || '₹80,000 / mo',
        rating: Number(rating) || 5.0,
        status: 'Active',
        joiningDate: new Date().toISOString().split('T')[0],
        assignedProjectsCount: 0,
        completedTasksCount: 0,
        skills: Array.isArray(skills)
          ? skills
          : (typeof skills === 'string' && skills.trim()
              ? skills.split(',').map((s) => s.trim()).filter(Boolean)
              : ['React', 'JavaScript'])
      };

      db.insert('employees', newEmployee);

      const copy = { ...newEmployee };
      delete copy.password;

      return sendSuccess(res, copy, 'Employee onboarded successfully', 201);
    } catch (err) {
      return sendError(res, 'Failed to create employee', 500, err.message);
    }
  },

  updateEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      if (updateData.skills && typeof updateData.skills === 'string') {
        updateData.skills = updateData.skills.split(',').map((s) => s.trim()).filter(Boolean);
      }
      if (updateData.rating !== undefined) {
        updateData.rating = Number(updateData.rating);
      }

      const updated = db.update('employees', id, updateData);
      if (!updated) {
        return sendError(res, 'Employee not found', 404);
      }

      const copy = { ...updated };
      delete copy.password;

      return sendSuccess(res, copy, 'Employee updated successfully');
    } catch (err) {
      return sendError(res, 'Failed to update employee', 500, err.message);
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = db.delete('employees', id);
      if (!deleted) {
        return sendError(res, 'Employee not found', 404);
      }
      return sendSuccess(res, null, 'Employee removed');
    } catch (err) {
      return sendError(res, 'Failed to delete employee', 500, err.message);
    }
  }
};
