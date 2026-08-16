import React from 'react';

export const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {children && (
        <div className="d-flex align-items-center gap-2 flex-wrap">
          {children}
        </div>
      )}
    </div>
  );
};
