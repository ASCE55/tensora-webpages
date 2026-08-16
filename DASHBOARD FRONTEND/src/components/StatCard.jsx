import React from 'react';

export const StatCard = ({
  title,
  value,
  icon = 'bi-graph-up',
  trend,
  trendType = 'positive', // 'positive' | 'negative' | 'neutral'
  trendLabel = 'vs last month',
  subtitle
}) => {
  return (
    <div className="tensora-card kpi-card h-100">
      <div className="kpi-card-header">
        <div>
          <div className="kpi-title">{title}</div>
          <div className="kpi-value">{value}</div>
        </div>
        <div className="kpi-icon-box">
          <i className={`bi ${icon}`}></i>
        </div>
      </div>

      {trend !== undefined && (
        <div className={`kpi-trend ${trendType}`}>
          <i className={`bi ${trendType === 'positive' ? 'bi-arrow-up-right' : trendType === 'negative' ? 'bi-arrow-down-right' : 'bi-dash'}`}></i>
          <span>{trend}</span>
          {trendLabel && <span className="text-muted ms-1 fw-normal" style={{ fontSize: '0.75rem' }}>{trendLabel}</span>}
        </div>
      )}

      {subtitle && (
        <div className="text-muted mt-2" style={{ fontSize: '0.78rem' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};
