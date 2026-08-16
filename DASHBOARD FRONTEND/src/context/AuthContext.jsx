import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = authService.getCurrentSession();
    if (session && session.isAuthenticated) {
      setCurrentUser(session.user);
      setRole(session.role);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const session = await authService.login(username, password);
    setCurrentUser(session.user);
    setRole(session.role);
    setIsAuthenticated(true);

    // Auto-record login session ONLY for EMPLOYEES (Do NOT log Admin sessions)
    const isAdmin = session.role === 'admin' || session.user?.role === 'admin' || session.user?.id === 'ADM-001';
    if (!isAdmin) {
      try {
        const now = new Date();
        const formattedTime = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
        const sessionId = `SES-${Date.now().toString().slice(-4)}`;
        const newSession = {
          id: sessionId,
          employeeId: session.user.id,
          employeeName: session.user.name,
          department: session.user.department || 'Engineering',
          designation: session.user.designation || 'Specialist',
          loginTime: formattedTime,
          loginTimestamp: now.getTime(),
          logoutTime: '—',
          duration: 'Active Now',
          ipAddress: '192.168.1.' + Math.floor(Math.random() * 80 + 20),
          device: navigator.userAgent.includes('Mac') ? 'macOS / Safari' : 'Windows 11 / Chrome',
          status: 'Active'
        };

        const existing = storageService.get(storageService.KEYS.SESSIONS, []);
        storageService.set(storageService.KEYS.SESSIONS, [newSession, ...existing]);
        localStorage.setItem('tensora_active_session_id', sessionId);
      } catch (e) {
        console.error('Session logging error:', e);
      }
    }

    return session;
  };

  const loginAdmin = async (email, password) => {
    return login(email, password);
  };

  const loginUser = async (identifier, password) => {
    return login(identifier, password);
  };

  const logout = () => {
    const isAdmin = role === 'admin' || currentUser?.role === 'admin' || currentUser?.id === 'ADM-001';
    if (!isAdmin) {
      try {
        const activeSessionId = localStorage.getItem('tensora_active_session_id');
        const now = new Date();
        const formattedTime = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
        const sessions = storageService.get(storageService.KEYS.SESSIONS, []);

        const updated = sessions.map(ses => {
          if (ses.id === activeSessionId || (ses.status === 'Active' && ses.employeeId === currentUser?.id)) {
            let durationStr = 'Session Closed';
            if (ses.loginTimestamp) {
              const diffMs = now.getTime() - ses.loginTimestamp;
              const mins = Math.floor(diffMs / 60000);
              const secs = Math.floor((diffMs % 60000) / 1000);
              durationStr = mins > 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m ${secs}s`;
            }
            return {
              ...ses,
              logoutTime: formattedTime,
              duration: durationStr,
              status: 'Logged Out'
            };
          }
          return ses;
        });

        storageService.set(storageService.KEYS.SESSIONS, updated);
        localStorage.removeItem('tensora_active_session_id');
      } catch (e) {
        console.error('Session logout logging error:', e);
      }
    }

    authService.logout();
    setCurrentUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    const session = storageService.get(storageService.KEYS.AUTH, {});
    storageService.set(storageService.KEYS.AUTH, { ...session, user: updated });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isAuthenticated,
        loading,
        login,
        loginAdmin,
        loginUser,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
