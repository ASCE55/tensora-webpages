import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  return (
    <section
      className="position-relative py-5 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1A47FF 0%, #0031CC 100%)' }}
    >
      {/* White grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: '52px 52px'
      }} />

      {/* Blobs */}
      <div className="blob-bg" style={{ width: '500px', height: '500px', top: '-20%', left: '10%', background: 'rgba(255,255,255,0.06)', animationDelay: '0s' }} />
      <div className="blob-bg" style={{ width: '400px', height: '400px', bottom: '-20%', right: '5%', background: 'rgba(255,255,255,0.04)', animationDelay: '3s' }} />

      {/* Watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(4rem,10vw,10rem)',
        color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.08)',
        letterSpacing: '-0.03em', whiteSpace: 'nowrap', pointerEvents: 'none',
        userSelect: 'none', zIndex: 0, lineHeight: 1
      }}>
        LET'S BUILD
      </div>

      <Container fluid="xl" className="position-relative py-lg-3" style={{ zIndex: 1 }}>
        <div className="text-center" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <span className="mb-4 d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            <i className="bi bi-rocket-takeoff-fill" />
            Initiate Collaboration
          </span>

          <h2
            className="font-display fw-bold mb-3"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '-0.025em', lineHeight: 1.1, color: '#fff' }}
          >
            READY TO BUILD SOMETHING <span style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'underline', textUnderlineOffset: '6px', textDecorationColor: 'rgba(255,255,255,0.35)' }}>GREAT?</span>
          </h2>

          <p className="mb-5 mx-auto" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: '1.75', maxWidth: '640px', color: 'rgba(255,255,255,0.72)' }}>
            Have an idea, project or business challenge? Let's turn it into a high-performance digital solution built with precision engineering and creative mastery.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#fff', color: 'var(--blue-electric)',
                border: '1px solid rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                padding: '0.75rem 2rem', borderRadius: 'var(--radius-md)',
                fontSize: '0.95rem', transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)', textDecoration: 'none'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
            >
              <i className="bi bi-lightning-charge-fill" />
              Start Your Project
            </Link>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.12)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.30)',
                fontFamily: 'var(--font-display)', fontWeight: 600,
                padding: '0.75rem 2rem', borderRadius: 'var(--radius-md)',
                fontSize: '0.95rem', transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)', textDecoration: 'none'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.20)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <i className="bi bi-chat-left-dots" />
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
