import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { PageHeader } from '../components/PageHeader';
import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';
import { ProjectCard } from '../components/ProjectCard';

export const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Find related projects for this service category
  const relatedProjects = projectsData.filter((p) => {
    if (service.id === 'web-development') return p.category === 'WEB';
    if (service.id === 'app-development') return p.category === 'APP';
    if (service.id === 'game-script-development') return p.category === 'GAME';
    if (service.id === 'graphic-design') return p.category === 'DESIGN';
    if (service.id === '3d-modelling') return p.category === '3D';
    if (service.id === 'photo-video-editing') return p.category === 'MEDIA';
    return false;
  });

  return (
    <div>
      <PageHeader
        badge={`Service 0${service.number} • ${service.badge}`}
        title={service.title.toUpperCase()}
        subtitle={service.shortDescription}
        breadcrumbs={[
          { label: 'Services', path: '/services' },
          { label: service.title }
        ]}
      />

      <section className="py-4 py-md-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl">
          {/* ── WHITE & BLUE WORKSPACE DASHBOARD ── */}
          <div className="workspace-device-frame-white scroll-reveal">
            {/* Top Workspace Header Bar */}
            <div className="workspace-header-bar-white">
              <div className="d-flex align-items-center gap-2">
                <img src="/logo.png" alt="Tensora" style={{ height: '26px', filter: 'brightness(1.5)' }} />
                <span className="font-display fw-bold fs-6 tracking-tight text-white">
                  Tensora Digital <span style={{ color: '#60a5fa', fontWeight: 600 }}>/ Architecture Workspace</span>
                </span>
              </div>

              <div className="d-none d-md-flex align-items-center gap-3">
                <span className="badge rounded-pill px-3 py-2 text-white small" style={{ background: 'rgba(59, 123, 255, 0.2)', border: '1px solid rgba(59, 123, 255, 0.4)' }}>
                  <i className="bi bi-mortarboard me-1 text-cyan"></i>
                  Architecture Blueprint
                </span>
                <span className="badge rounded-pill px-3 py-2 text-white small" style={{ background: 'rgba(56, 189, 248, 0.2)', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
                  <i className="bi bi-speedometer2 me-1 text-blue-bright"></i>
                  Active Sprints
                </span>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="btn btn-sm btn-light text-dark fw-bold rounded-pill px-4 py-2"
                  style={{ fontSize: '0.84rem' }}
                >
                  <i className="bi bi-send-fill me-1 text-primary"></i>
                  Discuss Project
                </Link>
              </div>
            </div>

            {/* Main Clean White Canvas Area */}
            <div className="workspace-canvas-white">
              <Row className="g-4">
                {/* ── LEFT & CENTER COLUMN: Architecture Execution Plan ── */}
                <Col lg={8}>
                  {/* Workspace Title & Search Bar */}
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <div>
                      <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.03em' }}>
                        Execution Architecture Plan ⏰
                      </h2>
                      <p style={{ color: '#475569', fontSize: '0.92rem', margin: '4px 0 0 0', fontWeight: 600 }}>
                        {service.fullDescription.substring(0, 120)}...
                      </p>
                    </div>

                    {/* Quick Stat Counter Cards in White & Blue Theme */}
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ background: '#eff6ff', padding: '10px 16px', borderRadius: '14px', textAlign: 'center', border: '1px solid #bfdbfe', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1d4ed8', lineHeight: 1 }}>{service.features.length}</div>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', marginTop: '3px' }}>Scope Items</div>
                      </div>

                      <div style={{ background: '#f0f9ff', padding: '10px 16px', borderRadius: '14px', textAlign: 'center', border: '1px solid #bae6fd', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7', lineHeight: 1 }}>5</div>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', marginTop: '3px' }}>Phases 🎉</div>
                      </div>

                      <div style={{ background: '#eef2ff', padding: '10px 16px', borderRadius: '14px', textAlign: 'center', border: '1px solid #c7d2fe', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4338ca', lineHeight: 1 }}>{service.deliverables.length}</div>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase', marginTop: '3px' }}>Deliverables</div>
                      </div>
                    </div>
                  </div>

                  {/* Lifecycle Step Nodes Grid */}
                  <Row className="g-3 mb-4 position-relative">
                    {/* Floating Vibrant Electric Blue Highlight Card */}
                    <Col md={6} className="order-md-2">
                      <div className="floating-active-card-wb scroll-reveal">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span style={{ fontSize: '0.74rem', fontWeight: 800, background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: '8px', color: '#ffffff', border: '1px solid rgba(255,255,255,0.35)' }}>
                            Active Development ⚡
                          </span>
                          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                            <i className="bi bi-play-fill" style={{ fontSize: '1.2rem', color: '#1d4ed8', marginLeft: '2px' }}></i>
                          </div>
                        </div>

                        <h4 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', marginBottom: '6px', letterSpacing: '-0.02em' }}>
                          {service.title} Engine Core
                        </h4>
                        <p style={{ fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.92)', fontWeight: 500, marginBottom: '14px', lineHeight: 1.5 }}>
                          High-performance modular architecture crafted for speed, scalability, and security.
                        </p>

                        <div className="d-flex align-items-center justify-content-between pt-2 border-top" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <i className="bi bi-clock-history"></i> Response &lt; 0.01ms
                          </span>
                          <div className="d-flex align-items-center gap-1">
                            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#60a5fa', display: 'inline-block', border: '2px solid #fff' }}></span>
                            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block', border: '2px solid #fff', marginLeft: '-8px' }}></span>
                            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#818cf8', display: 'inline-block', border: '2px solid #fff', marginLeft: '-8px' }}></span>
                          </div>
                        </div>
                      </div>
                    </Col>

                    {/* Step 1 Node */}
                    <Col md={6} className="order-md-1">
                      <div className="roadmap-node-card-wb scroll-reveal">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1d4ed8', background: '#dbeafe', padding: '3px 10px', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
                            Completed 👏
                          </span>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8' }}>01</span>
                        </div>
                        <h5 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                          Architecture & Wireframing
                        </h5>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, fontWeight: 500 }}>
                          Mapping user flows, technical stack selection, and structural wireframes.
                        </p>
                      </div>
                    </Col>

                    {/* Step 2 Node */}
                    <Col md={6} className="order-md-3">
                      <div className="roadmap-node-card-wb scroll-reveal">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1d4ed8', background: '#dbeafe', padding: '3px 10px', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
                            Completed 👏
                          </span>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8' }}>02</span>
                        </div>
                        <h5 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                          UI/UX & Interactive Design
                        </h5>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, fontWeight: 500 }}>
                          Crafting futuristic, high-conversion visual design systems.
                        </p>
                      </div>
                    </Col>

                    {/* Step 3 Node */}
                    <Col md={6} className="order-md-4">
                      <div className="roadmap-node-card-wb scroll-reveal">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0284c7', background: '#e0f2fe', padding: '3px 10px', borderRadius: '6px', border: '1px solid #bae6fd' }}>
                            Upcoming 🔒
                          </span>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8' }}>03</span>
                        </div>
                        <h5 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                          Testing & Deployment
                        </h5>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, fontWeight: 500 }}>
                          Rigorous QA stress testing, speed optimization, and CI/CD deployment.
                        </p>
                      </div>
                    </Col>
                  </Row>

                  {/* Capability Features Grid */}
                  <div style={{ background: '#ffffff', borderRadius: '18px', padding: '22px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <h5 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="bi bi-layers-fill" style={{ color: '#2563eb' }}></i>
                      Scope & Included Solution Capabilities
                    </h5>
                    <Row className="g-2">
                      {service.features.map((feat, idx) => (
                        <Col key={idx} sm={6}>
                          <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #f1f5f9', fontSize: '0.84rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="bi bi-check-circle-fill" style={{ color: '#2563eb', fontSize: '0.85rem' }}></i>
                            <span>{feat}</span>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Col>

                {/* ── RIGHT COLUMN: Deliverables & Milestones in White & Blue Theme ── */}
                <Col lg={4}>
                  <div className="d-flex flex-column gap-3">
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                      Project Deliverables 🧐
                    </h3>

                    {/* White & Blue Deliverable Card 1 (Ice Blue) */}
                    <div className="pastel-wb-ice scroll-reveal">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="fw-bold small" style={{ color: '#1e40af', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="bi bi-box-seam-fill"></i> Software Binary
                        </span>
                        <span className="small fw-semibold" style={{ color: '#2563eb' }}>Phase 01</span>
                      </div>
                      <h6 className="fw-bold mb-1" style={{ color: '#1e3a8a', fontSize: '0.95rem' }}>
                        {service.deliverables ? service.deliverables[0] : 'Production Solution Build'}
                      </h6>
                      <span className="small" style={{ color: '#3b82f6', fontSize: '0.78rem' }}>
                        <i className="bi bi-clock me-1"></i> Ready for Release
                      </span>
                    </div>

                    {/* White & Blue Deliverable Card 2 (Sky Blue) */}
                    <div className="pastel-wb-sky scroll-reveal">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="fw-bold small" style={{ color: '#0369a1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="bi bi-code-slash"></i> Source Repository
                        </span>
                        <span className="small fw-semibold" style={{ color: '#0284c7' }}>Phase 02</span>
                      </div>
                      <h6 className="fw-bold mb-1" style={{ color: '#0c4a6e', fontSize: '0.95rem' }}>
                        {service.deliverables ? service.deliverables[1] : 'Full Source Code & Documentation'}
                      </h6>
                      <span className="small" style={{ color: '#0284c7', fontSize: '0.78rem' }}>
                        <i className="bi bi-shield-check me-1"></i> Complete Ownership
                      </span>
                    </div>

                    {/* White & Blue Deliverable Card 3 (Indigo Royal) */}
                    <div className="pastel-wb-indigo scroll-reveal">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="fw-bold small" style={{ color: '#3730a3', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="bi bi-lightning-charge-fill"></i> Optimization
                        </span>
                        <span className="small fw-semibold" style={{ color: '#4f46e5' }}>Phase 03</span>
                      </div>
                      <h6 className="fw-bold mb-1" style={{ color: '#312e81', fontSize: '0.95rem' }}>
                        {service.deliverables ? service.deliverables[2] || service.deliverables[0] : 'High Speed Optimization Score > 90'}
                      </h6>
                      <span className="small" style={{ color: '#4f46e5', fontSize: '0.78rem' }}>
                        <i className="bi bi-graph-up me-1"></i> Core Web Vitals Passed
                      </span>
                    </div>

                    {/* White & Blue Deliverable Card 4 (Ocean Mint) */}
                    <div className="pastel-wb-mint scroll-reveal">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="fw-bold small" style={{ color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="bi bi-headset"></i> Support Warranty
                        </span>
                        <span className="small fw-semibold" style={{ color: '#16a34a' }}>Ongoing</span>
                      </div>
                      <h6 className="fw-bold mb-1" style={{ color: '#14532d', fontSize: '0.95rem' }}>
                        30-Day Dedicated Technical Warranty & Maintenance
                      </h6>
                      <span className="small" style={{ color: '#16a34a', fontSize: '0.78rem' }}>
                        <i className="bi bi-patch-check me-1"></i> 24/7 SLA Guarantee
                      </span>
                    </div>

                    {/* Technologies & Tools Box */}
                    <div style={{ background: '#ffffff', borderRadius: '18px', padding: '20px', border: '1px solid #e2e8f0', marginTop: '6px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                      <h6 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                        Technologies & Frameworks:
                      </h6>
                      <div className="d-flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span key={idx} style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '0.78rem', fontWeight: 700, padding: '5px 12px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="py-5 border-top border-secondary border-opacity-25" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <Container fluid="xl" className="py-lg-4">
            <h3 className="font-display fw-bold text-white mb-4">
              Featured Case Studies in {service.title}
            </h3>
            <Row className="g-4">
              {relatedProjects.map((proj) => (
                <Col key={proj.id} lg={4} md={6}>
                  <ProjectCard project={proj} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Styles for White & Blue Workspace Dashboard */}
      <style>{`
        .workspace-device-frame-white {
          background: #090d16;
          border-radius: 28px;
          padding: 16px;
          border: 1px solid rgba(59, 123, 255, 0.35);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.8), 0 0 45px rgba(59, 123, 255, 0.2);
        }
        .workspace-header-bar-white {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px 16px 18px;
          color: #ffffff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 16px;
        }
        .workspace-canvas-white {
          background: #f8fafc;
          border-radius: 20px;
          padding: 28px;
          color: #0f172a;
          position: relative;
          overflow: hidden;
        }
        .roadmap-node-card-wb {
          background: #ffffff;
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          border: 1px solid #e2e8f0;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .roadmap-node-card-wb:hover {
          transform: translateY(-4px);
          border-color: #3b82f6;
          box-shadow: 0 12px 30px rgba(59, 123, 255, 0.15);
        }
        .floating-active-card-wb {
          background: linear-gradient(135deg, #0284c7 0%, #2563eb 55%, #1d4ed8 100%);
          border-radius: 22px;
          padding: 22px;
          box-shadow: 0 20px 50px rgba(37, 99, 235, 0.35), 0 0 30px rgba(56, 189, 248, 0.3);
          border: 2px solid #ffffff;
          transform: rotate(-1.5deg) translateY(-4px);
          position: relative;
          z-index: 10;
          color: #ffffff;
        }
        .pastel-wb-ice {
          background: #eff6ff;
          border-radius: 18px;
          padding: 18px;
          border: 1px solid #bfdbfe;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
        }
        .pastel-wb-sky {
          background: #f0f9ff;
          border-radius: 18px;
          padding: 18px;
          border: 1px solid #bae6fd;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
        }
        .pastel-wb-indigo {
          background: #eef2ff;
          border-radius: 18px;
          padding: 18px;
          border: 1px solid #c7d2fe;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
        }
        .pastel-wb-mint {
          background: #f0fdf4;
          border-radius: 18px;
          padding: 18px;
          border: 1px solid #bbf7d0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
        }
      `}</style>
    </div>
  );
};
