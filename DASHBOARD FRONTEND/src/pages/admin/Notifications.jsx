import React from 'react';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { PageHeader } from '../../components/PageHeader';
import { EmptyState } from '../../components/EmptyState';

export const Notifications = () => {
  const { notifications, markNotificationRead, clearAllNotifications } = useData();

  const handleClearAll = () => {
    clearAllNotifications();
    toast.info('All notifications cleared.');
  };

  return (
    <div>
      <PageHeader
        title="System Notifications & Alerts"
        subtitle="Security events, payment notices, project milestones, and client actions."
      >
        {notifications.length > 0 && (
          <button className="btn btn-tensora-secondary" onClick={handleClearAll}>
            <i className="bi bi-trash"></i> Clear All Alerts
          </button>
        )}
      </PageHeader>

      {notifications.length === 0 ? (
        <EmptyState
          icon="bi-bell-slash"
          title="No unread notifications"
          description="Your notification center is clear. All system triggers are up to date."
        />
      ) : (
        <div className="tensora-card p-0">
          <div className="list-group list-group-flush bg-transparent">
            {notifications.map(n => (
              <div
                key={n.id}
                className="list-group-item bg-transparent border-secondary border-opacity-25 p-3 d-flex align-items-start justify-content-between gap-3 text-white"
                style={{
                  background: n.read ? 'transparent' : 'rgba(0, 87, 255, 0.05)',
                  cursor: 'pointer'
                }}
                onClick={() => markNotificationRead(n.id)}
              >
                <div className="d-flex align-items-start gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded p-2"
                    style={{
                      width: '42px',
                      height: '42px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-blue)',
                      color: n.iconColor || 'var(--blue-neon)',
                      fontSize: '1.25rem'
                    }}
                  >
                    <i className={`bi ${n.icon || 'bi-bell'}`}></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="text-white mb-0 fw-bold">{n.title}</h6>
                      {!n.read && (
                        <span className="badge bg-primary rounded-pill small" style={{ fontSize: '0.65rem' }}>
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-muted mb-1 mt-1 small" style={{ fontSize: '0.85rem' }}>
                      {n.message}
                    </p>
                    <small className="text-muted font-mono" style={{ fontSize: '0.72rem' }}>
                      <i className="bi bi-clock me-1"></i>
                      {n.time}
                    </small>
                  </div>
                </div>

                <div>
                  {!n.read && (
                    <button
                      className="btn btn-sm btn-link text-primary p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationRead(n.id);
                        toast.success('Marked as read');
                      }}
                    >
                      <i className="bi bi-check2"></i> Mark read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
