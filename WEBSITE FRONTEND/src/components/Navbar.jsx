import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const { isAuthenticated, role, logout } = useAuth();

  useEffect(() => setShowMobileMenu(false), [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: 'bi-house-door' },
    { name: 'About', path: '/about', icon: 'bi-building' },
    { name: 'Services', path: '/services', icon: 'bi-cpu' },
    { name: 'Projects', path: '/projects', icon: 'bi-briefcase' },
    { name: 'Careers', path: '/careers', icon: 'bi-people' },
    { name: 'Contact', path: '/contact', icon: 'bi-envelope' },
  ];

  return (
    <>
      {/* ── LUXURY CAPSULE NAVBAR (Desktop - >= 992px) ── */}
      <div className="navbar-pill-crextio d-none d-lg-flex align-items-center justify-content-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="d-flex align-items-center text-decoration-none me-3">
          <img
            src="/logo.png"
            alt="TENSORA"
            style={{ height: '26px', width: 'auto', filter: 'brightness(0.1)' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 900,
              fontSize: '1.15rem',
              color: '#0f172a',
              letterSpacing: '-0.03em',
              marginLeft: '8px'
            }}
          >
            TENSORA
          </span>
        </Link>

        {/* Center: Inner Capsule Links Container */}
        <div className="nav-capsule-bar">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) => (isActive ? 'nav-capsule-link active' : 'nav-capsule-link')}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right: Action Pills & Circular Icon Buttons */}
        <div className="d-flex align-items-center gap-2">
          <Link
            to={isAuthenticated ? (role === 'admin' ? '/admin/dashboard' : '/client/dashboard') : '/client/login'}
            className="nav-action-pill"
          >
            <i className="bi bi-gear-wide-connected" style={{ fontSize: '0.9rem' }} />
            <span>{isAuthenticated ? (role === 'admin' ? 'Admin' : 'Portal') : 'Portal'}</span>
          </Link>

          <button
            className="nav-circle-btn"
            title="System Status: Operational"
            onClick={() => alert('Tensora System Status: All Servers Operational')}
          >
            <i className="bi bi-bell-fill" style={{ fontSize: '0.85rem' }} />
          </button>

          <Link
            to={isAuthenticated ? '/client/dashboard' : '/contact'}
            className="nav-circle-btn text-decoration-none"
            title="Account / Contact"
          >
            <i className="bi bi-person-fill" style={{ fontSize: '0.95rem' }} />
          </Link>
        </div>
      </div>

      {/* ── LUXURY FLOATING CAPSULE NAVBAR (Mobile & Tablet - < 992px) ── */}
      <div className="d-flex d-lg-none fixed-top justify-content-center px-3 pt-2" style={{ zIndex: 1050 }}>
        <div className="mobile-nav-pill d-flex align-items-center justify-content-between w-100 px-3 py-2">
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img src="/logo.png" alt="TENSORA" style={{ height: '24px', width: 'auto', filter: 'brightness(0.1)' }} />
            <span style={{ fontWeight: 900, color: '#0f172a', marginLeft: '6px', fontSize: '1rem', letterSpacing: '-0.02em' }}>
              TENSORA
            </span>
          </Link>

          <div className="d-flex align-items-center gap-2">
            <Link
              to="/contact"
              className="btn btn-sm rounded-pill px-3 py-1 fw-bold text-white d-flex align-items-center gap-1"
              style={{ background: 'linear-gradient(135deg, #0284c7, #2563eb)', fontSize: '0.76rem', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}
            >
              <span>Contact</span>
              <i className="bi bi-arrow-right-short fs-6" />
            </Link>

            <button
              className="mobile-menu-trigger-btn"
              onClick={() => setShowMobileMenu(true)}
              aria-label="Open navigation menu"
            >
              <i className="bi bi-list fs-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── PREMIUM MOBILE & TABLET OFFCANVAS DRAWER ── */}
      <Offcanvas
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        placement="end"
        className="mobile-offcanvas-drawer"
      >
        <Offcanvas.Header closeButton closeVariant="dark" className="px-4 pt-4 pb-3 border-bottom">
          <div className="d-flex align-items-center">
            <img src="/logo.png" alt="TENSORA" style={{ height: '26px', filter: 'brightness(0.1)' }} />
            <span style={{ fontWeight: 900, color: '#0f172a', marginLeft: '8px', fontSize: '1.15rem' }}>TENSORA</span>
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column justify-content-between p-4">
          <div className="d-flex flex-column gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-4 text-decoration-none fw-bold d-flex align-items-center justify-content-between transition-all ${
                    isActive
                      ? 'bg-dark text-white shadow-sm'
                      : 'text-dark hover-bg-light'
                  }`
                }
                style={{ fontSize: '1rem' }}
              >
                <div className="d-flex align-items-center gap-3">
                  <i className={`bi ${link.icon} fs-5 opacity-75`} />
                  <span>{link.name}</span>
                </div>
                <i className="bi bi-chevron-right small opacity-50" />
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-top d-flex flex-column gap-2">
            {isAuthenticated ? (
              <>
                <Link to={role === 'admin' ? '/admin/dashboard' : '/client/dashboard'} className="btn btn-dark w-100 py-3 rounded-pill fw-bold">
                  <i className="bi bi-speedometer2 me-2" />
                  {role === 'admin' ? 'Admin Portal' : 'Client Portal'}
                </Link>
                <button onClick={logout} className="btn btn-outline-danger w-100 py-2 rounded-pill fw-bold small">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/client/login" className="btn btn-outline-dark w-100 py-3 rounded-pill fw-bold">
                  <i className="bi bi-person-lock me-2" />
                  Client Login
                </Link>
                <Link to="/contact" className="btn btn-primary w-100 py-3 rounded-pill fw-bold text-white" style={{ background: 'linear-gradient(135deg, #0284c7, #2563eb)', border: 'none' }}>
                  Get Started <i className="bi bi-arrow-right ms-1" />
                </Link>
              </>
            )}
            <p className="text-center mb-0 mt-3" style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
              © 2026 TENSORA DIGITAL SOLUTIONS PVT LTD
            </p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* ── NAVBAR CSS ENGINE ── */}
      <style>{`
        /* Desktop Pill Navbar */
        .navbar-pill-crextio {
          position: fixed;
          top: 1.1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1050;
          background: rgba(241, 245, 249, 0.92);
          backdrop-filter: blur(20px) saturate(1.8);
          -webkit-backdrop-filter: blur(20px) saturate(1.8);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 9999px;
          padding: 0.45rem 0.65rem 0.45rem 1.4rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5) inset;
          white-space: nowrap;
          min-width: 820px;
          max-width: 95vw;
        }

        /* Mobile & Tablet Floating Pill Navbar */
        .mobile-nav-pill {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px) saturate(1.8);
          -webkit-backdrop-filter: blur(20px) saturate(1.8);
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 9999px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.05);
          max-width: 560px;
        }

        .mobile-menu-trigger-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #0f172a;
          color: #ffffff;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mobile-menu-trigger-btn:active {
          transform: scale(0.92);
        }

        .mobile-offcanvas-drawer {
          width: 320px !important;
          background: #f8fafc !important;
          border-left: 1px solid #e2e8f0 !important;
        }

        /* Center Links Capsule Container */
        .nav-capsule-bar {
          background: #ffffff;
          border-radius: 9999px;
          padding: 4px 6px;
          display: flex;
          align-items: center;
          gap: 2px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        /* Nav Capsule Link */
        .nav-capsule-link {
          color: #475569 !important;
          font-weight: 600;
          font-size: 0.86rem;
          padding: 0.45rem 1.15rem;
          border-radius: 9999px;
          text-decoration: none !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .nav-capsule-link:hover {
          color: #0f172a !important;
          background: rgba(0, 0, 0, 0.04);
        }
        .nav-capsule-link.active {
          color: #ffffff !important;
          background: #0f172a;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.3);
        }

        /* Right Action Pill */
        .nav-action-pill {
          background: #ffffff;
          color: #0f172a !important;
          font-weight: 700;
          font-size: 0.84rem;
          padding: 0.45rem 1.15rem;
          border-radius: 9999px;
          text-decoration: none !important;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s ease;
        }
        .nav-action-pill:hover {
          background: #0f172a;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
        }

        /* Circular Icon Buttons */
        .nav-circle-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          color: #0f172a !important;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .nav-circle-btn:hover {
          background: #0f172a;
          color: #ffffff !important;
          transform: scale(1.05);
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.3);
        }
      `}</style>
    </>
  );
};

