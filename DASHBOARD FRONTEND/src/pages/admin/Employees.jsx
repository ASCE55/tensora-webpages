import React, { useState } from 'react';
import { Row, Col, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { EmptyState } from '../../components/EmptyState';

export const Employees = () => {
  const { employees, projects, tasks, addEmployee, updateEmployee, deleteEmployee } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Performance Dossier Modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingEmployee, setViewingEmployee] = useState(null);

  // Credentials & Login Key Management Modal
  const [showCredsModal, setShowCredsModal] = useState(false);
  const [credsEmployee, setCredsEmployee] = useState(null);
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [showCredsPassword, setShowCredsPassword] = useState(false);

  // Delete Confirm
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    department: 'Web Development',
    designation: 'Software Engineer',
    role: 'user',
    salary: 80000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    skills: 'React, Node.js, JavaScript'
  });

  const [showFormPassword, setShowFormPassword] = useState(false);

  const generateRandomPassword = () => {
    const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789!@#$';
    let pass = 'Tds@';
    for (let i = 0; i < 6; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setSelectedEmployee(null);
    const nextId = `TDS${(employees.length + 1).toString().padStart(3, '0')}`;
    const initialPass = generateRandomPassword();

    setFormData({
      id: nextId,
      username: nextId,
      password: initialPass,
      name: '',
      email: '',
      phone: '',
      department: 'Web Development',
      designation: 'Software Engineer',
      role: 'user',
      salary: 80000,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      skills: 'React, Node.js, JavaScript'
    });
    setShowFormPassword(true);
    setShowModal(true);
  };

  const handleOpenEdit = (emp) => {
    setIsEditing(true);
    setSelectedEmployee(emp);
    setFormData({
      id: emp.id,
      username: emp.username || emp.id,
      password: emp.password || 'user123',
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      department: emp.department,
      designation: emp.designation,
      role: emp.role || 'user',
      salary: emp.salary,
      status: emp.status || 'Active',
      avatar: emp.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      skills: Array.isArray(emp.skills) ? emp.skills.join(', ') : emp.skills || ''
    });
    setShowFormPassword(false);
    setShowModal(true);
  };

  const handleOpenCreds = (emp) => {
    setCredsEmployee(emp);
    setNewPasswordVal(emp.password || 'user123');
    setShowCredsPassword(false);
    setShowCredsModal(true);
  };

  const handleSaveQuickPassword = (e) => {
    e.preventDefault();
    if (!newPasswordVal.trim() || !credsEmployee) return;

    updateEmployee(credsEmployee.id, { password: newPasswordVal.trim() });
    setCredsEmployee({ ...credsEmployee, password: newPasswordVal.trim() });
    toast.success(`Password for ${credsEmployee.name} updated to "${newPasswordVal.trim()}".`);
  };

  const handleCopyCredentials = (emp) => {
    const text = `TENSORA PORTAL LOGIN CREDENTIALS\nPortal URL: ${window.location.origin}/login\nUsername / ID: ${emp.id}\nPassword: ${emp.password || 'user123'}\nAccess Role: ${emp.role === 'admin' ? 'Administrator' : 'Employee'}`;
    navigator.clipboard.writeText(text);
    toast.success(`Login credentials for ${emp.name} copied to clipboard!`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    const payload = {
      ...formData,
      skills: skillsArray
    };

    if (isEditing && selectedEmployee) {
      updateEmployee(selectedEmployee.id, payload);
      toast.success(`Employee credentials and profile for ${payload.name} updated.`);
    } else {
      addEmployee(payload);
      toast.success(`Employee onboarded! Login ID: ${payload.id} | Password: ${payload.password}`);
    }
    setShowModal(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteEmployee(deleteTargetId);
      toast.success('Employee access disabled.');
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
    }
  };

  const filteredEmployees = employees.filter(e => {
    const matchSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = deptFilter === 'All' || e.department === deptFilter;
    return matchSearch && matchDept;
  });

  const empTasks = viewingEmployee ? tasks.filter(t => t.assignedTo === viewingEmployee.id) : [];

  return (
    <div>
      <PageHeader
        title="Employee & Team Management"
        subtitle="Manage team members, roles, technical skills, and configure ID & password credentials for each employee."
      >
        <button className="btn btn-tensora-primary" onClick={handleOpenAdd}>
          <i className="bi bi-person-plus-fill"></i> Create Employee & Credentials
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
                placeholder="Search by employee name, ID, email, or designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <Form.Select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
              <option value="All">All Departments</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="Game Development">Game Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="3D Design">3D Design</option>
              <option value="Media Production">Media Production</option>
              <option value="Management">Management</option>
              <option value="Marketing">Marketing</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Employees Table */}
      {filteredEmployees.length === 0 ? (
        <EmptyState
          icon="bi-people"
          title="No employees found"
          description="No employee records matched the selected filters."
          actionText="Create Employee"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="tensora-card p-0">
          <div className="table-responsive">
            <table className="tensora-table">
              <thead>
                <tr>
                  <th>Login ID</th>
                  <th>Member & Email</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Password Key</th>
                  <th>Compensation</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(e => (
                  <tr key={e.id}>
                    <td>
                      <div className="font-mono fw-bold text-primary">{e.id}</div>
                      <small className="text-muted text-capitalize" style={{ fontSize: '0.7rem' }}>
                        {e.role || 'user'}
                      </small>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={e.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                          alt={e.name}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-blue)' }}
                        />
                        <div>
                          <div className="text-white fw-semibold">{e.name}</div>
                          <div className="text-muted small">{e.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-dark border border-secondary text-light">
                        {e.department}
                      </span>
                    </td>
                    <td className="text-muted small">{e.designation}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-dark border border-secondary text-info d-flex align-items-center gap-1 font-mono py-1 px-2"
                        title="Manage Login Credentials"
                        style={{ fontSize: '0.78rem' }}
                        onClick={() => handleOpenCreds(e)}
                      >
                        <i className="bi bi-key-fill text-warning"></i>
                        <span>{e.password ? '••••••••' : 'user123'}</span>
                      </button>
                    </td>
                    <td className="font-mono text-white fw-semibold">{formatCurrency(e.salary)}</td>
                    <td>
                      <StatusBadge status={e.status} />
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-warning"
                          title="View & Copy Login Credentials"
                          onClick={() => handleOpenCreds(e)}
                        >
                          <i className="bi bi-key"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-info"
                          title="View Performance Dossier"
                          onClick={() => {
                            setViewingEmployee(e);
                            setShowViewModal(true);
                          }}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          title="Edit Profile & Password"
                          onClick={() => handleOpenEdit(e)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Disable Access"
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

      {/* Add / Edit Employee Modal with ID & Password Credentials */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-white font-display">
            {isEditing ? `Modify Credentials & Profile: ${formData.name || formData.id}` : 'Create Employee Account & Credentials'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="p-4">
            {/* Credentials Creation Section */}
            <div className="p-3 mb-4 rounded bg-dark border border-primary border-opacity-50" style={{ background: 'rgba(0, 87, 255, 0.05)' }}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-shield-lock-fill text-primary fs-5"></i>
                <h6 className="text-white fw-bold mb-0">Authentication & Access Credentials</h6>
              </div>

              <Row className="g-3">
                <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label className="small text-light">Login Username / Employee ID *</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="e.g. TDS008"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value, username: e.target.value })}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={5}>
                  <Form.Group>
                    <div className="d-flex align-items-center justify-content-between">
                      <Form.Label className="small text-light">Login Password *</Form.Label>
                      <button
                        type="button"
                        className="btn btn-link p-0 text-primary small text-decoration-none"
                        style={{ fontSize: '0.72rem' }}
                        onClick={() => {
                          const randomPass = generateRandomPassword();
                          setFormData({ ...formData, password: randomPass });
                          setShowFormPassword(true);
                          toast.info(`Generated password: ${randomPass}`);
                        }}
                      >
                        ⚡ Generate Random
                      </button>
                    </div>
                    <div className="input-group">
                      <Form.Control
                        type={showFormPassword ? 'text' : 'password'}
                        required
                        placeholder="Set account password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowFormPassword(!showFormPassword)}
                        title={showFormPassword ? 'Hide' : 'Show'}
                      >
                        <i className={`bi ${showFormPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </button>
                    </div>
                  </Form.Group>
                </Col>

                <Col xs={12} md={3}>
                  <Form.Group>
                    <Form.Label className="small text-light">Access Role</Form.Label>
                    <Form.Select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="user">Employee (Standard)</option>
                      <option value="admin">Administrator</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </div>

            {/* General Profile Information */}
            <h6 className="text-white mb-3">General Profile Information</h6>
            <Row className="g-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Devansh Roy"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Enterprise Email *</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="devansh@tensora.com"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98000 00000"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Department *</Form.Label>
                  <Form.Select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="Game Development">Game Development</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="3D Design">3D Design</option>
                    <option value="Media Production">Media Production</option>
                    <option value="Management">Management</option>
                    <option value="Marketing">Marketing</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Designation / Role Title *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Senior Full Stack Lead"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Monthly Salary (₹ INR) *</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Technical Skills (Comma separated)</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="e.g. React, Node.js, PostgreSQL, Docker"
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
              <i className="bi bi-check2"></i> {isEditing ? 'Save Profile & Credentials' : 'Create & Authorize'}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Quick Credentials & Access Card Modal */}
      {credsEmployee && (
        <Modal show={showCredsModal} onHide={() => setShowCredsModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-white font-display d-flex align-items-center gap-2">
              <i className="bi bi-key-fill text-warning"></i>
              <span>Login Credentials: {credsEmployee.name}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="p-3 bg-dark rounded border border-secondary border-opacity-25 mb-4">
              <div className="d-flex justify-content-between py-2 border-bottom border-secondary border-opacity-25">
                <span className="text-muted small">Login Username / ID:</span>
                <span className="text-primary font-mono fw-bold">{credsEmployee.id}</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom border-secondary border-opacity-25">
                <span className="text-muted small">Enterprise Email:</span>
                <span className="text-white small">{credsEmployee.email}</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom border-secondary border-opacity-25">
                <span className="text-muted small">Access Role:</span>
                <span className="badge bg-dark border border-secondary text-info text-capitalize">{credsEmployee.role || 'Employee'}</span>
              </div>
              <div className="d-flex justify-content-between py-2 align-items-center">
                <span className="text-muted small">Current Password:</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-warning font-mono fw-bold">
                    {showCredsPassword ? credsEmployee.password || 'user123' : '••••••••'}
                  </span>
                  <button
                    className="btn btn-sm btn-link p-0 text-muted"
                    onClick={() => setShowCredsPassword(!showCredsPassword)}
                  >
                    <i className={`bi ${showCredsPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Reset Password Form */}
            <h6 className="text-white mb-2">Change Password for this Account</h6>
            <Form onSubmit={handleSaveQuickPassword} className="mb-3">
              <div className="input-group mb-2">
                <Form.Control
                  type="text"
                  placeholder="Enter new password"
                  value={newPasswordVal}
                  onChange={(e) => setNewPasswordVal(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setNewPasswordVal(generateRandomPassword())}
                  title="Generate Random Password"
                >
                  ⚡ Generate
                </button>
                <button type="submit" className="btn btn-tensora-primary">
                  Update Password
                </button>
              </div>
            </Form>

            <button
              className="btn btn-tensora-secondary w-100 justify-content-center py-2"
              onClick={() => handleCopyCredentials(credsEmployee)}
            >
              <i className="bi bi-clipboard-check"></i> Copy Full Login Credentials
            </button>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-tensora-secondary" onClick={() => setShowCredsModal(false)}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Performance View Modal */}
      {viewingEmployee && (
        <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-white font-display">
              Employee Performance: {viewingEmployee.name} ({viewingEmployee.id})
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="d-flex align-items-center gap-3 p-3 bg-dark rounded mb-4 border border-secondary border-opacity-25">
              <img
                src={viewingEmployee.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                alt={viewingEmployee.name}
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--blue-neon)' }}
              />
              <div>
                <h5 className="text-white mb-0">{viewingEmployee.name}</h5>
                <div className="text-muted small">{viewingEmployee.designation} • {viewingEmployee.department}</div>
                <div className="text-muted font-mono small">Joined: {viewingEmployee.joiningDate}</div>
              </div>
            </div>

            <Row className="g-3 mb-4">
              <Col xs={4}>
                <div className="tensora-card p-3 text-center">
                  <div className="text-muted small">Assigned Tasks</div>
                  <div className="fs-4 fw-bold text-white font-mono">{empTasks.length}</div>
                </div>
              </Col>
              <Col xs={4}>
                <div className="tensora-card p-3 text-center">
                  <div className="text-muted small">Completed Tasks</div>
                  <div className="fs-4 fw-bold text-success font-mono">
                    {empTasks.filter(t => t.status === 'Completed').length || viewingEmployee.completedTasksCount || 12}
                  </div>
                </div>
              </Col>
              <Col xs={4}>
                <div className="tensora-card p-3 text-center">
                  <div className="text-muted small">Rating Score</div>
                  <div className="fs-4 fw-bold text-warning font-mono">★ {viewingEmployee.rating || '4.9'}</div>
                </div>
              </Col>
            </Row>

            <h6 className="text-white mb-2">Current Active Tasks</h6>
            {empTasks.length === 0 ? (
              <div className="p-3 bg-dark rounded text-muted small">No active tasks assigned.</div>
            ) : (
              <div className="table-responsive">
                <table className="tensora-table">
                  <thead>
                    <tr>
                      <th>Task Name</th>
                      <th>Project</th>
                      <th>Priority</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empTasks.map(t => (
                      <tr key={t.id}>
                        <td className="text-white fw-semibold">{t.name}</td>
                        <td className="text-muted small">{t.projectName}</td>
                        <td><span className="badge bg-dark border border-secondary">{t.priority}</span></td>
                        <td><StatusBadge status={t.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-tensora-secondary" onClick={() => setShowViewModal(false)}>
              Close Dossier
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        show={showDeleteConfirm}
        title="Revoke Employee Authorization"
        message="Are you sure you want to deactivate this employee account? They will no longer be able to authenticate to the user workspace."
        isDanger={true}
        confirmText="Yes, Deactivate"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
