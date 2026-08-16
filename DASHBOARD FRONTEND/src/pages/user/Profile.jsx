import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { PageHeader } from '../../components/PageHeader';

export const UserProfile = () => {
  const { currentUser, updateProfile } = useAuth();
  const { projects, tasks } = useData();

  const userId = currentUser?.id || 'TDS001';
  const myProjects = projects.filter(p => p.leadId === userId || p.team?.includes(userId));
  const myCompletedTasks = tasks.filter(t => t.assignedTo === userId && t.status === 'Completed');

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Devansh Roy',
    email: currentUser?.email || 'devansh@tensora.com',
    phone: currentUser?.phone || '+91 98300 23456',
    department: currentUser?.department || 'Web Development',
    designation: currentUser?.designation || 'Senior Full Stack Lead'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    toast.success('Your profile coordinates have been updated.');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    toast.success('Password changed successfully.');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div>
      <PageHeader
        title="Employee Profile & Workspace"
        subtitle="Manage personal engineering bio, credentials, skill records, and project assignments."
      />

      <Row className="g-4">
        {/* Profile Bio Card */}
        <Col xs={12} lg={4}>
          <div className="tensora-card p-4 text-center">
            <div className="position-relative d-inline-block mb-3">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                alt={currentUser?.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--blue-neon)',
                  boxShadow: 'var(--blue-glow-sm)'
                }}
              />
            </div>
            <h4 className="text-white font-display mb-1">{currentUser?.name}</h4>
            <div className="text-primary fw-semibold small mb-2">{currentUser?.designation}</div>
            <span className="badge bg-dark border border-secondary text-info mb-3">
              {currentUser?.department}
            </span>

            <div className="pt-3 border-top border-secondary border-opacity-25 text-start text-muted small">
              <div className="d-flex justify-content-between mb-2">
                <span>Employee ID:</span>
                <span className="text-white font-mono">{currentUser?.id || 'TDS001'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Joining Date:</span>
                <span className="text-white font-mono">{currentUser?.joinedDate || '2024-02-01'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Assigned Projects:</span>
                <span className="text-info fw-bold">{myProjects.length}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Completed Tasks:</span>
                <span className="text-success fw-bold">{myCompletedTasks.length || 48}</span>
              </div>
            </div>
          </div>
        </Col>

        {/* Edit Form */}
        <Col xs={12} lg={8}>
          <div className="tensora-card p-4 mb-4">
            <h5 className="text-white mb-3">Personal Coordinates</h5>
            <Form onSubmit={handleProfileSubmit}>
              <Row className="g-3 mb-3">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Enterprise Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-3 mb-4">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Phone Contact</Form.Label>
                    <Form.Control
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      value={formData.designation}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <button type="submit" className="btn btn-tensora-primary">
                <i className="bi bi-check2"></i> Save Profile Details
              </button>
            </Form>
          </div>

          <div className="tensora-card p-4">
            <h5 className="text-white mb-3">Change Workspace Password</h5>
            <Form onSubmit={handlePasswordSubmit}>
              <Row className="g-3 mb-3">
                <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <button type="submit" className="btn btn-tensora-secondary">
                <i className="bi bi-key"></i> Update Password
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
