import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/PageHeader';

export const Profile = () => {
  const { currentUser, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Tensora Administrator',
    email: currentUser?.email || 'admin@tensora.com',
    phone: currentUser?.phone || '+91 99000 11223',
    department: currentUser?.department || 'Executive Management',
    designation: currentUser?.designation || 'Managing Director & CTO',
    avatar: currentUser?.avatar || '/logo.png'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    toast.success('Admin identity profile updated successfully.');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password confirmation does not match.');
      return;
    }
    toast.success('Security password encryption key changed.');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div>
      <PageHeader
        title="Admin Profile & Identity"
        subtitle="Manage master credentials, cryptographic tokens, and executive contacts."
      />

      <Row className="g-4">
        {/* Profile Card */}
        <Col xs={12} lg={4}>
          <div className="tensora-card p-4 text-center">
            <div className="position-relative d-inline-block mb-3">
              <img
                src={currentUser?.avatar || '/logo.png'}
                alt="Admin"
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  objectFit: 'contain',
                  border: '2px solid var(--blue-neon)',
                  boxShadow: 'var(--blue-glow-md)',
                  background: '#050505'
                }}
              />
            </div>
            <h4 className="text-white font-display mb-1">{currentUser?.name}</h4>
            <div className="text-primary fw-semibold small mb-2">{currentUser?.designation}</div>
            <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-50 px-3 py-1 mb-3">
              MASTER ADMIN AUTHORIZED
            </span>

            <div className="pt-3 border-top border-secondary border-opacity-25 text-start text-muted small">
              <div className="d-flex justify-content-between mb-2">
                <span>Employee ID:</span>
                <span className="text-white font-mono">{currentUser?.id || 'ADM-001'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Department:</span>
                <span className="text-white">{currentUser?.department}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Access Scope:</span>
                <span className="text-success fw-bold">Full Enterprise</span>
              </div>
            </div>
          </div>
        </Col>

        {/* Profile Edit Forms */}
        <Col xs={12} lg={8}>
          <div className="tensora-card p-4 mb-4">
            <h5 className="text-white mb-3">Personal & Contact Coordinates</h5>
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
                    <Form.Label>Admin Email Address</Form.Label>
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
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Executive Designation</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
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
            <h5 className="text-white mb-3">Master Password & Security Key</h5>
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
                <i className="bi bi-shield-lock"></i> Update Password
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
