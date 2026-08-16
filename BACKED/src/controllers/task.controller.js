import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const taskController = {
  getTasks: async (req, res) => {
    try {
      const { status, projectId, assignedToId, search } = req.query;
      let tasks = db.getCollection('tasks');

      if (status && status !== 'ALL') {
        tasks = tasks.filter((t) => t.status?.toLowerCase() === status.toLowerCase());
      }
      if (projectId) {
        tasks = tasks.filter((t) => t.projectId === projectId);
      }
      if (assignedToId) {
        tasks = tasks.filter((t) => t.assignedToId === assignedToId);
      }
      if (search) {
        const query = search.toLowerCase();
        tasks = tasks.filter(
          (t) =>
            t.title?.toLowerCase().includes(query) ||
            t.project?.toLowerCase().includes(query) ||
            t.assignedTo?.toLowerCase().includes(query) ||
            t.id?.toLowerCase().includes(query)
        );
      }

      return sendSuccess(res, tasks);
    } catch (err) {
      return sendError(res, 'Failed to retrieve sprint tasks', 500, err.message);
    }
  },

  getTaskById: async (req, res) => {
    try {
      const { id } = req.params;
      const task = db.findById('tasks', id);
      if (!task) {
        return sendError(res, 'Task not found', 404);
      }
      return sendSuccess(res, task);
    } catch (err) {
      return sendError(res, 'Failed to fetch task details', 500, err.message);
    }
  },

  createTask: async (req, res) => {
    try {
      const { title, projectId, project, assignedTo, assignedToId, priority, dueDate, progress, status } = req.body;

      if (!title) {
        return sendError(res, 'Task title is required', 400);
      }

      const newTask = {
        id: `TSK-${Date.now().toString().slice(-3)}`,
        title,
        projectId: projectId || '',
        project: project || 'General Sprint',
        assignedTo: assignedTo || 'Engineering Lead',
        assignedToId: assignedToId || '',
        status: status || 'To Do',
        priority: priority || 'Medium',
        progress: Number(progress) || 0,
        dueDate: dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        comments: []
      };

      db.insert('tasks', newTask);
      return sendSuccess(res, newTask, 'Task created successfully', 201);
    } catch (err) {
      return sendError(res, 'Failed to create task', 500, err.message);
    }
  },

  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      if (updateData.progress !== undefined) {
        updateData.progress = Number(updateData.progress);
        if (updateData.progress >= 100) {
          updateData.status = 'Completed';
        }
      }

      const updated = db.update('tasks', id, updateData);
      if (!updated) {
        return sendError(res, 'Task not found', 404);
      }

      return sendSuccess(res, updated, 'Task updated');
    } catch (err) {
      return sendError(res, 'Failed to update task', 500, err.message);
    }
  },

  moveTaskStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return sendError(res, 'Status is required', 400);
      }

      const task = db.findById('tasks', id);
      if (!task) {
        return sendError(res, 'Task not found', 404);
      }

      const progress = status === 'Completed' ? 100 : task.progress;
      const updated = db.update('tasks', id, { status, progress });

      return sendSuccess(res, updated, `Task transitioned to ${status}`);
    } catch (err) {
      return sendError(res, 'Failed to move task status', 500, err.message);
    }
  },

  addComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { text, sender } = req.body;

      if (!text) {
        return sendError(res, 'Comment text is required', 400);
      }

      const task = db.findById('tasks', id);
      if (!task) {
        return sendError(res, 'Task not found', 404);
      }

      const comments = task.comments || [];
      const newComment = {
        id: Date.now().toString(),
        sender: sender || req.user?.name || 'Tensora Member',
        text,
        time: new Date().toLocaleString()
      };

      comments.push(newComment);
      const updated = db.update('tasks', id, { comments });

      return sendSuccess(res, updated, 'Comment posted');
    } catch (err) {
      return sendError(res, 'Failed to post comment', 500, err.message);
    }
  },

  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = db.delete('tasks', id);
      if (!deleted) {
        return sendError(res, 'Task not found', 404);
      }
      return sendSuccess(res, null, 'Task deleted');
    } catch (err) {
      return sendError(res, 'Failed to delete task', 500, err.message);
    }
  }
};
