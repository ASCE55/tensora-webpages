import React, { useState } from 'react';
import { Row, Col, ProgressBar, Tab, Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

export const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');

  const clientProjects = [
    {
      id: 'PRJ-1082',
      title: 'Nexus Enterprise Cloud Portal',
      service: 'Web Development',
      phase: 'Development',
      progress: 68,
      status: 'In Active Sprint',
      startDate: 'Jan 15, 2026',
      targetDelivery: 'March 30, 2026',
      leadEngineer: 'Alexander Tensora',
      milestones: [
        { name: 'System Architecture & Wireframes', status: 'Completed', date: 'Jan 22, 2026' },
        { name: 'Dark Theme UI/UX Design Approval', status: 'Completed', date: 'Feb 05, 2026' },
        { name: 'React SPA & WebSocket Integration', status: 'In Progress', date: 'Feb 28, 2026' },
        { name: 'Security Audit & Stress Testing', status: 'Pending', date: 'March 15, 2026' },
        { name: 'Cloud Deployment & Live Handover', status: 'Pending', date: 'March 30, 2026' }
      ]
    },
    {
      id: 'PRJ-1044',
      title: 'FiveM Custom Police & NUI Garage Script',
      service: 'Game Script Development',
      phase: 'Completed',
      progress: 100,
      status: 'Delivered & Deployed',
      startDate: 'Nov 10, 2025',
      targetDelivery: 'Dec 05, 2025',
      leadEngineer: 'Tensora Gaming Team',
      milestones: [
        { name: 'Lua Net Events & Database Tables', status: 'Completed', date: 'Nov 18, 2025' },
        { name: 'React NUI In-Game Dashboard', status: 'Completed', date: 'Nov 25, 2025' },
        { name: 'Live Stress Test on Test Server', status: 'Completed', date: 'Dec 01, 2025' },
        { name: 'Production Server Deployment', status: 'Completed', date: 'Dec 05, 2025' }
      ]
    }
  ];

  const invoices = [
    {
      id: 'INV-2026-041',
      project: 'Nexus Enterprise Cloud Portal',
      amount: '$7,500.00',
      status: 'Paid',
      date: 'Feb 01, 2026',
      method: 'Wire Transfer / Stripe'
    },
    {
      id: 'INV-2026-068',
      project: 'Nexus Enterprise Cloud Portal (Phase 2)',
      amount: '$7,500.00',
      status: 'Pending',
      date: 'March 01, 2026',
      method: 'Due in 14 days'
    }
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div className="glass-card p-4 p-md-5 mb-4 border-blue position-relative overflow-hidden">
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '100%',
            background: 'radial-gradient(circle, rgba(0, 87, 255, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <Row className="align-items-center gy-3 position-relative" style={{ zIndex: 1 }}>
          <Col md={8}>
            <span className="tensora-badge mb-2">Authenticated Client Workspace</span>
            <h2 className="font-display fw-bold text-white mb-1">
              Welcome back, <span className="text-blue-gradient">{user?.name || 'David Vance'}</span>
            </h2>
            <p className="text-silver-muted mb-0">
              Company: <strong className="text-white">{user?.company || 'Apex Digital Ventures'}</strong> • Client ID: <span className="text-blue-neon font-monospace">TNS-CLT-9842</span>
            </p>
          </Col>
          <Col md={4} className="text-md-end">
            <button
              onClick={() => toast.info('Direct support channel open. Ticket #SUP-882 created.')}
              className="btn btn-tensora-primary"
            >
              <i className="bi bi-chat-text-fill me-1"></i>
              Message Project Lead
            </button>
          </Col>
        </Row>
      </div>

      {/* KPI Overview Cards */}
      <Row className="g-4 mb-4">
        {[
          { label: 'Active Projects', value: '1', icon: 'bi-kanban', color: 'var(--blue-neon)' },
          { label: 'Completed Deliverables', value: '1', icon: 'bi-check-circle', color: '#10B981' },
          { label: 'Pending Invoices', value: '$7,500', icon: 'bi-receipt', color: '#F59E0B' },
          { label: 'Unread Project Notes', value: '2', icon: 'bi-envelope', color: 'var(--silver-bright)' }
        ].map((kpi, idx) => (
          <Col key={idx} lg={3} sm={6}>
            <div className="glass-card p-4 h-100 d-flex align-items-center justify-content-between">
              <div>
                <div className="text-silver-dark small text-uppercase font-display mb-1">{kpi.label}</div>
                <div className="font-display fw-bold text-white" style={{ fontSize: '1.85rem' }}>
                  {kpi.value}
                </div>
              </div>
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: '46px',
                  height: '46px',
                  backgroundColor: 'rgba(201, 206, 214, 0.05)',
                  border: '1px solid var(--border-glass)',
                  color: kpi.color,
                  fontSize: '1.35rem'
                }}
              >
                <i className={`bi ${kpi.icon}`}></i>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Tabs for Navigation */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav className="nav-pills gap-2 mb-4 border-bottom border-secondary border-opacity-25 pb-3">
          <Nav.Item>
            <Nav.Link
              eventKey="projects"
              className={`rounded-pill px-4 py-2 font-display small fw-semibold ${
                activeTab === 'projects' ? 'btn-tensora-primary text-white' : 'btn-tensora-secondary'
              }`}
            >
              <i className="bi bi-folder2-open me-2"></i>
              My Projects & Milestones
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="invoices"
              className={`rounded-pill px-4 py-2 font-display small fw-semibold ${
                activeTab === 'invoices' ? 'btn-tensora-primary text-white' : 'btn-tensora-secondary'
              }`}
            >
              <i className="bi bi-receipt-cutoff me-2"></i>
              Billing & Invoices
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="files"
              className={`rounded-pill px-4 py-2 font-display small fw-semibold ${
                activeTab === 'files' ? 'btn-tensora-primary text-white' : 'btn-tensora-secondary'
              }`}
            >
              <i className="bi bi-cloud-arrow-down me-2"></i>
              Deliverables & Assets
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {/* Projects View */}
          <Tab.Pane eventKey="projects">
            <div className="d-flex flex-column gap-4">
              {clientProjects.map((p) => (
                <div key={p.id} className="glass-card p-4 p-md-5 border-blue">
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="tensora-badge small">{p.service}</span>
                        <span className="text-silver-dark font-monospace small">{p.id}</span>
                      </div>
                      <h4 className="font-display fw-bold text-white mb-0">{p.title}</h4>
                    </div>
                    <div className="text-md-end">
                      <span
                        className="badge px-3 py-2 rounded-pill font-display"
                        style={{
                          backgroundColor: p.progress === 100 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 87, 255, 0.15)',
                          color: p.progress === 100 ? '#10B981' : 'var(--blue-neon)',
                          border: `1px solid ${p.progress === 100 ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-blue)'}`
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress Tracker */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between small mb-2">
                      <span className="text-silver-muted">
                        Current Phase: <strong className="text-white">{p.phase}</strong>
                      </span>
                      <span className="text-blue-neon fw-bold">{p.progress}% Completed</span>
                    </div>
                    <ProgressBar
                      now={p.progress}
                      style={{ height: '8px', backgroundColor: 'var(--bg-surface)' }}
                    />
                  </div>

                  {/* Milestones Breakdown */}
                  <div className="pt-4 border-top border-secondary border-opacity-25">
                    <h6 className="font-display text-white text-uppercase small mb-3" style={{ fontSize: '0.8rem' }}>
                      Milestone Timeline:
                    </h6>
                    <div className="d-flex flex-column gap-2">
                      {p.milestones.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2 d-flex flex-wrap align-items-center justify-content-between gap-2"
                          style={{ backgroundColor: 'rgba(201, 206, 214, 0.03)', border: '1px solid var(--border-glass)' }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <i
                              className={`bi ${
                                m.status === 'Completed'
                                  ? 'bi-check-circle-fill text-success'
                                  : m.status === 'In Progress'
                                  ? 'bi-arrow-repeat text-blue-neon animate-spin'
                                  : 'bi-circle text-silver-dark'
                              }`}
                            ></i>
                            <span className={`small ${m.status === 'Completed' ? 'text-white' : 'text-silver-metallic'}`}>
                              {m.name}
                            </span>
                          </div>
                          <div className="d-flex align-items-center gap-3">
                            <span className="text-silver-muted small" style={{ fontSize: '0.75rem' }}>{m.date}</span>
                            <span
                              className="badge px-2 py-1 small"
                              style={{
                                fontSize: '0.7rem',
                                backgroundColor: m.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0, 87, 255, 0.1)',
                                color: m.status === 'Completed' ? '#10B981' : 'var(--blue-neon)'
                              }}
                            >
                              {m.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Pane>

          {/* Invoices View */}
          <Tab.Pane eventKey="invoices">
            <div className="glass-card p-4 p-md-5 border-blue">
              <h4 className="font-display fw-bold text-white mb-4">Invoices & Statements</h4>
              <div className="table-responsive">
                <table className="table table-dark table-hover border-secondary border-opacity-25 align-middle mb-0">
                  <thead>
                    <tr className="text-silver-dark small font-display text-uppercase">
                      <th>Invoice ID</th>
                      <th>Project</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id}>
                        <td className="font-monospace text-blue-neon fw-bold">{inv.id}</td>
                        <td className="text-white">{inv.project}</td>
                        <td className="text-white fw-bold">{inv.amount}</td>
                        <td className="text-silver-muted small">{inv.date}</td>
                        <td>
                          <span
                            className="badge px-2 py-1"
                            style={{
                              backgroundColor: inv.status === 'Paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                              color: inv.status === 'Paid' ? '#10B981' : '#F59E0B',
                              border: `1px solid ${inv.status === 'Paid' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                            }}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            onClick={() => toast.success(`Downloading PDF statement for ${inv.id}...`)}
                            className="btn btn-sm btn-tensora-outline-blue py-1 px-2"
                            style={{ fontSize: '0.78rem' }}
                          >
                            <i className="bi bi-download me-1"></i>
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Tab.Pane>

          {/* Files & Deliverables View */}
          <Tab.Pane eventKey="files">
            <div className="glass-card p-4 p-md-5 border-blue">
              <h4 className="font-display fw-bold text-white mb-3">Deliverables & Secure Repository</h4>
              <p className="text-silver-muted small mb-4">
                Download verified build artifacts, documentation, and source code bundles.
              </p>

              <Row className="g-3">
                {[
                  { name: 'Tensora_FiveM_Police_Garage_v2.0.zip', size: '24.8 MB', type: 'Script Package', date: 'Dec 05, 2025' },
                  { name: 'Nexus_Cloud_Architecture_Blueprint_v1.pdf', size: '4.2 MB', type: 'System Specs', date: 'Jan 22, 2026' },
                  { name: 'Tensora_Design_Tokens_DarkUI.fig', size: '68.1 MB', type: 'Figma Assets', date: 'Feb 05, 2026' }
                ].map((file, i) => (
                  <Col key={i} md={6}>
                    <div className="p-3 rounded-3 bg-surface border border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <i className="bi bi-file-earmark-zip-fill text-blue-neon fs-3"></i>
                        <div>
                          <div className="text-white fw-bold small text-truncate" style={{ maxWidth: '200px' }}>
                            {file.name}
                          </div>
                          <div className="text-silver-muted small" style={{ fontSize: '0.72rem' }}>
                            {file.type} • {file.size} • {file.date}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toast.success(`Downloading ${file.name}...`)}
                        className="btn btn-sm btn-tensora-primary py-1 px-2"
                        title="Download Asset"
                      >
                        <i className="bi bi-download"></i>
                      </button>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};
