import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';
import { PillarFolderCard } from '../components/PillarFolderCard';
import { BrandProfileCard } from '../components/BrandProfileCard';

export const About = () => {
  const values = [
    {
      icon: 'bi-gem',
      title: 'Architectural Excellence',
      desc: 'We do not take shortcuts. From database normalization to clean frontend component trees, every build is crafted to last.'
    },
    {
      icon: 'bi-lightning-charge',
      title: 'Sub-Millisecond Speed',
      desc: 'Performance is a core feature. We optimize page load times, query response speeds, and server resource usage (resmon).'
    },
    {
      icon: 'bi-shield-check',
      title: 'Airtight Security & Privacy',
      desc: 'Role-based access control, cryptographic verification, and anti-exploit protections are integrated natively from Day 1.'
    },
    {
      icon: 'bi-chat-heart',
      title: 'Radical Transparency',
      desc: 'Continuous milestone updates, direct access to project managers, and zero hidden technical jargon.'
    }
  ];

  const pillars = [
    {
      id: 'tech',
      title: 'Technology & Engineering',
      subtitle: 'Web, Mobile & Microservices',
      desc: 'Full-stack web applications, scalable mobile applications, RESTful microservices, and database optimization.',
      icon: 'bi-cpu-fill',
      count: '2 480 Files',
      gradient: 'linear-gradient(135deg, #1A44C8 0%, #3B7BFF 50%, #60A5FA 100%)',
      accentColor: '#3B7BFF',
      cards: [
        { label: 'API Gateway', tag: 'v2.4', icon: 'bi-hdd-network-fill' },
        { label: 'React / Node.js', tag: '200 OK', icon: 'bi-code-slash' },
        { label: 'Cloud SQL DB', tag: 'Optimized', icon: 'bi-database-fill-check' }
      ]
    },
    {
      id: 'gaming',
      title: 'Gaming & Simulation Systems',
      subtitle: 'FiveM, QBCore & Game HUDs',
      desc: 'Bespoke FiveM multiplayer roleplay systems, modular QBCore/QBox/ESX frameworks, and custom NUI game HUDs.',
      icon: 'bi-controller',
      count: '1 920 Scripts',
      gradient: 'linear-gradient(135deg, #61045F 0%, #AA076B 50%, #8E2DE2 100%)',
      accentColor: '#8E2DE2',
      cards: [
        { label: 'QBCore Framework', tag: 'Lua 5.4', icon: 'bi-cpu' },
        { label: 'NUI HUD System', tag: '60 FPS', icon: 'bi-display-fill' },
        { label: 'Anti-Cheat Engine', tag: 'Secured', icon: 'bi-shield-lock-fill' }
      ]
    },
    {
      id: 'cgi',
      title: 'Creative 3D & Visual CGI',
      subtitle: 'WebGL, PBR & 3D Assets',
      desc: 'Photorealistic product rendering, game-ready low/high poly assets, PBR texturing, and WebGL 3D configurations.',
      icon: 'bi-box-seam-fill',
      count: '3 150 Assets',
      gradient: 'linear-gradient(135deg, #0072FF 0%, #00C6FF 100%)',
      accentColor: '#00C6FF',
      cards: [
        { label: 'PBR Textures', tag: '4K Resin', icon: 'bi-palette-fill' },
        { label: 'WebGL Configurator', tag: 'Interactive', icon: 'bi-bounding-box-circles' },
        { label: '3D Poly Mesh', tag: 'Low-Poly', icon: 'bi-box' }
      ]
    },
    {
      id: 'media',
      title: 'Brand Identity & Media',
      subtitle: '4K Cinema & Brand Guidelines',
      desc: 'Dynamic vector logo design, comprehensive brand guidelines, 4K commercial editing, and cinema color grading.',
      icon: 'bi-film',
      count: '1 640 Renders',
      gradient: 'linear-gradient(135deg, #E11D48 0%, #F43F5E 50%, #FB7185 100%)',
      accentColor: '#F43F5E',
      cards: [
        { label: 'Vector Branding', tag: 'SVG/EPS', icon: 'bi-vector-pen' },
        { label: '4K Commercial Edit', tag: 'ProRes 4444', icon: 'bi-camera-reels-fill' },
        { label: 'Color Grade LUTs', tag: 'Rec.709', icon: 'bi-sliders' }
      ]
    }
  ];

  return (
    <div>
      <PageHeader
        badge="About Tensora Digital Solutions"
        title="WE TURN IDEAS INTO DIGITAL REALITY."
        subtitle="TENSORA DIGITAL SOLUTIONS PVT LTD is a modern digital solutions company focused on delivering innovative technology and creative services for businesses, brands, creators and digital communities."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Mission & Overview */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl" className="py-lg-4">
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <div className="pe-lg-4">
                <span className="tensora-badge mb-3">Company Mission</span>
                <h2 className="font-display fw-bold text-silver-bright mb-4" style={{ fontSize: '2.2rem' }}>
                  Pioneering Next-Generation <span className="text-blue-gradient">Digital Architecture</span>
                </h2>
                <p className="text-silver-bright mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.75' }}>
                  At Tensora, we believe that modern digital solutions should not only function reliably but also inspire users through futuristic aesthetics, frictionless interactions, and robust performance.
                </p>
                <p className="text-silver-muted mb-4" style={{ lineHeight: '1.7' }}>
                  We bridge the gap between heavy software engineering and high-end creative design. Whether we are building a mission-critical cloud platform for an enterprise client or deploying an ultra-optimized multiplayer economy script for a gaming community, our obsession with quality remains unwavering.
                </p>
                <div className="d-flex align-items-center gap-3 pt-2">
                  <Link to="/contact" className="btn-tensora-primary px-4 py-2">
                    Partner With Us
                  </Link>
                  <Link to="/services" className="btn-tensora-secondary px-4 py-2">
                    Explore Services
                  </Link>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <BrandProfileCard />
            </Col>
          </Row>
        </Container>
      </section>

      {/* 4 Core Pillars */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <Container fluid="xl" className="py-lg-4">
          <SectionTitle
            badge="Unified Capabilities"
            title="THE FOUR PILLARS OF TENSORA"
            subtitle="How we unite diverse disciplines to deliver comprehensive digital solutions under one roof."
          />

          <Row className="g-4">
            {pillars.map((pillar) => (
              <Col key={pillar.id} lg={6}>
                <PillarFolderCard pillar={pillar} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Values & Principles */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl" className="py-lg-4">
          <SectionTitle
            badge="Foundational Values"
            title="WHAT DEFINES OUR WORK"
            subtitle="The core values that guide our engineers, artists, and project architects."
          />

          <Row className="g-4">
            {values.map((v, idx) => (
              <Col key={idx} lg={3} sm={6}>
                <div className="glass-card p-4 h-100 text-center">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: 'rgba(0, 87, 255, 0.1)',
                      border: '1px solid var(--border-blue)',
                      color: 'var(--blue-neon)',
                      fontSize: '1.5rem'
                    }}
                  >
                    <i className={`bi ${v.icon}`}></i>
                  </div>
                  <h5 className="font-display fw-bold text-white mb-2" style={{ fontSize: '1.1rem' }}>
                    {v.title}
                  </h5>
                  <p className="text-silver-muted small mb-0" style={{ lineHeight: '1.65' }}>
                    {v.desc}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <CTASection />
    </div>
  );
};
