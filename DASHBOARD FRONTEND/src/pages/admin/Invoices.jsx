import React, { useState } from 'react';
import { Row, Col, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { EmptyState } from '../../components/EmptyState';

export const Invoices = () => {
  const { invoices, clients, addInvoice, updateInvoice, deleteInvoice, addPayment } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Delete Confirm
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Invoice Form State
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    company: '',
    email: '',
    address: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '2026-03-15',
    items: [
      { description: 'Web Application Development Services', quantity: 1, rate: 80000, amount: 80000 }
    ],
    taxRate: 18,
    discount: 0,
    status: 'Pending',
    paymentMethod: 'Bank Transfer / UPI',
    notes: 'Thank you for choosing Tensora Digital Solutions Pvt Ltd for your technology solutions.'
  });

  const handleOpenCreate = () => {
    const defaultClient = clients[0] || {};
    setFormData({
      clientId: defaultClient.id || 'CLT-1001',
      clientName: defaultClient.name || 'Rajesh Singhania',
      company: defaultClient.company || 'Apex Hyperion Technologies',
      email: defaultClient.email || 'rajesh.s@apexhyperion.com',
      address: defaultClient.address || 'Cyber City, Phase II, Gurugram, Haryana',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '2026-03-30',
      items: [
        { description: 'Custom Enterprise Portal & API Development', quantity: 1, rate: 120000, amount: 120000 }
      ],
      taxRate: 18,
      discount: 5000,
      status: 'Pending',
      paymentMethod: 'Bank Transfer / UPI',
      notes: 'Thank you for choosing Tensora Digital Solutions Pvt Ltd for your technology solutions.'
    });
    setShowCreateModal(true);
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = Number(newItems[index].quantity || 0) * Number(newItems[index].rate || 0);
    }
    setFormData({ ...formData, items: newItems });
  };

  const handleRemoveItem = (index) => {
    if (formData.items.length <= 1) return;
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  };

  const calculateTax = () => {
    return (calculateSubtotal() * (Number(formData.taxRate) || 0)) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() - (Number(formData.discount) || 0);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subtotal = calculateSubtotal();
    const taxAmount = calculateTax();
    const total = calculateTotal();

    const invoicePayload = {
      ...formData,
      subtotal,
      taxAmount,
      total,
      paidAmount: formData.status === 'Paid' ? total : 0
    };

    addInvoice(invoicePayload);
    toast.success('Invoice generated and recorded.');
    setShowCreateModal(false);
  };

  const handleMarkAsPaid = (invoice) => {
    updateInvoice(invoice.id, {
      status: 'Paid',
      paidAmount: invoice.total
    });
    // Add payment transaction record
    addPayment({
      invoiceId: invoice.id,
      clientName: invoice.clientName,
      company: invoice.company,
      amount: invoice.total,
      paymentMethod: invoice.paymentMethod || 'Bank Transfer'
    });
    toast.success(`Invoice ${invoice.invoiceNumber} marked as PAID.`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteInvoice(deleteTargetId);
      toast.success('Invoice deleted.');
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <PageHeader
        title="Invoice Management"
        subtitle="Generate GST-compliant tax invoices, track payment milestones, and print client receipts."
      >
        <button className="btn btn-tensora-primary" onClick={handleOpenCreate}>
          <i className="bi bi-file-earmark-plus"></i> Generate Invoice
        </button>
      </PageHeader>

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
                placeholder="Search invoice number, client, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Invoices</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Overdue">Overdue</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Invoices Table */}
      {filteredInvoices.length === 0 ? (
        <EmptyState
          icon="bi-receipt"
          title="No invoices found"
          description="There are currently no invoices matching your criteria."
          actionText="Generate Invoice"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="tensora-card p-0">
          <div className="table-responsive">
            <table className="tensora-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Client & Company</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Total Amount</th>
                  <th>Paid Amount</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map(inv => (
                  <tr key={inv.id}>
                    <td className="font-mono fw-bold text-white">{inv.invoiceNumber}</td>
                    <td>
                      <div className="text-white fw-semibold">{inv.clientName}</div>
                      <div className="text-muted small">{inv.company}</div>
                    </td>
                    <td className="font-mono text-muted small">{inv.issueDate}</td>
                    <td className="font-mono text-muted small">{inv.dueDate}</td>
                    <td className="font-mono text-white fw-bold">{formatCurrency(inv.total)}</td>
                    <td className="font-mono text-success">{formatCurrency(inv.paidAmount || 0)}</td>
                    <td>
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-info"
                          title="View & Print Invoice"
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setShowPreviewModal(true);
                          }}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        {inv.status !== 'Paid' && (
                          <button
                            className="btn btn-sm btn-outline-success"
                            title="Mark as Paid"
                            onClick={() => handleMarkAsPaid(inv)}
                          >
                            <i className="bi bi-check2-circle"></i>
                          </button>
                        )}
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Delete Invoice"
                          onClick={() => handleDeleteClick(inv.id)}
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

      {/* Create Invoice Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-white font-display">
            Generate Enterprise Client Invoice
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="p-4">
            <Row className="g-3 mb-4">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Client Account *</Form.Label>
                  <Form.Select
                    value={formData.clientId}
                    onChange={(e) => {
                      const sel = clients.find(c => c.id === e.target.value);
                      setFormData({
                        ...formData,
                        clientId: e.target.value,
                        clientName: sel?.name || '',
                        company: sel?.company || '',
                        email: sel?.email || '',
                        address: sel?.address || ''
                      });
                    }}
                  >
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name} — {c.company}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group>
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group>
                  <Form.Label>Payment Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Line Items Table */}
            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="text-white mb-0">Line Items & Deliverables</h6>
                <button type="button" className="btn btn-sm btn-tensora-outline-blue" onClick={handleAddItem}>
                  <i className="bi bi-plus-lg"></i> Add Item
                </button>
              </div>

              <div className="table-responsive">
                <table className="tensora-table">
                  <thead>
                    <tr>
                      <th style={{ width: '45%' }}>Description</th>
                      <th style={{ width: '15%' }}>Quantity</th>
                      <th style={{ width: '20%' }}>Rate (₹)</th>
                      <th style={{ width: '15%' }}>Amount (₹)</th>
                      <th style={{ width: '5%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Deliverable description"
                            required
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            value={item.rate}
                            onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                          />
                        </td>
                        <td className="font-mono text-white fw-bold">
                          {formatCurrency(item.amount)}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-link text-danger p-0"
                            onClick={() => handleRemoveItem(index)}
                          >
                            <i className="bi bi-x-circle fs-5"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations Summary */}
            <Row className="g-3 mb-3">
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Instructions & Terms</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <div className="p-3 bg-dark rounded border border-secondary border-opacity-25">
                  <div className="d-flex justify-content-between text-muted mb-2">
                    <span>Subtotal:</span>
                    <span className="font-mono text-white">{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between text-muted mb-2">
                    <span>GST Rate (%):</span>
                    <input
                      type="number"
                      className="form-control form-control-sm text-end"
                      style={{ width: '80px' }}
                      value={formData.taxRate}
                      onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between text-muted mb-2">
                    <span>Discount (₹):</span>
                    <input
                      type="number"
                      className="form-control form-control-sm text-end"
                      style={{ width: '120px' }}
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                    />
                  </div>
                  <div className="d-flex justify-content-between pt-2 border-top border-secondary fw-bold text-white fs-5">
                    <span>Grand Total:</span>
                    <span className="font-mono text-primary">{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-tensora-secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-tensora-primary">
              <i className="bi bi-file-earmark-check"></i> Generate Invoice
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Invoice Preview & Printable Document Modal */}
      {selectedInvoice && (
        <Modal show={showPreviewModal} onHide={() => setShowPreviewModal(false)} size="lg" centered>
          <Modal.Header closeButton className="no-print">
            <Modal.Title className="text-white font-display">
              Tax Invoice Document Preview
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="invoice-paper" id="printable-invoice">
              {/* Invoice Header */}
              <div className="d-flex align-items-center justify-content-between border-bottom pb-4 mb-4" style={{ borderColor: 'rgba(0, 102, 255, 0.2)' }}>
                <div className="d-flex align-items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="Tensora"
                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                  />
                  <div>
                    <h3 className="font-display fw-bold mb-0 text-white" style={{ letterSpacing: '0.1em' }}>
                      TEN<span style={{ color: 'var(--blue-neon)' }}>S</span>ORA
                    </h3>
                    <div className="text-muted small fw-semibold text-uppercase" style={{ letterSpacing: '0.1em' }}>
                      DIGITAL SOLUTIONS PVT LTD
                    </div>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                      Cyber City, Phase II, Gurugram, India • GSTIN: 07AAACT8819Z1Z
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <h4 className="text-white font-display mb-1">TAX INVOICE</h4>
                  <div className="text-primary font-mono fw-bold">{selectedInvoice.invoiceNumber}</div>
                  <div className="text-muted small">Date: {selectedInvoice.issueDate}</div>
                  <div className="text-muted small">Due: {selectedInvoice.dueDate}</div>
                </div>
              </div>

              {/* Billed To */}
              <Row className="mb-4">
                <Col xs={6}>
                  <div className="text-muted text-uppercase fw-bold small mb-1" style={{ fontSize: '0.7rem' }}>Billed To:</div>
                  <h5 className="text-white mb-1">{selectedInvoice.clientName}</h5>
                  <div className="fw-semibold text-light small">{selectedInvoice.company}</div>
                  <div className="text-muted small">{selectedInvoice.address || 'Corporate Headquarters'}</div>
                  <div className="text-muted small font-mono">{selectedInvoice.email}</div>
                </Col>
                <Col xs={6} className="text-end">
                  <div className="text-muted text-uppercase fw-bold small mb-1" style={{ fontSize: '0.7rem' }}>Payment Status:</div>
                  <div className="mb-2"><StatusBadge status={selectedInvoice.status} /></div>
                  <div className="text-muted small">Method: {selectedInvoice.paymentMethod || 'Bank Wire / UPI'}</div>
                </Col>
              </Row>

              {/* Items Table */}
              <div className="table-responsive mb-4">
                <table className="tensora-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item & Service Description</th>
                      <th className="text-center">Qty</th>
                      <th className="text-end">Unit Rate</th>
                      <th className="text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedInvoice.items || []).map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td className="text-white fw-semibold">{item.description}</td>
                        <td className="text-center font-mono">{item.quantity}</td>
                        <td className="text-end font-mono text-muted">{formatCurrency(item.rate)}</td>
                        <td className="text-end font-mono text-white fw-bold">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Breakdown */}
              <Row className="justify-content-end mb-4">
                <Col xs={12} md={6}>
                  <div className="p-3 bg-dark bg-opacity-50 rounded border border-secondary border-opacity-25">
                    <div className="d-flex justify-content-between text-muted mb-2 small">
                      <span>Subtotal:</span>
                      <span className="font-mono text-white">{formatCurrency(selectedInvoice.subtotal)}</span>
                    </div>
                    <div className="d-flex justify-content-between text-muted mb-2 small">
                      <span>GST ({selectedInvoice.taxRate || 18}%):</span>
                      <span className="font-mono text-white">{formatCurrency(selectedInvoice.taxAmount)}</span>
                    </div>
                    {selectedInvoice.discount > 0 && (
                      <div className="d-flex justify-content-between text-muted mb-2 small">
                        <span>Discount:</span>
                        <span className="font-mono text-success">-{formatCurrency(selectedInvoice.discount)}</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between pt-2 border-top border-secondary fw-bold text-white fs-5">
                      <span>Total Due:</span>
                      <span className="font-mono text-primary">{formatCurrency(selectedInvoice.total)}</span>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Terms & Bank Info */}
              <div className="pt-3 border-top border-secondary border-opacity-25 text-muted small" style={{ fontSize: '0.78rem' }}>
                <div className="fw-bold text-white mb-1">Banking Information & Transfer Details:</div>
                <div>Bank: HDFC Bank Ltd • Account Name: TENSORA DIGITAL SOLUTIONS PVT LTD</div>
                <div>A/C Number: 50200088910482 • IFSC: HDFC0001248 • UPI ID: tensora@hdfc</div>
                <div className="mt-2 text-muted fst-italic">{selectedInvoice.notes}</div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="no-print">
            <button className="btn btn-tensora-secondary" onClick={() => setShowPreviewModal(false)}>
              Close
            </button>
            <button className="btn btn-tensora-primary" onClick={handlePrint}>
              <i className="bi bi-printer"></i> Print / Save as PDF
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        show={showDeleteConfirm}
        title="Void Invoice"
        message="Are you sure you want to delete this invoice? This will remove all associated payment requirements."
        isDanger={true}
        confirmText="Yes, Delete Invoice"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
