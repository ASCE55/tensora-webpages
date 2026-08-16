import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RoleProtectedRoute = ({ allowedRoles = [] }) => {
  const { role, isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect to permitted dashboard based on actual role
    return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} replace />;
  }

  return <Outlet />;
};
