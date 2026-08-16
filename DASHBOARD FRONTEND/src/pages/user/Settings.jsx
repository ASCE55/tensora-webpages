import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import { PageHeader } from '../../components/PageHeader';

export const UserSettings = () => {
  const { theme, toggleTheme } = useTheme();

  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    taskAssignments: true,
    desktopNotifications: false,
    soundEffects: true
  });

  const handleSavePreferences = (e) => {
    e.preventDefault();
    toast.success('Workspace preferences saved.');
  };

  return (
    <div>
      <PageHeader
        title="Workspace Preferences"
        subtitle="Manage interface appearances, notification subscriptions, and personal workspace configurations."
      />

      <Row className="g-4">
        <Col xs={12} md={6}>
          {/* Theme card */}
          <div className="tensora-card p-4 mb-4">
            <h5 className="text-white mb-2">Display Theme</h5>
            <p className="text-muted small mb-3">
              Switch between Tensora High-Contrast Dark Mode and Clean Light Mode.
            </p>
            <div className="d-flex align-items-center justify-content-between p-3 rounded bg-dark border border-secondary border-opacity-25">
              <span className="text-white small fw-bold">Active: {theme === 'dark' ? 'Tensora Dark' : 'Tensora Light'}</span>
              <button className="btn btn-sm btn-tensora-outline-blue" onClick={toggleTheme}>
                <i className={`bi ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'} me-1`}></i>
                Switch to {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>

          {/* Notification toggles */}
          <div className="tensora-card p-4">
            <h5 className="text-white mb-3">Notification Channels</h5>
            <Form onSubmit={handleSavePreferences}>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="taskAssignSwitch"
                  checked={preferences.taskAssignments}
                  onChange={(e) => setPreferences({ ...preferences, taskAssignments: e.target.checked })}
                />
                <label className="form-check-label text-white small" htmlFor="taskAssignSwitch">
                  Task Assignment & Sprint Alerts
                </label>
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="emailAlertSwitch"
                  checked={preferences.emailAlerts}
                  onChange={(e) => setPreferences({ ...preferences, emailAlerts: e.target.checked })}
                />
                <label className="form-check-label text-white small" htmlFor="emailAlertSwitch">
                  Direct Messaging Email Relays
                </label>
              </div>

              <div className="form-check form-switch mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="soundSwitch"
                  checked={preferences.soundEffects}
                  onChange={(e) => setPreferences({ ...preferences, soundEffects: e.target.checked })}
                />
                <label className="form-check-label text-white small" htmlFor="soundSwitch">
                  Interactive Audio & Sound Feedback
                </label>
              </div>

              <button type="submit" className="btn btn-tensora-primary">
                Save Preferences
              </button>
            </Form>
          </div>
        </Col>

        <Col xs={12} md={6}>
          <div className="tensora-card p-4">
            <h5 className="text-white mb-2">Employee Role Security</h5>
            <p className="text-muted small mb-3">
              Your profile is registered with standard engineering authorization.
            </p>
            <div className="p-3 bg-dark rounded border border-secondary border-opacity-25 small font-mono text-muted">
              <div className="mb-2"><strong className="text-white">Security Level:</strong> Level 2 (Contributor)</div>
              <div className="mb-2"><strong className="text-white">Permission Scope:</strong> Assigned Projects, Kanban Tasks, Comms, Attendance</div>
              <div><strong className="text-white">Financial Access:</strong> Restricted (Admin Only)</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
