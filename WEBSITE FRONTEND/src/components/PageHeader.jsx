import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const PageHeader = ({
  badge = 'TENSORA DIGITAL SOLUTIONS',
  title,
  subtitle,
  breadcrumbs = [],
  watermarkText
}) => {
  const displayWatermark = watermarkText || (breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label.toUpperCase() : 'TENSORA');

  return (
    <div
      className="position-relative overflow-hidden bg-grid-lines w-100"
      style={{
        paddingTop: '9.5rem',
        paddingBottom: '4.5rem',
        backgroundColor: 'var(--blue-electric)',
        backgroundImage: 'linear-gradient(135deg, #1A47FF 0%, #0031CC 100%)',
        borderBottom: '1px solid rgba(26,71,255,0.20)',
        maxWidth: '100vw',
      }}
    >
      {/* White grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '52px 52px'
      }} />

      {/* Blob accents */}
      <div className="blob-bg" style={{ width: '450px', height: '450px', top: '-30%', left: '-5%', background: 'rgba(255,255,255,0.07)', animationDelay: '0s' }} />
      <div className="blob-bg" style={{ width: '400px', height: '400px', top: '-20%', right: '-5%', background: 'rgba(255,255,255,0.05)', animationDelay: '2.5s' }} />

      {/* High-Impact Watermark (Visible & crisp on both PC and Mobile) */}
      <div style={{
        position: 'absolute',
        top: '52%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 'clamp(5rem, 14vw, 12rem)',
        color: 'rgba(255, 255, 255, 0.08)',
        WebkitTextStroke: '2px rgba(255, 255, 255, 0.28)',
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
        lineHeight: 1,
        width: '100%',
        textAlign: 'center'
      }}>
        {displayWatermark}
      </div>

      <Container fluid="xl" className="position-relative text-center" style={{ zIndex: 1, maxWidth: '900px' }}>
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav className="d-flex justify-content-center align-items-center gap-2 mb-4 small" style={{ color: 'rgba(255,255,255,0.60)' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.60)', textDecoration: 'none' }}>Home</Link>
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                <span style={{ opacity: 0.4 }}>/</span>
                {b.path ? (
                  <Link to={b.path} style={{ color: 'rgba(255,255,255,0.60)', textDecoration: 'none' }}>{b.label}</Link>
                ) : (
                  <span style={{ color: '#fff', fontWeight: 600 }}>{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {badge && (
          <div className="mb-3">
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.32rem 0.85rem', borderRadius: '9999px',
              fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 0 8px rgba(255,255,255,0.8)', display: 'inline-block' }} />
              {badge}
            </span>
          </div>
        )}

        <h1 className="font-display fw-bold mb-3" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', letterSpacing: '-0.025em', lineHeight: 1.1, color: '#fff' }}>
          {title}
        </h1>

        {subtitle && (
          <p className="mb-0 mx-auto" style={{ fontSize: '1.1rem', maxWidth: '680px', lineHeight: 1.75, color: 'rgba(255,255,255,0.72)' }}>
            {subtitle}
          </p>
        )}
      </Container>
    </div>
  );
};
