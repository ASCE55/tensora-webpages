import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { PageHeader } from '../../components/PageHeader';
import { ConfirmDialog } from '../../components/ConfirmDialog';

export const Settings = () => {
  const { resetData } = useData();
  const { theme, toggleTheme } = useTheme();

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [companySettings, setCompanySettings] = useState({
    companyName: 'TENSORA DIGITAL SOLUTIONS PVT LTD',
    cin: 'U72200DL2024PTC991823',
    gstin: '07AAACT8819Z1Z',
    officialEmail: 'contact@tensora.com',
    supportPhone: '+91 99000 11223',
    registeredOffice: 'Cyber City, Phase II, Gurugram, Haryana - 122002',
    defaultCurrency: 'INR (₹)',
    defaultGSTRate: 18,
    fiscalYearStart: 'April'
  });

  const handleSaveCompany = (e) => {
    e.preventDefault();
    toast.success('Enterprise configuration parameters saved.');
  };

  const handleResetData = () => {
    resetData();
    setShowResetConfirm(false);
    toast.success('All demo records reset to initial factory state.');
  };

  return (
    <div>
      <PageHeader
        title="Platform & Enterprise Settings"
        subtitle="Configure company parameters, taxation rules, theme modes, and demo database state."
      />

      <Row className="g-4">
        {/* Company Identity & Fiscal Configuration */}
        <Col xs={12} lg={8}>
          <div className="tensora-card p-4 mb-4">
            <h5 className="text-white mb-3">Company Legal & Billing Information</h5>
            <Form onSubmit={handleSaveCompany}>
              <Row className="g-3 mb-3">
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Registered Legal Entity Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={companySettings.companyName}
                      onChange={(e) => setCompanySettings({ ...companySettings, companyName: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>GSTIN Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={companySettings.gstin}
                      onChange={(e) => setCompanySettings({ ...companySettings, gstin: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Corporate Identification Number (CIN)</Form.Label>
                    <Form.Control
                      type="text"
                      value={companySettings.cin}
                      onChange={(e) => setCompanySettings({ ...companySettings, cin: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Official Dispatch Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={companySettings.officialEmail}
                      onChange={(e) => setCompanySettings({ ...companySettings, officialEmail: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Official Support Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      value={companySettings.supportPhone}
                      onChange={(e) => setCompanySettings({ ...companySettings, supportPhone: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Registered Headquarters Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={companySettings.registeredOffice}
                      onChange={(e) => setCompanySettings({ ...companySettings, registeredOffice: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-3 mb-4">
                <Col xs={6} md={4}>
                  <Form.Group>
                    <Form.Label>Default Currency</Form.Label>
                    <Form.Select
                      value={companySettings.defaultCurrency}
                      onChange={(e) => setCompanySettings({ ...companySettings, defaultCurrency: e.target.value })}
                    >
                      <option value="INR (₹)">INR (₹ - Indian Rupee)</option>
                      <option value="USD ($)">USD ($ - US Dollar)</option>
                      <option value="EUR (€)">EUR (€ - Euro)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group>
                    <Form.Label>Standard GST Rate (%)</Form.Label>
                    <Form.Control
                      type="number"
                      value={companySettings.defaultGSTRate}
                      onChange={(e) => setCompanySettings({ ...companySettings, defaultGSTRate: Number(e.target.value) })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>Fiscal Year Cycle</Form.Label>
                    <Form.Select
                      value={companySettings.fiscalYearStart}
                      onChange={(e) => setCompanySettings({ ...companySettings, fiscalYearStart: e.target.value })}
                    >
                      <option value="April">April - March (Standard Indian FY)</option>
                      <option value="January">January - December (Calendar Year)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <button type="submit" className="btn btn-tensora-primary">
                <i className="bi bi-check2"></i> Update Settings
              </button>
            </Form>
          </div>
        </Col>

        {/* System & Data Management Side Card */}
        <Col xs={12} lg={4}>
          {/* Theme Mode Card */}
          <div className="tensora-card p-4 mb-4">
            <h5 className="text-white mb-2">Visual Theme Interface</h5>
            <p className="text-muted small mb-3">
              Tensora Black + Silver + Electric Blue palette is optimized for dark mode.
            </p>
            <div className="d-flex align-items-center justify-content-between p-3 rounded bg-dark border border-secondary border-opacity-25">
              <span className="text-white small fw-bold">Active: {theme === 'dark' ? 'Tensora Dark (Default)' : 'Tensora Light'}</span>
              <button className="btn btn-sm btn-tensora-outline-blue" onClick={toggleTheme}>
                <i className={`bi ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'} me-1`}></i>
                Switch to {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>

          {/* Database Reset Card */}
          <div className="tensora-card p-4 border-danger border-opacity-50">
            <h5 className="text-white mb-2 d-flex align-items-center gap-2">
              <i className="bi bi-arrow-counterclockwise text-danger"></i>
              <span>Reset Demo State</span>
            </h5>
            <p className="text-muted small mb-3">
              Restore all clients, projects, tasks, invoices, payments, and expenses to the factory demo state.
            </p>
            <button
              className="btn btn-tensora-danger w-100 justify-content-center"
              onClick={() => setShowResetConfirm(true)}
            >
              <i className="bi bi-trash3"></i> Reset All Demo Data
            </button>
          </div>

          {/* System Environment Info */}
          <div className="tensora-card p-4 mt-4">
            <h6 className="text-white mb-2 font-display">System Architecture</h6>
            <div className="text-muted small font-mono">
              <div className="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-25">
                <span>Frontend:</span>
                <span className="text-white">React 18 / Vite</span>
              </div>
              <div className="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-25">
                <span>Persistence:</span>
                <span className="text-white">localStorage State</span>
              </div>
              <div className="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-25">
                <span>API Gateway:</span>
                <span className="text-primary">REST / Axios Ready</span>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span>Version:</span>
                <span className="text-info">v2.4.0 (Enterprise)</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        show={showResetConfirm}
        title="Reset All Platform Demo Data"
        message="This will overwrite all modified clients, projects, tasks, and financial invoices back to the default TENSORA mock dataset. Are you sure?"
        isDanger={true}
        confirmText="Confirm Factory Reset"
        onConfirm={handleResetData}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};
