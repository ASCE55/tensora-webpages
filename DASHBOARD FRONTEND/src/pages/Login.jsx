import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      toast.error('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const session = await login(username, password);
      toast.success(`Welcome back, ${session.user.name}!`);
      if (session.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      toast.error(err.message || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast.info('Password recovery instructions sent to your registered enterprise email.');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-grid-bg"></div>
      <div className="login-glow-orb" style={{ top: '15%', left: '30%' }}></div>
      <div className="login-glow-orb" style={{ bottom: '10%', right: '25%', width: '420px', height: '420px' }}></div>

      <div className="login-card-container">
        {/* Tensora Logo & Branding */}
        <div className="text-center mb-4">
          <div className="login-logo-glow mb-3">
            <img
              src="/logo.png"
              alt="Tensora Digital Solutions"
              style={{
                width: '92px',
                height: '92px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 22px rgba(0, 102, 255, 0.65))'
              }}
            />
          </div>
          <h2 className="font-display text-white fw-bold mb-1" style={{ letterSpacing: '0.12em', fontSize: '1.75rem' }}>
            TEN<span style={{ color: 'var(--blue-neon)' }}>S</span>ORA
          </h2>
          <div className="text-muted fw-semibold text-uppercase" style={{ fontSize: '0.76rem', letterSpacing: '0.18em' }}>
            DIGITAL SOLUTIONS PVT LTD
          </div>
          <p className="text-muted mt-2 small" style={{ fontSize: '0.84rem' }}>
            Enterprise Company Management Portal
          </p>
        </div>

        {/* Unified Glass Card */}
        <div className="login-glass-card">
          <form onSubmit={handleLoginSubmit}>
            {/* Username Field */}
            <div className="mb-3">
              <label className="form-label text-light fw-semibold" style={{ fontSize: '0.85rem' }}>
                Username / Employee ID
              </label>
              <div className="input-group">
                <span className="input-group-text bg-dark border-secondary text-primary">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username or ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between">
                <label className="form-label text-light fw-semibold" style={{ fontSize: '0.85rem' }}>
                  Password
                </label>
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none small text-primary"
                  onClick={handleForgotPassword}
                  style={{ fontSize: '0.78rem' }}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-dark border-secondary text-primary">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary border-start-0"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMeCheck"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label text-muted small" htmlFor="rememberMeCheck">
                Remember my session on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-tensora-primary w-100 py-2 justify-content-center fs-6"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : (
                <i className="bi bi-box-arrow-in-right"></i>
              )}
              {loading ? 'Authenticating Security Node...' : 'Sign In to Portal'}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="text-center mt-4">
          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
            © {new Date().getFullYear()} TENSORA DIGITAL SOLUTIONS PVT LTD. All rights reserved.
          </small>
        </div>
      </div>
    </div>
  );
};
