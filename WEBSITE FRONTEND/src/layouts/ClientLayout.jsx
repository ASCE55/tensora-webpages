import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export const ClientLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/client/login');
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Client Portal Header */}
      <header
        className="glass-panel py-3 border-bottom border-secondary border-opacity-25 sticky-top"
        style={{ zIndex: 1020 }}
      >
        <Container fluid="xl">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="TENSORA DIGITAL SOLUTIONS"
                  style={{ height: '36px', width: 'auto' }}
                />
              </Link>
              <div className="d-none d-md-block ps-3 border-start border-secondary border-opacity-50">
                <span className="tensora-badge" style={{ fontSize: '0.7rem' }}>
                  Client Portal
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <Link to="/" className="btn btn-sm btn-tensora-secondary d-none d-sm-inline-flex align-items-center gap-1">
                <i className="bi bi-house"></i>
                Website
              </Link>
              <div className="d-flex align-items-center gap-2">
                <img
                  src={user?.avatar || '/logo.png'}
                  alt={user?.name}
                  className="rounded-circle object-fit-cover border border-primary border-opacity-50"
                  style={{ width: '36px', height: '36px' }}
                />
                <div className="d-none d-md-block text-start">
                  <div className="small fw-bold text-white lh-1">{user?.name || 'Client User'}</div>
                  <div className="text-silver-muted" style={{ fontSize: '0.72rem' }}>
                    {user?.company || 'Authorized Client'}
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                title="Sign Out"
              >
                <i className="bi bi-box-arrow-right"></i>
                <span className="d-none d-sm-inline">Sign Out</span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Portal View */}
      <main className="flex-grow-1 py-4">
        <Container fluid="xl">
          <Outlet />
        </Container>
      </main>

      {/* Portal Footer */}
      <footer className="py-3 border-top border-secondary border-opacity-25 text-center text-silver-muted small" style={{ fontSize: '0.78rem' }}>
        © 2026 TENSORA DIGITAL SOLUTIONS PVT LTD • Secured Client Workspace
      </footer>
    </div>
  );
};
