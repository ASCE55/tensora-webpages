import React, { useState } from 'react';
import { Row, Col, Modal, Form } from 'react-bootstrap';
import { Doughnut, Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import '../../utils/chartConfig';
import { defaultChartOptions } from '../../utils/chartConfig';
import { useData } from '../../context/DataContext';
import { formatCurrency, formatCompactCurrency } from '../../utils/formatCurrency';
import { PageHeader } from '../../components/PageHeader';
import { StatCard } from '../../components/StatCard';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { EmptyState } from '../../components/EmptyState';

export const Expenses = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Delete Confirm
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Software',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    vendor: '',
    paidVia: 'Corporate Card'
  });

  const categories = [
    'Software',
    'Hosting',
    'Hardware',
    'Marketing',
    'Office',
    'Salaries',
    'Advertising',
    'Miscellaneous'
  ];

  // Dynamic calculations directly from live records
  const totalExpenses = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  // Group by category for dynamic calculations and charts
  const categoryTotals = categories.reduce((acc, cat) => {
    acc[cat] = expenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    return acc;
  }, {});

  const hostingTotal = categoryTotals['Hosting'] || 0;
  const softwareTotal = categoryTotals['Software'] || 0;
  const hardwareTotal = categoryTotals['Hardware'] || 0;

  // Chart data
  const hasExpenses = totalExpenses > 0;

  const categoryBarData = {
    labels: categories,
    datasets: [
      {
        label: 'OPEX Expenditure (₹)',
        data: categories.map(cat => categoryTotals[cat] || 0),
        backgroundColor: [
          '#006BFF',
          '#00A8FF',
          '#737B87',
          '#FFB300',
          '#00E676',
          '#9D4EDD',
          '#FF3366',
          '#C9CED6'
        ],
        borderRadius: 4
      }
    ]
  };

  const categoryDoughnutData = {
    labels: hasExpenses ? categories : ['No Expenses Recorded'],
    datasets: [
      {
        data: hasExpenses ? categories.map(cat => categoryTotals[cat] || 0) : [1],
        backgroundColor: hasExpenses
          ? [
            '#006BFF',
            '#00A8FF',
            '#737B87',
            '#FFB300',
            '#00E676',
            '#9D4EDD',
            '#FF3366',
            '#C9CED6'
          ]
          : ['rgba(255, 255, 255, 0.08)'],
        borderColor: '#080A0D',
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setSelectedExpense(null);
    setFormData({
      title: '',
      category: 'Software',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      vendor: '',
      paidVia: 'Corporate Card'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (exp) => {
    setIsEditing(true);
    setSelectedExpense(exp);
    setFormData({
      title: exp.title,
      category: exp.category || 'Software',
      amount: exp.amount,
      date: exp.date || new Date().toISOString().split('T')[0],
      vendor: exp.vendor || '',
      paidVia: exp.paidVia || 'Corporate Card'
    });
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || Number(formData.amount) <= 0) {
      toast.error('Please specify a valid expense title and amount.');
      return;
    }

    const payload = {
      ...formData,
      amount: Number(formData.amount)
    };

    if (isEditing && selectedExpense) {
      updateExpense(selectedExpense.id, payload);
      toast.success(`Expense "${payload.title}" updated successfully.`);
    } else {
      addExpense(payload);
      toast.success(`Expense of ${formatCurrency(payload.amount)} recorded.`);
    }
    setShowModal(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteExpense(deleteTargetId);
      toast.success('Expense item removed.');
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
    }
  };

  const filteredExpenses = expenses.filter(e => {
    const matchSearch =
      (e.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.vendor || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.id || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === 'All' || e.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      <PageHeader
        title="Expense Management & OPEX"
        subtitle="Track cloud servers, software licenses, studio equipment, marketing budgets, and operational overhead."
      >
        <button className="btn btn-tensora-primary" onClick={handleOpenAdd}>
          <i className="bi bi-plus-circle"></i> Log New Expense
        </button>
      </PageHeader>

      {/* Dynamic 0 Baseline KPI Cards */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Total Monthly OPEX"
            value={formatCurrency(totalExpenses)}
            icon="bi-wallet2"
            trend={totalExpenses > 0 ? `${expenses.length} Records` : "0 vs last month"}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Cloud & Hosting"
            value={formatCurrency(hostingTotal)}
            icon="bi-cloud-check"
            trend={hostingTotal > 0 ? "Active Clusters" : "0 vs last month"}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Software Tooling"
            value={formatCurrency(softwareTotal)}
            icon="bi-code-slash"
            trend={softwareTotal > 0 ? "Active Subscriptions" : "0 vs last month"}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Hardware & Studio"
            value={formatCurrency(hardwareTotal)}
            icon="bi-cpu"
            trend={hardwareTotal > 0 ? "Studio Assets" : "0 vs last month"}
            trendType="neutral"
          />
        </Col>
      </Row>

      {/* Analytics Chart Row */}
      <Row className="g-4 mb-4">
        <Col xs={12} lg={7}>
          <div className="tensora-card p-4 h-100">
            <h5 className="text-white mb-1">Expense Breakdown by Category</h5>
            <small className="text-muted mb-3 d-block">Dynamic cost distribution across key operational business units</small>
            <div style={{ height: '240px' }}>
              <Bar
                data={categoryBarData}
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

        <Col xs={12} lg={5}>
          <div className="tensora-card p-4 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h5 className="text-white mb-1">OPEX Category Share</h5>
                <small className="text-muted">Proportional operational expense ratio</small>
              </div>
              <span className="badge bg-primary bg-opacity-20 text-primary border border-primary border-opacity-25 font-mono">
                {formatCurrency(totalExpenses)}
              </span>
            </div>

            <div style={{ height: '200px', position: 'relative' }}>
              <Doughnut
                data={categoryDoughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      enabled: hasExpenses
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
                <div className="fs-5 fw-bold text-white font-mono">{formatCurrency(totalExpenses)}</div>
                <div className="text-muted small" style={{ fontSize: '0.7rem' }}>Total OPEX</div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-top border-secondary border-opacity-25 text-center text-muted small">
              {hasExpenses ? `${expenses.length} active OPEX ledger entries recorded` : 'No expenses recorded yet'}
            </div>
          </div>
        </Col>
      </Row>

      {/* Filter and Search Bar */}
      <div className="tensora-card p-3 mb-4">
        <Row className="g-3 align-items-center">
          <Col xs={12} md={6}>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by expense title, vendor, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Expenses Table */}
      {filteredExpenses.length === 0 ? (
        <EmptyState
          icon="bi-wallet2"
          title="No expenses logged yet"
          description="Start tracking infrastructure, software subscriptions, and studio costs by clicking Log New Expense."
          actionText="Log New Expense"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="tensora-card p-0">
          <div className="table-responsive">
            <table className="tensora-table">
              <thead>
                <tr>
                  <th>Expense Item</th>
                  <th>Category</th>
                  <th>Vendor / Provider</th>
                  <th>Billing Date</th>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map(e => (
                  <tr key={e.id}>
                    <td>
                      <div className="fw-bold text-white">{e.title}</div>
                      <small className="text-muted font-mono" style={{ fontSize: '0.72rem' }}>{e.id} • {e.receipt}</small>
                    </td>
                    <td>
                      <span className="badge bg-dark border border-secondary text-info">
                        {e.category}
                      </span>
                    </td>
                    <td className="text-muted small">{e.vendor}</td>
                    <td className="font-mono text-muted small">{e.date}</td>
                    <td>
                      <span className="badge bg-dark border border-secondary text-light">
                        {e.paidVia || 'Corporate Card'}
                      </span>
                    </td>
                    <td className="font-mono text-white fw-bold">{formatCurrency(e.amount)}</td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          title="Edit Expense"
                          onClick={() => handleOpenEdit(e)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Delete Expense"
                          onClick={() => handleDeleteClick(e.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Expense Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-white font-display">
            {isEditing ? `Edit Expense: ${formData.title}` : 'Record New Operational Expense'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label>Expense Title / Description *</Form.Label>
              <Form.Control
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. AWS Production EC2 Cluster"
              />
            </Form.Group>

            <Row className="g-3 mb-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Amount (₹ INR) *</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    min="1"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="e.g. 45000"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mb-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Vendor / Payee</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.vendor}
                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                    placeholder="e.g. Amazon Web Services Inc."
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    value={formData.paidVia}
                    onChange={(e) => setFormData({ ...formData, paidVia: e.target.value })}
                  >
                    <option value="Corporate Card">Corporate Card</option>
                    <option value="Bank Wire / NEFT">Bank Wire / NEFT</option>
                    <option value="UPI">UPI</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Cash">Cash</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label>Transaction Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-tensora-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-tensora-primary">
              <i className="bi bi-check2"></i> {isEditing ? 'Save Changes' : 'Record Expense'}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        show={showDeleteConfirm}
        title="Delete Expense Record"
        message="Are you sure you want to remove this expense entry? This will update your OPEX calculations and reports."
        isDanger={true}
        confirmText="Confirm Delete"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
