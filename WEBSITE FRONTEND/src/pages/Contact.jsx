import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { PageHeader } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';

export const Contact = () => {
  const [searchParams] = useSearchParams();
  const defaultService = searchParams.get('service') || '';

  const contactRows = [
    { label: 'EMAIL', value: 'contact@tensoradigital.com', icon: 'bi-send-fill', link: 'mailto:contact@tensoradigital.com' },
    { label: 'PHONE', value: '+91 (Official Line Pending)', icon: 'bi-telephone-fill', link: null },
    { label: 'ADDRESS', value: 'TENSORA DIGITAL SOLUTIONS PVT LTD, TAMIL NADU, INDIA', icon: 'bi-geo-alt-fill', link: null }
  ];

  return (
    <div>
      <PageHeader
        badge="Initiate Direct Contact"
        title="LET'S BUILD SOMETHING EXTRAORDINARY."
        subtitle="Have an ambitious web project, mobile app, custom FiveM server script, 3D render, or media inquiry? Connect directly with our team."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl">
          {/* ── 1. CYBERPUNK SCI-FI CONTACT HEADER (MATCHING USER REFERENCE IMAGE) ── */}
          <div className="cyber-hud-header scroll-reveal mb-5">
            <div className="d-flex align-items-center justify-content-between mb-3 text-silver-muted small">
              <span className="font-display tracking-widest text-uppercase" style={{ letterSpacing: '0.25em', fontSize: '0.78rem' }}>
                [ TENSORA INTEL CORE ]
              </span>
              <span className="font-display text-blue-neon" style={{ letterSpacing: '0.15em', fontSize: '0.78rem' }}>
                [ :::::::::: ]
              </span>
            </div>

            {/* Massive Cyberpunk Title */}
            <h1 className="cyber-main-title text-center text-white mb-2">
              CONTACT
            </h1>

            {/* GPS Coordinate Ticker */}
            <div className="text-center font-display text-blue-neon small fw-bold mb-4" style={{ letterSpacing: '0.3em' }}>
              13°04'57"N &nbsp; 80°14'47"E
            </div>

            <p className="text-center text-silver-muted mx-auto mb-4" style={{ maxWidth: '650px', fontSize: '0.98rem', lineHeight: '1.7' }}>
              You can contact us in any convenient way. Or fill out the form below and our technical leads will contact you within 24 hours.
            </p>

            {/* Contact Rows (Matching Reference Image Rows) */}
            <div className="d-flex flex-column gap-2 pt-3 border-top border-secondary border-opacity-25">
              {contactRows.map((row, idx) => (
                <div key={idx} className="cyber-contact-row d-flex align-items-center justify-content-between p-3 rounded-3">
                  <div className="d-flex align-items-center gap-3">
                    <span className="cyber-label-pill">{row.label}</span>
                    {row.link ? (
                      <a href={row.link} className="cyber-row-val text-white fw-bold text-decoration-none">
                        {row.value}
                      </a>
                    ) : (
                      <span className="cyber-row-val text-white fw-bold">{row.value}</span>
                    )}
                  </div>
                  <i className={`bi ${row.icon} text-blue-neon fs-5`}></i>
                </div>
              ))}
            </div>
          </div>

          {/* ── 2. SCI-FI LOCATION BLUEPRINT MAP SECTION ── */}
          <div className="mb-5 scroll-reveal">
            <h3 className="cyber-section-heading mb-3">
              LOCATION
            </h3>

            {/* 3D Blueprint Map Banner (Matching Reference Image Blue Map) */}
            <div className="cyber-blue-map-banner position-relative rounded-4 overflow-hidden">
              <div className="map-blueprint-grid"></div>
              <div className="map-content-overlay d-flex flex-column align-items-center justify-content-center text-center p-5">
                <div className="cyber-map-pin-badge mb-3">
                  <i className="bi bi-geo-alt-fill fs-3 text-primary"></i>
                </div>
                <h3 className="font-display fw-bold text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
                  TENSORA DIGITAL OPERATIONS CENTER
                </h3>
                <p className="text-white text-opacity-75 small mb-3" style={{ maxWidth: '500px' }}>
                  Registered Office & Corporate Development Center • Tamil Nadu, India
                </p>
                <span className="badge rounded-pill bg-white text-dark fw-bold px-3 py-2">
                  <i className="bi bi-pin-map-fill me-1 text-primary"></i>
                  Google Maps API Ready Integration
                </span>
              </div>
            </div>
          </div>

          {/* ── 3. "LET'S TALK" INTAKE SECTION WITH DYNAMIC LIQUID FLUID ORB ── */}
          <div className="scroll-reveal">
            <h3 className="cyber-section-heading mb-4">
              LET'S TALK
            </h3>

            <Row className="g-4 align-items-center">
              {/* Left Column: Organic Liquid Morphing Fluid Orb */}
              <Col lg={5} className="text-center">
                <div className="cyber-fluid-orb-container">
                  {/* Outer Liquid Blur Glow */}
                  <div className="cyber-fluid-orb-blur"></div>

                  {/* Inner Organic Liquid Blob Shell */}
                  <div className="cyber-fluid-orb">
                    <img src="/logo.png" alt="Tensora" className="cyber-orb-logo" />
                  </div>
                </div>
              </Col>

              {/* Right Column: HUD Sci-Fi Form Box */}
              <Col lg={7}>
                <div className="cyber-hud-form-card">
                  <div className="d-flex align-items-center justify-content-between mb-3 text-silver-muted small">
                    <span className="font-display tracking-wider" style={{ fontSize: '0.75rem' }}>YOUR QUESTION</span>
                    <span className="font-display text-blue-neon" style={{ fontSize: '0.75rem' }}>[ :::::::: ]</span>
                  </div>

                  <ContactForm defaultService={defaultService} />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Cyberpunk HUD & Liquid Fluid Styles */}
      <style>{`
        .cyber-hud-header {
          background: rgba(10, 14, 28, 0.85);
          border: 1px solid rgba(59, 123, 255, 0.3);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
        }

        .cyber-main-title {
          font-family: var(--font-primary);
          font-weight: 900;
          font-size: clamp(3.2rem, 7.5vw, 6rem);
          letter-spacing: -0.04em;
          line-height: 1;
          background: linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cyber-contact-row {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.25s ease;
        }
        .cyber-contact-row:hover {
          background: rgba(30, 41, 59, 0.9);
          border-color: rgba(56, 189, 248, 0.4);
          transform: translateX(4px);
        }

        .cyber-label-pill {
          background: rgba(59, 123, 255, 0.18);
          color: #38bdf8;
          border: 1px solid rgba(59, 123, 255, 0.35);
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .cyber-section-heading {
          font-family: var(--font-primary);
          font-weight: 900;
          font-size: clamp(2rem, 4vw, 3rem);
          color: #ffffff;
          letter-spacing: -0.03em;
        }

        /* 3D Blue Blueprint Map Banner */
        .cyber-blue-map-banner {
          background: linear-gradient(135deg, #0284c7 0%, #1d4ed8 50%, #030712 100%);
          min-height: 320px;
          box-shadow: 0 25px 60px rgba(2, 132, 199, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .map-blueprint-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .map-content-overlay {
          position: relative;
          z-index: 2;
          min-height: 320px;
        }

        .cyber-map-pin-badge {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        /* ── ORGANIC LIQUID MORPHING FLUID ORB (REPLACING SOLID BALL) ── */
        .cyber-fluid-orb-container {
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          min-height: 320px;
        }

        .cyber-fluid-orb-blur {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          background: radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.75) 0%, rgba(37, 99, 235, 0.55) 50%, rgba(124, 58, 237, 0.35) 100%);
          filter: blur(28px);
          animation: liquidMorph 8s ease-in-out infinite alternate, liquidSpin 12s linear infinite;
        }

        .cyber-fluid-orb {
          width: 260px;
          height: 260px;
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          background: linear-gradient(135deg, #0284c7 0%, #2563eb 40%, #4f46e5 75%, #030712 100%);
          box-shadow: 
            0 0 50px rgba(56, 189, 248, 0.65),
            inset 0 -25px 40px rgba(3, 7, 18, 0.85),
            inset 0 25px 50px rgba(255, 255, 255, 0.6),
            0 0 0 2px rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          animation: liquidMorph 7s ease-in-out infinite alternate, liquidSpin 16s linear infinite;
          overflow: hidden;
        }

        .cyber-fluid-orb::before {
          content: '';
          position: absolute;
          inset: 10px;
          border-radius: 55% 45% 35% 65% / 60% 35% 65% 40%;
          background: radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.45) 0%, transparent 60%);
          animation: liquidMorph 5s ease-in-out infinite reverse;
          pointer-events: none;
        }

        .cyber-fluid-orb::after {
          content: '';
          position: absolute;
          inset: -20px;
          border-radius: 48% 52% 68% 32% / 42% 58% 42% 58%;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          animation: liquidSpin 10s linear infinite;
          pointer-events: none;
        }

        .cyber-orb-logo {
          width: 52%;
          height: auto;
          position: relative;
          z-index: 5;
          filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.95)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
          animation: logoFloat 4s ease-in-out infinite;
        }

        @keyframes liquidMorph {
          0% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          }
          33% {
            border-radius: 65% 35% 40% 60% / 35% 65% 35% 65%;
          }
          66% {
            border-radius: 35% 65% 55% 45% / 60% 35% 65% 40%;
          }
          100% {
            border-radius: 58% 42% 38% 62% / 50% 50% 50% 50%;
          }
        }

        @keyframes liquidSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.03); }
        }

        .cyber-hud-form-card {
          background: rgba(10, 14, 28, 0.85);
          border: 1px solid rgba(59, 123, 255, 0.3);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </div>
  );
};
