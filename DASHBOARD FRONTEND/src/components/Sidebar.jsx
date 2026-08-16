import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const Sidebar = ({ isCollapsed, isMobileOpen, onCloseMobile }) => {
  const { role, currentUser, logout } = useAuth();
  const { notifications, messages } = useData();
  const navigate = useNavigate();

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const unreadMsgs = messages.reduce((sum, m) => sum + (m.unread || 0), 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-75 z-index-modal d-lg-none"
          style={{ zIndex: 999 }}
          onClick={onCloseMobile}
        />
      )}

      <aside className={`app-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'show-mobile' : ''}`}>
        {/* Brand Header with Tensora Logo */}
        <NavLink to={role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} className="sidebar-brand">
          <img src="/logo.png" alt="Tensora Digital Solutions" className="sidebar-logo-img" />
          {!isCollapsed && (
            <div className="sidebar-brand-text">
              <div className="sidebar-brand-name">
                TEN<span>S</span>ORA
              </div>
              <div className="sidebar-brand-sub">Digital Solutions</div>
            </div>
          )}
        </NavLink>

        {/* Navigation Items */}
        <div className="sidebar-nav">
          {role === 'admin' ? (
            <>
              <div className="sidebar-section-title">{!isCollapsed && 'OVERVIEW'}</div>
              <NavLink to="/admin/dashboard" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-grid-1x2-fill"></i>
                {!isCollapsed && <span>Dashboard</span>}
              </NavLink>

              <div className="sidebar-section-title">{!isCollapsed && 'BUSINESS'}</div>
              <NavLink to="/admin/clients" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-building"></i>
                {!isCollapsed && <span>Clients</span>}
              </NavLink>
              <NavLink to="/admin/projects" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-kanban"></i>
                {!isCollapsed && <span>Projects</span>}
              </NavLink>
              <NavLink to="/admin/services" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-cpu"></i>
                {!isCollapsed && <span>Services</span>}
              </NavLink>
              <NavLink to="/admin/employees" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-people"></i>
                {!isCollapsed && <span>Employees</span>}
              </NavLink>

              <div className="sidebar-section-title">{!isCollapsed && 'OPERATIONS'}</div>
              <NavLink to="/admin/tasks" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-check2-square"></i>
                {!isCollapsed && <span>Tasks</span>}
              </NavLink>
              <NavLink to="/admin/sessions" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-clock-history"></i>
                {!isCollapsed && <span>Login & Sessions</span>}
              </NavLink>
              <NavLink to="/admin/messages" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-chat-dots"></i>
                {!isCollapsed && (
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span>Messages</span>
                    {unreadMsgs > 0 && <span className="badge bg-primary rounded-pill small">{unreadMsgs}</span>}
                  </div>
                )}
              </NavLink>
              <NavLink to="/admin/notifications" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-bell"></i>
                {!isCollapsed && (
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span>Notifications</span>
                    {unreadNotifs > 0 && <span className="badge bg-danger rounded-pill small">{unreadNotifs}</span>}
                  </div>
                )}
              </NavLink>

              <div className="sidebar-section-title">{!isCollapsed && 'FINANCE'}</div>
              <NavLink to="/admin/invoices" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-receipt"></i>
                {!isCollapsed && <span>Invoices</span>}
              </NavLink>
              <NavLink to="/admin/payments" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-credit-card"></i>
                {!isCollapsed && <span>Payments</span>}
              </NavLink>
              <NavLink to="/admin/expenses" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-wallet2"></i>
                {!isCollapsed && <span>Expenses</span>}
              </NavLink>

              <div className="sidebar-section-title">{!isCollapsed && 'ANALYTICS'}</div>
              <NavLink to="/admin/reports" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-file-earmark-bar-graph"></i>
                {!isCollapsed && <span>Reports</span>}
              </NavLink>

              <div className="sidebar-section-title">{!isCollapsed && 'SYSTEM'}</div>
              <NavLink to="/admin/profile" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-person-circle"></i>
                {!isCollapsed && <span>Profile</span>}
              </NavLink>
              <NavLink to="/admin/settings" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-sliders"></i>
                {!isCollapsed && <span>Settings</span>}
              </NavLink>
            </>
          ) : (
            <>
              <div className="sidebar-section-title">{!isCollapsed && 'WORKSPACE'}</div>
              <NavLink to="/user/dashboard" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-grid-1x2-fill"></i>
                {!isCollapsed && <span>Dashboard</span>}
              </NavLink>

              <div className="sidebar-section-title">{!isCollapsed && 'MY WORK'}</div>
              <NavLink to="/user/projects" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-kanban"></i>
                {!isCollapsed && <span>My Projects</span>}
              </NavLink>
              <NavLink to="/user/tasks" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-check2-square"></i>
                {!isCollapsed && <span>My Tasks</span>}
              </NavLink>

              <div className="sidebar-section-title">{!isCollapsed && 'COMMUNICATION'}</div>
              <NavLink to="/user/messages" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-chat-dots"></i>
                {!isCollapsed && (
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span>Messages</span>
                    {unreadMsgs > 0 && <span className="badge bg-primary rounded-pill small">{unreadMsgs}</span>}
                  </div>
                )}
              </NavLink>
              <NavLink to="/user/notifications" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-bell"></i>
                {!isCollapsed && (
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span>Notifications</span>
                    {unreadNotifs > 0 && <span className="badge bg-danger rounded-pill small">{unreadNotifs}</span>}
                  </div>
                )}
              </NavLink>

              <div className="sidebar-section-title">{!isCollapsed && 'EMPLOYEE'}</div>
              <NavLink to="/user/attendance" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-clock-history"></i>
                {!isCollapsed && <span>Attendance</span>}
              </NavLink>
              <NavLink to="/user/profile" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-person-circle"></i>
                {!isCollapsed && <span>Profile</span>}
              </NavLink>
              <NavLink to="/user/settings" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
                <i className="bi bi-sliders"></i>
                {!isCollapsed && <span>Settings</span>}
              </NavLink>
            </>
          )}

          {/* Logout Button */}
          <div className="mt-auto pt-3">
            <button
              onClick={handleLogout}
              className="sidebar-nav-item text-danger w-100 border-0 bg-transparent text-start"
            >
              <i className="bi bi-box-arrow-right text-danger"></i>
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>

        {/* User Mini Profile Footer */}
        {!isCollapsed && currentUser && (
          <div className="sidebar-user-footer d-flex align-items-center gap-3">
            <img
              src={currentUser.avatar || '/logo.png'}
              alt={currentUser.name}
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-blue)' }}
            />
            <div className="overflow-hidden">
              <div className="text-white fw-bold text-truncate" style={{ fontSize: '0.85rem' }}>{currentUser.name}</div>
              <div className="text-muted text-truncate" style={{ fontSize: '0.72rem' }}>{currentUser.designation || currentUser.role}</div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
