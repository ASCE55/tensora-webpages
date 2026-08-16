import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { PageHeader } from '../../components/PageHeader';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';

export const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { projects, tasks, attendance, punchIn, punchOut } = useData();

  const userId = currentUser?.id || 'TDS001';

  // User-assigned projects
  const myProjects = projects.filter(p => p.leadId === userId || p.team?.includes(userId));

  // User-assigned tasks
  const myTasks = tasks.filter(t => t.assignedTo === userId);
  const pendingTasks = myTasks.filter(t => t.status !== 'Completed');
  const completedTasks = myTasks.filter(t => t.status === 'Completed');

  // Today's attendance
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.find(a => a.date === today);
  const isPunchedIn = todayAttendance && todayAttendance.checkIn !== '—';

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${currentUser?.name || 'Devansh Roy'} 👋`}
        subtitle="Here's your work overview, assigned engineering deliverables, and active sprints."
      >
        <Link to="/user/tasks" className="btn btn-tensora-primary">
          <i className="bi bi-check2-circle"></i> View My Tasks
        </Link>
        <Link to="/user/attendance" className="btn btn-tensora-secondary">
          <i className="bi bi-clock-history"></i> Attendance
        </Link>
      </PageHeader>

      {/* KPI Cards */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Assigned Projects"
            value={myProjects.length}
            icon="bi-kanban"
            trend="Active Sprints"
            trendType="positive"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Tasks"
            value={pendingTasks.length}
            icon="bi-hourglass-split"
            trend={`${pendingTasks.filter(t => t.priority === 'High').length} High Priority`}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Deliverables"
            value={completedTasks.length}
            icon="bi-check-all"
            trend="+3 This Week"
            trendType="positive"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Performance Score"
            value="4.9 / 5.0"
            icon="bi-star-fill"
            trend="Top Tier Specialist"
            trendType="positive"
          />
        </Col>
      </Row>

      {/* Quick Attendance Widget & Active Deliverables */}
      <Row className="g-4 mb-4">
        {/* Attendance Punch Box */}
        <Col xs={12} lg={4}>
          <div className="tensora-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="text-white mb-0">Daily Shift Status</h5>
                <span className="badge bg-dark border border-secondary text-info font-mono">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                </span>
              </div>
              <p className="text-muted small mb-4">
                Record your shifts for compliance, payroll calculation, and project hour logs.
              </p>

              <div className="p-3 bg-dark rounded border border-secondary border-opacity-25 mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Check In:</span>
                  <span className="text-white font-mono fw-bold">{todayAttendance?.checkIn || 'Not Clocked In'}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted small">Check Out:</span>
                  <span className="text-white font-mono fw-bold">{todayAttendance?.checkOut || '—'}</span>
                </div>
              </div>
            </div>

            <div>
              {!isPunchedIn ? (
                <button
                  className="btn btn-tensora-primary w-100 justify-content-center py-2"
                  onClick={punchIn}
                >
                  <i className="bi bi-box-arrow-in-right"></i> Punch In for Today
                </button>
              ) : (
                <button
                  className="btn btn-tensora-outline-blue w-100 justify-content-center py-2"
                  onClick={punchOut}
                >
                  <i className="bi bi-box-arrow-right"></i> Clock Out / End Shift
                </button>
              )}
            </div>
          </div>
        </Col>

        {/* Assigned Projects Table */}
        <Col xs={12} lg={8}>
          <div className="tensora-card p-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h5 className="text-white mb-1">My Active Projects</h5>
                <small className="text-muted">Enterprise deliverables you are collaborating on</small>
              </div>
              <Link to="/user/projects" className="btn btn-sm btn-tensora-outline-blue">
                View All Projects →
              </Link>
            </div>

            <div className="table-responsive">
              <table className="tensora-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Domain</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {myProjects.slice(0, 4).map(p => (
                    <tr key={p.id}>
                      <td className="text-white fw-semibold">
                        <div>{p.name}</div>
                        <small className="text-muted">{p.client}</small>
                      </td>
                      <td>
                        <span className="badge bg-dark border border-secondary text-info">
                          {p.service}
                        </span>
                      </td>
                      <td className="font-mono text-muted small">{p.deadline}</td>
                      <td>
                        <StatusBadge status={p.status} />
                      </td>
                      <td style={{ minWidth: '100px' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div className="progress flex-grow-1" style={{ height: '6px', background: '#1a222d' }}>
                            <div
                              className="progress-bar"
                              style={{
                                width: `${p.progress}%`,
                                background: 'linear-gradient(90deg, var(--blue-deep), var(--blue-neon))'
                              }}
                            ></div>
                          </div>
                          <span className="font-mono small text-white" style={{ fontSize: '0.75rem' }}>{p.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>

      {/* My Assigned Sprint Tasks */}
      <div className="tensora-card p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h5 className="text-white mb-1">My Priority Tasks</h5>
            <small className="text-muted">Direct sprint items assigned for implementation</small>
          </div>
          <Link to="/user/tasks" className="btn btn-sm btn-tensora-outline-blue">
            Manage Tasks →
          </Link>
        </div>

        <div className="table-responsive">
          <table className="tensora-table">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Task Specification</th>
                <th>Project</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {myTasks.slice(0, 5).map(t => (
                <tr key={t.id}>
                  <td className="font-mono text-muted small">{t.id}</td>
                  <td className="text-white fw-semibold">{t.name}</td>
                  <td className="text-primary small">{t.projectName}</td>
                  <td>
                    <span className={`badge ${t.priority === 'High' ? 'bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50' : t.priority === 'Medium' ? 'bg-warning bg-opacity-25 text-warning border border-warning border-opacity-50' : 'bg-success bg-opacity-25 text-success border border-success border-opacity-50'}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="font-mono text-muted small">{t.deadline}</td>
                  <td>
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="font-mono text-info fw-bold">{t.progress}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
