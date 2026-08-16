import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { technologiesData } from '../data/technologiesData';

export const TechnologyGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'gaming', label: 'Gaming & FiveM' },
    { id: 'creative', label: '3D & Media' },
    { id: 'devops', label: 'Cloud & DevOps' }
  ];

  let displayItems = [];
  if (activeCategory === 'all') {
    Object.values(technologiesData).forEach((list) => {
      displayItems.push(...list);
    });
  } else {
    displayItems = technologiesData[activeCategory] || [];
  }

  return (
    <div>
      {/* Category selector */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`btn px-4 py-2 rounded-pill font-display small fw-semibold transition-all ${
              activeCategory === cat.id
                ? 'btn-tensora-primary shadow-glow'
                : 'btn-tensora-secondary'
            }`}
            style={{ fontSize: '0.86rem' }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid rendering cards matching the 1st Image design */}
      <Row className="g-4">
        {displayItems.map((tech, idx) => (
          <Col key={idx} lg={4} md={6} sm={12}>
            {/* Blue Variant Card matching 1st Image */}
            <div className="blue-variant-card scroll-reveal">

              {/* Top Header: Circular Translucent Icon + Save/Level Pill Badge */}
              <div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  {/* Left: Geometric/Circle White Logo Icon */}
                  <div className="blue-variant-logo-icon">
                    <i className={`bi ${tech.icon}`} />
                  </div>

                  {/* Right: Save / Level Pill Badge (Matching "Save 🔖" in 1st image) */}
                  <div className="blue-variant-pill-btn">
                    <span>{tech.level || 'Expert'}</span>
                    <i className="bi bi-bookmark-fill" style={{ fontSize: '0.7rem' }} />
                  </div>
                </div>

                {/* Subtitle / Category info (Matching "Variant-02 5 days ago" in 1st image) */}
                <div className="d-flex align-items-center gap-2 mb-2" style={{ position: 'relative', zIndex: 2 }}>
                  <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.75)', fontWeight: 500 }}>
                    Technology
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>•</span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Production Ready
                  </span>
                </div>

                {/* Main Tech Title (Matching "Product Manager" in 1st image) */}
                <h3
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    marginBottom: '1rem',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {tech.name}
                </h3>

                {/* Translucent Outline Pills (Matching "Full Time" "Remote" in 1st image) */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <span className="blue-variant-tag-outline">
                    {tech.desc || 'High Performance'}
                  </span>
                  <span className="blue-variant-tag-outline">
                    TDS Standard
                  </span>
                </div>
              </div>

              {/* Divider Line & Bottom Bar */}
              <div>
                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.22)',
                    marginTop: '0.5rem',
                    marginBottom: '1rem',
                    position: 'relative',
                    zIndex: 2
                  }}
                />

                <div className="d-flex align-items-center justify-content-between" style={{ position: 'relative', zIndex: 2 }}>
                  {/* Bottom Left Metric (Matching "$100-250 Per every hour" in 1st image) */}
                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
                      Sub-second
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.70)', marginTop: '2px' }}>
                      Latency &amp; Speed
                    </div>
                  </div>

                  {/* Bottom Right Solid White Action Button (Matching "Apply Now" in 1st image) */}
                  <a
                    href="#contact"
                    className="blue-variant-apply-btn"
                  >
                    EXPERT
                  </a>
                </div>
              </div>

            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
