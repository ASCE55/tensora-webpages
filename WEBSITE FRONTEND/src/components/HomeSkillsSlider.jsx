import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { technologiesData } from '../data/technologiesData';

export const HomeSkillsSlider = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);

  const categories = [
    { id: 'all', label: '⭐ All Skills' },
    { id: 'frontend', label: '💻 Frontend' },
    { id: 'backend', label: '⚡ Backend' },
    { id: 'gaming', label: '🎮 Gaming & FiveM' },
    { id: 'creative', label: '🎨 3D & CGI' },
    { id: 'devops', label: '☁️ Cloud & DevOps' },
  ];

  // Featured 8 key skills for homepage slide loop
  const featuredSkillsList = [
    { name: "React.js", category: "Frontend", icon: "bi-code-square", desc: "Component Architecture & Hooks", level: "Expert", color: "#38BDF8", tag: "UI Engine" },
    { name: "FiveM Platform", category: "Gaming", icon: "bi-controller", desc: "Multiplayer Server Infrastructure", level: "Specialist", color: "#F59E0B", tag: "60 FPS HUD" },
    { name: "Node.js & Express", category: "Backend", icon: "bi-hdd-network", desc: "Event-driven Microservices", level: "Advanced", color: "#10B981", tag: "REST API" },
    { name: "Blender 3D", category: "Creative", icon: "bi-box", desc: "Photorealistic CGI & WebGL Mesh", level: "Expert", color: "#EC4899", tag: "4K Render" },
    { name: "QBCore Framework", category: "Gaming", icon: "bi-box-seam", desc: "Modular RP Framework Scripting", level: "Specialist", color: "#8B5CF6", tag: "Lua 5.4" },
    { name: "MySQL & MongoDB", category: "Database", icon: "bi-database", desc: "Relational & NoSQL Data Storage", level: "Expert", color: "#3B82F6", tag: "Sub-10ms Sync" },
    { name: "Figma & UI/UX", category: "Creative", icon: "bi-window", desc: "Precision Design Systems & Prototypes", level: "Expert", color: "#06B6D4", tag: "Vector Systems" },
    { name: "Cloud & DevOps", category: "DevOps", icon: "bi-cloud-check", desc: "AWS / DigitalOcean / CI-CD", level: "Advanced", color: "#6366F1", tag: "Docker / Git" },
  ];

  // Filter if activeCategory selected
  let displayList = [];
  if (activeCategory === 'all') {
    displayList = featuredSkillsList;
  } else {
    displayList = featuredSkillsList.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()));
    if (displayList.length === 0) {
      // Fallback from full technologiesData if category has items
      const rawCategoryList = technologiesData[activeCategory] || [];
      displayList = rawCategoryList.map(item => ({
        ...item,
        category: activeCategory,
        color: '#38BDF8',
        tag: 'TDS Standard'
      }));
    }
  }

  // Duplicate displayList for infinite seamless loop animation
  const loopList = [...displayList, ...displayList, ...displayList];

  return (
    <div className="home-skills-slider-wrapper position-relative overflow-hidden py-3">

      {/* Category Pills Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 px-2">
        <div className="d-flex flex-wrap gap-2 align-items-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`btn rounded-pill font-display text-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'btn-tensora-primary shadow-glow'
                  : 'btn-tensora-secondary'
              }`}
              style={{ fontSize: '0.84rem', padding: '0.45rem 1.1rem' }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <Link
          to="/skills"
          className="d-inline-flex align-items-center gap-2 fw-bold text-decoration-none px-3 py-2 rounded-pill"
          style={{
            color: '#38BDF8',
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            fontSize: '0.85rem',
            transition: 'all 0.3s ease'
          }}
        >
          <span>View All 30+ Skills Page</span>
          <i className="bi bi-arrow-right" />
        </Link>
      </div>

      {/* Infinite Left-Scrolling Marquee Track */}
      <div
        className="skills-marquee-outer position-relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left & Right Gradient Fades */}
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />

        <div
          ref={scrollContainerRef}
          className={`skills-marquee-track ${isPaused ? 'paused' : ''}`}
        >
          {loopList.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="skill-card-marquee-item"
            >
              <div className="blue-variant-card h-100 d-flex flex-column justify-content-between p-4">

                {/* Top Badge & Icon */}
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="blue-variant-logo-icon" style={{ borderColor: skill.color || '#38BDF8' }}>
                      <i className={`bi ${skill.icon}`} style={{ color: skill.color || '#38BDF8' }} />
                    </div>

                    <div className="blue-variant-pill-btn">
                      <span>{skill.level || 'Expert'}</span>
                      <i className="bi bi-bookmark-fill" style={{ fontSize: '0.7rem' }} />
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.75)', fontWeight: 600 }}>
                      {skill.category || 'Technology'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>•</span>
                    <span style={{ fontSize: '0.76rem', color: 'rgba(56, 189, 248, 0.9)', fontWeight: 600 }}>
                      Production Ready
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      letterSpacing: '-0.02em',
                      marginBottom: '0.65rem'
                    }}
                  >
                    {skill.name}
                  </h3>

                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="blue-variant-tag-outline">
                      {skill.desc}
                    </span>
                    {skill.tag && (
                      <span className="blue-variant-tag-outline" style={{ background: 'rgba(56, 189, 248, 0.15)', borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38BDF8' }}>
                        ⚡ {skill.tag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Bar */}
                <div>
                  <div
                    style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.18)',
                      marginTop: '0.5rem',
                      marginBottom: '0.75rem'
                    }}
                  />

                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
                        Sub-second
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '2px' }}>
                        Speed &amp; Latency
                      </div>
                    </div>

                    <Link
                      to="/skills"
                      className="blue-variant-apply-btn"
                    >
                      EXPLORE
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom helper text for Mobile & Desktop */}
      <div className="text-center mt-3">
        <span className="badge rounded-pill px-3 py-2" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 600 }}>
          💡 Tip: Swipe left/right or hover over cards to pause rotation • Tap any card to view details
        </span>
      </div>

      {/* Component Specific CSS Engine */}
      <style>{`
        .home-skills-slider-wrapper {
          width: 100%;
        }

        .skills-marquee-outer {
          width: 100%;
          overflow: hidden;
          padding: 10px 0;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }

        .marquee-fade-left {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 40px;
          background: linear-gradient(to right, var(--bg-main), transparent);
          z-index: 3;
          pointer-events: none;
        }

        .marquee-fade-right {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 40px;
          background: linear-gradient(to left, var(--bg-main), transparent);
          z-index: 3;
          pointer-events: none;
        }

        .skills-marquee-track {
          display: flex;
          align-items: stretch;
          gap: 1.25rem;
          width: max-content;
          animation: marqueeScrollLeft 32s linear infinite;
          will-change: transform;
          touch-action: pan-y;
          cursor: grab;
        }

        .skills-marquee-track:active {
          cursor: grabbing;
        }

        .skills-marquee-track.paused {
          animation-play-state: paused !important;
        }

        @keyframes marqueeScrollLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }

        .skill-card-marquee-item {
          width: 340px;
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .skill-card-marquee-item:hover {
          transform: translateY(-6px) scale(1.02);
          z-index: 10;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .skill-card-marquee-item {
            width: 290px;
          }
          .skills-marquee-track {
            animation-duration: 24s;
            gap: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};
