import React from 'react';

export const EmptyState = ({
  icon = 'bi-folder2-open',
  title = 'No records found',
  description = 'There are no items to display right now.',
  actionText,
  onAction
}) => {
  return (
    <div className="tensora-card text-center p-5 my-3">
      <div
        className="mx-auto mb-3 d-flex align-items-center justify-content-center"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(0, 87, 255, 0.08)',
          border: '1px solid var(--border-blue)',
          color: 'var(--blue-neon)',
          fontSize: '1.75rem'
        }}
      >
        <i className={`bi ${icon}`}></i>
      </div>
      <h5 className="text-white mb-2">{title}</h5>
      <p className="text-muted mx-auto mb-4" style={{ maxWidth: '400px', fontSize: '0.9rem' }}>
        {description}
      </p>
      {actionText && onAction && (
        <button className="btn-tensora-primary mx-auto" onClick={onAction}>
          <i className="bi bi-plus-lg"></i>
          {actionText}
        </button>
      )}
    </div>
  );
};
