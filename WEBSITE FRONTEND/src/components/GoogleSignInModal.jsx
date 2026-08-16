import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

export const GoogleSignInModal = ({ show, onHide, onGoogleSuccess, role = 'client' }) => {
  const [customGmail, setCustomGmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const sampleAccounts = [
    {
      name: 'Alexander Vance',
      email: 'alexander.vance@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'Corporate Executive',
      email: 'contact.client@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    }
  ];

  const handleSelectAccount = async (account) => {
    setAuthenticating(true);
    try {
      await onGoogleSuccess(account.email, account.name);
      onHide();
    } catch (err) {
      toast.error('Google authentication failed');
    } finally {
      setAuthenticating(false);
    }
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!customGmail.trim()) {
      toast.warning('Please enter your Gmail address');
      return;
    }
    setAuthenticating(true);
    try {
      await onGoogleSuccess(customGmail.trim(), customName.trim() || undefined);
      onHide();
    } catch (err) {
      toast.error('Google authentication failed');
    } finally {
      setAuthenticating(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="bg-tensora-dark border-blue glass-panel text-silver-bright shadow-elevated"
    >
      <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-25 pb-2">
        <div className="d-flex align-items-center gap-2">
          {/* Google Color G Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <Modal.Title className="font-display fw-bold text-white fs-5">
            Sign in with Google
          </Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4">
        <p className="text-silver-muted small mb-4">
          Choose a Google account to continue to <strong className="text-white">Tensora {role === 'admin' ? 'Admin Portal' : 'Client Portal'}</strong>
        </p>

        {authenticating ? (
          <div className="text-center py-4">
            <div className="spinner-border text-blue-neon mb-3" role="status" />
            <div className="small text-white">Verifying Google Account Credentials...</div>
          </div>
        ) : (
          <>
            {/* Account List */}
            <div className="d-flex flex-column gap-2 mb-3">
              {sampleAccounts.map((acc, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectAccount(acc)}
                  className="p-3 rounded-3 bg-surface border border-secondary border-opacity-25 d-flex align-items-center gap-3 text-start w-100 transition-all hover-glow"
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--blue-bright)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 87, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201, 206, 214, 0.14)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                  }}
                >
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="rounded-circle object-fit-cover"
                    style={{ width: '40px', height: '40px' }}
                  />
                  <div className="flex-grow-1">
                    <div className="text-white fw-bold small">{acc.name}</div>
                    <div className="text-silver-muted small" style={{ fontSize: '0.78rem' }}>{acc.email}</div>
                  </div>
                  <i className="bi bi-chevron-right text-silver-dark small"></i>
                </button>
              ))}
            </div>

            {/* Custom Gmail Input Toggle */}
            {!showCustomInput ? (
              <button
                onClick={() => setShowCustomInput(true)}
                className="btn btn-tensora-outline-blue w-100 justify-content-center py-2 small"
                style={{ fontSize: '0.85rem' }}
              >
                <i className="bi bi-person-plus me-1"></i>
                Use Another Google / Gmail Account
              </button>
            ) : (
              <form onSubmit={handleCustomSubmit} className="pt-2 border-top border-secondary border-opacity-25 mt-3">
                <div className="mb-2">
                  <label className="tensora-label small">Your Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="tensora-input py-2 small"
                  />
                </div>
                <div className="mb-3">
                  <label className="tensora-label small">Gmail Address *</label>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={customGmail}
                    onChange={(e) => setCustomGmail(e.target.value)}
                    required
                    className="tensora-input py-2 small"
                  />
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(false)}
                    className="btn btn-tensora-secondary w-50 py-2 small"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-tensora-primary w-50 py-2 small justify-content-center"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};
