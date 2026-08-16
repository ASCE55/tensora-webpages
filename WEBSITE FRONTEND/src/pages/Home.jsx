import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { StatsCounter } from '../components/StatsCounter';
import { SectionTitle } from '../components/SectionTitle';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectCard } from '../components/ProjectCard';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { TechnologyGrid } from '../components/TechnologyGrid';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { PillarFolderCard } from '../components/PillarFolderCard';
import { CTASection } from '../components/CTASection';
import { BrandProfileCard } from '../components/BrandProfileCard';
import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';

/* Trusted company logos */
const trustedCompanies = [
  { name: 'NovaCorp', icon: 'bi-hexagon-fill' },
  { name: 'Brightbox', icon: 'bi-box-fill' },
  { name: 'FeatherDev', icon: 'bi-feather' },
  { name: 'GlobalBen', icon: 'bi-globe2' },
  { name: 'Orbitline', icon: 'bi-circle-half' },
];

const pillarsData = [
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

export const Home = () => {
  const featuredProjects = projectsData.slice(0, 3);
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [heroTheme, setHeroTheme] = useState('white-frozen'); // 'white-frozen', 'dark-cyber', 'light-cream', 'frost-aurora'

  // 3D Parallax Tilt Handler on Mouse Move
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const ry = (x / (rect.width / 2)) * 5; // Max 5 deg
    const rx = -(y / (rect.height / 2)) * 5; // Max 5 deg
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const whyItems = [
    { num: '01', title: 'Innovation', desc: 'Constantly exploring modern tech, AI pipelines, and creative approaches to keep your brand ahead of the curve.', icon: 'bi-lightbulb' },
    { num: '02', title: 'Quality', desc: 'Delivering reliable, rock-solid, professionally crafted digital solutions built to stringent standards.', icon: 'bi-patch-check' },
    { num: '03', title: 'Performance', desc: 'Solutions designed for extreme speed, sub-second responsiveness, zero lag, and effortless scalability.', icon: 'bi-speedometer' },
    { num: '04', title: 'Creativity', desc: 'Engineering precision combined with cinematic creative design to craft unforgettable digital experiences.', icon: 'bi-palette' },
    { num: '05', title: 'Support', desc: 'Dedicated communication, proactive monitoring, and 24/7 technical assistance throughout the project lifecycle.', icon: 'bi-headset' },
    { num: '06', title: 'Scalability', desc: 'Modular codebases and cloud architectures engineered to scale seamlessly as your business grows.', icon: 'bi-graph-up-arrow' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)' }}>

      {/* ══════════════════════════════════════════════
          MULTI-THEME INTERACTIVE HERO LANDING CARD
      ══════════════════════════════════════════════ */}
      <section
        className="py-4 py-md-5 position-relative overflow-hidden"
        style={{ minHeight: '94vh', display: 'flex', alignItems: 'center', perspective: '1200px' }}
      >
        {/* Soft Ambient Radial Backdrop Glow */}
        <div className={`hero-theme-ambient-glow theme-${heroTheme}`}></div>

        <Container fluid="xl" className="position-relative z-2">



          {/* Dynamic Hero Card Shell */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`hero-dynamic-card theme-${heroTheme} scroll-reveal`}
            style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: tilt.rx === 0 ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.1s ease-out'
            }}
          >
            {/* Top Bar Navigation Inside Card */}
            <div className="d-flex align-items-center justify-content-between p-3 px-md-5 hero-card-nav-border">
              <div className="d-flex align-items-center gap-2">
                <img src="/logo.png" alt="Tensora" style={{ height: '26px' }} />
                <span className="font-display fw-extrabold fs-5 hero-card-brand-title">
                  TENSORA
                </span>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="d-none d-md-flex align-items-center gap-4">
                  <Link to="/about" className="hero-card-nav-link">about us</Link>
                  <Link to="/services" className="hero-card-nav-link">services</Link>
                  <Link to="/projects" className="hero-card-nav-link">projects</Link>
                  <Link to="/contact" className="hero-card-nav-link">contacts</Link>
                </div>
                <Link
                  to="/contact"
                  className="btn btn-sm rounded-pill px-3 py-1 fw-bold d-md-none hero-card-action-btn"
                  style={{ fontSize: '0.75rem' }}
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Main Split Grid */}
            <Row className="g-0 align-items-stretch" style={{ minHeight: '520px' }}>
              {/* ── LEFT COLUMN: Main Content Surface ── */}
              <Col lg={6} className="p-4 p-md-5 p-lg-5 d-flex flex-column justify-content-center">
                <div className="pe-lg-3">
                  <span className="badge rounded-pill px-3 py-2 fw-bold mb-4 hero-pill-badge">
                    ⚡ TENSORA DIGITAL SOLUTIONS
                  </span>

                  <h1 className="hero-card-title mb-4">
                    TRANSFORMING IDEAS INTO <br />
                    <span className="hero-highlight-title">POWERFUL DIGITAL REALITY</span>
                  </h1>

                  <p className="hero-card-desc mb-3">
                    Full-stack web engineering, custom mobile applications, FiveM game scripting, and 3D CGI visual production.
                  </p>

                  <p className="hero-card-subdesc mb-4">
                    Engineered for high performance, designed for impact, and built to scale your enterprise digital ecosystem.
                  </p>

                  <div className="d-flex flex-wrap align-items-center gap-3 pt-2">
                    <Link to="/projects" className="btn btn-lg rounded-pill px-4 py-3 fw-bold hero-card-action-btn">
                      <span>Explore Our Work</span>
                      <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                    <Link to="/contact" className="btn btn-lg rounded-pill px-4 py-3 fw-bold btn-outline-primary hero-card-secondary-btn">
                      <span>Get Started</span>
                    </Link>
                  </div>
                </div>
              </Col>

              {/* ── RIGHT COLUMN: Electric Blurred Canvas & 3D Glass Slices ── */}
              <Col lg={6} className="position-relative overflow-hidden">
                <div className="hero-card-right-canvas h-100 position-relative d-flex align-items-center justify-content-center">
                  {/* Glowing Radial Orb */}
                  <div className="hero-card-orb"></div>

                  {/* 🌟 LOGO WATERMARK IN BACKGROUND 🌟 */}
                  <img
                    src="/logo.png"
                    alt="Tensora Logo"
                    className="hero-card-logo-watermark"
                  />

                  {/* 4 Sliced Vertical Card Panels */}
                  <div className="hero-card-panel panel-1"></div>
                  <div className="hero-card-panel panel-2"></div>
                  <div className="hero-card-panel panel-3"></div>
                  <div className="hero-card-panel panel-4"></div>

                  {/* 🌟 LUXURY CURSIVE CALLIGRAPHY WATERMARK ("Tensora") 🌟 */}
                  <h1 className="hero-card-watermark-cursive">
                    Tensora
                  </h1>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          COMPANY STATS COUNTER
      ══════════════════════════════════════════════ */}
      <section className="py-4 border-top border-bottom border-secondary border-opacity-25" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <Container fluid="xl">
          <StatsCounter />
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED CORE PILLARS
      ══════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl" className="py-lg-4">
          <SectionTitle
            badge="Engineering Pillars"
            title="FOUR CORE DIVISIONS OF EXCELLENCE."
            subtitle="Explore Tensora Digital Solutions' core technical capabilities spanning software engineering, game systems, 3D CGI, and media production."
            align="center"
          />

          <Row className="g-4">
            {pillarsData.map((pillar) => (
              <Col key={pillar.id} lg={6}>
                <PillarFolderCard pillar={pillar} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          BRAND PROFILE / CORPORATE INTEL
      ══════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <Container fluid="xl">
          <BrandProfileCard />
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          SERVICES OVERVIEW
      ══════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl" className="py-lg-4">
          <SectionTitle
            badge="Tailored Solutions"
            title="COMPREHENSIVE DIGITAL SERVICES."
            subtitle="From concept architectural design to production deployment, we deliver high-velocity solutions engineered for scale."
            align="center"
          />

          <Row className="g-4">
            {servicesData.map((srv) => (
              <Col key={srv.id} lg={4} md={6}>
                <ServiceCard service={srv} />
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Link to="/services" className="btn-tensora-secondary px-4 py-3">
              <span>View All 6 Specialized Services</span>
              <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED PROJECTS
      ══════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <Container fluid="xl" className="py-lg-4">
          <SectionTitle
            badge="Selected Work"
            title="RECENT CASE STUDIES & BUILDS."
            subtitle="Explore real-world applications engineered by Tensora for industry leaders across fintech, gaming, robotics, and media."
            align="center"
          />

          <Row className="g-4">
            {featuredProjects.map((proj) => (
              <Col key={proj.id} lg={4} md={6}>
                <ProjectCard project={proj} />
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Link to="/projects" className="btn-tensora-primary px-4 py-3">
              <span>Explore Full Portfolio Showcase</span>
              <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          DEVELOPMENT PROCESS TIMELINE
      ══════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl" className="py-lg-4">
          <SectionTitle
            badge="Development Methodology"
            title="HOW WE ENGINEER YOUR VISION."
            subtitle="Our structured 5-phase engineering lifecycle guarantees rapid iteration, complete transparency, and zero deployment friction."
            align="center"
          />

          <ProcessTimeline />
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          WHY CHOOSE TENSORA GRID
      ══════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <Container fluid="xl" className="py-lg-4">
          <SectionTitle
            badge="The Tensora Advantage"
            title="ENGINEERED FOR UNCOMPROMISING QUALITY."
            subtitle="Why leading enterprises, gaming networks, and innovative startups partner with Tensora Digital Solutions."
            align="center"
          />

          <Row className="g-4">
            {whyItems.map((item, idx) => (
              <Col key={idx} lg={4} md={6}>
                <div className="glass-card p-4 h-100 border-subtle d-flex flex-column justify-content-between position-relative overflow-hidden">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="font-display text-blue-neon fw-bold fs-4">{item.num}</span>
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3"
                      style={{
                        width: '42px',
                        height: '42px',
                        backgroundColor: 'rgba(0, 87, 255, 0.12)',
                        color: 'var(--blue-neon)',
                        fontSize: '1.2rem'
                      }}
                    >
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display fw-bold text-white mb-2">{item.title}</h4>
                    <p className="text-silver-muted mb-0 small" style={{ lineHeight: '1.65' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          TECHNOLOGY STACK GRID
      ══════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl" className="py-lg-4">
          <SectionTitle
            badge="Tech Stack"
            title="MODERN TOOLS & FRAMEWORKS."
            subtitle="We utilize industry-standard, bleeding-edge frameworks to craft robust, future-proof software solutions."
            align="center"
          />

          <TechnologyGrid />
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <Container fluid="xl" className="py-lg-4">
          <SectionTitle
            badge="Client Endorsements"
            title="WHAT OUR PARTNERS SAY."
            subtitle="Feedback from enterprise executives, server owners, and creative directors who rely on Tensora Solutions."
            align="center"
          />

          <TestimonialSlider />
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          CALL TO ACTION
      ══════════════════════════════════════════════ */}
      <CTASection />

      {/* Multi-Theme Styling Engine */}
      <style>{`
        /* Ambient Outer Background Glows */
        .hero-theme-ambient-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          transition: all 0.5s ease;
        }
        .hero-theme-ambient-glow.theme-white-frozen {
          background: radial-gradient(circle at 75% 50%, rgba(56, 189, 248, 0.45) 0%, rgba(37, 99, 235, 0.25) 45%, #edf3fc 100%);
        }
        .hero-theme-ambient-glow.theme-dark-cyber {
          background: radial-gradient(circle at 75% 50%, rgba(37, 99, 235, 0.6) 0%, rgba(56, 189, 248, 0.35) 45%, #030712 100%);
        }
        .hero-theme-ambient-glow.theme-frost-aurora {
          background: radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.5) 0%, rgba(147, 51, 234, 0.4) 50%, #060b18 100%);
        }
        .hero-theme-ambient-glow.theme-light-cream {
          background: radial-gradient(circle at 75% 50%, rgba(37, 99, 235, 0.7) 0%, rgba(56, 189, 248, 0.45) 45%, #090d16 100%);
        }

        /* Hero Card Shell */
        .hero-dynamic-card {
          border-radius: 36px;
          overflow: hidden;
          position: relative;
          will-change: transform;
          transform-style: preserve-3d;
          transition: background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease;
        }

        /* ── THEME 0: WHITE FROZEN GLASS (PRIMARY FROST LOOK) ── */
        .hero-dynamic-card.theme-white-frozen {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(32px) saturate(200%);
          -webkit-backdrop-filter: blur(32px) saturate(200%);
          color: #0f172a;
          border: 1.5px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 35px 110px rgba(37, 99, 235, 0.18), 0 0 60px rgba(56, 189, 248, 0.22), inset 0 1px 2px rgba(255, 255, 255, 1);
        }
        .theme-white-frozen .hero-card-brand-title { color: #0f172a; font-weight: 900; }
        .theme-white-frozen .hero-card-nav-link { color: #334155; font-weight: 600; text-transform: lowercase; }
        .theme-white-frozen .hero-card-nav-link:hover { color: #2563eb; }
        .theme-white-frozen .hero-pill-badge { background: rgba(37, 99, 235, 0.08); color: #2563eb; border: 1px solid rgba(37, 99, 235, 0.25); font-weight: 800; font-size: 0.76rem; letter-spacing: 0.08em; }
        .theme-white-frozen .hero-card-title { color: #0f172a; font-family: var(--font-primary); font-weight: 900; font-size: clamp(2.3rem, 4.2vw, 3.5rem); line-height: 1.08; letter-spacing: -0.035em; margin-bottom: 1.25rem; }
        .theme-white-frozen .hero-highlight-title { background: linear-gradient(135deg, #0284c7 0%, #2563eb 55%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block; }
        .theme-white-frozen .hero-card-desc { color: #0f172a; font-weight: 800; font-size: 1.12rem; line-height: 1.5; letter-spacing: -0.015em; }
        .theme-white-frozen .hero-card-subdesc { color: #475569; font-size: 0.95rem; line-height: 1.65; font-weight: 500; }
        .theme-white-frozen .hero-card-action-btn { background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); color: #ffffff !important; font-weight: 800; font-size: 0.95rem; border-radius: 9999px; padding: 0.85rem 2.2rem; border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: 0 10px 28px rgba(37, 99, 235, 0.4); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; }
        .theme-white-frozen .hero-card-action-btn:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 15px 38px rgba(37, 99, 235, 0.55); color: #ffffff !important; }
        .theme-white-frozen .hero-card-secondary-btn { background: rgba(255, 255, 255, 0.6); color: #0f172a !important; font-weight: 800; font-size: 0.95rem; border-radius: 9999px; padding: 0.85rem 2rem; border: 1px solid rgba(37, 99, 235, 0.3); transition: all 0.3s ease; text-decoration: none; }
        .theme-white-frozen .hero-card-secondary-btn:hover { background: rgba(37, 99, 235, 0.08); border-color: #2563eb; color: #2563eb !important; transform: translateY(-2px); }
        .theme-white-frozen .hero-card-right-canvas { background: linear-gradient(135deg, rgba(238, 244, 255, 0.6) 0%, rgba(224, 236, 255, 0.8) 100%); }
        .theme-white-frozen .hero-card-orb { background: radial-gradient(circle at 50% 50%, #3b82f6 0%, #60a5fa 45%, #38bdf8 85%, transparent 100%); filter: blur(35px); }
        .theme-white-frozen .hero-card-panel { background: rgba(255, 255, 255, 0.30); backdrop-filter: blur(16px); border-left: 1.5px solid rgba(255, 255, 255, 0.8); }
        .theme-white-frozen .hero-card-watermark-cursive { color: #ffffff; text-shadow: 0 15px 45px rgba(15, 23, 42, 0.3), 0 0 35px rgba(56, 189, 248, 0.9); }

        /* ── THEME 1: DARK SAPPHIRE GLASS ── */
        .hero-dynamic-card.theme-dark-cyber {
          background: linear-gradient(145deg, #061129 0%, #0a1b42 60%, #03081a 100%);
          color: #ffffff;
          border: 1px solid rgba(59, 123, 255, 0.4);
          box-shadow: 0 40px 120px rgba(0, 0, 0, 0.9), 0 0 60px rgba(56, 189, 248, 0.25);
        }
        .theme-dark-cyber .hero-card-brand-title { color: #ffffff; }
        .theme-dark-cyber .hero-card-nav-link { color: rgba(255, 255, 255, 0.75); }
        .theme-dark-cyber .hero-card-nav-link:hover { color: #38bdf8; }
        .theme-dark-cyber .hero-pill-badge { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
        .theme-dark-cyber .hero-card-title { color: #ffffff; font-family: var(--font-primary); font-weight: 900; font-size: clamp(2.4rem, 4.8vw, 3.8rem); line-height: 1.1; }
        .theme-dark-cyber .hero-highlight-title { background: linear-gradient(90deg, #38bdf8 0%, #60a5fa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .theme-dark-cyber .hero-card-desc { color: #ffffff; font-weight: 700; }
        .theme-dark-cyber .hero-card-subdesc { color: rgba(200, 215, 240, 0.8); }
        .theme-dark-cyber .hero-card-action-btn { background: linear-gradient(135deg, #0284c7 0%, #1d4ed8 100%); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4); }
        .theme-dark-cyber .hero-card-right-canvas { background: transparent; }
        .theme-dark-cyber .hero-card-orb { background: radial-gradient(circle at 50% 50%, #1d4ed8 0%, #2563eb 50%, #0284c7 85%, transparent 100%); filter: blur(35px); }
        .theme-dark-cyber .hero-card-panel { background: rgba(15, 23, 42, 0.35); backdrop-filter: blur(16px); border-left: 1px solid rgba(56, 189, 248, 0.3); }
        .theme-dark-cyber .hero-card-watermark-cursive { color: #ffffff; text-shadow: 0 0 35px rgba(56, 189, 248, 0.9), 0 15px 45px rgba(0, 0, 0, 0.9); }

        /* ── THEME 2: FROST AURORA GLASS ── */
        .hero-dynamic-card.theme-frost-aurora {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(30px);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6), 0 0 80px rgba(147, 51, 234, 0.3);
        }
        .theme-frost-aurora .hero-card-brand-title { color: #ffffff; }
        .theme-frost-aurora .hero-card-nav-link { color: rgba(255, 255, 255, 0.75); }
        .theme-frost-aurora .hero-card-nav-link:hover { color: #c084fc; }
        .theme-frost-aurora .hero-pill-badge { background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }
        .theme-frost-aurora .hero-card-title { color: #ffffff; font-family: var(--font-primary); font-weight: 900; font-size: clamp(2.4rem, 4.8vw, 3.8rem); line-height: 1.1; }
        .theme-frost-aurora .hero-highlight-title { background: linear-gradient(90deg, #c084fc 0%, #e879f9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .theme-frost-aurora .hero-card-desc { color: #ffffff; font-weight: 700; }
        .theme-frost-aurora .hero-card-subdesc { color: rgba(230, 220, 250, 0.85); }
        .theme-frost-aurora .hero-card-action-btn { background: linear-gradient(135deg, #9333ea 0%, #c084fc 100%); color: #ffffff; border: none; box-shadow: 0 10px 30px rgba(147, 51, 234, 0.4); }
        .theme-frost-aurora .hero-card-right-canvas { background: transparent; }
        .theme-frost-aurora .hero-card-orb { background: radial-gradient(circle at 50% 50%, #9333ea 0%, #c084fc 50%, #3b82f6 85%, transparent 100%); filter: blur(40px); }
        .theme-frost-aurora .hero-card-panel { background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(20px); border-left: 1px solid rgba(255, 255, 255, 0.25); }
        .theme-frost-aurora .hero-card-watermark-cursive { color: #ffffff; text-shadow: 0 0 35px rgba(192, 132, 252, 0.9), 0 15px 45px rgba(0, 0, 0, 0.8); }

        /* ── THEME 3: MINIMAL CREAM STUDIO (Reference Image) ── */
        .hero-dynamic-card.theme-light-cream {
          background: #fdfbf7;
          color: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 40px 120px rgba(0, 0, 0, 0.4), 0 0 50px rgba(56, 189, 248, 0.25);
        }
        .theme-light-cream .hero-card-brand-title { color: #0f172a; }
        .theme-light-cream .hero-card-nav-link { color: #334155; }
        .theme-light-cream .hero-card-nav-link:hover { color: #2563eb; }
        .theme-light-cream .hero-pill-badge { background: #18181b; color: #ffffff; }
        .theme-light-cream .hero-card-title { color: #0f172a; font-family: var(--font-primary); font-weight: 800; font-size: clamp(2.4rem, 4.8vw, 3.8rem); line-height: 1.1; }
        .theme-light-cream .hero-highlight-title { color: #0f172a; }
        .theme-light-cream .hero-card-desc { color: #334155; font-weight: 700; }
        .theme-light-cream .hero-card-subdesc { color: #64748b; }
        .theme-light-cream .hero-card-action-btn { background: #18181b; color: #ffffff; border-radius: 50px; box-shadow: 0 10px 30px rgba(24, 24, 27, 0.25); }
        .theme-light-cream .hero-card-right-canvas { background: #fdfbf7; }
        .theme-light-cream .hero-card-orb { background: radial-gradient(circle at 50% 50%, #1d4ed8 0%, #2563eb 45%, #0284c7 85%, transparent 100%); filter: blur(35px); }
        .theme-light-cream .hero-card-panel { background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border-left: 1.5px solid rgba(255, 255, 255, 0.45); }
        .theme-light-cream .hero-card-watermark-cursive { color: #ffffff; text-shadow: 0 15px 45px rgba(0, 0, 0, 0.4), 0 0 35px rgba(255, 255, 255, 0.7); }

        /* Shared Right Canvas Orb & Panels */
        .hero-card-logo-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 360px;
          max-width: 82%;
          height: auto;
          opacity: 0.88;
          filter: drop-shadow(0 15px 40px rgba(37, 99, 235, 0.45));
          pointer-events: none;
          z-index: 2;
          transition: all 0.4s ease;
          animation: logoWatermarkPulse 7s ease-in-out infinite alternate;
        }
        @keyframes logoWatermarkPulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.82; }
          100% { transform: translate(-50%, -50%) scale(1.06); opacity: 0.95; }
        }

        .hero-card-orb {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          animation: orbFloat 8s ease-in-out infinite alternate;
        }
        @keyframes orbFloat {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(-10px, 10px); }
        }

        .hero-card-panel {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 25%;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 24px 12px;
          z-index: 2;
          transition: all 0.35s ease;
        }
        .hero-card-panel:hover {
          z-index: 4;
        }

        .panel-1 { left: 0%; }
        .panel-2 { left: 25%; }
        .panel-3 { left: 50%; }
        .panel-4 { left: 75%; }

        .hero-panel-tag {
          color: rgba(255, 255, 255, 0.95);
          font-size: 0.72rem;
          font-weight: 600;
          line-height: 1.35;
          text-align: center;
          max-width: 110px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }

        .hero-card-watermark-cursive {
          position: relative;
          z-index: 10;
          font-family: 'Great Vibes', 'Dancing Script', 'Alex Brush', cursive;
          font-weight: 400;
          font-size: clamp(4.5rem, 10vw, 8.5rem);
          letter-spacing: 0.02em;
          pointer-events: none;
          margin: 0;
          line-height: 1;
          transform: rotate(-3deg);
          animation: cursiveGlowPulse 4s ease-in-out infinite alternate;
        }
        @keyframes cursiveGlowPulse {
          0% { transform: rotate(-3deg) scale(1); }
          100% { transform: rotate(-2deg) scale(1.04); }
        }
      `}</style>
    </div>
  );
};
