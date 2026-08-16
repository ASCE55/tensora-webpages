import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatCurrency';

export const GlobalSearchModal = ({ show, onHide }) => {
  const [query, setQuery] = useState('');
  const { clients, projects, employees, tasks, services, invoices } = useData();
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!show) setQuery('');
  }, [show]);

  const q = query.trim().toLowerCase();

  const filteredClients = q && role === 'admin'
    ? clients.filter(c => c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.id.toLowerCase().includes(q))
    : [];

  const filteredProjects = q
    ? projects.filter(p => p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
    : [];

  const filteredTasks = q
    ? tasks.filter(t => t.name.toLowerCase().includes(q) || t.assignedName.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
    : [];

  const filteredEmployees = q && role === 'admin'
    ? employees.filter(e => e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q) || e.department.toLowerCase().includes(q))
    : [];

  const filteredServices = q
    ? services.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q))
    : [];

  const filteredInvoices = q && role === 'admin'
    ? invoices.filter(i => i.invoiceNumber.toLowerCase().includes(q) || i.clientName.toLowerCase().includes(q))
    : [];

  const hasResults =
    filteredClients.length > 0 ||
    filteredProjects.length > 0 ||
    filteredTasks.length > 0 ||
    filteredEmployees.length > 0 ||
    filteredServices.length > 0 ||
    filteredInvoices.length > 0;

  const handleSelect = (url) => {
    onHide();
    navigate(url);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Body className="p-0">
        <div className="p-3 border-bottom border-secondary d-flex align-items-center gap-3">
          <i className="bi bi-search text-primary fs-5"></i>
          <input
            type="text"
            className="form-control form-control-lg bg-transparent border-0 text-white shadow-none"
            placeholder="Search clients, projects, tasks, employees, services, invoices..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <kbd className="bg-dark text-muted border border-secondary px-2 py-1 rounded small">ESC</kbd>
        </div>

        <div className="p-3" style={{ maxHeight: '420px', overflowY: 'auto' }}>
          {!query && (
            <div className="text-center py-4 text-muted small">
              <i className="bi bi-command fs-4 d-block mb-2 text-secondary"></i>
              Type to instantly search across the entire Tensora ecosystem
            </div>
          )}

          {query && !hasResults && (
            <div className="text-center py-4 text-muted small">
              No matching records found for "{query}"
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div className="mb-3">
              <div className="text-uppercase text-muted fw-bold small mb-2 px-2" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                Projects ({filteredProjects.length})
              </div>
              {filteredProjects.map(p => (
                <div
                  key={p.id}
                  className="d-flex align-items-center justify-content-between p-2 rounded hover-bg-dark cursor-pointer text-white"
                  style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}
                  onClick={() => handleSelect(role === 'admin' ? '/admin/projects' : '/user/projects')}
                >
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-folder2-open text-primary"></i>
                    <div>
                      <div className="fw-semibold">{p.name}</div>
                      <small className="text-muted">{p.client} • {p.status}</small>
                    </div>
                  </div>
                  <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-50">{p.id}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tasks */}
          {filteredTasks.length > 0 && (
            <div className="mb-3">
              <div className="text-uppercase text-muted fw-bold small mb-2 px-2" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                Tasks ({filteredTasks.length})
              </div>
              {filteredTasks.map(t => (
                <div
                  key={t.id}
                  className="d-flex align-items-center justify-content-between p-2 rounded cursor-pointer text-white mb-1"
                  style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}
                  onClick={() => handleSelect(role === 'admin' ? '/admin/tasks' : '/user/tasks')}
                >
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2-square text-info"></i>
                    <div>
                      <div className="fw-semibold">{t.name}</div>
                      <small className="text-muted">{t.projectName} • Assigned: {t.assignedName}</small>
                    </div>
                  </div>
                  <span className="badge bg-info bg-opacity-25 text-info border border-info border-opacity-50">{t.status}</span>
                </div>
              ))}
            </div>
          )}

          {/* Clients */}
          {filteredClients.length > 0 && (
            <div className="mb-3">
              <div className="text-uppercase text-muted fw-bold small mb-2 px-2" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                Clients ({filteredClients.length})
              </div>
              {filteredClients.map(c => (
                <div
                  key={c.id}
                  className="d-flex align-items-center justify-content-between p-2 rounded cursor-pointer text-white mb-1"
                  style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}
                  onClick={() => handleSelect('/admin/clients')}
                >
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-building text-warning"></i>
                    <div>
                      <div className="fw-semibold">{c.name} ({c.company})</div>
                      <small className="text-muted">{c.email} • {c.service}</small>
                    </div>
                  </div>
                  <span className="text-muted small">{c.id}</span>
                </div>
              ))}
            </div>
          )}

          {/* Employees */}
          {filteredEmployees.length > 0 && (
            <div className="mb-3">
              <div className="text-uppercase text-muted fw-bold small mb-2 px-2" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                Employees ({filteredEmployees.length})
              </div>
              {filteredEmployees.map(e => (
                <div
                  key={e.id}
                  className="d-flex align-items-center justify-content-between p-2 rounded cursor-pointer text-white mb-1"
                  style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}
                  onClick={() => handleSelect('/admin/employees')}
                >
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-person-badge text-success"></i>
                    <div>
                      <div className="fw-semibold">{e.name}</div>
                      <small className="text-muted">{e.department} • {e.designation}</small>
                    </div>
                  </div>
                  <span className="badge bg-secondary">{e.id}</span>
                </div>
              ))}
            </div>
          )}

          {/* Invoices */}
          {filteredInvoices.length > 0 && (
            <div className="mb-3">
              <div className="text-uppercase text-muted fw-bold small mb-2 px-2" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                Invoices ({filteredInvoices.length})
              </div>
              {filteredInvoices.map(i => (
                <div
                  key={i.id}
                  className="d-flex align-items-center justify-content-between p-2 rounded cursor-pointer text-white mb-1"
                  style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}
                  onClick={() => handleSelect('/admin/invoices')}
                >
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-receipt text-primary"></i>
                    <div>
                      <div className="fw-semibold">{i.invoiceNumber} - {i.clientName}</div>
                      <small className="text-muted">{formatCurrency(i.total)} • {i.status}</small>
                    </div>
                  </div>
                  <span className="badge bg-dark border border-secondary">{i.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};
