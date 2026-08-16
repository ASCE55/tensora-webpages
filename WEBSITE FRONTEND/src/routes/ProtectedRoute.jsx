import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-tensora-dark">
        <div className="spinner-border text-blue-neon" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const redirectPath = requiredRole === 'admin' ? '/admin/login' : '/client/login';
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (requiredRole && role !== requiredRole && role !== 'admin') {
    return <Navigate to="/client/dashboard" replace />;
  }

  return <Outlet />;
};
