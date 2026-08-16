import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';

// Route Guards & Layouts
import { ProtectedRoute } from './routes/ProtectedRoute';
import { RoleProtectedRoute } from './routes/RoleProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { UserLayout } from './layouts/UserLayout';

// Pages
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Clients } from './pages/admin/Clients';
import { Projects } from './pages/admin/Projects';
import { Services } from './pages/admin/Services';
import { Employees } from './pages/admin/Employees';
import { Tasks } from './pages/admin/Tasks';
import { Invoices } from './pages/admin/Invoices';
import { Payments } from './pages/admin/Payments';
import { Expenses } from './pages/admin/Expenses';
import { Reports } from './pages/admin/Reports';
import { LoginSessions } from './pages/admin/LoginSessions';
import { Messages as AdminMessages } from './pages/admin/Messages';
import { Notifications as AdminNotifications } from './pages/admin/Notifications';
import { Profile as AdminProfile } from './pages/admin/Profile';
import { Settings as AdminSettings } from './pages/admin/Settings';

// User Pages
import { UserDashboard } from './pages/user/UserDashboard';
import { MyProjects } from './pages/user/MyProjects';
import { MyTasks } from './pages/user/MyTasks';
import { Attendance } from './pages/user/Attendance';
import { UserProfile } from './pages/user/Profile';
import { UserSettings } from './pages/user/Settings';

// Styles
import './styles/global.css';
import './styles/dashboard.css';
import './styles/components.css';
import './styles/responsive.css';

const RootRedirect = () => {
  const { isAuthenticated, role, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} replace />;
};

export const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<RootRedirect />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="services" element={<Services />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="sessions" element={<LoginSessions />} />
                    <Route path="invoices" element={<Invoices />} />
                    <Route path="payments" element={<Payments />} />
                    <Route path="expenses" element={<Expenses />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="messages" element={<AdminMessages />} />
                    <Route path="notifications" element={<AdminNotifications />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Route>

                {/* Protected User / Employee Routes */}
                <Route element={<RoleProtectedRoute allowedRoles={['user', 'admin']} />}>
                  <Route path="/user" element={<UserLayout />}>
                    <Route index element={<Navigate to="/user/dashboard" replace />} />
                    <Route path="dashboard" element={<UserDashboard />} />
                    <Route path="projects" element={<MyProjects />} />
                    <Route path="tasks" element={<MyTasks />} />
                    <Route path="messages" element={<AdminMessages />} />
                    <Route path="notifications" element={<AdminNotifications />} />
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="settings" element={<UserSettings />} />
                  </Route>
                </Route>
              </Route>

              {/* 404 Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Global Toasts */}
            <ToastContainer
              position="top-right"
              autoClose={3500}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
