import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SectionTitle } from '../components/SectionTitle';
import { TechnologyGrid } from '../components/TechnologyGrid';
import { CTASection } from '../components/CTASection';
import { technologiesData } from '../data/technologiesData';

export const Skills = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');

  const domains = [
    { id: 'all', label: 'All Skill Domains', icon: 'bi-grid-fill' },
    { id: 'frontend', label: 'Frontend Web & UI', icon: 'bi-code-square' },
    { id: 'backend', label: 'Backend Microservices', icon: 'bi-hdd-network' },
    { id: 'database', label: 'Database & Storage', icon: 'bi-database' },
    { id: 'gaming', label: 'Gaming & FiveM RP', icon: 'bi-controller' },
    { id: 'creative', label: '3D CGI & Media', icon: 'bi-box-seam' },
    { id: 'devops', label: 'Cloud & DevOps', icon: 'bi-cloud-check' },
  ];

  // Flatten all skills for quick search capability
  const allSkillsList = [];
  Object.entries(technologiesData).forEach(([domainKey, list]) => {
    list.forEach((item) => {
      allSkillsList.push({ ...item, domain: domainKey });
    });
  });

  const filteredSkills = allSkillsList.filter((tech) => {
    const matchesDomain = selectedDomain === 'all' || tech.domain === selectedDomain;
    const matchesSearch =
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-main)' }}>

      {/* ══════════════════════════════════════════════
          PAGE HERO HEADER
      ══════════════════════════════════════════════ */}
      <section className="py-5 position-relative overflow-hidden" style={{ minHeight: '48vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-radial-glow" />
        <div className="star-bg" />

        <Container fluid="xl" className="position-relative z-2 pt-4">
          <Row className="justify-content-center text-center">
            <Col lg={9} md={10}>
              <span className="tensora-badge mb-3 scroll-reveal">
                ⚡ TECHNICAL EXCELLENCE &amp; STACK
              </span>

              <h1
                className="font-display fw-extrabold text-white mb-4 scroll-reveal delay-100"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', letterSpacing: '-0.035em', lineHeight: 1.08 }}
              >
                SKILLS &amp; TECHNOLOGIES <br />
                <span className="hero-highlight-title">WE KNOW &amp; MASTER</span>
              </h1>

              <p className="text-silver-muted lead mb-4 scroll-reveal delay-200" style={{ maxWidth: '780px', margin: '0 auto' }}>
                Explore the complete arsenal of full-stack engineering frameworks, game roleplay systems, 3D CGI software, and cloud infrastructure powering Tensora Digital Solutions.
              </p>

              {/* Real-time Interactive Search Input */}
              <div className="d-flex justify-content-center scroll-reveal delay-300">
                <div
                  className="d-flex align-items-center w-100 px-4 py-2 rounded-pill"
                  style={{
                    maxWidth: '560px',
                    background: 'rgba(255, 255, 255, 0.07)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <i className="bi bi-search text-blue-neon fs-5 me-3" />
                  <input
                    type="text"
                    placeholder="Search any skill (e.g. React, FiveM, Node.js, Blender)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#FFFFFF',
                      outline: 'none',
                      width: '100%',
                      fontSize: '0.96rem',
                      fontWeight: 500
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="btn btn-sm text-white-50 p-0 ms-2"
                      title="Clear search"
                    >
                      <i className="bi bi-x-circle-fill" />
                    </button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          METRICS BANNER
      ══════════════════════════════════════════════ */}
      <section className="py-4 border-top border-bottom border-secondary border-opacity-25" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <Container fluid="xl">
          <Row className="g-4 text-center">
            <Col md={3} sm={6}>
              <div className="p-2">
                <div className="font-display text-blue-neon fw-extrabold fs-2">30+</div>
                <div className="text-silver-muted small fw-semibold">Technologies Mastered</div>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-2">
                <div className="font-display text-blue-neon fw-extrabold fs-2">6</div>
                <div className="text-silver-muted small fw-semibold">Core Specialized Divisions</div>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-2">
                <div className="font-display text-blue-neon fw-extrabold fs-2">&lt; 10ms</div>
                <div className="text-silver-muted small fw-semibold">Database &amp; Game Sync</div>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-2">
                <div className="font-display text-blue-neon fw-extrabold fs-2">100%</div>
                <div className="text-silver-muted small fw-semibold">Production Ready &amp; Battle Tested</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          MAIN SKILLS SHOWCASE & FILTERS
      ══════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl" className="py-lg-3">

          <SectionTitle
            badge="Full Stack Directory"
            title="EXPLORE ALL SKILLS WE WEILD."
            subtitle="Filter by specialization or use the search bar above to inspect specific technologies, frameworks, and tools."
            align="center"
          />

          {/* Domain Filter Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {domains.map((dom) => (
              <button
                key={dom.id}
                onClick={() => setSelectedDomain(dom.id)}
                className={`btn px-4 py-2 rounded-pill font-display small fw-semibold transition-all d-inline-flex align-items-center gap-2 ${
                  selectedDomain === dom.id
                    ? 'btn-tensora-primary shadow-glow'
                    : 'btn-tensora-secondary'
                }`}
                style={{ fontSize: '0.86rem' }}
              >
                <i className={`bi ${dom.icon}`} />
                <span>{dom.label}</span>
              </button>
            ))}
          </div>

          {/* Filtered Grid Display */}
          {searchQuery !== '' ? (
            <div>
              <p className="text-silver-muted text-center mb-4">
                Showing {filteredSkills.length} result(s) for &quot;<span className="text-white fw-bold">{searchQuery}</span>&quot;
              </p>

              {filteredSkills.length > 0 ? (
                <Row className="g-4">
                  {filteredSkills.map((tech, idx) => (
                    <Col key={idx} lg={4} md={6} sm={12}>
                      <div className="blue-variant-card scroll-reveal">
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="blue-variant-logo-icon">
                              <i className={`bi ${tech.icon}`} />
                            </div>
                            <div className="blue-variant-pill-btn">
                              <span>{tech.level || 'Expert'}</span>
                              <i className="bi bi-bookmark-fill" style={{ fontSize: '0.7rem' }} />
                            </div>
                          </div>

                          <div className="d-flex align-items-center gap-2 mb-2" style={{ position: 'relative', zIndex: 2 }}>
                            <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.75)', fontWeight: 500 }}>
                              {tech.domain.toUpperCase()}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>•</span>
                            <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                              Production Ready
                            </span>
                          </div>

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

                          <div className="d-flex flex-wrap gap-2 mb-4">
                            <span className="blue-variant-tag-outline">
                              {tech.desc || 'High Performance'}
                            </span>
                            <span className="blue-variant-tag-outline">
                              TDS Standard
                            </span>
                          </div>
                        </div>

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
                            <div>
                              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
                                Sub-second
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.70)', marginTop: '2px' }}>
                                Latency &amp; Speed
                              </div>
                            </div>

                            <a href="/contact" className="blue-variant-apply-btn">
                              EXPERT
                            </a>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center py-5 glass-card p-5">
                  <i className="bi bi-search fs-1 text-muted mb-3 d-block" />
                  <h4 className="text-white">No skills match your search &quot;{searchQuery}&quot;</h4>
                  <p className="text-silver-muted mb-4">Try searching for keywords like React, Node, FiveM, Lua, Blender, or MySQL.</p>
                  <button onClick={() => setSearchQuery('')} className="btn-tensora-primary px-4 py-2">
                    Clear Search Filter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <TechnologyGrid />
          )}

        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          PROFICIENCY & DOMAIN BREAKDOWN
      ══════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <Container fluid="xl" className="py-lg-4">
          <SectionTitle
            badge="Proficiency Metrics"
            title="DEPTH OF TECHNICAL MASTERY."
            subtitle="We maintain continuous benchmark standards across engineering, performance, security, and rendering pipeline architectures."
            align="center"
          />

          <Row className="g-4">
            <Col lg={6}>
              <div className="glass-card p-4 h-100 border-subtle">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="p-3 rounded-3" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
                    <i className="bi bi-code-square fs-3" />
                  </div>
                  <div>
                    <h4 className="text-white fw-bold mb-1">Web &amp; Mobile Development</h4>
                    <span className="text-silver-muted small">React.js, Node.js, REST APIs, HTML5/CSS3</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-white small fw-bold">Component Architecture &amp; State</span>
                    <span className="text-blue-neon small fw-bold">98%</span>
                  </div>
                  <div className="progress" style={{ height: '8px', background: 'rgba(255,255,255,0.08)' }}>
                    <div className="progress-bar" style={{ width: '98%', background: 'linear-gradient(90deg, #0284c7, #2563eb)' }} />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-white small fw-bold">REST API &amp; Microservices</span>
                    <span className="text-blue-neon small fw-bold">95%</span>
                  </div>
                  <div className="progress" style={{ height: '8px', background: 'rgba(255,255,255,0.08)' }}>
                    <div className="progress-bar" style={{ width: '95%', background: 'linear-gradient(90deg, #0284c7, #2563eb)' }} />
                  </div>
                </div>

                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-white small fw-bold">UI Performance &amp; Sub-second Loading</span>
                    <span className="text-blue-neon small fw-bold">99%</span>
                  </div>
                  <div className="progress" style={{ height: '8px', background: 'rgba(255,255,255,0.08)' }}>
                    <div className="progress-bar" style={{ width: '99%', background: 'linear-gradient(90deg, #0284c7, #2563eb)' }} />
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="glass-card p-4 h-100 border-subtle">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="p-3 rounded-3" style={{ background: 'rgba(147, 51, 234, 0.15)', color: '#c084fc' }}>
                    <i className="bi bi-controller fs-3" />
                  </div>
                  <div>
                    <h4 className="text-white fw-bold mb-1">Gaming, QBCore &amp; 3D CGI</h4>
                    <span className="text-silver-muted small">FiveM, QBCore/ESX, Lua 5.4, Blender 3D, WebGL</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-white small fw-bold">FiveM Multiplayer &amp; NUI HUD</span>
                    <span className="text-blue-neon small fw-bold">99%</span>
                  </div>
                  <div className="progress" style={{ height: '8px', background: 'rgba(255,255,255,0.08)' }}>
                    <div className="progress-bar" style={{ width: '99%', background: 'linear-gradient(90deg, #9333ea, #c084fc)' }} />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-white small fw-bold">Lua 5.4 High Performance Optimization</span>
                    <span className="text-blue-neon small fw-bold">96%</span>
                  </div>
                  <div className="progress" style={{ height: '8px', background: 'rgba(255,255,255,0.08)' }}>
                    <div className="progress-bar" style={{ width: '96%', background: 'linear-gradient(90deg, #9333ea, #c084fc)' }} />
                  </div>
                </div>

                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-white small fw-bold">Blender 3D CGI &amp; Photorealistic Textures</span>
                    <span className="text-blue-neon small fw-bold">94%</span>
                  </div>
                  <div className="progress" style={{ height: '8px', background: 'rgba(255,255,255,0.08)' }}>
                    <div className="progress-bar" style={{ width: '94%', background: 'linear-gradient(90deg, #9333ea, #c084fc)' }} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <CTASection />

    </div>
  );
};
