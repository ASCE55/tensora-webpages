import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export const NotFound = () => {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center text-center position-relative overflow-hidden bg-grid-lines py-5"
      style={{ backgroundColor: 'var(--bg-main)' }}
    >
      <div className="hero-radial-glow" />

      <Container fluid="md" className="position-relative" style={{ zIndex: 1, maxWidth: '650px' }}>
        <div className="mb-4">
          <img
            src="/logo.png"
            alt="TENSORA"
            style={{ maxHeight: '65px', width: 'auto', filter: 'grayscale(30%)' }}
          />
        </div>

        <div
          className="font-display fw-bold text-blue-gradient mb-2"
          style={{
            fontSize: 'clamp(5rem, 12vw, 8.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.04em'
          }}
        >
          404
        </div>

        <h2 className="font-display fw-bold text-white mb-3" style={{ fontSize: '1.85rem' }}>
          Looks like you've entered a digital dead end.
        </h2>

        <p className="text-silver-muted mb-5 mx-auto" style={{ maxWidth: '480px', lineHeight: '1.7' }}>
          The requested coordinate or document node does not exist in the Tensora server cluster. Return to the main portal or explore our active services.
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link to="/" className="btn-tensora-primary px-4 py-3">
            <i className="bi bi-house-door-fill me-1"></i>
            Return Home
          </Link>
          <Link to="/services" className="btn-tensora-secondary px-4 py-3">
            <i className="bi bi-grid-fill me-1 text-blue-neon"></i>
            Explore Services
          </Link>
        </div>
      </Container>
    </div>
  );
};
