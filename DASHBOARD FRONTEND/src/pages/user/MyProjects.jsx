import React, { useState } from 'react';
import { Row, Col, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { EmptyState } from '../../components/EmptyState';

export const MyProjects = () => {
  const { currentUser } = useAuth();
  const { projects, employees, updateProject } = useData();

  const userId = currentUser?.id || 'TDS001';
  const myProjects = projects.filter(p => p.leadId === userId || p.team?.includes(userId));

  const [selectedProject, setSelectedProject] = useState(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [newProgress, setNewProgress] = useState(0);

  const handleOpenProgress = (p) => {
    setSelectedProject(p);
    setNewProgress(p.progress || 0);
    setShowProgressModal(true);
  };

  const handleSaveProgress = (e) => {
    e.preventDefault();
    if (selectedProject) {
      updateProject(selectedProject.id, { progress: Number(newProgress) });
      toast.success(`Project ${selectedProject.name} progress updated to ${newProgress}%.`);
      setShowProgressModal(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="My Assigned Projects"
        subtitle="Active enterprise projects where you are assigned as technical lead or contributing engineer."
      />

      {myProjects.length === 0 ? (
        <EmptyState
          icon="bi-folder2-open"
          title="No assigned projects"
          description="You currently do not have any active project assignments. Reach out to the admin to be provisioned onto deliverables."
        />
      ) : (
        <Row className="g-4">
          {myProjects.map(p => (
            <Col xs={12} lg={6} key={p.id}>
              <div className="tensora-card p-4 h-100 d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge bg-dark border border-secondary text-muted font-mono small">
                    {p.id}
                  </span>
                  <StatusBadge status={p.status} />
                </div>

                <h4 className="text-white fw-bold mb-1">{p.name}</h4>
                <div className="text-primary small fw-semibold mb-3">Client: {p.client}</div>

                <p className="text-muted small mb-4 flex-grow-1" style={{ fontSize: '0.88rem' }}>
                  {p.description || 'Enterprise grade solution deliverable.'}
                </p>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between text-muted small mb-1">
                    <span>Milestone Progress</span>
                    <span className="font-mono text-white fw-bold">{p.progress}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px', background: '#1a222d' }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${p.progress}%`,
                        background: 'linear-gradient(90deg, var(--blue-deep), var(--blue-neon))'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Project Details Grid */}
                <div className="pt-3 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between text-muted small">
                  <div>
                    <div style={{ fontSize: '0.72rem' }}>Service Domain:</div>
                    <span className="badge bg-dark border border-secondary text-info">{p.service}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem' }}>Deadline:</div>
                    <span className="font-mono text-white">{p.deadline}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-tensora-outline-blue"
                      onClick={() => handleOpenProgress(p)}
                    >
                      <i className="bi bi-sliders me-1"></i> Update Progress
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      {/* Progress Update Modal */}
      {selectedProject && (
        <Modal show={showProgressModal} onHide={() => setShowProgressModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-white font-display">
              Update Milestone: {selectedProject.name}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSaveProgress}>
            <Modal.Body className="p-4">
              <Form.Group className="mb-3">
                <Form.Label>Progress Percentage: <strong className="text-primary font-mono">{newProgress}%</strong></Form.Label>
                <Form.Range
                  min={0}
                  max={100}
                  value={newProgress}
                  onChange={(e) => setNewProgress(Number(e.target.value))}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn btn-tensora-secondary" onClick={() => setShowProgressModal(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-tensora-primary">
                Save Progress
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </div>
  );
};
