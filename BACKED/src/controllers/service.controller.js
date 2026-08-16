import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const serviceController = {
  getServices: async (req, res) => {
    try {
      const services = db.getCollection('services');
      return sendSuccess(res, services);
    } catch (err) {
      return sendError(res, 'Failed to fetch services', 500, err.message);
    }
  },

  getServiceById: async (req, res) => {
    try {
      const { id } = req.params;
      const service = db.findById('services', id);
      if (!service) {
        return sendError(res, 'Service not found', 404);
      }
      return sendSuccess(res, service);
    } catch (err) {
      return sendError(res, 'Failed to fetch service details', 500, err.message);
    }
  },

  createService: async (req, res) => {
    try {
      const { id, name, category, icon, description, technologies, startingPrice, lead } = req.body;

      if (!name) {
        return sendError(res, 'Service name is required', 400);
      }

      const services = db.getCollection('services');
      const newService = {
        id: id?.trim() ? id.trim().toUpperCase() : `SRV-${(services.length + 1).toString().padStart(2, '0')}`,
        name,
        category: category || 'Development',
        icon: icon || 'bi-gear-wide-connected',
        description: description || '',
        technologies: Array.isArray(technologies)
          ? technologies
          : (typeof technologies === 'string' && technologies.trim()
              ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
              : ['Custom Suite']),
        startingPrice: Number(startingPrice) || 2000,
        activeProjects: 0,
        completedProjects: 0,
        lead: lead || 'Engineering Team'
      };

      db.insert('services', newService);
      return sendSuccess(res, newService, 'Service created successfully', 201);
    } catch (err) {
      return sendError(res, 'Failed to create service', 500, err.message);
    }
  },

  updateService: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      if (updateData.technologies && typeof updateData.technologies === 'string') {
        updateData.technologies = updateData.technologies.split(',').map((t) => t.trim()).filter(Boolean);
      }
      if (updateData.startingPrice !== undefined) {
        updateData.startingPrice = Number(updateData.startingPrice);
      }
      if (updateData.activeProjects !== undefined) {
        updateData.activeProjects = Number(updateData.activeProjects);
      }
      if (updateData.completedProjects !== undefined) {
        updateData.completedProjects = Number(updateData.completedProjects);
      }

      const updated = db.update('services', id, updateData);
      if (!updated) {
        return sendError(res, 'Service not found', 404);
      }

      return sendSuccess(res, updated, 'Service updated successfully');
    } catch (err) {
      return sendError(res, 'Failed to update service', 500, err.message);
    }
  },

  deleteService: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = db.delete('services', id);
      if (!deleted) {
        return sendError(res, 'Service not found', 404);
      }
      return sendSuccess(res, null, 'Service removed');
    } catch (err) {
      return sendError(res, 'Failed to delete service', 500, err.message);
    }
  }
};
