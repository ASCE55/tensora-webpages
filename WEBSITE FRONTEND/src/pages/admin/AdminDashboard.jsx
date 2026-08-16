import React, { useState, useEffect } from 'react';
import { Row, Col, Tab, Nav, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard = () => {
  const { adminEmails, addAdminEmail, removeAdminEmail } = useAuth();

  const [stats, setStats] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [newAdminEmailInput, setNewAdminEmailInput] = useState('');

  const loadData = async () => {
    const s = await api.getAdminStats();
    const inq = await api.getInquiries();
    const apps = await api.getJobApplications();
    setStats(s);
    setInquiries(inq);
    setApplications(apps);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await api.updateInquiryStatus(id, newStatus);
    toast.success(`Inquiry ${id} updated to "${newStatus}"`);
    loadData();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleAddAdminSubmit = (e) => {
    e.preventDefault();
    try {
      addAdminEmail(newAdminEmailInput);
      toast.success(`Admin access granted to ${newAdminEmailInput.trim().toLowerCase()}`);
      setNewAdminEmailInput('');
    } catch (err) {
      toast.error(err.message || 'Failed to add admin.');
    }
  };

  const handleRemoveAdminClick = (email) => {
    try {
      removeAdminEmail(email);
      toast.info(`Admin access revoked for ${email}`);
    } catch (err) {
      toast.error(err.message || 'Cannot remove admin.');
    }
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="glass-card p-4 p-md-5 mb-4 border-blue position-relative overflow-hidden">
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '450px',
            height: '100%',
            background: 'radial-gradient(circle, rgba(59, 123, 255, 0.18) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <Row className="align-items-center gy-3 position-relative" style={{ zIndex: 1 }}>
          <Col md={8}>
            <span className="tensora-badge mb-2" style={{ backgroundColor: 'rgba(59, 123, 255, 0.15)', borderColor: 'var(--blue-bright)' }}>
              <i className="bi bi-shield-check me-1" />
              Tensora Operations Central
            </span>
            <h2 className="font-display fw-bold text-white mb-1">
              Admin &amp; Resource Dashboard
            </h2>
            <p className="text-silver-muted mb-0">
              Real-time monitoring of client accounts, revenue pipelines, incoming project inquiries, and admin team access control.
            </p>
          </Col>
          <Col md={4} className="text-md-end">
            <button
              onClick={() => toast.success('Telemetry data synchronized with master node.')}
              className="btn btn-tensora-outline-blue"
            >
              <i className="bi bi-arrow-clockwise me-1" />
              Refresh Metrics
            </button>
          </Col>
        </Row>
      </div>

      {/* KPI Stats Row */}
      <Row className="g-4 mb-4">
        {[
          { label: 'Monthly Revenue', value: stats?.monthlyRevenue || '$84,500', note: '+18.4% vs last mo', icon: 'bi-currency-dollar', color: 'var(--blue-neon)' },
          { label: 'Active Projects', value: stats?.activeProjects || '9', note: '54 Delivered Total', icon: 'bi-kanban-fill', color: 'var(--silver-bright)' },
          { label: 'Authorized Admins', value: adminEmails.length.toString(), note: 'Team Gmail Privileges', icon: 'bi-person-shield', color: '#38BDF8' },
          { label: 'Pending Invoices', value: stats?.pendingInvoices || '$12,400', note: '2 Due This Week', icon: 'bi-credit-card-2-front-fill', color: '#F59E0B' }
        ].map((k, i) => (
          <Col key={i} lg={3} sm={6}>
            <div className="glass-card p-4 h-100 d-flex align-items-center justify-content-between">
              <div>
                <div className="text-silver-dark small text-uppercase font-display mb-1">{k.label}</div>
                <div className="font-display fw-bold text-white mb-1" style={{ fontSize: '1.85rem' }}>
                  {k.value}
                </div>
                <div className="text-silver-muted small" style={{ fontSize: '0.75rem' }}>{k.note}</div>
              </div>
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: '46px',
                  height: '46px',
                  backgroundColor: 'rgba(201, 206, 214, 0.05)',
                  border: '1px solid var(--border-glass)',
                  color: k.color,
                  fontSize: '1.35rem'
                }}
              >
                <i className={`bi ${k.icon}`} />
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Main Tab Navigation */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav className="nav-pills gap-2 mb-4 border-bottom border-secondary border-opacity-25 pb-3">
          <Nav.Item>
            <Nav.Link
              eventKey="overview"
              className={`rounded-pill px-4 py-2 font-display small fw-semibold ${
                activeTab === 'overview' ? 'btn-tensora-primary text-white' : 'btn-tensora-secondary'
              }`}
            >
              <i className="bi bi-graph-up-arrow me-2" />
              Operational Overview
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="inquiries"
              className={`rounded-pill px-4 py-2 font-display small fw-semibold ${
                activeTab === 'inquiries' ? 'btn-tensora-primary text-white' : 'btn-tensora-secondary'
              }`}
            >
              <i className="bi bi-inbox-fill me-2" />
              Project Inquiries ({inquiries.length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="applicants"
              className={`rounded-pill px-4 py-2 font-display small fw-semibold ${
                activeTab === 'applicants' ? 'btn-tensora-primary text-white' : 'btn-tensora-secondary'
              }`}
            >
              <i className="bi bi-person-badge-fill me-2" />
              Career Applicants ({applications.length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="admin-access"
              className={`rounded-pill px-4 py-2 font-display small fw-semibold ${
                activeTab === 'admin-access' ? 'btn-tensora-primary text-white' : 'btn-tensora-secondary'
              }`}
            >
              <i className="bi bi-person-gear me-2" />
              Admin Access Management ({adminEmails.length})
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {/* Tab 1: Overview */}
          <Tab.Pane eventKey="overview">
            <Row className="g-4 mb-4">
              <Col lg={8}>
                <div className="glass-card p-4 p-md-5 border-blue h-100">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="font-display fw-bold text-white mb-0">Project Pipeline Breakdown</h5>
                    <span className="tensora-badge small">Active Sprints</span>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {[
                      { name: 'Web Development & Corporate Portals', count: 4, share: 45 },
                      { name: 'FiveM Multiplayer Scripts & QBox', count: 3, share: 30 },
                      { name: 'Photorealistic 3D Product Renders', count: 1, share: 15 },
                      { name: 'Commercial Video Post-Production', count: 1, share: 10 }
                    ].map((row, idx) => (
                      <div key={idx} className="p-3 rounded-3 bg-surface border border-secondary border-opacity-25">
                        <div className="d-flex justify-content-between small mb-2">
                          <span className="text-white fw-bold">{row.name}</span>
                          <span className="text-blue-neon font-monospace">{row.count} Active Projects ({row.share}%)</span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: 'rgba(201, 206, 214, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${row.share}%`, height: '100%', background: 'linear-gradient(90deg, #3B7BFF, #38BDF8)' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>

              <Col lg={4}>
                <div className="glass-card p-4 p-md-5 border-blue h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="font-display fw-bold text-white mb-4">Quick Administrative Tools</h5>
                    <div className="d-flex flex-column gap-2">
                      <button
                        onClick={() => setActiveTab('admin-access')}
                        className="btn btn-tensora-secondary w-100 justify-content-start py-2"
                      >
                        <i className="bi bi-person-plus-fill me-2 text-blue-neon" />
                        Grant Admin Privileges
                      </button>
                      <button
                        onClick={() => toast.info('Invoice generator ready.')}
                        className="btn btn-tensora-secondary w-100 justify-content-start py-2"
                      >
                        <i className="bi bi-file-earmark-plus me-2 text-blue-neon" />
                        Generate Client Invoice
                      </button>
                      <button
                        onClick={() => toast.info('Project deployment trigger initialized.')}
                        className="btn btn-tensora-secondary w-100 justify-content-start py-2"
                      >
                        <i className="bi bi-cloud-arrow-up-fill me-2 text-blue-neon" />
                        Deploy Production Build
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-top border-secondary border-opacity-25 mt-4">
                    <div className="d-flex align-items-center justify-content-between small">
                      <span className="text-silver-muted">System Health:</span>
                      <span className="text-success fw-bold d-flex align-items-center gap-1">
                        <span className="badge rounded-circle bg-success p-1" /> 99.98% Operational
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Tab.Pane>

          {/* Tab 2: Inquiries */}
          <Tab.Pane eventKey="inquiries">
            <div className="glass-card p-4 p-md-5 border-blue">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="font-display fw-bold text-white mb-1">Incoming Project Inquiries</h4>
                  <p className="text-silver-muted small mb-0">Review project proposals submitted via the website contact form.</p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-dark table-hover border-secondary border-opacity-25 align-middle mb-0">
                  <thead>
                    <tr className="text-silver-dark small font-display text-uppercase">
                      <th>ID</th>
                      <th>Client / Company</th>
                      <th>Service</th>
                      <th>Budget</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => (
                      <tr key={inq.id}>
                        <td className="font-monospace text-blue-neon fw-bold">{inq.id}</td>
                        <td>
                          <div className="text-white fw-bold">{inq.name}</div>
                          <div className="text-silver-muted small">{inq.company || inq.email}</div>
                        </td>
                        <td>
                          <span className="tensora-badge small" style={{ fontSize: '0.72rem' }}>
                            {inq.service}
                          </span>
                        </td>
                        <td className="text-silver-bright small">{inq.budget}</td>
                        <td className="text-silver-muted small">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <span
                            className="badge px-2 py-1"
                            style={{
                              backgroundColor:
                                inq.status === 'New'
                                  ? 'rgba(56, 189, 248, 0.2)'
                                  : inq.status === 'In Review'
                                  ? 'rgba(245, 158, 11, 0.2)'
                                  : 'rgba(16, 185, 129, 0.2)',
                              color:
                                inq.status === 'New'
                                  ? '#38BDF8'
                                  : inq.status === 'In Review'
                                  ? '#F59E0B'
                                  : '#10B981'
                            }}
                          >
                            {inq.status}
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="btn btn-sm btn-tensora-outline-blue py-1 px-2"
                            style={{ fontSize: '0.78rem' }}
                          >
                            <i className="bi bi-eye me-1" /> View Scope
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Tab.Pane>

          {/* Tab 3: Applicants */}
          <Tab.Pane eventKey="applicants">
            <div className="glass-card p-4 p-md-5 border-blue">
              <h4 className="font-display fw-bold text-white mb-2">Talent Applications</h4>
              <p className="text-silver-muted small mb-4">Candidates who applied through the Careers page.</p>

              {applications.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-people text-silver-dark fs-1 mb-2 d-block" />
                  <p className="text-silver-muted">No applications submitted yet in this session.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-dark table-hover border-secondary border-opacity-25 align-middle mb-0">
                    <thead>
                      <tr className="text-silver-dark small font-display text-uppercase">
                        <th>Applicant</th>
                        <th>Position</th>
                        <th>Portfolio / GitHub</th>
                        <th>Resume Link</th>
                        <th>Applied Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id}>
                          <td>
                            <div className="text-white fw-bold">{app.name}</div>
                            <div className="text-silver-muted small">{app.email} • {app.phone}</div>
                          </td>
                          <td>
                            <div className="text-white">{app.jobTitle}</div>
                            <div className="text-blue-neon small">{app.department}</div>
                          </td>
                          <td>
                            <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-neon small">
                              {app.portfolio}
                            </a>
                          </td>
                          <td>
                            <a href={app.resumeLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-tensora-secondary py-1 px-2 small">
                              <i className="bi bi-file-earmark-pdf me-1" /> View CV
                            </a>
                          </td>
                          <td className="text-silver-muted small">
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Tab.Pane>

          {/* Tab 4: Admin Access & Gmail Management */}
          <Tab.Pane eventKey="admin-access">
            <Row className="g-4">
              <Col lg={5}>
                <div className="glass-card p-4 p-md-5 border-blue h-100">
                  <span className="tensora-badge mb-3">
                    <i className="bi bi-person-fill-lock me-1" />
                    Admin Access Control
                  </span>
                  <h4 className="font-display fw-bold text-white mb-2">Grant Admin Access</h4>
                  <p className="text-silver-muted small mb-4" style={{ lineHeight: '1.7' }}>
                    Enter any user's Gmail address to grant them full administrator privileges. When they sign in with Google, GitHub, Discord, or Email, they will automatically open the Admin Dashboard!
                  </p>

                  <form onSubmit={handleAddAdminSubmit}>
                    <div className="mb-3">
                      <label className="tensora-label">User Gmail Address</label>
                      <input
                        type="email"
                        placeholder="newadmin@gmail.com"
                        value={newAdminEmailInput}
                        onChange={(e) => setNewAdminEmailInput(e.target.value)}
                        className="tensora-input"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-tensora-primary w-100 py-3 justify-content-center">
                      <i className="bi bi-plus-circle me-1" />
                      Grant Admin Privileges
                    </button>
                  </form>
                </div>
              </Col>

              <Col lg={7}>
                <div className="glass-card p-4 p-md-5 border-blue h-100">
                  <h4 className="font-display fw-bold text-white mb-1">Authorized Admin Gmail Accounts</h4>
                  <p className="text-silver-muted small mb-4">Users with these Gmail addresses automatically get Admin Role upon login.</p>

                  <div className="table-responsive">
                    <table className="table table-dark table-hover align-middle mb-0">
                      <thead>
                        <tr className="text-silver-dark small font-display text-uppercase">
                          <th>Admin Gmail</th>
                          <th>Role Status</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminEmails.map((email) => (
                          <tr key={email}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-envelope-check-fill text-blue-neon" />
                                <span className="text-white fw-semibold">{email}</span>
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-50">
                                Master Admin
                              </span>
                            </td>
                            <td className="text-end">
                              {email.toLowerCase() === 'admin@tensora.com' ? (
                                <span className="text-silver-dark small">Protected</span>
                              ) : (
                                <button
                                  onClick={() => handleRemoveAdminClick(email)}
                                  className="btn btn-sm btn-outline-danger py-1 px-2"
                                  style={{ fontSize: '0.78rem' }}
                                >
                                  Revoke
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      {/* Inquiry Detail Modal */}
      <Modal
        show={!!selectedInquiry}
        onHide={() => setSelectedInquiry(null)}
        centered
        size="lg"
        contentClassName="bg-tensora-dark border-blue glass-panel text-silver-bright"
      >
        <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-25">
          <div>
            <span className="tensora-badge small mb-1">{selectedInquiry?.id}</span>
            <Modal.Title className="font-display fw-bold text-white fs-5">
              Project Inquiry: {selectedInquiry?.name}
            </Modal.Title>
          </div>
        </Modal.Header>

        <Modal.Body className="p-4">
          <div className="row g-3 mb-4">
            <div className="col-sm-6">
              <div className="text-silver-dark small font-display">Client Name</div>
              <div className="text-white fw-bold">{selectedInquiry?.name}</div>
            </div>
            <div className="col-sm-6">
              <div className="text-silver-dark small font-display">Company / Community</div>
              <div className="text-white fw-bold">{selectedInquiry?.company || 'N/A'}</div>
            </div>
            <div className="col-sm-6">
              <div className="text-silver-dark small font-display">Email Address</div>
              <a href={`mailto:${selectedInquiry?.email}`} className="text-blue-neon">{selectedInquiry?.email}</a>
            </div>
            <div className="col-sm-6">
              <div className="text-silver-dark small font-display">Phone / WhatsApp</div>
              <div className="text-white">{selectedInquiry?.phone || 'Not provided'}</div>
            </div>
            <div className="col-sm-6">
              <div className="text-silver-dark small font-display">Target Service</div>
              <div className="text-blue-neon fw-bold">{selectedInquiry?.service}</div>
            </div>
            <div className="col-sm-6">
              <div className="text-silver-dark small font-display">Budget Range</div>
              <div className="text-white fw-bold">{selectedInquiry?.budget}</div>
            </div>
          </div>

          <div className="p-3 rounded-3 bg-surface border border-secondary border-opacity-25 mb-4">
            <h6 className="font-display text-white small text-uppercase mb-2">Detailed Message / Scope:</h6>
            <p className="text-silver-bright mb-0" style={{ lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
              {selectedInquiry?.message}
            </p>
          </div>

          <div className="d-flex align-items-center justify-content-between pt-3 border-top border-secondary border-opacity-25">
            <div className="d-flex align-items-center gap-2">
              <span className="small text-silver-muted">Update Status:</span>
              {['New', 'In Review', 'Contacted', 'Closed'].map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(selectedInquiry.id, st)}
                  className={`btn btn-sm ${selectedInquiry.status === st ? 'btn-tensora-primary' : 'btn-tensora-secondary'} py-1 px-2`}
                  style={{ fontSize: '0.75rem' }}
                >
                  {st}
                </button>
              ))}
            </div>

            <button onClick={() => setSelectedInquiry(null)} className="btn btn-tensora-secondary">
              Close Window
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
