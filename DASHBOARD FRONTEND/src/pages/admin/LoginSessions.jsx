import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { PageHeader } from '../../components/PageHeader';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { EmptyState } from '../../components/EmptyState';
import { ConfirmDialog } from '../../components/ConfirmDialog';

export const LoginSessions = () => {
  const { employees, loginSessions, clearLoginSessions } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployeeFilter, setSelectedEmployeeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Exclude admin records so only employees are audited
  const employeeList = employees.filter(e => e.role !== 'admin' && e.id !== 'ADM-001');
  const employeeSessions = loginSessions.filter(s => s.employeeId !== 'ADM-001' && s.employeeName !== 'Tensora Administrator');

  // Compute stats for employees
  const totalLogins = employeeSessions.length;
  const activeSessions = employeeSessions.filter(s => s.status === 'Active');

  // Compute session minutes for each session
  const parseSessionMinutes = (ses) => {
    if (ses.loginTimestamp) {
      const endMs = (ses.status === 'Active') ? Date.now() : (ses.logoutTimestamp || ses.loginTimestamp);
      return Math.max(0, Math.round((endMs - ses.loginTimestamp) / 60000));
    }
    if (ses.duration && typeof ses.duration === 'string' && ses.duration.includes('h')) {
      const parts = ses.duration.split('h');
      const hours = parseInt(parts[0], 10) || 0;
      const mins = parseInt(parts[1], 10) || 0;
      return hours * 60 + mins;
    }
    return 0;
  };

  // Compute total login count & cumulative login hours per employee
  const employeeLoginCounts = employeeList.reduce((acc, emp) => {
    acc[emp.id] = employeeSessions.filter(s => s.employeeId === emp.id).length;
    return acc;
  }, {});

  const employeeLoginMinutes = employeeList.reduce((acc, emp) => {
    const empSessions = employeeSessions.filter(s => s.employeeId === emp.id);
    const totalMinutes = empSessions.reduce((sum, s) => sum + parseSessionMinutes(s), 0);
    acc[emp.id] = totalMinutes;
    return acc;
  }, {});

  // Find most active employee based on cumulative LOGIN HOURS
  let topEmpId = null;
  let maxMinutes = 0;
  Object.entries(employeeLoginMinutes).forEach(([id, mins]) => {
    if (mins > maxMinutes) {
      maxMinutes = mins;
      topEmpId = id;
    }
  });

  const topEmp = topEmpId ? employeeList.find(e => e.id === topEmpId) : null;
  const topHoursFormatted = maxMinutes > 0
    ? (maxMinutes >= 60 ? `${(maxMinutes / 60).toFixed(1)}h Worked` : `${maxMinutes}m Worked`)
    : "0h Logged";

  // Calculate dynamic Average Shift Time across employees
  const totalMinsAcrossAll = Object.values(employeeLoginMinutes).reduce((a, b) => a + b, 0);
  const avgShiftMins = employeeSessions.length > 0 ? Math.round(totalMinsAcrossAll / employeeSessions.length) : 0;
  const avgShiftStr = avgShiftMins > 0
    ? (avgShiftMins >= 60 ? `${Math.floor(avgShiftMins / 60)}h ${avgShiftMins % 60}m` : `${avgShiftMins}m`)
    : "0h 0m";

  // Filtered Sessions
  const filteredSessions = employeeSessions.filter(s => {
    const matchSearch =
      (s.employeeName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.employeeId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.ipAddress || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.device || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchEmp = selectedEmployeeFilter === 'All' || s.employeeId === selectedEmployeeFilter;
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchEmp && matchStatus;
  });

  const handleExportCSV = () => {
    const headers = ['Session ID', 'Employee ID', 'Employee Name', 'Department', 'Login Time', 'Logout Time', 'Duration', 'IP Address', 'Device', 'Status'];
    const rows = filteredSessions.map(s => [
      s.id,
      s.employeeId,
      s.employeeName,
      s.department,
      s.loginTime,
      s.logoutTime,
      s.duration,
      s.ipAddress,
      `"${s.device}"`,
      s.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Tensora_Employee_Login_Sessions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Employee login sessions exported to CSV.');
  };

  const handleConfirmClear = () => {
    clearLoginSessions();
    setShowClearConfirm(false);
    toast.info('Employee session audit logs purged.');
  };

  return (
    <div>
      <PageHeader
        title="Employee Login & Session Audit"
        subtitle="Monitor real-time employee sign-in frequency, active device sessions, and exact logout timestamps."
      >
        <button className="btn btn-tensora-secondary" onClick={handleExportCSV}>
          <i className="bi bi-file-earmark-spreadsheet"></i> Export Session Logs
        </button>
        <button className="btn btn-tensora-danger" onClick={() => setShowClearConfirm(true)}>
          <i className="bi bi-trash"></i> Purge Logs
        </button>
      </PageHeader>

      {/* KPI Cards with 0 Baseline */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Total Logins Recorded"
            value={totalLogins}
            icon="bi-box-arrow-in-right"
            trend={totalLogins > 0 ? `+${totalLogins} Total` : "0 vs last month"}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Active Live Sessions"
            value={`${activeSessions.length} Online`}
            icon="bi-broadcast"
            trend={activeSessions.length > 0 ? `${activeSessions.length} Active Now` : "0 Online"}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Most Active Member"
            value={topEmp ? topEmp.name : "None Yet"}
            icon="bi-trophy-fill"
            trend={topHoursFormatted}
            trendType={maxMinutes > 0 ? "positive" : "neutral"}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Average Shift Time"
            value={avgShiftStr}
            icon="bi-clock-history"
            trend={avgShiftMins > 0 ? "Dynamic Average" : "0 vs last month"}
            trendType="neutral"
          />
        </Col>
      </Row>

      {/* Per-Employee Login Frequency Matrix */}
      <div className="tensora-card p-4 mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h5 className="text-white mb-1">Employee Authentication Frequency & Hours Matrix</h5>
            <small className="text-muted">Total login occurrences, cumulative login hours, and connectivity status for each team member</small>
          </div>
          <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-50">
            {employeeList.length} Authorized Employees
          </span>
        </div>

        {employeeList.length === 0 ? (
          <div className="p-4 text-center text-muted bg-dark rounded border border-secondary border-opacity-25">
            <i className="bi bi-person-x fs-2 text-primary d-block mb-2"></i>
            <div className="text-white fw-semibold mb-1">No Employee Accounts Registered</div>
            <small>Create employee accounts and assign passwords in the Employees tab to start tracking their session activity and login hours.</small>
          </div>
        ) : (
          <Row className="g-3">
            {employeeList.map(emp => {
              const empSessions = employeeSessions.filter(s => s.employeeId === emp.id);
              const isOnline = empSessions.some(s => s.status === 'Active');
              const lastSession = empSessions[0];
              const totalCount = employeeLoginCounts[emp.id] || 0;
              const totalMins = employeeLoginMinutes[emp.id] || 0;
              const hoursWorkedStr = totalMins >= 60
                ? `${Math.floor(totalMins / 60)}h ${totalMins % 60}m`
                : `${totalMins}m`;

              return (
                <Col xs={12} md={6} lg={4} key={emp.id}>
                  <div
                    className="p-3 rounded h-100 d-flex flex-column justify-content-between cursor-pointer"
                    style={{
                      background: isOnline ? 'rgba(0, 87, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: isOnline ? '1px solid var(--blue-neon)' : '1px solid var(--border-subtle)',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setSelectedEmployeeFilter(emp.id)}
                    title="Click to filter session ledger for this employee"
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={emp.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                          alt={emp.name}
                          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-blue)' }}
                        />
                        <div>
                          <div className="text-white fw-bold small">{emp.name}</div>
                          <div className="text-muted" style={{ fontSize: '0.72rem' }}>{emp.id} • {emp.department}</div>
                        </div>
                      </div>
                      {isOnline ? (
                        <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 font-mono small d-flex align-items-center gap-1">
                          <span className="badge-status-dot bg-success"></span> Online
                        </span>
                      ) : (
                        <span className="badge bg-dark border border-secondary text-muted font-mono small">
                          Offline
                        </span>
                      )}
                    </div>

                    <div className="pt-2 border-top border-secondary border-opacity-25 mt-2">
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Total Logins:</span>
                        <strong className="text-primary font-mono">{totalCount} Logins</strong>
                      </div>
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Total Login Hours:</span>
                        <strong className="text-warning font-mono">{hoursWorkedStr}</strong>
                      </div>
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Last Sign-In:</span>
                        <span className="font-mono text-white" style={{ fontSize: '0.72rem' }}>
                          {lastSession?.loginTime ? lastSession.loginTime.split(' ')[1] : '—'}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Last Sign-Out:</span>
                        <span className="font-mono text-white" style={{ fontSize: '0.72rem' }}>
                          {lastSession?.logoutTime !== '—' ? lastSession?.logoutTime?.split(' ')[1] : 'Active Shift'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        )}
      </div>

      {/* Session Filter Bar */}
      <div className="tensora-card p-3 mb-4">
        <Row className="g-3 align-items-center">
          <Col xs={12} md={4}>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search employee name, ID, IP, device..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={6} md={4}>
            <Form.Select value={selectedEmployeeFilter} onChange={(e) => setSelectedEmployeeFilter(e.target.value)}>
              <option value="All">All Employees</option>
              {employeeList.map(e => (
                <option key={e.id} value={e.id}>{e.name} ({e.id})</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6} md={4}>
            <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Session Statuses</option>
              <option value="Active">Active Online Sessions Only</option>
              <option value="Logged Out">Closed / Logged Out Sessions</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Chronological Session History Ledger Table */}
      {filteredSessions.length === 0 ? (
        <EmptyState
          icon="bi-clock-history"
          title="No employee session records found"
          description="There are no employee login logs recorded yet. When employees authenticate, their session logs will appear here."
        />
      ) : (
        <div className="tensora-card p-0">
          <div className="table-responsive">
            <table className="tensora-table">
              <thead>
                <tr>
                  <th>Session ID</th>
                  <th>Employee</th>
                  <th>Sign-In Timestamp</th>
                  <th>Sign-Out Timestamp</th>
                  <th>Session Duration</th>
                  <th>Client IP & Network</th>
                  <th>Device / OS</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map(ses => (
                  <tr key={ses.id}>
                    <td className="font-mono text-muted small">{ses.id}</td>
                    <td>
                      <div>
                        <div className="text-white fw-semibold">{ses.employeeName}</div>
                        <div className="text-muted font-mono" style={{ fontSize: '0.72rem' }}>{ses.employeeId} • {ses.department}</div>
                      </div>
                    </td>
                    <td className="font-mono text-white small">
                      <i className="bi bi-box-arrow-in-right text-success me-1"></i>
                      {ses.loginTime}
                    </td>
                    <td className="font-mono text-muted small">
                      {ses.logoutTime !== '—' ? (
                        <>
                          <i className="bi bi-box-arrow-right text-danger me-1"></i>
                          {ses.logoutTime}
                        </>
                      ) : (
                        <span className="text-info font-mono">Shift In Progress</span>
                      )}
                    </td>
                    <td className="font-mono text-white fw-semibold">{ses.duration}</td>
                    <td className="font-mono text-white small">{ses.ipAddress}</td>
                    <td className="text-white small">{ses.device}</td>
                    <td>
                      {ses.status === 'Active' ? (
                        <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 font-mono small d-inline-flex align-items-center gap-1">
                          <span className="badge-status-dot bg-success"></span> Online
                        </span>
                      ) : (
                        <span className="badge bg-dark border border-secondary text-muted font-mono small">
                          Closed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Purge Confirm Dialog */}
      <ConfirmDialog
        show={showClearConfirm}
        title="Purge Employee Session Logs"
        message="Are you sure you want to clear the chronological employee login history logs? This action will reset session history records."
        isDanger={true}
        confirmText="Confirm Purge"
        onConfirm={handleConfirmClear}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
};
