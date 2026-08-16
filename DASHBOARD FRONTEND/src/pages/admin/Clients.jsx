import React, { useState } from 'react';
import { Row, Col, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { EmptyState } from '../../components/EmptyState';

export const Clients = () => {
  const { clients, projects, invoices, payments, addClient, updateClient, deleteClient } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Client Details View Modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingClient, setViewingClient] = useState(null);

  // Delete Confirm Modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    service: 'Web Development',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
  });

  const handleOpenAdd = () => {
    setIsEditing(false);
    setSelectedClient(null);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      service: 'Web Development',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (client) => {
    setIsEditing(true);
    setSelectedClient(client);
    setFormData({
      name: client.name,
      company: client.company,
      email: client.email,
      phone: client.phone,
      address: client.address || '',
      service: client.service || 'Web Development',
      status: client.status || 'Active',
      avatar: client.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
    });
    setShowModal(true);
  };

  const handleViewClient = (client) => {
    setViewingClient(client);
    setShowViewModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing && selectedClient) {
      updateClient(selectedClient.id, formData);
      toast.success('Client profile updated successfully.');
    } else {
      addClient(formData);
      toast.success('Client registered successfully.');
    }
    setShowModal(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteClient(deleteTargetId);
      toast.success('Client account removed.');
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
    }
  };

  // Filter & Sort
  const filteredClients = clients
    .filter(c => {
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'revenue') return (b.revenue || 0) - (a.revenue || 0);
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      return 0;
    });

  // Client Specific Projects & Invoices
  const clientProjects = viewingClient ? projects.filter(p => p.clientId === viewingClient.id || p.client === viewingClient.company) : [];
  const clientInvoices = viewingClient ? invoices.filter(i => i.clientId === viewingClient.id || i.company === viewingClient.company) : [];

  return (
    <div>
      <PageHeader
        title="Client Management"
        subtitle="Manage client relationships, enterprise contracts, and project associations."
      >
        <button className="btn btn-tensora-primary" onClick={handleOpenAdd}>
          <i className="bi bi-person-plus-fill"></i> Add New Client
        </button>
      </PageHeader>

      {/* Filter & Search Bar */}
      <div className="tensora-card p-3 mb-4">
        <Row className="g-3 align-items-center">
          <Col xs={12} md={5}>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by client name, company, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={6} md={3}>
            <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Col>
          <Col xs={6} md={4}>
            <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort by: Client Name</option>
              <option value="company">Sort by: Company</option>
              <option value="revenue">Sort by: Highest Revenue</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Clients Table */}
      {filteredClients.length === 0 ? (
        <EmptyState
          icon="bi-people"
          title="No clients match your filter"
          description="Try modifying your search keywords or filter criteria."
          actionText="Add New Client"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="tensora-card p-0">
          <div className="table-responsive">
            <table className="tensora-table">
              <thead>
                <tr>
                  <th>Client ID</th>
                  <th>Client & Company</th>
                  <th>Contact Info</th>
                  <th>Primary Service</th>
                  <th>Projects</th>
                  <th>Total Revenue</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(c => (
                  <tr key={c.id}>
                    <td className="font-mono text-muted small">{c.id}</td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={c.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                          alt={c.name}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-blue)' }}
                        />
                        <div>
                          <div className="text-white fw-semibold">{c.name}</div>
                          <div className="text-muted small">{c.company}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-white small">{c.email}</div>
                      <div className="text-muted font-mono" style={{ fontSize: '0.75rem' }}>{c.phone}</div>
                    </td>
                    <td>
                      <span className="badge bg-dark border border-secondary text-info">
                        {c.service}
                      </span>
                    </td>
                    <td className="font-mono text-center">
                      <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-50">
                        {c.projectsCount || projects.filter(p => p.clientId === c.id || p.client === c.company).length}
                      </span>
                    </td>
                    <td className="fw-bold text-white font-mono">{formatCurrency(c.revenue)}</td>
                    <td>
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-info"
                          title="View Details & Dossier"
                          onClick={() => handleViewClient(c)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          title="Edit Client"
                          onClick={() => handleOpenEdit(c)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Delete Client"
                          onClick={() => handleDeleteClick(c.id)}
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

      {/* Add / Edit Client Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-white font-display">
            {isEditing ? 'Edit Client Profile' : 'Register New Client'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="p-4">
            <Row className="g-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Singhania"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Company / Organization *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Hyperion Technologies"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@company.com"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98000 00000"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Requested Primary Service</Form.Label>
                  <Form.Select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="Game Script Development">Game Script Development</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="3D Modelling">3D Modelling</option>
                    <option value="Professional Photo & Video Editing">Professional Photo & Video Editing</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Relationship Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Billing / Corporate Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Corporate office address"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-tensora-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-tensora-primary">
              <i className="bi bi-check2"></i> {isEditing ? 'Save Changes' : 'Create Client'}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Client Detailed Dossier Modal */}
      {viewingClient && (
        <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-white font-display d-flex align-items-center gap-2">
              <i className="bi bi-building text-primary"></i>
              <span>{viewingClient.name} — {viewingClient.company}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="d-flex align-items-center gap-3 p-3 rounded bg-dark mb-4 border border-secondary border-opacity-25">
              <img
                src={viewingClient.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                alt={viewingClient.name}
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--blue-neon)' }}
              />
              <div className="flex-grow-1">
                <h5 className="text-white mb-0">{viewingClient.name}</h5>
                <div className="text-muted small">{viewingClient.company} • Joined: {viewingClient.joinedDate}</div>
                <div className="text-muted font-mono small">{viewingClient.email} • {viewingClient.phone}</div>
              </div>
              <div>
                <StatusBadge status={viewingClient.status} />
              </div>
            </div>

            {/* Associated Projects */}
            <h6 className="text-white mb-2">Associated Projects ({clientProjects.length})</h6>
            {clientProjects.length === 0 ? (
              <div className="p-3 bg-dark rounded text-muted small mb-4">No active projects assigned to this client.</div>
            ) : (
              <div className="table-responsive mb-4">
                <table className="tensora-table">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Budget</th>
                      <th>Status</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientProjects.map(p => (
                      <tr key={p.id}>
                        <td className="text-white fw-semibold">{p.name}</td>
                        <td className="font-mono text-white">{formatCurrency(p.budget)}</td>
                        <td><StatusBadge status={p.status} /></td>
                        <td className="font-mono text-info">{p.progress}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Associated Invoices */}
            <h6 className="text-white mb-2">Billing & Invoices ({clientInvoices.length})</h6>
            {clientInvoices.length === 0 ? (
              <div className="p-3 bg-dark rounded text-muted small">No invoices generated for this client yet.</div>
            ) : (
              <div className="table-responsive">
                <table className="tensora-table">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Issue Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientInvoices.map(i => (
                      <tr key={i.id}>
                        <td className="font-mono text-white">{i.invoiceNumber}</td>
                        <td className="font-mono text-muted">{i.issueDate}</td>
                        <td className="font-mono text-white fw-bold">{formatCurrency(i.total)}</td>
                        <td><StatusBadge status={i.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-tensora-secondary" onClick={() => setShowViewModal(false)}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        show={showDeleteConfirm}
        title="Delete Client Record"
        message="Are you sure you want to delete this client? This will permanently remove their records from the local system."
        isDanger={true}
        confirmText="Yes, Delete Client"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
