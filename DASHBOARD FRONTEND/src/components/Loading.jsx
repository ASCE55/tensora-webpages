import React from 'react';

export const Loading = ({ text = 'Loading data...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-5">
      <div
        className="spinner-border mb-3"
        role="status"
        style={{ width: '2.5rem', height: '2.5rem', color: 'var(--blue-neon)' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="text-muted font-mono" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>
        {text}
      </div>
    </div>
  );
};
