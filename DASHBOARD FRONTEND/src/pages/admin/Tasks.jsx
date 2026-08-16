import React, { useState } from 'react';
import { Row, Col, Modal, Form, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { ConfirmDialog } from '../../components/ConfirmDialog';

export const Tasks = () => {
  const { tasks, projects, employees, addTask, updateTask, moveTaskStatus, deleteTask, addTaskComment } = useData();
  const { currentUser } = useAuth();

  const [projectFilter, setProjectFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Task Details / Comments Modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [commentText, setCommentText] = useState('');

  // Delete Confirm
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    projectId: '',
    projectName: '',
    assignedTo: '',
    assignedName: '',
    priority: 'High',
    deadline: '',
    status: 'To Do',
    progress: 0
  });

  const columns = ['To Do', 'In Progress', 'Review', 'Completed'];

  const handleOpenAdd = (defaultStatus = 'To Do') => {
    setIsEditing(false);
    setSelectedTask(null);
    const defProj = projects[0] || {};
    const defEmp = employees[0] || {};

    setFormData({
      name: '',
      projectId: defProj.id || 'PRJ-101',
      projectName: defProj.name || 'General Project',
      assignedTo: defEmp.id || 'ADM-001',
      assignedName: defEmp.name || 'Tensora Lead',
      priority: 'High',
      deadline: '2026-03-30',
      status: defaultStatus,
      progress: defaultStatus === 'Completed' ? 100 : 0
    });
    setShowModal(true);
  };

  const handleOpenEdit = (task) => {
    setIsEditing(true);
    setSelectedTask(task);
    setFormData({
      name: task.name,
      projectId: task.projectId,
      projectName: task.projectName,
      assignedTo: task.assignedTo,
      assignedName: task.assignedName,
      priority: task.priority || 'Medium',
      deadline: task.deadline || '',
      status: task.status || 'To Do',
      progress: task.progress || 0
    });
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing && selectedTask) {
      updateTask(selectedTask.id, formData);
      toast.success('Task specifications updated.');
    } else {
      addTask(formData);
      toast.success('New task added to board.');
    }
    setShowModal(false);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !activeTask) return;

    addTaskComment(activeTask.id, currentUser?.name || 'Administrator', commentText.trim());
    setCommentText('');
    toast.success('Note added to task history.');
    // Refresh activeTask comments
    const updated = tasks.find(t => t.id === activeTask.id);
    if (updated) {
      setActiveTask({
        ...updated,
        comments: [...(updated.comments || []), { sender: currentUser?.name || 'Administrator', text: commentText.trim(), time: 'Just now' }]
      });
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteTask(deleteTargetId);
      toast.success('Task removed from queue.');
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
    }
  };

  const filteredTasks = tasks.filter(t => {
    const matchProj = projectFilter === 'All' || t.projectId === projectFilter;
    const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchProj && matchPriority;
  });

  return (
    <div>
      <PageHeader
        title="Task Management (Kanban)"
        subtitle="Agile sprint board with real-time drag/status pipeline and team assignments."
      >
        <button className="btn btn-tensora-primary" onClick={() => handleOpenAdd('To Do')}>
          <i className="bi bi-plus-lg"></i> Create Task
        </button>
      </PageHeader>

      {/* Filter Row */}
      <div className="tensora-card p-3 mb-4">
        <Row className="g-3 align-items-center">
          <Col xs={12} md={6}>
            <Form.Select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
              <option value="All">All Associated Projects</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.client})
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={6}>
            <Form.Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Kanban Board Grid */}
      <div className="kanban-board">
        {columns.map(colStatus => {
          const colTasks = filteredTasks.filter(t => t.status.toLowerCase() === colStatus.toLowerCase());

          return (
            <div key={colStatus} className="kanban-column">
              <div className="kanban-col-header">
                <div className="kanban-col-title">
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor:
                        colStatus === 'Completed' ? '#00e676' :
                        colStatus === 'In Progress' ? '#00a8ff' :
                        colStatus === 'Review' ? '#ffb300' : '#737b87'
                    }}
                  />
                  <span>{colStatus}</span>
                </div>
                <span className="kanban-badge">{colTasks.length}</span>
              </div>

              <div className="kanban-card-list">
                {colTasks.map(t => (
                  <div
                    key={t.id}
                    className="kanban-task-card"
                    onClick={() => {
                      setActiveTask(t);
                      setShowDetailsModal(true);
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="badge bg-dark border border-secondary text-muted font-mono" style={{ fontSize: '0.7rem' }}>
                        {t.id}
                      </span>
                      <span className={`badge ${t.priority === 'High' ? 'bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50' : t.priority === 'Medium' ? 'bg-warning bg-opacity-25 text-warning border border-warning border-opacity-50' : 'bg-success bg-opacity-25 text-success border border-success border-opacity-50'}`} style={{ fontSize: '0.7rem' }}>
                        {t.priority}
                      </span>
                    </div>

                    <div className="text-white fw-bold mb-2" style={{ fontSize: '0.92rem' }}>
                      {t.name}
                    </div>

                    <div className="text-primary small mb-2 d-flex align-items-center gap-1" style={{ fontSize: '0.78rem' }}>
                      <i className="bi bi-folder2-open"></i>
                      <span>{t.projectName}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between text-muted small mb-1" style={{ fontSize: '0.72rem' }}>
                        <span>Progress</span>
                        <span className="font-mono">{t.progress}%</span>
                      </div>
                      <div className="progress" style={{ height: '4px', background: '#1a222d' }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${t.progress}%`,
                            background: 'linear-gradient(90deg, var(--blue-deep), var(--blue-neon))'
                          }}
                        />
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="d-flex align-items-center justify-content-between pt-2 border-top border-secondary border-opacity-25">
                      <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.75rem' }}>
                        <i className="bi bi-person text-info"></i>
                        <span>{t.assignedName}</span>
                      </div>

                      {/* Status Dropdown Switcher */}
                      <Dropdown onClick={(e) => e.stopPropagation()}>
                        <Dropdown.Toggle
                          size="sm"
                          variant="link"
                          className="p-0 text-muted border-0 shadow-none"
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="tensora-card shadow-lg p-1" style={{ background: 'var(--bg-modal)' }}>
                          <Dropdown.Header className="small text-muted py-1">Move Status</Dropdown.Header>
                          {columns.map(status => (
                            <Dropdown.Item
                              key={status}
                              className="text-white small rounded py-1"
                              onClick={() => moveTaskStatus(t.id, status)}
                            >
                              → {status}
                            </Dropdown.Item>
                          ))}
                          <Dropdown.Divider className="border-secondary my-1" />
                          <Dropdown.Item
                            className="text-primary small rounded py-1"
                            onClick={() => handleOpenEdit(t)}
                          >
                            <i className="bi bi-pencil me-1"></i> Edit Task
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="text-danger small rounded py-1"
                            onClick={() => handleDeleteClick(t.id)}
                          >
                            <i className="bi bi-trash me-1"></i> Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                ))}

                <button
                  className="btn btn-sm btn-outline-secondary w-100 py-2 border-dashed mt-2"
                  style={{ borderStyle: 'dashed', fontSize: '0.8rem' }}
                  onClick={() => handleOpenAdd(colStatus)}
                >
                  <i className="bi bi-plus-lg me-1"></i> Add to {colStatus}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Task Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-white font-display">
            {isEditing ? 'Edit Task Deliverable' : 'Create New Sprint Task'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label>Task Title *</Form.Label>
              <Form.Control
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Implement OAuth2 & JWT Security Handlers"
              />
            </Form.Group>

            <Row className="g-3 mb-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Associated Project *</Form.Label>
                  <Form.Select
                    value={formData.projectId}
                    onChange={(e) => {
                      const proj = projects.find(p => p.id === e.target.value);
                      setFormData({
                        ...formData,
                        projectId: e.target.value,
                        projectName: proj?.name || ''
                      });
                    }}
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Assignee Specialist *</Form.Label>
                  <Form.Select
                    value={formData.assignedTo}
                    onChange={(e) => {
                      const emp = employees.find(emp => emp.id === e.target.value);
                      setFormData({
                        ...formData,
                        assignedTo: e.target.value,
                        assignedName: emp?.name || 'Tensora Lead'
                      });
                    }}
                  >
                    {employees.length === 0 ? (
                      <option value="ADM-001">Tensora Lead (Create employees in Employees tab)</option>
                    ) : (
                      employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name} ({emp.department || emp.id})</option>
                      ))
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mb-3">
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
                  <Form.Label>Status Column</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label>Progress ({formData.progress}%)</Form.Label>
              <Form.Range
                min={0}
                max={100}
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-tensora-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-tensora-primary">
              <i className="bi bi-check2"></i> {isEditing ? 'Save Changes' : 'Add Task'}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Task Details & Comments Drawer/Modal */}
      {activeTask && (
        <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-white font-display d-flex align-items-center gap-2">
              <span className="badge bg-primary font-mono">{activeTask.id}</span>
              <span>{activeTask.name}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Row className="g-3 mb-4">
              <Col xs={6} md={3}>
                <div className="text-muted small">Project</div>
                <div className="text-white fw-semibold small">{activeTask.projectName}</div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-muted small">Assigned Lead</div>
                <div className="text-white fw-semibold small">{activeTask.assignedName}</div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-muted small">Priority</div>
                <div className="fw-semibold text-danger small">{activeTask.priority}</div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-muted small">Current Status</div>
                <StatusBadge status={activeTask.status} />
              </Col>
            </Row>

            <h6 className="text-white mb-2">Discussion & Progress Notes</h6>
            <div className="p-3 bg-dark rounded mb-3 border border-secondary border-opacity-25" style={{ maxHeight: '220px', overflowY: 'auto' }}>
              {(!activeTask.comments || activeTask.comments.length === 0) ? (
                <div className="text-muted small text-center py-2">No comments logged for this task yet.</div>
              ) : (
                activeTask.comments.map((c, i) => (
                  <div key={i} className="mb-2 p-2 rounded bg-black bg-opacity-40">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-primary fw-bold small">{c.sender}</span>
                      <span className="text-muted font-mono" style={{ fontSize: '0.7rem' }}>{c.time}</span>
                    </div>
                    <div className="text-light small mt-1">{c.text}</div>
                  </div>
                ))
              )}
            </div>

            <Form onSubmit={handleAddComment} className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Add a milestone update or comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" className="btn btn-tensora-primary">
                Send
              </button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-tensora-secondary" onClick={() => setShowDetailsModal(false)}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        show={showDeleteConfirm}
        title="Remove Task"
        message="Are you sure you want to permanently delete this task?"
        isDanger={true}
        confirmText="Yes, Delete Task"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
