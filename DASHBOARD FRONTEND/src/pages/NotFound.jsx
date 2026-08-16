import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const NotFound = () => {
  const { role, isAuthenticated } = useAuth();
  const homePath = isAuthenticated ? (role === 'admin' ? '/admin/dashboard' : '/user/dashboard') : '/login';

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-4 text-center" style={{ background: 'var(--bg-main)' }}>
      <div className="tensora-card p-5" style={{ maxWidth: '500px' }}>
        <div className="font-display fw-bold mb-3" style={{ fontSize: '5rem', color: 'var(--blue-neon)', textShadow: '0 0 20px rgba(0, 168, 255, 0.4)' }}>
          404
        </div>
        <h3 className="text-white mb-2">Protocol Coordinates Not Found</h3>
        <p className="text-muted mb-4 small">
          The requested system node or resource does not exist in the Tensora network matrix.
        </p>
        <Link to={homePath} className="btn btn-tensora-primary justify-content-center">
          <i className="bi bi-arrow-left"></i> Return to Terminal
        </Link>
      </div>
    </div>
  );
};
