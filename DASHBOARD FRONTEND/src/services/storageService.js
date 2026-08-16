import { initialClients } from '../data/clients';
import { initialProjects } from '../data/projects';
import { initialEmployees } from '../data/employees';
import { initialServices } from '../data/services';
import { initialTasks } from '../data/tasks';
import { initialInvoices } from '../data/invoices';
import { initialPayments } from '../data/payments';
import { initialExpenses } from '../data/expenses';
import { initialMessages, initialNotifications, initialAttendance } from '../data/messages';
import { initialLoginSessions } from '../data/loginSessions';

const KEYS = {
  CLIENTS: 'tensora_clients_v2_zero',
  PROJECTS: 'tensora_projects_v2_zero',
  EMPLOYEES: 'tensora_employees_v2_zero',
  SERVICES: 'tensora_services_v3_zero',
  TASKS: 'tensora_tasks_v2_zero',
  INVOICES: 'tensora_invoices_v2_zero',
  PAYMENTS: 'tensora_payments_v2_zero',
  EXPENSES: 'tensora_expenses_v2_zero',
  MESSAGES: 'tensora_messages_v2_zero',
  NOTIFICATIONS: 'tensora_notifications_v2_zero',
  ATTENDANCE: 'tensora_attendance_v2_zero',
  SESSIONS: 'tensora_login_sessions_v2_zero',
  THEME: 'tensora_theme_v2',
  AUTH: 'tensora_auth_v2'
};

export const storageService = {
  get: (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(`Error reading ${key} from localStorage:`, e);
    }
    return defaultValue;
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving ${key} to localStorage:`, e);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing ${key}:`, e);
    }
  },

  // Reset all app data back to clean zero state
  resetAllData: () => {
    try {
      localStorage.setItem(KEYS.CLIENTS, JSON.stringify(initialClients));
      localStorage.setItem(KEYS.PROJECTS, JSON.stringify(initialProjects));
      localStorage.setItem(KEYS.EMPLOYEES, JSON.stringify(initialEmployees));
      localStorage.setItem(KEYS.SERVICES, JSON.stringify(initialServices));
      localStorage.setItem(KEYS.TASKS, JSON.stringify(initialTasks));
      localStorage.setItem(KEYS.INVOICES, JSON.stringify(initialInvoices));
      localStorage.setItem(KEYS.PAYMENTS, JSON.stringify(initialPayments));
      localStorage.setItem(KEYS.EXPENSES, JSON.stringify(initialExpenses));
      localStorage.setItem(KEYS.MESSAGES, JSON.stringify(initialMessages));
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(initialNotifications));
      localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(initialAttendance));
      localStorage.setItem(KEYS.SESSIONS, JSON.stringify(initialLoginSessions));
      return true;
    } catch (e) {
      console.error('Error resetting demo data:', e);
      return false;
    }
  },

  KEYS
};
