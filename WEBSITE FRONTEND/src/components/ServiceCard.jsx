import React from 'react';
import { Link } from 'react-router-dom';

const serviceGradients = {
  'web-development': 'linear-gradient(145deg, #0284c7 0%, #2563eb 55%, #4f46e5 100%)',
  'app-development': 'linear-gradient(145deg, #4f46e5 0%, #7c3aed 55%, #c084fc 100%)',
  'game-script-development': 'linear-gradient(145deg, #0369a1 0%, #0284c7 50%, #2563eb 100%)',
  'graphic-design': 'linear-gradient(145deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)',
  '3d-modelling': 'linear-gradient(145deg, #0891b2 0%, #0284c7 50%, #4f46e5 100%)',
  'photo-video-editing': 'linear-gradient(145deg, #6d28d9 0%, #7c3aed 50%, #a855f7 100%)'
};

export const ServiceCard = ({ service }) => {
  const cardGradient =
    serviceGradients[service.id] ||
    'linear-gradient(145deg, #0284c7 0%, #2563eb 55%, #4f46e5 100%)';

  return (
    <div className="h-100 position-relative pb-2 scroll-reveal">
      <div className="plan-card-frame">
        {/* Inner Gradient Container (Matching User Reference Image) */}
        <div className="plan-card-inner" style={{ background: cardGradient }}>
          <div>
            {/* Top Category Badge & Icon */}
            <div className="d-flex align-items-center justify-content-between mb-3 position-relative" style={{ zIndex: 2 }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.20)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '1.25rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <i className={`bi ${service.icon}`} />
              </div>
              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.22)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFFFFF',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  letterSpacing: '0.04em'
                }}
              >
                {service.badge ? service.badge.toUpperCase() : 'SOLUTIONS'}
              </span>
            </div>

            {/* Service Title */}
            <h3 className="plan-card-header-title">
              {service.title}
            </h3>

            {/* Feature List with Checkmarks (Matching Image List Style) */}
            <ul className="plan-card-feature-list">
              {service.features.slice(0, 4).map((feat, idx) => (
                <li key={idx} className="plan-card-feature-item">
                  <i className="bi bi-check-lg plan-card-feature-icon" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Left Metric / Tier */}
          <div className="plan-card-bottom-bar">
            <div>
              <div className="plan-card-metric-num">
                {service.badge ? service.badge : 'PRO'}
              </div>
              <div className="plan-card-metric-sub">
                TDS Enterprise Grade
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right Step-Down Cutout Action Button (Matching Reference Image Notch) */}
        <div className="plan-card-cutout-area">
          <Link to={`/services/${service.id}`} className="plan-card-action-btn">
            <span>Explore</span>
            <i className="bi bi-caret-right-fill" style={{ fontSize: '0.75rem' }} />
          </Link>
        </div>
      </div>
    </div>
  );
};
