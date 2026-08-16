import React from 'react';
import { Link } from 'react-router-dom';

export const ProjectCard = ({ project }) => {
  const projNum = project.id < 10 ? `0${project.id}` : `${project.id}`;

  return (
    <div className="h-100 position-relative pb-3 scroll-reveal">
      {/* Window Card Outer Frame */}
      <div className="window-tab-card">

        {/* Top Window Tab Bar Header */}
        <div className="window-tab-bar">
          <div className="window-tab-pill">
            <span className="window-tab-num">{projNum}</span>
            <span>{project.category || 'CASE STUDY'}</span>
            <i className="bi bi-x ms-2" style={{ cursor: 'pointer', opacity: 0.6 }} />
          </div>
          <div className="window-tab-controls">
            <i className="bi bi-plus-lg" style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Inner Window Canvas Area */}
        <div className="window-tab-canvas">

          {/* Project Image Header */}
          <div
            style={{
              position: 'relative',
              height: '145px',
              borderRadius: '14px',
              overflow: 'hidden',
              marginBottom: '0.75rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.35)'
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)' }} />
            <span className="badge position-absolute top-0 start-0 m-2" style={{ background: '#2563eb', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
              {project.client}
            </span>
          </div>

          {/* Highlight Selection Box with Corner Handles */}
          <div className="window-selection-box">
            {/* Top-Left Corner Handle */}
            <div className="selection-handle-top d-flex align-items-center justify-content-center">
              <div style={{ width: '5px', height: '5px', background: '#ffffff', borderRadius: '50%' }} />
            </div>

            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A1128', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              {project.title}
            </h4>
            <p style={{ fontSize: '0.74rem', fontWeight: 800, color: '#1E293B', marginTop: '4px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              CLIENT: {project.client.toUpperCase()}
            </p>

            {/* Bottom-Right Corner Handle */}
            <div className="selection-handle-bottom d-flex align-items-center justify-content-center">
              <div style={{ width: '5px', height: '5px', background: '#ffffff', borderRadius: '50%' }} />
            </div>
          </div>

          {/* Tech Stack Badges (Matching Pic 1 Dark Pills) */}
          <div className="d-flex flex-wrap gap-1 mt-2 mb-2">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="badge" style={{ background: '#1E293B', color: '#ffffff', fontSize: '0.72rem', fontWeight: 600, padding: '5px 10px', borderRadius: '8px' }}>
                {tech}
              </span>
            ))}
          </div>

        </div>

        {/* Bottom Floating Action Bar (White Emblem matching Pic 1) */}
        <div className="window-bottom-badge">
          <Link
            to={`/demo/${project.id}`}
            className="btn btn-sm rounded-pill fw-bold d-inline-flex align-items-center gap-1 text-decoration-none"
            style={{
              background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
              color: '#ffffff',
              fontSize: '0.78rem',
              padding: '0.35rem 0.95rem',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.4)'
            }}
          >
            <i className="bi bi-play-fill fs-6" />
            <span>LIVE DEMO</span>
          </Link>

          <Link
            to={`/projects/${project.id}`}
            className="d-inline-flex align-items-center justify-content-center text-white text-decoration-none rounded-circle ms-1"
            title="View Full Case Study"
            style={{
              width: '32px',
              height: '32px',
              background: '#1e293b',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease'
            }}
          >
            <i className="bi bi-arrow-up-right" style={{ fontSize: '0.85rem' }} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;
