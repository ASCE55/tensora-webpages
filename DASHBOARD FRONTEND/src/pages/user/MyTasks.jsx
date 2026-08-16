import React, { useState } from 'react';
import { Row, Col, Modal, Form, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { EmptyState } from '../../components/EmptyState';

export const MyTasks = () => {
  const { currentUser } = useAuth();
  const { tasks, moveTaskStatus, updateTask, addTaskComment } = useData();

  const userId = currentUser?.id || 'TDS001';
  const myTasks = tasks.filter(t => t.assignedTo === userId);

  const [activeTask, setActiveTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [progressVal, setProgressVal] = useState(0);

  const handleOpenTask = (t) => {
    setActiveTask(t);
    setProgressVal(t.progress || 0);
    setShowTaskModal(true);
  };

  const handleUpdateProgress = (e) => {
    e.preventDefault();
    if (!activeTask) return;

    const newStatus = progressVal === 100 ? 'Completed' : activeTask.status === 'Completed' && progressVal < 100 ? 'In Progress' : activeTask.status;
    updateTask(activeTask.id, { progress: Number(progressVal), status: newStatus });
    toast.success('Task progress synchronized.');
    setShowTaskModal(false);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !activeTask) return;

    addTaskComment(activeTask.id, currentUser?.name || 'Devansh Roy', commentText.trim());
    setCommentText('');
    toast.success('Comment posted to engineering log.');
    // Refresh modal comments
    setActiveTask(prev => ({
      ...prev,
      comments: [...(prev.comments || []), { sender: currentUser?.name || 'Devansh Roy', text: commentText.trim(), time: 'Just now' }]
    }));
  };

  return (
    <div>
      <PageHeader
        title="My Sprint Tasks & Deliverables"
        subtitle="Update milestone progress, log technical updates, and transition task statuses."
      />

      {myTasks.length === 0 ? (
        <EmptyState
          icon="bi-check2-circle"
          title="No tasks currently assigned"
          description="Your sprint backlog is clear."
        />
      ) : (
        <div className="tensora-card p-0">
          <div className="table-responsive">
            <table className="tensora-table">
              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>Task Name</th>
                  <th>Project Deliverable</th>
                  <th>Priority</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myTasks.map(t => (
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
                    <td style={{ minWidth: '120px' }}>
                      <div className="d-flex align-items-center gap-2">
                        <div className="progress flex-grow-1" style={{ height: '6px', background: '#1a222d' }}>
                          <div
                            className="progress-bar"
                            style={{
                              width: `${t.progress}%`,
                              background: 'linear-gradient(90deg, var(--blue-deep), var(--blue-neon))'
                            }}
                          ></div>
                        </div>
                        <span className="font-mono small text-white" style={{ fontSize: '0.75rem' }}>{t.progress}%</span>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        {t.status !== 'Completed' ? (
                          <button
                            className="btn btn-sm btn-outline-success"
                            title="Mark as Completed"
                            onClick={() => {
                              moveTaskStatus(t.id, 'Completed');
                              toast.success(`Task ${t.id} marked Completed!`);
                            }}
                          >
                            <i className="bi bi-check2"></i>
                          </button>
                        ) : (
                          <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 small">Done</span>
                        )}
                        <button
                          className="btn btn-sm btn-outline-info"
                          title="Open Task Details"
                          onClick={() => handleOpenTask(t)}
                        >
                          <i className="bi bi-pencil-square"></i>
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

      {/* Task Details & Progress Modal */}
      {activeTask && (
        <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-white font-display">
              Task Details: {activeTask.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Row className="g-3 mb-4">
              <Col xs={6} md={3}>
                <div className="text-muted small">Project:</div>
                <div className="text-white fw-semibold small">{activeTask.projectName}</div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-muted small">Priority:</div>
                <div className="text-danger fw-semibold small">{activeTask.priority}</div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-muted small">Deadline:</div>
                <div className="text-white font-mono small">{activeTask.deadline}</div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-muted small">Status:</div>
                <StatusBadge status={activeTask.status} />
              </Col>
            </Row>

            {/* Progress Slider Form */}
            <Form onSubmit={handleUpdateProgress} className="mb-4 p-3 bg-dark rounded border border-secondary border-opacity-25">
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <Form.Label className="mb-0">Task Completion: <strong className="text-primary font-mono">{progressVal}%</strong></Form.Label>
                  <span className="text-muted small">Drag to update milestone</span>
                </div>
                <Form.Range
                  min={0}
                  max={100}
                  value={progressVal}
                  onChange={(e) => setProgressVal(Number(e.target.value))}
                />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group btn-group-sm">
                  {['To Do', 'In Progress', 'Review', 'Completed'].map(st => (
                    <button
                      key={st}
                      type="button"
                      className={`btn ${activeTask.status === st ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => {
                        moveTaskStatus(activeTask.id, st);
                        setActiveTask({ ...activeTask, status: st });
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
                <button type="submit" className="btn btn-sm btn-tensora-primary">
                  Save Progress
                </button>
              </div>
            </Form>

            {/* Comments Feed */}
            <h6 className="text-white mb-2">Technical Activity Log</h6>
            <div className="p-3 bg-dark rounded mb-3 border border-secondary border-opacity-25" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {(!activeTask.comments || activeTask.comments.length === 0) ? (
                <div className="text-muted small text-center py-2">No comments logged yet.</div>
              ) : (
                activeTask.comments.map((c, i) => (
                  <div key={i} className="mb-2 p-2 rounded bg-black bg-opacity-50">
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
                placeholder="Log a comment or technical note..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" className="btn btn-tensora-primary">
                Post Note
              </button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-tensora-secondary" onClick={() => setShowTaskModal(false)}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
