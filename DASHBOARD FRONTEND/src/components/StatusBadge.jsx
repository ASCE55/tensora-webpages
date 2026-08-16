import React from 'react';

export const StatusBadge = ({ status }) => {
  if (!status) return null;

  const normalized = status.toString().toLowerCase().replace(/\s+/g, '');

  let badgeClass = 'status-badge-planning';
  let dotColor = '#737b87';

  switch (normalized) {
    case 'active':
    case 'completed':
    case 'paid':
    case 'present':
      badgeClass = 'status-badge-completed';
      dotColor = '#00e676';
      break;
    case 'inprogress':
    case 'partiallypaid':
    case 'halfday':
      badgeClass = 'status-badge-inprogress';
      dotColor = '#00a8ff';
      break;
    case 'review':
    case 'pending':
      badgeClass = 'status-badge-review';
      dotColor = '#ffb300';
      break;
    case 'onhold':
    case 'leave':
      badgeClass = 'status-badge-onhold';
      dotColor = '#9d4edd';
      break;
    case 'cancelled':
    case 'overdue':
    case 'absent':
    case 'high':
      badgeClass = 'status-badge-cancelled';
      dotColor = '#ff3366';
      break;
    case 'medium':
      badgeClass = 'status-badge-review';
      dotColor = '#ffb300';
      break;
    case 'low':
      badgeClass = 'status-badge-completed';
      dotColor = '#00e676';
      break;
    default:
      badgeClass = 'status-badge-planning';
      dotColor = '#737b87';
  }

  return (
    <span className={`badge-status ${badgeClass}`}>
      <span className="badge-status-dot" style={{ backgroundColor: dotColor }}></span>
      {status}
    </span>
  );
};
