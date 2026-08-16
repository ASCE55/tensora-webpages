import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { GlobalSearchModal } from './GlobalSearchModal';

export const Navbar = ({ onToggleSidebar, onToggleMobile }) => {
  const { currentUser, role, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, markNotificationRead } = useData();
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const unreadNotifs = notifications.filter(n => !n.read);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="app-navbar">
        {/* Left Side: Toggle button & Search */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-link text-white p-1 d-none d-lg-block"
            onClick={onToggleSidebar}
            title="Toggle Sidebar"
          >
            <i className="bi bi-list fs-4"></i>
          </button>
          <button
            className="btn btn-link text-white p-1 d-lg-none"
            onClick={onToggleMobile}
            title="Open Menu"
          >
            <i className="bi bi-list fs-4"></i>
          </button>

          {/* Global Search Button */}
          <div className="nav-search-btn" onClick={() => setShowSearch(true)}>
            <i className="bi bi-search"></i>
            <span>Search anything...</span>
            <span className="nav-search-shortcut">⌘K</span>
          </div>
        </div>

        {/* Right Side: Theme toggle, Notifications, Profile Menu */}
        <div className="d-flex align-items-center gap-3">
          {/* Theme Toggle */}
          <button
            className="btn btn-link text-white p-2 rounded-circle hover-bg-dark"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{ color: 'var(--silver-metallic)' }}
          >
            <i className={`bi ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'} fs-5`}></i>
          </button>

          {/* Messages Quick Icon */}
          <Link
            to={role === 'admin' ? '/admin/messages' : '/user/messages'}
            className="btn btn-link text-white p-2 position-relative"
            title="Messages"
          >
            <i className="bi bi-chat-dots fs-5" style={{ color: 'var(--silver-metallic)' }}></i>
          </Link>

          {/* Notification Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              as="button"
              className="btn btn-link text-white p-2 position-relative border-0 shadow-none"
            >
              <i className="bi bi-bell fs-5" style={{ color: 'var(--silver-metallic)' }}></i>
              {unreadNotifs.length > 0 && (
                <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                  {unreadNotifs.length}
                </span>
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="tensora-card shadow-lg p-0 mt-2"
              style={{ width: '320px', background: 'var(--bg-modal)', border: '1px solid var(--border-blue)' }}
            >
              <div className="p-3 border-bottom border-secondary d-flex align-items-center justify-content-between">
                <span className="fw-bold text-white small">NOTIFICATIONS</span>
                <span className="badge bg-primary rounded-pill small">{unreadNotifs.length} New</span>
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div className="p-3 text-center text-muted small">No notifications</div>
                ) : (
                  notifications.slice(0, 5).map(n => (
                    <Dropdown.Item
                      key={n.id}
                      className="p-3 border-bottom border-dark d-flex align-items-start gap-2 text-wrap"
                      onClick={() => markNotificationRead(n.id)}
                      style={{ background: n.read ? 'transparent' : 'rgba(0, 87, 255, 0.08)' }}
                    >
                      <i className={`bi ${n.icon || 'bi-info-circle'} fs-5`} style={{ color: n.iconColor || 'var(--blue-neon)' }}></i>
                      <div>
                        <div className="fw-semibold text-white small">{n.title}</div>
                        <div className="text-muted" style={{ fontSize: '0.78rem' }}>{n.message}</div>
                        <div className="text-muted small mt-1" style={{ fontSize: '0.7rem' }}>{n.time}</div>
                      </div>
                    </Dropdown.Item>
                  ))
                )}
              </div>
              <div className="p-2 text-center border-top border-secondary">
                <Link
                  to={role === 'admin' ? '/admin/notifications' : '/user/notifications'}
                  className="text-primary text-decoration-none small fw-semibold"
                >
                  View All Notifications →
                </Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          {/* User Profile Menu */}
          <Dropdown align="end">
            <Dropdown.Toggle
              as="button"
              className="d-flex align-items-center gap-2 btn btn-link text-decoration-none border-0 p-1 shadow-none"
            >
              <img
                src={currentUser?.avatar || '/logo.png'}
                alt={currentUser?.name || 'User'}
                style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-blue)' }}
              />
              <div className="text-start d-none d-md-block">
                <div className="text-white fw-bold lh-1" style={{ fontSize: '0.85rem' }}>{currentUser?.name}</div>
                <div className="text-muted text-capitalize" style={{ fontSize: '0.72rem' }}>{currentUser?.role}</div>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="tensora-card shadow-lg p-2 mt-2"
              style={{ width: '220px', background: 'var(--bg-modal)', border: '1px solid var(--border-blue)' }}
            >
              <div className="px-3 py-2 border-bottom border-secondary mb-1">
                <div className="text-white fw-bold small">{currentUser?.name}</div>
                <div className="text-muted small">{currentUser?.email}</div>
              </div>
              <Dropdown.Item
                as={Link}
                to={role === 'admin' ? '/admin/profile' : '/user/profile'}
                className="rounded py-2 text-white small"
              >
                <i className="bi bi-person me-2 text-primary"></i> My Profile
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={role === 'admin' ? '/admin/settings' : '/user/settings'}
                className="rounded py-2 text-white small"
              >
                <i className="bi bi-sliders me-2 text-info"></i> Account Settings
              </Dropdown.Item>
              <Dropdown.Divider className="border-secondary" />
              <Dropdown.Item
                onClick={handleLogout}
                className="rounded py-2 text-danger small"
              >
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal show={showSearch} onHide={() => setShowSearch(false)} />
    </>
  );
};
