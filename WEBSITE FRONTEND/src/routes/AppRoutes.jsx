import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { ClientLayout } from '../layouts/ClientLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Guards
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Services } from '../pages/Services';
import { ServiceDetail } from '../pages/ServiceDetail';
import { Projects } from '../pages/Projects';
import { ProjectDetail } from '../pages/ProjectDetail';
import { ProjectDemo } from '../pages/ProjectDemo';
import { Careers } from '../pages/Careers';
import { Contact } from '../pages/Contact';

// Auth Pages
import { ClientLogin } from '../pages/ClientLogin';
import { AdminLogin } from '../pages/AdminLogin';

// Portal Dashboards
import { ClientDashboard } from '../pages/client/ClientDashboard';
import { AdminDashboard } from '../pages/admin/AdminDashboard';

// 404
import { NotFound } from '../pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages with Standard Header & Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Standalone Interactive Demo Route */}
      <Route path="/demo/:id" element={<ProjectDemo />} />

      {/* Authentication Pages */}
      <Route path="/client/login" element={<ClientLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Client Portal */}
      <Route element={<ProtectedRoute requiredRole="client" />}>
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<Navigate to="/client/dashboard" replace />} />
          <Route path="dashboard" element={<ClientDashboard />} />
        </Route>
      </Route>

      {/* Protected Admin Portal */}
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* 404 Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
