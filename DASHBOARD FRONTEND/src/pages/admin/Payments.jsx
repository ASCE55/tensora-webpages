import React, { useState } from 'react';
import { Row, Col, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { PageHeader } from '../../components/PageHeader';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { EmptyState } from '../../components/EmptyState';

export const Payments = () => {
  const { payments, invoices, addPayment, deletePayment } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    invoiceId: '',
    clientName: '',
    company: '',
    amount: 50000,
    paymentMethod: 'UPI',
    reference: ''
  });

  const totalReceived = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const totalPending = invoices
    .filter(i => i.status === 'Pending' || i.status === 'Partially Paid')
    .reduce((sum, i) => sum + ((Number(i.total) || 0) - (Number(i.paidAmount) || 0)), 0);
  const totalOverdue = invoices
    .filter(i => i.status === 'Overdue')
    .reduce((sum, i) => sum + (Number(i.total) || 0), 0);

  const handleOpenAdd = () => {
    const defaultInv = invoices[0] || {};
    setFormData({
      invoiceId: defaultInv.id || '',
      clientName: defaultInv.clientName || 'Rajesh Singhania',
      company: defaultInv.company || 'Apex Hyperion Technologies',
      amount: defaultInv.total || 50000,
      paymentMethod: 'UPI',
      reference: `UPI/${Date.now().toString().slice(-6)}/tensora@hdfc`
    });
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPayment(formData);
    toast.success('Payment recorded successfully.');
    setShowModal(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deletePayment(deleteTargetId);
      toast.success('Payment entry removed.');
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
    }
  };

  const filteredPayments = payments.filter(p => {
    const matchSearch =
      p.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchMethod = methodFilter === 'All' || p.paymentMethod === methodFilter;
    return matchSearch && matchMethod;
  });

  return (
    <div>
      <PageHeader
        title="Payment Operations & Treasury"
        subtitle="Track incoming client remittances, UPI transactions, bank transfers, and receipts."
      >
        <button className="btn btn-tensora-primary" onClick={handleOpenAdd}>
          <i className="bi bi-credit-card-2-front"></i> Record New Payment
        </button>
      </PageHeader>

      {/* KPI Cards */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Total Remittances"
            value={formatCurrency(totalReceived)}
            icon="bi-cash-coin"
            trend="+15.4%"
            trendType="positive"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Receivables"
            value={formatCurrency(totalPending)}
            icon="bi-hourglass-split"
            trend="Active Invoices"
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Overdue Dues"
            value={formatCurrency(totalOverdue)}
            icon="bi-exclamation-triangle"
            trend="Needs Followup"
            trendType="negative"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Remittance Time"
            value="3.2 Days"
            icon="bi-lightning-charge"
            trend="High Velocity"
            trendType="positive"
          />
        </Col>
      </Row>

      {/* Filters */}
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
                placeholder="Search transaction ID, client, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <Form.Select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)}>
              <option value="All">All Payment Channels</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Credit / Debit Card</option>
              <option value="Cash">Cash</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Payments Table */}
      {filteredPayments.length === 0 ? (
        <EmptyState
          icon="bi-credit-card"
          title="No payment records found"
          description="No transactions match your current search criteria."
          actionText="Record Payment"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="tensora-card p-0">
          <div className="table-responsive">
            <table className="tensora-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Client & Enterprise</th>
                  <th>Remitted Amount</th>
                  <th>Payment Channel</th>
                  <th>Date & Timestamp</th>
                  <th>Bank / Gateway Reference</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(p => (
                  <tr key={p.id}>
                    <td className="font-mono fw-bold text-white">{p.transactionId}</td>
                    <td>
                      <div className="text-white fw-semibold">{p.clientName}</div>
                      <div className="text-muted small">{p.company}</div>
                    </td>
                    <td className="font-mono fw-bold text-success fs-6">{formatCurrency(p.amount)}</td>
                    <td>
                      <span className="badge bg-dark border border-secondary text-info">
                        {p.paymentMethod}
                      </span>
                    </td>
                    <td className="font-mono text-muted small">{p.date}</td>
                    <td className="font-mono text-muted small">{p.reference || '—'}</td>
                    <td>
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete Payment Entry"
                        onClick={() => handleDeleteClick(p.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-white font-display">
            Record Inbound Client Payment
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label>Reference Invoice</Form.Label>
              <Form.Select
                value={formData.invoiceId}
                onChange={(e) => {
                  const inv = invoices.find(i => i.id === e.target.value);
                  setFormData({
                    ...formData,
                    invoiceId: e.target.value,
                    clientName: inv?.clientName || '',
                    company: inv?.company || '',
                    amount: inv?.total || 50000
                  });
                }}
              >
                {invoices.map(i => (
                  <option key={i.id} value={i.id}>
                    {i.invoiceNumber} - {i.company} ({formatCurrency(i.total)})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Row className="g-3 mb-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Remitted Amount (₹) *</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Payment Channel</Form.Label>
                  <Form.Select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  >
                    <option value="UPI">UPI (QR / Direct)</option>
                    <option value="Bank Transfer">Bank Transfer (NEFT/RTGS/IMPS)</option>
                    <option value="Card">Corporate Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label>UTR / Reference Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. UTR-HDFC-99182374"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-tensora-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-tensora-primary">
              <i className="bi bi-check2"></i> Submit Receipt
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        show={showDeleteConfirm}
        title="Delete Payment Entry"
        message="Are you sure you want to remove this payment record from the ledger?"
        isDanger={true}
        confirmText="Yes, Delete Entry"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
