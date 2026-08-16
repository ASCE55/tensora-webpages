import React, { useState } from 'react';
import { Row, Col, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { EmptyState } from '../../components/EmptyState';

export const Projects = () => {
  const { projects, clients, employees, services, addProject, updateProject, deleteProject } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Delete Confirm
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    clientId: '',
    service: 'Web Development',
    lead: '',
    leadId: '',
    startDate: '',
    deadline: '',
    budget: 150000,
    status: 'In Progress',
    priority: 'High',
    progress: 50,
    description: '',
    team: []
  });

  const handleOpenAdd = () => {
    setIsEditing(false);
    setSelectedProject(null);
    const defaultLead = employees[0]?.name || 'Tensora Lead';
    const defaultLeadId = employees[0]?.id || 'ADM-001';
    const defaultClient = clients[0]?.company || 'Tensora Client';
    const defaultClientId = clients[0]?.id || 'CLT-1001';

    setFormData({
      name: '',
      client: defaultClient,
      clientId: defaultClientId,
      service: 'Web Development',
      lead: defaultLead,
      leadId: defaultLeadId,
      startDate: new Date().toISOString().split('T')[0],
      deadline: '2026-04-30',
      budget: 150000,
      status: 'In Progress',
      priority: 'High',
      progress: 25,
      description: '',
      team: [defaultLeadId]
    });
    setShowModal(true);
  };

  const handleOpenEdit = (project) => {
    setIsEditing(true);
    setSelectedProject(project);
    setFormData({
      name: project.name,
      client: project.client,
      clientId: project.clientId || '',
      service: project.service || 'Web Development',
      lead: project.lead,
      leadId: project.leadId || '',
      startDate: project.startDate || '',
      deadline: project.deadline || '',
      budget: project.budget || 0,
      status: project.status || 'In Progress',
      priority: project.priority || 'Medium',
      progress: project.progress || 0,
      description: project.description || '',
      team: project.team || []
    });
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing && selectedProject) {
      updateProject(selectedProject.id, formData);
      toast.success('Project details updated successfully.');
    } else {
      addProject(formData);
      toast.success('New enterprise project initiated.');
    }
    setShowModal(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteProject(deleteTargetId);
      toast.success('Project deliverable removed.');
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchService = serviceFilter === 'All' || p.service === serviceFilter;
    return matchSearch && matchStatus && matchService;
  });

  return (
    <div>
      <PageHeader
        title="Project Management"
        subtitle="Track technical execution, client milestones, team assignments, and delivery schedules."
      >
        <button className="btn btn-tensora-primary" onClick={handleOpenAdd}>
          <i className="bi bi-plus-circle-fill"></i> Create New Project
        </button>
      </PageHeader>

      {/* Filter Row */}
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
                placeholder="Search project name, client, lead, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={6} md={3}>
            <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>
          </Col>
          <Col xs={6} md={4}>
            <Form.Select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
              <option value="All">All Service Domains</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="Game Script Development">Game Script Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="3D Modelling">3D Modelling</option>
              <option value="Professional Photo & Video Editing">Professional Photo & Video Editing</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Projects Grid / Table */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon="bi-kanban"
          title="No projects found"
          description="There are currently no projects matching your query."
          actionText="Create Project"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="tensora-card p-0">
          <div className="table-responsive">
            <table className="tensora-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Domain</th>
                  <th>Project Lead</th>
                  <th>Deadline</th>
                  <th>Budget</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="fw-bold text-white">{p.name}</div>
                      <small className="text-muted font-mono" style={{ fontSize: '0.72rem' }}>{p.id}</small>
                    </td>
                    <td>{p.client}</td>
                    <td>
                      <span className="badge bg-dark border border-secondary text-info">
                        {p.service}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-primary bg-opacity-15 text-primary border border-primary border-opacity-25">
                        {p.lead}
                      </span>
                    </td>
                    <td className="font-mono text-muted small">{p.deadline}</td>
                    <td className="fw-bold text-white font-mono">{formatCurrency(p.budget)}</td>
                    <td>
                      <span className={`badge ${p.priority === 'High' ? 'bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50' : p.priority === 'Medium' ? 'bg-warning bg-opacity-25 text-warning border border-warning border-opacity-50' : 'bg-success bg-opacity-25 text-success border border-success border-opacity-50'}`}>
                        {p.priority}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={p.status} />
                    </td>
                    <td style={{ minWidth: '120px' }}>
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
                        <span className="font-mono small text-white" style={{ fontSize: '0.75rem' }}>{p.progress}%</span>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          title="Edit Project"
                          onClick={() => handleOpenEdit(p)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Delete Project"
                          onClick={() => handleDeleteClick(p.id)}
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

      {/* Add / Edit Project Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-white font-display">
            {isEditing ? 'Modify Project Configuration' : 'Initiate New Project'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="p-4">
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Project Title *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Website Redesign"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Client Organization *</Form.Label>
                  <Form.Select
                    value={formData.client}
                    onChange={(e) => {
                      const selected = clients.find(c => c.company === e.target.value);
                      setFormData({
                        ...formData,
                        client: e.target.value,
                        clientId: selected?.id || ''
                      });
                    }}
                  >
                    {clients.map(c => (
                      <option key={c.id} value={c.company}>
                        {c.company} ({c.name})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Service Category *</Form.Label>
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
                  <Form.Label>Project Lead *</Form.Label>
                  <Form.Select
                    value={formData.lead}
                    onChange={(e) => {
                      const emp = employees.find(emp => emp.name === e.target.value);
                      setFormData({
                        ...formData,
                        lead: e.target.value,
                        leadId: emp?.id || 'ADM-001'
                      });
                    }}
                  >
                    {employees.length === 0 ? (
                      <option value="Tensora Lead">Tensora Lead (Create employees in Employees tab)</option>
                    ) : (
                      employees.map(emp => (
                        <option key={emp.id} value={emp.name}>
                          {emp.name} ({emp.department || emp.id})
                        </option>
                      ))
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Allocated Budget (₹ INR) *</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Deadline *</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label>Execution Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label>Progress ({formData.progress}%)</Form.Label>
                  <Form.Range
                    min={0}
                    max={100}
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Project Scope & Requirements</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Deliverable specifications, client notes, repository links..."
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
              <i className="bi bi-check2"></i> {isEditing ? 'Save Changes' : 'Launch Project'}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        show={showDeleteConfirm}
        title="Terminate Project Deliverable"
        message="Are you sure you want to delete this project record? This action will remove all linked progress parameters."
        isDanger={true}
        confirmText="Yes, Delete Project"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
