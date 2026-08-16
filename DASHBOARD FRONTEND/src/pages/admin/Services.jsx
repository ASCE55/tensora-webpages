import React, { useState } from 'react';
import { Row, Col, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { PageHeader } from '../../components/PageHeader';
import { StatCard } from '../../components/StatCard';
import { EmptyState } from '../../components/EmptyState';
import { ConfirmDialog } from '../../components/ConfirmDialog';

const ICON_OPTIONS = [
  { label: 'Code / Web', value: 'bi-code-slash' },
  { label: 'Mobile App', value: 'bi-phone' },
  { label: 'Game / Logic', value: 'bi-controller' },
  { label: 'Graphic Design', value: 'bi-palette' },
  { label: '3D & CGI', value: 'bi-badge-3d' },
  { label: 'Media & Video', value: 'bi-camera-reels' },
  { label: 'AI & Data', value: 'bi-cpu' },
  { label: 'Cloud & DevOps', value: 'bi-cloud-check' },
  { label: 'Cybersecurity', value: 'bi-shield-check' },
  { label: 'Marketing', value: 'bi-megaphone' }
];

const CATEGORY_OPTIONS = [
  'Development',
  'Mobile',
  'Gaming',
  'Design',
  '3D & CGI',
  'Media Production',
  'Cloud & DevOps',
  'AI & Machine Learning',
  'Cybersecurity',
  'Digital Strategy'
];

export const Services = () => {
  const { services, addService, updateService, deleteService } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Delete Confirm State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Development',
    icon: 'bi-code-slash',
    description: '',
    technologies: '',
    startingPrice: 2000,
    activeProjects: 0,
    completedProjects: 0,
    lead: ''
  });

  // Dynamic calculations
  const totalServices = services.length;
  const totalActiveProjects = services.reduce((sum, s) => sum + (Number(s.activeProjects) || 0), 0);
  const totalCompletedProjects = services.reduce((sum, s) => sum + (Number(s.completedProjects) || 0), 0);
  const avgStartingPrice = totalServices > 0
    ? Math.round(services.reduce((sum, s) => sum + (Number(s.startingPrice) || 0), 0) / totalServices)
    : 0;

  // Filtered Services
  const filteredServices = services.filter(s => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      (s.name || '').toLowerCase().includes(q) ||
      (s.lead || '').toLowerCase().includes(q) ||
      (s.description || '').toLowerCase().includes(q) ||
      (s.id || '').toLowerCase().includes(q) ||
      (Array.isArray(s.technologies) && s.technologies.some(t => t.toLowerCase().includes(q)));
    const matchCategory = categoryFilter === 'All' || s.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleOpenAdd = () => {
    setIsEditing(false);
    setSelectedService(null);
    setFormData({
      name: '',
      category: 'Development',
      icon: 'bi-code-slash',
      description: '',
      technologies: 'React, Node.js, TypeScript',
      startingPrice: 2000,
      activeProjects: 0,
      completedProjects: 0,
      lead: ''
    });
    setShowModal(true);
  };

  const handleOpenConfigure = (service) => {
    setIsEditing(true);
    setSelectedService(service);
    setFormData({
      name: service.name,
      category: service.category || 'Development',
      icon: service.icon || 'bi-code-slash',
      description: service.description || '',
      technologies: Array.isArray(service.technologies) ? service.technologies.join(', ') : (service.technologies || ''),
      startingPrice: service.startingPrice || 0,
      activeProjects: service.activeProjects || 0,
      completedProjects: service.completedProjects || 0,
      lead: service.lead || ''
    });
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Please enter a valid service title.');
      return;
    }

    const techArray = formData.technologies
      ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
      : ['Custom Architecture'];

    const payload = {
      name: formData.name.trim(),
      category: formData.category,
      icon: formData.icon,
      description: formData.description.trim(),
      technologies: techArray,
      startingPrice: Number(formData.startingPrice) || 0,
      activeProjects: Number(formData.activeProjects) || 0,
      completedProjects: Number(formData.completedProjects) || 0,
      lead: formData.lead.trim() || 'Domain Specialist'
    };

    if (isEditing && selectedService) {
      updateService(selectedService.id, payload);
      toast.success(`Service "${payload.name}" configuration updated.`);
    } else {
      addService(payload);
      toast.success(`New service offering "${payload.name}" registered.`);
    }

    setShowModal(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      const srv = services.find(s => s.id === deleteTargetId);
      deleteService(deleteTargetId);
      toast.success(`Service "${srv?.name || deleteTargetId}" deleted successfully.`);
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Services & Core Capabilities"
        subtitle="Manage, configure, and expand specialized technology solutions offered by Tensora Digital Solutions Pvt Ltd."
      >
        <button className="btn btn-tensora-primary" onClick={handleOpenAdd}>
          <i className="bi bi-plus-circle"></i> Create New Service
        </button>
      </PageHeader>

      {/* KPI Overview */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Total Service Lines"
            value={totalServices}
            icon="bi-boxes"
            trend={`${totalServices} Offerings`}
            trendType="neutral"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Active Deliverables"
            value={totalActiveProjects}
            icon="bi-kanban"
            trend={totalActiveProjects > 0 ? "Under Production" : "0 Active"}
            trendType={totalActiveProjects > 0 ? "positive" : "neutral"}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Projects"
            value={totalCompletedProjects}
            icon="bi-check-circle"
            trend={totalCompletedProjects > 0 ? "Delivered to Clients" : "0 Completed"}
            trendType={totalCompletedProjects > 0 ? "positive" : "neutral"}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Starting Tier"
            value={formatCurrency(avgStartingPrice)}
            icon="bi-tag-fill"
            trend="Baseline Rate"
            trendType="neutral"
          />
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
                placeholder="Search by service name, technology, or lead specialist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="All">All Categories</option>
              {CATEGORY_OPTIONS.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <EmptyState
          icon="bi-boxes"
          title="No services found"
          description="There are no services matching your search or filter. Create a new service offering to get started."
          actionText="Create New Service"
          onAction={handleOpenAdd}
        />
      ) : (
        <Row className="g-4">
          {filteredServices.map(s => (
            <Col xs={12} md={6} lg={4} key={s.id}>
              <div className="tensora-card p-4 h-100 d-flex flex-column justify-content-between position-relative">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3"
                      style={{
                        width: '50px',
                        height: '50px',
                        background: 'rgba(0, 87, 255, 0.12)',
                        border: '1px solid var(--border-blue)',
                        color: 'var(--blue-neon)',
                        fontSize: '1.5rem',
                        boxShadow: 'var(--blue-glow-sm)'
                      }}
                    >
                      <i className={`bi ${s.icon || 'bi-gear-wide-connected'}`}></i>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-dark border border-secondary text-muted font-mono" style={{ fontSize: '0.72rem' }}>
                        {s.id}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-danger p-1 px-2"
                        title="Delete Service"
                        onClick={() => handleDeleteClick(s.id)}
                      >
                        <i className="bi bi-trash" style={{ fontSize: '0.8rem' }}></i>
                      </button>
                    </div>
                  </div>

                  <h5 className="text-white fw-bold mb-1">{s.name}</h5>
                  <div className="text-primary small mb-3 fw-semibold">{s.category}</div>

                  <p className="text-muted small mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                    {s.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-3">
                    <div className="text-muted fw-bold text-uppercase mb-2" style={{ fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                      Technology Matrix:
                    </div>
                    <div className="d-flex flex-wrap gap-1">
                      {s.technologies?.map((tech, i) => (
                        <span key={i} className="badge bg-dark border border-secondary text-light small py-1 px-2" style={{ fontSize: '0.72rem' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  {/* Metrics */}
                  <div className="pt-3 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <div className="text-muted small" style={{ fontSize: '0.72rem' }}>Starting from</div>
                      <div className="fw-bold text-white font-mono">{formatCurrency(s.startingPrice)}</div>
                    </div>
                    <div className="text-end">
                      <div className="text-muted small" style={{ fontSize: '0.72rem' }}>Domain Lead</div>
                      <div className="text-light small fw-semibold">{s.lead}</div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="d-flex align-items-center justify-content-between pt-2 border-top border-secondary border-opacity-25">
                    <span className="badge bg-primary bg-opacity-20 text-primary border border-primary border-opacity-25 font-mono small">
                      {s.activeProjects} Active Deliverables
                    </span>
                    <button
                      className="btn btn-sm btn-tensora-outline-blue"
                      onClick={() => handleOpenConfigure(s)}
                    >
                      <i className="bi bi-gear me-1"></i> Configure
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      {/* Create / Configure Service Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-white font-display">
            {isEditing ? `Configure Service: ${formData.name}` : 'Create New Service Offering'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="p-4">
            <Row className="g-3 mb-3">
              <Col xs={12} md={8}>
                <Form.Group>
                  <Form.Label>Service Title *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. AI-Powered Autonomous Automation"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {CATEGORY_OPTIONS.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mb-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Display Icon</Form.Label>
                  <Form.Select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  >
                    {ICON_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} ({opt.value})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Domain Lead Specialist</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.lead}
                    onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                    placeholder="e.g. Aditya Sharma"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Scope Overview & Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe key capabilities, delivery scope, and architectural stack..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Technologies Matrix (Comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="e.g. React, Python, PyTorch, FastAPI, Docker"
              />
              <Form.Text className="text-muted small">
                Separate technologies with commas. They will be rendered as interactive matrix tags.
              </Form.Text>
            </Form.Group>

            <Row className="g-3">
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label>Base Starting Price (₹ INR) *</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    min="0"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                    placeholder="e.g. 50000"
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group>
                  <Form.Label>Active Deliverables</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={formData.activeProjects}
                    onChange={(e) => setFormData({ ...formData, activeProjects: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group>
                  <Form.Label>Completed Deliverables</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={formData.completedProjects}
                    onChange={(e) => setFormData({ ...formData, completedProjects: e.target.value })}
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
              <i className="bi bi-check2"></i> {isEditing ? 'Save Configuration' : 'Register Service'}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        show={showDeleteConfirm}
        title="Delete Service Offering"
        message="Are you sure you want to permanently remove this service line? This cannot be undone."
        isDanger={true}
        confirmText="Confirm Delete"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
