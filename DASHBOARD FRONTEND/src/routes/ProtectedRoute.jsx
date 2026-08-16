import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: 'var(--bg-deep-black)' }}>
        <div className="text-center">
          <img src="/logo.png" alt="Tensora" style={{ width: '64px', height: '64px' }} className="pulse-indicator mb-3" />
          <div style={{ color: 'var(--blue-neon)', letterSpacing: '0.1em' }} className="fw-bold font-mono">
            INITIALIZING TENSORA PORTAL...
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
