import { storageService } from './storageService';
import { initialEmployees } from '../data/employees';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const DEMO_ADMIN = {
  id: 'ADM-001',
  username: 'TENSORA',
  name: 'Tensora Administrator',
  email: 'admin@tensora.com',
  password: 'TDSadmin',
  role: 'admin',
  department: 'Executive Management',
  designation: 'Managing Director & CTO',
  phone: '+91 99000 11223',
  avatar: '/logo.png',
  joinedDate: '2023-01-01'
};

export const authService = {
  login: async (username, password) => {
    // 1. Try Backend REST API first
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const json = await response.json();
      if (response.ok && json.success && json.data) {
        const session = {
          user: json.data.user,
          role: json.data.role,
          token: json.data.token,
          sessionId: json.data.sessionId,
          isAuthenticated: true
        };
        storageService.set(storageService.KEYS.AUTH, session);
        return session;
      } else if (!response.ok) {
        throw new Error(json.message || 'Invalid login credentials.');
      }
    } catch (err) {
      if (err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
        throw err;
      }
      console.warn('Backend API server unreachable, falling back to local authentication engine:', err);
    }

    // 2. Offline Local Fallback
    await new Promise((resolve) => setTimeout(resolve, 300));
    const uClean = username.trim().toLowerCase();

    // Check Master Admin (username 'TENSORA', 'admin', 'adm-001', or 'admin@tensora.com')
    if (
      (uClean === 'tensora' || uClean === 'admin' || uClean === DEMO_ADMIN.email.toLowerCase() || uClean === DEMO_ADMIN.id.toLowerCase()) &&
      (password === 'TDSadmin' || password === 'admin123')
    ) {
      const user = { ...DEMO_ADMIN };
      delete user.password;
      const session = {
        user,
        role: 'admin',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tensora_admin_token_2026',
        isAuthenticated: true
      };
      storageService.set(storageService.KEYS.AUTH, session);
      return session;
    }

    // Check registered employees from localStorage state (or fallback initialEmployees)
    const employees = storageService.get(storageService.KEYS.EMPLOYEES, initialEmployees);
    const matchedEmployee = employees.find((e) => {
      const idMatch = e.id && e.id.toLowerCase() === uClean;
      const emailMatch = e.email && e.email.toLowerCase() === uClean;
      const usernameMatch = e.username && e.username.toLowerCase() === uClean;
      const nameMatch = e.name && e.name.toLowerCase().replace(/\s+/g, '') === uClean;
      return idMatch || emailMatch || usernameMatch || nameMatch;
    });

    if (matchedEmployee) {
      const expectedPassword = matchedEmployee.password || 'user123';
      if (password === expectedPassword) {
        const user = { ...matchedEmployee };
        delete user.password;
        const assignedRole = matchedEmployee.role === 'admin' ? 'admin' : 'user';
        const session = {
          user,
          role: assignedRole,
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tensora_${matchedEmployee.id}_token`,
          isAuthenticated: true
        };
        storageService.set(storageService.KEYS.AUTH, session);
        return session;
      } else {
        throw new Error('Incorrect password for this user account.');
      }
    }

    throw new Error('Invalid Username or Password. Please verify your login credentials.');
  },

  loginAdmin: async (emailOrUsername, password) => {
    return authService.login(emailOrUsername, password);
  },

  loginUser: async (identifier, password) => {
    return authService.login(identifier, password);
  },

  getCurrentSession: () => {
    return storageService.get(storageService.KEYS.AUTH, null);
  },

  logout: async () => {
    const session = authService.getCurrentSession();
    if (session && session.token) {
      try {
        await fetch(`${API_BASE}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token}`
          },
          body: JSON.stringify({ sessionId: session.sessionId, employeeId: session.user?.id })
        });
      } catch (err) {
        // ignore offline error
      }
    }
    storageService.remove(storageService.KEYS.AUTH);
  }
};
