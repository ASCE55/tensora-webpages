import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { PageHeader } from '../../components/PageHeader';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';

export const Attendance = () => {
  const { attendance, punchIn, punchOut } = useData();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todayRecord = attendance.find(a => a.date === today);
  const isPunchedIn = todayRecord && todayRecord.checkIn !== '—';
  const isPunchedOut = todayRecord && todayRecord.checkOut !== '—';

  const presentDays = attendance.filter(a => a.status === 'Present').length;
  const leaveDays = attendance.filter(a => a.status === 'Leave').length;

  const handlePunchIn = () => {
    punchIn();
    toast.success('Punched in successfully. Shift active.');
  };

  const handlePunchOut = () => {
    punchOut();
    toast.success('Clocked out. Great work today!');
  };

  return (
    <div>
      <PageHeader
        title="Attendance & Time Tracker"
        subtitle="Manage daily shifts, clock in/out times, and monthly work log history."
      />

      {/* Live Clock & Punch Action Card */}
      <div className="tensora-card p-4 mb-4">
        <Row className="align-items-center g-4">
          <Col xs={12} md={6}>
            <div className="d-flex align-items-center gap-4">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle pulse-indicator"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(0, 87, 255, 0.12)',
                  border: '2px solid var(--blue-neon)',
                  color: 'var(--blue-neon)',
                  fontSize: '2rem'
                }}
              >
                <i className="bi bi-stopwatch"></i>
              </div>
              <div>
                <div className="text-muted small text-uppercase fw-semibold" style={{ letterSpacing: '0.1em' }}>
                  {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <h2 className="text-white font-mono fw-bold mb-0" style={{ letterSpacing: '0.05em' }}>
                  {currentTime}
                </h2>
                <div className="text-primary small mt-1">
                  Status: {isPunchedIn && !isPunchedOut ? '🟢 Currently Clocked In (Active Shift)' : isPunchedOut ? '🔵 Shift Completed' : '⚪ Not Clocked In'}
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} md={6} className="text-md-end">
            <div className="d-inline-flex gap-3">
              {!isPunchedIn ? (
                <button className="btn btn-tensora-primary py-2 px-4 fs-6" onClick={handlePunchIn}>
                  <i className="bi bi-box-arrow-in-right me-1"></i> Punch In
                </button>
              ) : !isPunchedOut ? (
                <button className="btn btn-tensora-outline-blue py-2 px-4 fs-6" onClick={handlePunchOut}>
                  <i className="bi bi-box-arrow-right me-1"></i> Clock Out (End Shift)
                </button>
              ) : (
                <div className="p-2 px-3 rounded bg-success bg-opacity-25 text-success border border-success border-opacity-50 small fw-bold">
                  <i className="bi bi-check-circle me-1"></i> Shift Closed For Today
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>

      {/* Monthly KPIs */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Days Present"
            value={presentDays}
            icon="bi-calendar-check"
            trend="96% Attendance"
            trendType="positive"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Average Working Hours"
            value="9h 25m"
            icon="bi-hourglass-split"
            trend="+15m vs Target"
            trendType="positive"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Leaves Taken"
            value={leaveDays}
            icon="bi-calendar-x"
            trend="1 Approved Leave"
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Overtime Logged"
            value="4h 10m"
            icon="bi-lightning-charge"
            trend="Standard Compensated"
            trendType="positive"
          />
        </Col>
      </Row>

      {/* Attendance History Table */}
      <div className="tensora-card p-4">
        <h5 className="text-white mb-3">Recent Attendance Ledger</h5>
        <div className="table-responsive">
          <table className="tensora-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Clock In Time</th>
                <th>Clock Out Time</th>
                <th>Total Shift Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(a => (
                <tr key={a.id}>
                  <td className="font-mono text-white fw-semibold">{a.date}</td>
                  <td className="font-mono text-muted small">{a.checkIn}</td>
                  <td className="font-mono text-muted small">{a.checkOut}</td>
                  <td className="font-mono text-info fw-bold">{a.hours}</td>
                  <td>
                    <StatusBadge status={a.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
