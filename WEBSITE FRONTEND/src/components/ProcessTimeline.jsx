import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

export const ProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'DISCOVER',
      subtitle: 'Requirement Analysis & Strategy',
      description: 'We conduct a deep discovery dive to understand your core business model, target audience, technical architecture, and specific project requirements.',
      icon: 'bi-compass',
      highlights: ['Stakeholder alignment', 'Technical feasibility study', 'Scope & timeline specification']
    },
    {
      step: '02',
      title: 'PLAN',
      subtitle: 'Architecture & Roadmap',
      description: 'We construct full technical blueprints, database models, wireframes, and delivery sprint milestones before writing a single line of code.',
      icon: 'bi-diagram-3',
      highlights: ['System architecture', 'Interactive wireframing', 'Milestone sprint roadmap']
    },
    {
      step: '03',
      title: 'DESIGN',
      subtitle: 'UI/UX & Visual Experience',
      description: 'Our design studio crafts high-fidelity dark/futuristic interface systems, responsive layouts, micro-animations, and interactive prototypes.',
      icon: 'bi-brush',
      highlights: ['Figma design systems', 'Responsive ergonomics', 'Interactive component design']
    },
    {
      step: '04',
      title: 'DEVELOP',
      subtitle: 'Full-Stack Engineering & QA',
      description: 'We write hyper-clean, scalable, modular code using modern frontend, backend, or game engine frameworks with continuous security audits.',
      icon: 'bi-cpu',
      highlights: ['Clean modular codebase', 'Unit & stress QA testing', 'Sub-millisecond optimization']
    },
    {
      step: '05',
      title: 'DELIVER',
      subtitle: 'Launch, Deploy & Support',
      description: 'We deploy the solution to your production cloud or server environment, verify metrics, and provide ongoing 24/7 technical monitoring.',
      icon: 'bi-rocket-takeoff',
      highlights: ['Zero-downtime deployment', 'Client documentation & training', 'Continuous maintenance warranty']
    }
  ];

  return (
    <div className="position-relative scroll-reveal">
      {/* Step Navigation Pills */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
        {steps.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`btn px-3 py-2 rounded-pill font-display small fw-semibold transition-all d-flex align-items-center gap-2 ${
              activeStep === idx
                ? 'btn-tensora-primary shadow-glow'
                : 'btn-tensora-secondary'
            }`}
            style={{ fontSize: '0.85rem' }}
          >
            <span
              style={{
                color: activeStep === idx ? '#FFFFFF' : 'var(--blue-neon)',
                fontWeight: 700
              }}
            >
              {item.step}
            </span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      {/* Active Step Showcase Card */}
      <div className="glass-card p-4 p-md-5 border-blue">
        <Row className="align-items-center gy-4">
          <Col lg={7}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <span
                className="font-display fw-bold text-blue-neon"
                style={{ fontSize: '2.5rem', lineHeight: 1 }}
              >
                {steps[activeStep].step}
              </span>
              <div>
                <span className="tensora-badge small mb-1">
                  Phase {activeStep + 1} of 5
                </span>
                <h3 className="font-display fw-bold mb-0 text-white">
                  {steps[activeStep].title} — <span className="text-silver-muted font-normal" style={{ fontSize: '1.2rem' }}>{steps[activeStep].subtitle}</span>
                </h3>
              </div>
            </div>

            <p className="text-silver-bright mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
              {steps[activeStep].description}
            </p>

            <div className="d-flex flex-column gap-2 pt-3 border-top border-secondary border-opacity-25">
              <h6 className="text-white small font-display text-uppercase mb-1" style={{ letterSpacing: '0.05em' }}>
                Key Milestones & Deliverables:
              </h6>
              {steps[activeStep].highlights.map((h, i) => (
                <div key={i} className="d-flex align-items-center gap-2 text-silver-metallic small">
                  <i className="bi bi-patch-check-fill text-blue-neon"></i>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </Col>

          <Col lg={5} className="text-center">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle position-relative"
              style={{
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(0, 87, 255, 0.25) 0%, rgba(13, 17, 23, 0.9) 70%)',
                border: '1px solid var(--border-blue-active)',
                boxShadow: '0 0 40px rgba(0, 107, 255, 0.35)'
              }}
            >
              <i
                className={`bi ${steps[activeStep].icon} text-blue-neon`}
                style={{ fontSize: '4.5rem', filter: 'drop-shadow(0 0 15px rgba(0, 168, 255, 0.6))' }}
              ></i>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
