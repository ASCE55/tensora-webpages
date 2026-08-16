import React, { useState } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { Line, Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import '../../utils/chartConfig';
import { defaultChartOptions } from '../../utils/chartConfig';
import { useData } from '../../context/DataContext';
import { formatCurrency, formatCompactCurrency } from '../../utils/formatCurrency';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { PageHeader } from '../../components/PageHeader';
import { EmptyState } from '../../components/EmptyState';

export const AdminDashboard = () => {
  const { kpis, projects, tasks, invoices, expenses, clients } = useData();
  const [revenueFilter, setRevenueFilter] = useState('6M'); // '7D' | '30D' | '6M' | '1Y'

  // Revenue Chart Data based on actual records (or zero baseline)
  const getRevenueChartData = () => {
    let labels = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    let revenueData = [0, 0, 0, 0, 0, kpis.monthlyRevenue || 0];
    let expenseData = [0, 0, 0, 0, 0, kpis.monthlyExpenses || 0];

    if (revenueFilter === '7D') {
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      revenueData = [0, 0, 0, 0, 0, 0, kpis.monthlyRevenue || 0];
      expenseData = [0, 0, 0, 0, 0, 0, kpis.monthlyExpenses || 0];
    } else if (revenueFilter === '30D') {
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      revenueData = [0, 0, 0, kpis.monthlyRevenue || 0];
      expenseData = [0, 0, 0, kpis.monthlyExpenses || 0];
    } else if (revenueFilter === '1Y') {
      labels = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
      revenueData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, kpis.monthlyRevenue || 0];
      expenseData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, kpis.monthlyExpenses || 0];
    }

    const profitData = revenueData.map((rev, i) => rev - expenseData[i]);

    return {
      labels,
      datasets: [
        {
          label: 'Revenue (₹)',
          data: revenueData,
          borderColor: '#006BFF',
          backgroundColor: 'rgba(0, 107, 255, 0.15)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#00A8FF',
          pointBorderColor: '#ffffff',
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Expenses (₹)',
          data: expenseData,
          borderColor: '#737B87',
          backgroundColor: 'rgba(115, 123, 135, 0.08)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#C9CED6',
          pointBorderColor: '#ffffff',
          pointRadius: 3,
          pointHoverRadius: 5
        },
        {
          label: 'Net Profit (₹)',
          data: profitData,
          borderColor: '#00E676',
          borderDash: [5, 5],
          backgroundColor: 'transparent',
          tension: 0.4,
          pointBackgroundColor: '#00E676',
          pointRadius: 3
        }
      ]
    };
  };

  // Projects Distribution Doughnut Data
  const statusCounts = {
    'In Progress': projects.filter(p => p.status === 'In Progress').length,
    'Planning': projects.filter(p => p.status === 'Planning').length,
    'Review': projects.filter(p => p.status === 'Review').length,
    'Completed': projects.filter(p => p.status === 'Completed').length,
    'On Hold': projects.filter(p => p.status === 'On Hold').length,
    'Cancelled': projects.filter(p => p.status === 'Cancelled').length
  };

  const totalProjectsCount = projects.length;

  const projectDoughnutData = {
    labels: totalProjectsCount === 0 ? ['No Projects Yet'] : ['In Progress', 'Planning', 'Review', 'Completed', 'On Hold', 'Cancelled'],
    datasets: [
      {
        data: totalProjectsCount === 0
          ? [1]
          : [
            statusCounts['In Progress'],
            statusCounts['Planning'],
            statusCounts['Review'],
            statusCounts['Completed'],
            statusCounts['On Hold'],
            statusCounts['Cancelled']
          ],
        backgroundColor: totalProjectsCount === 0
          ? ['rgba(255, 255, 255, 0.08)']
          : [
            '#006BFF',
            '#737B87',
            '#FFB300',
            '#00E676',
            '#9D4EDD',
            '#FF3366'
          ],
        borderColor: '#080A0D',
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

  // Task Summary calculations
  const highTasks = tasks.filter(t => t.priority === 'High' && t.status !== 'Completed').length;
  const medTasks = tasks.filter(t => t.priority === 'Medium' && t.status !== 'Completed').length;
  const lowTasks = tasks.filter(t => t.priority === 'Low' && t.status !== 'Completed').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const totalTasks = tasks.length;

  return (
    <div>
      {/* Header */}
      <PageHeader
        title="Welcome back, Admin 👋"
        subtitle="Here's your TENSORA business overview and executive operations."
      >
        <Link to="/admin/projects" className="btn btn-tensora-primary">
          <i className="bi bi-plus-circle"></i> Create Project
        </Link>
        <Link to="/admin/invoices" className="btn btn-tensora-secondary">
          <i className="bi bi-receipt"></i> Generate Invoice
        </Link>
      </PageHeader>

      {/* 8 KPI Cards with 0 starting values */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Total Clients"
            value={kpis.totalClients || 0}
            icon="bi-building"
            trend={kpis.totalClients > 0 ? `+${kpis.totalClients} Active` : "0 vs last month"}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Active Projects"
            value={kpis.activeProjects || 0}
            icon="bi-kanban"
            trend={kpis.activeProjects > 0 ? `+${kpis.activeProjects} Active` : "0 vs last month"}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(kpis.monthlyRevenue || 0)}
            icon="bi-currency-rupee"
            trend={kpis.monthlyRevenue > 0 ? `+${formatCurrency(kpis.monthlyRevenue)}` : "0 vs last month"}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Payments"
            value={formatCurrency(kpis.pendingPayments || 0)}
            icon="bi-hourglass-split"
            trend={kpis.pendingPayments > 0 ? `${invoices.filter(i => i.status !== 'Paid').length} Invoices` : "0 Invoices"}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Total Employees"
            value={kpis.employees || 0}
            icon="bi-people"
            trend={kpis.employees > 0 ? `${kpis.employees} Onboarded` : "0 vs last month"}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Monthly Expenses"
            value={formatCurrency(kpis.monthlyExpenses || 0)}
            icon="bi-wallet2"
            trend={kpis.monthlyExpenses > 0 ? formatCurrency(kpis.monthlyExpenses) : "0 vs last month"}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Net Profit"
            value={formatCurrency(kpis.netProfit || 0)}
            icon="bi-trophy"
            trend={kpis.netProfit !== 0 ? formatCurrency(kpis.netProfit) : "0 vs last month"}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Tasks"
            value={kpis.pendingTasks || 0}
            icon="bi-check2-square"
            trend={`${highTasks} High Priority`}
            trendType="neutral"
          />
        </Col>
      </Row>

      {/* Analytics Charts Section */}
      <Row className="g-4 mb-4">
        {/* Revenue Overview Line Chart */}
        <Col xs={12} lg={8}>
          <div className="tensora-card p-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
              <div>
                <h5 className="text-white mb-1">Financial & Operations Performance</h5>
                <small className="text-muted">Dynamic Revenue vs OPEX Expenses vs Net Operating Profit</small>
              </div>
              <div className="d-flex align-items-center gap-1 bg-dark p-1 rounded border border-secondary border-opacity-25">
                {['7D', '30D', '6M', '1Y'].map(filter => (
                  <button
                    key={filter}
                    className={`btn btn-sm ${revenueFilter === filter ? 'btn-primary' : 'btn-dark text-muted'} py-1 px-3`}
                    style={{ fontSize: '0.75rem', fontWeight: 600 }}
                    onClick={() => setRevenueFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ height: '280px', position: 'relative' }}>
              <Line
                data={getRevenueChartData()}
                options={{
                  ...defaultChartOptions,
                  scales: {
                    ...defaultChartOptions.scales,
                    y: {
                      ...defaultChartOptions.scales.y,
                      ticks: {
                        color: '#737B87',
                        callback: (val) => formatCompactCurrency(val)
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </Col>

        {/* Project Pipeline Doughnut Chart */}
        <Col xs={12} lg={4}>
          <div className="tensora-card p-4 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h5 className="text-white mb-1">Project Pipeline</h5>
                <small className="text-muted">Lifecycle Status Distribution</small>
              </div>
              <span className="badge bg-primary bg-opacity-20 text-primary border border-primary border-opacity-25">
                {totalProjectsCount} Total
              </span>
            </div>

            <div style={{ height: '200px', position: 'relative' }}>
              <Doughnut
                data={projectDoughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      enabled: totalProjectsCount > 0
                    }
                  },
                  cutout: '70%'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none'
                }}
              >
                <div className="fs-3 fw-bold text-white font-mono">{totalProjectsCount}</div>
                <div className="text-muted small" style={{ fontSize: '0.7rem' }}>Projects</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-top border-secondary border-opacity-25">
              <Row className="g-2 text-center">
                <Col xs={4}>
                  <div className="p-1 rounded bg-dark border border-secondary border-opacity-25">
                    <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>In Progress</small>
                    <span className="fw-bold text-primary font-mono">{statusCounts['In Progress']}</span>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="p-1 rounded bg-dark border border-secondary border-opacity-25">
                    <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Planning</small>
                    <span className="fw-bold text-secondary font-mono">{statusCounts['Planning']}</span>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="p-1 rounded bg-dark border border-secondary border-opacity-25">
                    <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Review</small>
                    <span className="fw-bold text-warning font-mono">{statusCounts['Review']}</span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* Recent Projects Table & Activity Audit */}
      <Row className="g-4">
        {/* Recent Projects */}
        <Col xs={12} lg={8}>
          <div className="tensora-card p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h5 className="text-white mb-1">Recent Enterprise Deliverables</h5>
                <small className="text-muted">Latest client projects in execution pipeline</small>
              </div>
              <Link to="/admin/projects" className="btn btn-sm btn-tensora-secondary">
                View All Deliverables
              </Link>
            </div>

            {projects.length === 0 ? (
              <EmptyState
                icon="bi-kanban"
                title="No projects recorded yet"
                description="Start by creating a new client project to track progress, budgets, and milestones."
                actionText="Create Project"
                onAction={() => window.location.href = '/admin/projects'}
              />
            ) : (
              <div className="table-responsive">
                <table className="tensora-table">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Client</th>
                      <th>Lead</th>
                      <th>Budget</th>
                      <th>Status</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.slice(0, 5).map(p => (
                      <tr key={p.id}>
                        <td>
                          <div className="fw-bold text-white">{p.name}</div>
                          <small className="text-muted font-mono" style={{ fontSize: '0.72rem' }}>{p.id}</small>
                        </td>
                        <td className="text-muted small">{p.client}</td>
                        <td>
                          <span className="badge bg-primary bg-opacity-20 text-primary border border-primary border-opacity-25">
                            {p.lead}
                          </span>
                        </td>
                        <td className="font-mono text-white fw-semibold">{formatCurrency(p.budget)}</td>
                        <td>
                          <StatusBadge status={p.status} />
                        </td>
                        <td style={{ minWidth: '100px' }}>
                          <div className="d-flex align-items-center gap-2">
                            <div className="progress flex-grow-1" style={{ height: '6px', background: '#1a222d' }}>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${p.progress}%`,
                                  background: 'linear-gradient(90deg, var(--blue-deep), var(--blue-neon))'
                                }}
                              ></div>
                            </div>
                            <span className="font-mono small text-muted">{p.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Col>

        {/* Task Priority Breakdown */}
        <Col xs={12} lg={4}>
          <div className="tensora-card p-4">
            <h5 className="text-white mb-1">Task Priority Breakdown</h5>
            <small className="text-muted d-block mb-3">Active tasks distributed by severity</small>

            <div className="p-3 bg-dark rounded border border-secondary border-opacity-25 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-danger fw-semibold small">
                  <i className="bi bi-circle-fill me-1" style={{ fontSize: '8px' }}></i> High Priority
                </span>
                <span className="font-mono text-white fw-bold">{highTasks}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-warning fw-semibold small">
                  <i className="bi bi-circle-fill me-1" style={{ fontSize: '8px' }}></i> Medium Priority
                </span>
                <span className="font-mono text-white fw-bold">{medTasks}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-success fw-semibold small">
                  <i className="bi bi-circle-fill me-1" style={{ fontSize: '8px' }}></i> Low Priority
                </span>
                <span className="font-mono text-white fw-bold">{lowTasks}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-25">
                <span className="text-muted small">Completed Tasks</span>
                <span className="font-mono text-success fw-bold">{completedTasks} / {totalTasks}</span>
              </div>
            </div>

            <Link to="/admin/tasks" className="btn btn-tensora-secondary w-100 justify-content-center py-2">
              <i className="bi bi-kanban"></i> Open Sprint Kanban Board
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};
