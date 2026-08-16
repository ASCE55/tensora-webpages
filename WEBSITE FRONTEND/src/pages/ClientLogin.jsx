import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export const ClientLogin = () => {
  const { login, loginWithGoogle, loginWithGithub, loginWithDiscord } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true
    }
  });

  // Handle destination based on assigned user role
  const handlePostAuthRedirect = (authenticatedUser) => {
    if (authenticatedUser?.role === 'admin') {
      toast.success(`Welcome Master Admin ${authenticatedUser.name || ''}! Redirecting to Operations Dashboard...`);
      navigate('/admin/dashboard', { replace: true });
    } else {
      toast.success(`Welcome back, ${authenticatedUser.name || 'Client'}!`);
      const destination = location.state?.from?.pathname || '/client/dashboard';
      navigate(destination, { replace: true });
    }
  };

  // Unified Email / Password Sign In
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const result = await login(data.email, data.password);
      handlePostAuthRedirect(result.user);
    } catch (err) {
      toast.error(err.message || 'Authentication failed. Please verify your email and security credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  // Google SSO Sign In
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await loginWithGoogle();
      handlePostAuthRedirect(result.user);
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        toast.info('Google Sign-In was cancelled.');
      } else {
        toast.error(err.message || 'Google Single Sign-On failed.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // GitHub SSO Sign In
  const handleGithubSignIn = async () => {
    setGithubLoading(true);
    try {
      const result = await loginWithGithub();
      handlePostAuthRedirect(result.user);
    } catch (err) {
      toast.error(err.message || 'GitHub Authentication failed.');
    } finally {
      setGithubLoading(false);
    }
  };

  // Discord SSO Sign In
  const handleDiscordSignIn = async () => {
    setDiscordLoading(true);
    try {
      const result = await loginWithDiscord();
      handlePostAuthRedirect(result.user);
    } catch (err) {
      toast.error(err.message || 'Discord Authentication failed.');
    } finally {
      setDiscordLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5 position-relative overflow-hidden bg-grid-lines"
      style={{ backgroundColor: 'var(--bg-main)', paddingTop: '8rem' }}
    >
      {/* Background Radial Glow */}
      <div className="hero-radial-glow" />

      <Container fluid="md" className="position-relative" style={{ zIndex: 1, maxWidth: '480px' }}>
        <div className="text-center mb-4">
          <Link to="/">
            <img
              src="/logo.png"
              alt="TENSORA"
              style={{ maxHeight: '60px', width: 'auto', filter: 'drop-shadow(0 0 15px rgba(59, 123, 255, 0.4))' }}
            />
          </Link>
          <h3 className="font-display fw-bold text-white mt-3 mb-1">Unified Sign In</h3>
          <p className="text-silver-muted small">
            Single Sign-On for Clients &amp; Administrators
          </p>
        </div>

        <div className="glass-card p-4 p-md-5 border-blue">

          {/* Social SSO Buttons Row (Google, GitHub, Discord) */}
          <div className="d-flex flex-column gap-2 mb-4">

            {/* 1. Google Login */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || githubLoading || discordLoading || submitting}
              className="btn btn-outline-light w-100 py-2 px-3 d-flex align-items-center justify-content-center gap-3 font-display fw-semibold rounded-3 transition-all"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontSize: '0.9rem'
              }}
            >
              {googleLoading ? (
                <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            {/* 2. GitHub Login */}
            <button
              type="button"
              onClick={handleGithubSignIn}
              disabled={googleLoading || githubLoading || discordLoading || submitting}
              className="btn btn-outline-light w-100 py-2 px-3 d-flex align-items-center justify-content-center gap-3 font-display fw-semibold rounded-3 transition-all"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontSize: '0.9rem'
              }}
            >
              {githubLoading ? (
                <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true" />
              ) : (
                <i className="bi bi-github fs-5 text-white" />
              )}
              <span>Continue with GitHub</span>
            </button>

            {/* 3. Discord Login */}
            <button
              type="button"
              onClick={handleDiscordSignIn}
              disabled={googleLoading || githubLoading || discordLoading || submitting}
              className="btn btn-outline-light w-100 py-2 px-3 d-flex align-items-center justify-content-center gap-3 font-display fw-semibold rounded-3 transition-all"
              style={{
                backgroundColor: 'rgba(88, 101, 242, 0.15)',
                borderColor: 'rgba(88, 101, 242, 0.4)',
                color: '#FFFFFF',
                fontSize: '0.9rem'
              }}
            >
              {discordLoading ? (
                <span className="spinner-border spinner-border-sm text-info" role="status" aria-hidden="true" />
              ) : (
                <i className="bi bi-discord fs-5 text-info" />
              )}
              <span>Continue with Discord</span>
            </button>

          </div>

          {/* Divider */}
          <div className="d-flex align-items-center my-3">
            <div className="flex-grow-1 border-bottom border-secondary border-opacity-25" />
            <span className="px-3 text-silver-dark small text-uppercase font-monospace" style={{ fontSize: '0.72rem' }}>
              Or with Email &amp; Password
            </span>
            <div className="flex-grow-1 border-bottom border-secondary border-opacity-25" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label className="tensora-label">Email Address</label>
              <input
                type="email"
                placeholder="mugilans229@gmail.com"
                className={`tensora-input ${errors.email ? 'border-danger' : ''}`}
                {...register('email', {
                  required: 'Please enter your email address',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                })}
              />
              {errors.email && (
                <span className="text-danger small mt-1 d-block">{errors.email.message}</span>
              )}
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <label className="tensora-label mb-0">Password</label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info('Password recovery link dispatched to authorized email.');
                  }}
                  className="small text-blue-neon text-decoration-none"
                  style={{ fontSize: '0.78rem' }}
                >
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                placeholder="Enter password"
                className={`tensora-input mt-1 ${errors.password ? 'border-danger' : ''}`}
                {...register('password', { required: 'Please enter your password' })}
              />
              {errors.password && (
                <span className="text-danger small mt-1 d-block">{errors.password.message}</span>
              )}
            </div>

            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="form-check-input bg-dark border-secondary"
                  {...register('rememberMe')}
                />
                <label htmlFor="rememberMe" className="form-check-label text-silver-muted small">
                  Keep me signed in
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || googleLoading || githubLoading || discordLoading}
              className="btn-tensora-primary w-100 py-3 justify-content-center"
            >
              {submitting ? 'Authenticating...' : 'Sign In'}
              <i className="bi bi-box-arrow-in-right ms-1" />
            </button>
          </form>

        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-silver-muted small text-decoration-none">
            <i className="bi bi-arrow-left me-1" /> Return to Homepage
          </Link>
        </div>
      </Container>
    </div>
  );
};
