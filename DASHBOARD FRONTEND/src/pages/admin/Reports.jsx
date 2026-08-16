import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { PageHeader } from '../../components/PageHeader';
import { StatCard } from '../../components/StatCard';

export const Reports = () => {
  const { clients, projects, invoices, expenses, payments, employees, kpis } = useData();

  const [reportType, setReportType] = useState('Financial'); // 'Financial' | 'Projects' | 'Clients' | 'Employees'
  const [dateRange, setDateRange] = useState('Current Fiscal Quarter (Q1 2026)');

  const handleExportCSV = () => {
    let headers = [];
    let rows = [];

    if (reportType === 'Financial') {
      headers = ['Invoice Number', 'Client', 'Total Amount', 'Paid Amount', 'Status', 'Issue Date'];
      rows = invoices.map(i => [i.invoiceNumber, i.company, i.total, i.paidAmount, i.status, i.issueDate]);
    } else if (reportType === 'Projects') {
      headers = ['Project ID', 'Project Name', 'Client', 'Lead', 'Budget', 'Progress', 'Status'];
      rows = projects.map(p => [p.id, p.name, p.client, p.lead, p.budget, `${p.progress}%`, p.status]);
    } else if (reportType === 'Clients') {
      headers = ['Client ID', 'Name', 'Company', 'Email', 'Phone', 'Revenue', 'Status'];
      rows = clients.map(c => [c.id, c.name, c.company, c.email, c.phone, c.revenue, c.status]);
    } else {
      headers = ['Employee ID', 'Name', 'Department', 'Designation', 'Salary', 'Rating', 'Status'];
      rows = employees.map(e => [e.id, e.name, e.department, e.designation, e.salary, e.rating, e.status]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Tensora_${reportType}_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`${reportType} CSV report exported.`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <PageHeader
        title="Executive Reports & Intelligence"
        subtitle="Generate fiscal summaries, project delivery metrics, operational expenditure analytics, and CSV exports."
      >
        <button className="btn btn-tensora-secondary" onClick={handleExportCSV}>
          <i className="bi bi-file-earmark-spreadsheet"></i> Export CSV
        </button>
        <button className="btn btn-tensora-primary" onClick={handlePrint}>
          <i className="bi bi-printer"></i> Print Report / PDF
        </button>
      </PageHeader>

      {/* Filter Row */}
      <div className="tensora-card p-3 mb-4 no-print">
        <Row className="g-3 align-items-center">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label className="small text-muted mb-1">Report Domain Focus</Form.Label>
              <Form.Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="Financial">Financial Performance & Revenue Matrix</option>
                <option value="Projects">Project Delivery & Milestone Audit</option>
                <option value="Clients">Enterprise Client Portfolio & Retention</option>
                <option value="Employees">Human Capital & Resource Allocation</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label className="small text-muted mb-1">Fiscal Reporting Period</Form.Label>
              <Form.Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                <option value="Current Fiscal Quarter (Q1 2026)">Current Fiscal Quarter (Q1 2026)</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Fiscal Year 2025-2026">Fiscal Year 2025-2026</option>
                <option value="Lifetime Corporate Audit">Lifetime Corporate Audit</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Printable Report Document Card */}
      <div className="tensora-card p-4 p-md-5">
        {/* Tensora Header */}
        <div className="d-flex align-items-center justify-content-between border-bottom pb-4 mb-4" style={{ borderColor: 'rgba(0, 102, 255, 0.2)' }}>
          <div className="d-flex align-items-center gap-3">
            <img src="/logo.png" alt="Tensora" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
            <div>
              <h3 className="font-display fw-bold text-white mb-0" style={{ letterSpacing: '0.1em' }}>
                TEN<span style={{ color: 'var(--blue-neon)' }}>S</span>ORA
              </h3>
              <div className="text-muted small fw-semibold text-uppercase">DIGITAL SOLUTIONS PVT LTD</div>
            </div>
          </div>
          <div className="text-end">
            <h4 className="text-white font-display mb-1">{reportType.toUpperCase()} REPORT</h4>
            <div className="text-primary font-mono small fw-bold">Period: {dateRange}</div>
            <div className="text-muted small">Generated: {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</div>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <Row className="g-3 mb-4">
          <Col xs={6} md={3}>
            <div className="p-3 bg-dark rounded border border-secondary border-opacity-25">
              <div className="text-muted small">Total Revenue</div>
              <div className="fs-5 fw-bold text-primary font-mono">{formatCurrency(kpis.monthlyRevenue)}</div>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className="p-3 bg-dark rounded border border-secondary border-opacity-25">
              <div className="text-muted small">Operating Expenses</div>
              <div className="fs-5 fw-bold text-danger font-mono">{formatCurrency(kpis.monthlyExpenses)}</div>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className="p-3 bg-dark rounded border border-secondary border-opacity-25">
              <div className="text-muted small">Net Corporate Profit</div>
              <div className="fs-5 fw-bold text-success font-mono">{formatCurrency(kpis.netProfit)}</div>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className="p-3 bg-dark rounded border border-secondary border-opacity-25">
              <div className="text-muted small">Active Project Portfolio</div>
              <div className="fs-5 fw-bold text-info font-mono">{kpis.activeProjects} Projects</div>
            </div>
          </Col>
        </Row>

        {/* Report Content Data Tables */}
        {reportType === 'Financial' && (
          <div>
            <h6 className="text-white mb-3">Audited Invoice Ledger</h6>
            <div className="table-responsive">
              <table className="tensora-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Client Organization</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Total Value</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(i => (
                    <tr key={i.id}>
                      <td className="font-mono fw-bold text-white">{i.invoiceNumber}</td>
                      <td>{i.company}</td>
                      <td className="font-mono text-muted small">{i.issueDate}</td>
                      <td className="font-mono text-muted small">{i.dueDate}</td>
                      <td className="font-mono text-white fw-bold">{formatCurrency(i.total)}</td>
                      <td className="text-muted small">{i.paymentMethod || 'Bank Wire'}</td>
                      <td>
                        <span className={`badge ${i.status === 'Paid' ? 'bg-success' : i.status === 'Pending' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                          {i.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === 'Projects' && (
          <div>
            <h6 className="text-white mb-3">Project Execution Matrix</h6>
            <div className="table-responsive">
              <table className="tensora-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Project Name</th>
                    <th>Client</th>
                    <th>Domain</th>
                    <th>Project Lead</th>
                    <th>Budget</th>
                    <th>Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p.id}>
                      <td className="font-mono text-muted small">{p.id}</td>
                      <td className="text-white fw-semibold">{p.name}</td>
                      <td>{p.client}</td>
                      <td>{p.service}</td>
                      <td>{p.lead}</td>
                      <td className="font-mono text-white fw-bold">{formatCurrency(p.budget)}</td>
                      <td className="font-mono text-info">{p.progress}%</td>
                      <td>
                        <span className={`badge ${p.status === 'Completed' ? 'bg-success' : p.status === 'In Progress' ? 'bg-primary' : 'bg-secondary'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === 'Clients' && (
          <div>
            <h6 className="text-white mb-3">Client Accounts & Revenue Concentration</h6>
            <div className="table-responsive">
              <table className="tensora-table">
                <thead>
                  <tr>
                    <th>Client ID</th>
                    <th>Primary Contact</th>
                    <th>Enterprise Company</th>
                    <th>Email</th>
                    <th>Primary Service</th>
                    <th>Generated Revenue</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map(c => (
                    <tr key={c.id}>
                      <td className="font-mono text-muted small">{c.id}</td>
                      <td className="text-white fw-semibold">{c.name}</td>
                      <td>{c.company}</td>
                      <td className="text-muted small">{c.email}</td>
                      <td>{c.service}</td>
                      <td className="font-mono text-white fw-bold">{formatCurrency(c.revenue)}</td>
                      <td><span className="badge bg-success">{c.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === 'Employees' && (
          <div>
            <h6 className="text-white mb-3">Resource & Payroll Allocation</h6>
            <div className="table-responsive">
              <table className="tensora-table">
                <thead>
                  <tr>
                    <th>Emp ID</th>
                    <th>Specialist Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Monthly Compensation</th>
                    <th>Performance Rating</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(e => (
                    <tr key={e.id}>
                      <td className="font-mono text-muted small">{e.id}</td>
                      <td className="text-white fw-semibold">{e.name}</td>
                      <td>{e.department}</td>
                      <td className="text-muted small">{e.designation}</td>
                      <td className="font-mono text-white">{formatCurrency(e.salary)}</td>
                      <td className="font-mono text-warning">★ {e.rating || '5.0'}</td>
                      <td><span className="badge bg-success">{e.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Notes */}
        <div className="mt-5 pt-3 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between text-muted small" style={{ fontSize: '0.75rem' }}>
          <div>Confidential — For Internal Tensora Digital Solutions Pvt Ltd Board & Executive Management.</div>
          <div>Page 1 of 1</div>
        </div>
      </div>
    </div>
  );
};
