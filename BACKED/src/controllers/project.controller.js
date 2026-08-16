import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const projectController = {
  getProjects: async (req, res) => {
    try {
      const { status, client, search } = req.query;
      let projects = db.getCollection('projects');

      if (status && status !== 'ALL') {
        projects = projects.filter((p) => p.status?.toLowerCase() === status.toLowerCase());
      }
      if (client) {
        projects = projects.filter((p) => p.client?.toLowerCase().includes(client.toLowerCase()));
      }
      if (search) {
        const query = search.toLowerCase();
        projects = projects.filter(
          (p) =>
            p.title?.toLowerCase().includes(query) ||
            p.client?.toLowerCase().includes(query) ||
            p.service?.toLowerCase().includes(query) ||
            p.lead?.toLowerCase().includes(query) ||
            p.id?.toLowerCase().includes(query)
        );
      }

      return sendSuccess(res, projects);
    } catch (err) {
      return sendError(res, 'Failed to retrieve projects', 500, err.message);
    }
  },

  getProjectById: async (req, res) => {
    try {
      const { id } = req.params;
      const project = db.findById('projects', id);
      if (!project) {
        return sendError(res, 'Project not found', 404);
      }

      // Populate associated tasks
      const tasks = db.find('tasks', (t) => t.projectId === project.id || t.project === project.title);

      return sendSuccess(res, { ...project, tasks });
    } catch (err) {
      return sendError(res, 'Failed to fetch project details', 500, err.message);
    }
  },

  createProject: async (req, res) => {
    try {
      const { title, client, service, phase, progress, status, priority, budget, startDate, deadline, lead, team, milestones } = req.body;

      if (!title || !client) {
        return sendError(res, 'Project title and client are required', 400);
      }

      const newProject = {
        id: `PRJ-${Date.now().toString().slice(-3)}`,
        title,
        client,
        service: service || 'Web Development',
        phase: phase || 'Planning',
        progress: Number(progress) || 0,
        status: status || 'Planning',
        priority: priority || 'Medium',
        budget: budget || '₹50,000',
        startDate: startDate || new Date().toISOString().split('T')[0],
        deadline: deadline || '',
        lead: lead || 'Engineering Lead',
        team: Array.isArray(team) ? team : (team ? [team] : []),
        milestones: Array.isArray(milestones) ? milestones : []
      };

      db.insert('projects', newProject);
      return sendSuccess(res, newProject, 'Project created successfully', 201);
    } catch (err) {
      return sendError(res, 'Failed to create project', 500, err.message);
    }
  },

  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      if (updateData.progress !== undefined) {
        updateData.progress = Number(updateData.progress);
        if (updateData.progress >= 100) {
          updateData.status = 'Completed';
        }
      }

      const updated = db.update('projects', id, updateData);
      if (!updated) {
        return sendError(res, 'Project not found', 404);
      }

      return sendSuccess(res, updated, 'Project updated successfully');
    } catch (err) {
      return sendError(res, 'Failed to update project', 500, err.message);
    }
  },

  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = db.delete('projects', id);
      if (!deleted) {
        return sendError(res, 'Project not found', 404);
      }
      return sendSuccess(res, null, 'Project deleted');
    } catch (err) {
      return sendError(res, 'Failed to delete project', 500, err.message);
    }
  }
};
