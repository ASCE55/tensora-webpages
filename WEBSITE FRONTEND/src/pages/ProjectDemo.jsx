import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { projectsData } from '../data/projectsData';

export const ProjectDemo = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Interactive Demo State variables
  const [appScreen, setAppScreen] = useState(1); // 1: Main Dashboard, 2: Activity Recaps, 3: Heart Health
  const [timeRange, setTimeRange] = useState('Months');
  const [selectedGame, setSelectedGame] = useState('ADRIFT 12');
  const [gameLaunched, setGameLaunched] = useState(false);
  const [carColor, setCarColor] = useState('#0284c7');

  const gamesList = [
    {
      id: 'pigs',
      title: 'ISLE OF PIGS',
      price: 'Free',
      rating: '★★★★★',
      reviews: '1.5K',
      size: '2.2 GB',
      bg: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80',
      badge: 'POPULAR'
    },
    {
      id: 'vader',
      title: 'VADER IMMORTAL',
      price: '$19.99',
      rating: '★★★★★',
      reviews: '644',
      size: '9.1 GB',
      bg: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
      image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&auto=format&fit=crop&q=80',
      badge: 'ACTION'
    },
    {
      id: 'adrift',
      title: 'ADRIFT 12',
      price: '$9.99',
      rating: '★★★★☆',
      reviews: '1.3K',
      size: '6.2 GB',
      bg: 'linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #061129 100%)',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80',
      badge: 'FEATURED VR',
      featured: true,
      desc: 'ADRIFT 12 is a Tensora VR multiplayer team-based shooter. We made it easy to join your friends in the game, and added a new elimination map!'
    },
    {
      id: 'hyper',
      title: 'HYPER DASH',
      price: '$19.99',
      rating: '★★★★★',
      reviews: '644',
      size: '9.1 GB',
      bg: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=80',
      badge: 'MULTIPLAYER'
    },
    {
      id: 'sniper',
      title: 'SNIPER ELITE VR',
      price: '$12.99',
      rating: '★★★★★',
      reviews: '501',
      size: '8.0 GB',
      bg: 'linear-gradient(135deg, #eab308 0%, #d97706 100%)',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&auto=format&fit=crop&q=80',
      badge: 'TACTICAL'
    }
  ];

  // Helper renderer for specific project interactive single-page dashboards
  const renderInteractiveDashboard = () => {
    switch (project.id) {
      case 'aegis-mobile-banking':
        return (
          <div className="d-flex justify-content-center py-3">
            {/* Mobile App Simulator Frame (iPhone 16 Pro) */}
            <div className="pastel-mobile-frame">
              {/* Dynamic Island Header */}
              <div className="mobile-top-bar-light">
                <span className="small fw-bold text-dark">9:41</span>
                <div className="dynamic-island-dark"></div>
                <div className="d-flex align-items-center gap-1 text-dark">
                  <i className="bi bi-wifi small"></i>
                  <i className="bi bi-battery-full small"></i>
                </div>
              </div>

              {/* Top Navigation Bar Inside App */}
              <div className="px-3 pt-2 pb-2 d-flex align-items-center justify-content-between" style={{ background: '#f8fafc' }}>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User Profile"
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <span className="small text-muted fw-bold d-block" style={{ fontSize: '0.72rem', lineHeight: 1 }}>Hello,</span>
                    <strong className="text-dark" style={{ fontSize: '0.92rem' }}>Rownok!</strong>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button className="icon-btn-light"><i className="bi bi-search"></i></button>
                  <button className="icon-btn-light position-relative">
                    <i className="bi bi-bell"></i>
                    <span className="unread-dot"></span>
                  </button>
                </div>
              </div>

              {/* Screen Tab Switcher */}
              <div className="d-flex justify-content-center gap-1 px-3 pb-2" style={{ background: '#f8fafc' }}>
                <button className={`btn btn-sm rounded-pill px-3 py-1 ${appScreen === 1 ? 'btn-dark' : 'btn-light text-dark'}`} onClick={() => setAppScreen(1)} style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                  Overview
                </button>
                <button className={`btn btn-sm rounded-pill px-3 py-1 ${appScreen === 2 ? 'btn-dark' : 'btn-light text-dark'}`} onClick={() => setAppScreen(2)} style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                  Recaps
                </button>
                <button className={`btn btn-sm rounded-pill px-3 py-1 ${appScreen === 3 ? 'btn-dark' : 'btn-light text-dark'}`} onClick={() => setAppScreen(3)} style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                  Heart Health
                </button>
              </div>

              {/* App Content Screen Area */}
              <div className="pastel-app-screen px-3 pb-5">
                {/* ── SCREEN 1: OVERVIEW ── */}
                {appScreen === 1 && (
                  <div className="d-flex flex-column gap-3 pt-2">
                    {/* Soft Pink Nutrition Card */}
                    <div className="pastel-card-pink p-3 rounded-4">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="pastel-icon-box-pink"><i className="bi bi-graph-up-arrow"></i></span>
                          <div>
                            <h6 className="fw-extrabold m-0 text-dark" style={{ fontSize: '0.95rem' }}>Breakfast</h6>
                            <span className="small text-muted" style={{ fontSize: '0.75rem' }}>350 calories</span>
                          </div>
                        </div>
                        <div className="d-flex gap-1">
                          <button className="btn btn-sm btn-white rounded-circle p-1" style={{ width: '28px', height: '28px' }}><i className="bi bi-plus"></i></button>
                          <button className="btn btn-sm btn-white rounded-circle p-1" style={{ width: '28px', height: '28px' }}><i className="bi bi-pencil"></i></button>
                        </div>
                      </div>

                      {/* Nutrient Metrics Row */}
                      <div className="d-flex justify-content-between text-center pt-2">
                        <div><span className="d-block text-muted small" style={{ fontSize: '0.7rem' }}>Proteins</span><strong className="text-dark fs-6">62.5</strong></div>
                        <div><span className="d-block text-muted small" style={{ fontSize: '0.7rem' }}>Fats</span><strong className="text-dark fs-6">23.6</strong></div>
                        <div><span className="d-block text-muted small" style={{ fontSize: '0.7rem' }}>Carbs</span><strong className="text-dark fs-6">45.7</strong></div>
                        <div><span className="d-block text-muted small" style={{ fontSize: '0.7rem' }}>RDC</span><strong className="text-dark fs-6">14%</strong></div>
                      </div>
                    </div>

                    {/* Quick Grid Cards */}
                    <Row className="g-2">
                      <Col xs={6}>
                        <div className="pastel-card-orange p-3 rounded-4 h-100 d-flex flex-column justify-content-between">
                          <div>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="fw-bold text-dark small" style={{ fontSize: '0.82rem' }}>Sport Data</span>
                              <span className="pastel-badge-orange"><i className="bi bi-activity"></i></span>
                            </div>
                            <p className="text-muted small m-0" style={{ fontSize: '0.7rem', lineHeight: 1.3 }}>Keep Active, Keep Healthy</p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <span className="fw-bold text-dark small" style={{ fontSize: '0.75rem' }}>Check</span>
                            <i className="bi bi-arrow-right text-dark"></i>
                          </div>
                        </div>
                      </Col>

                      <Col xs={6}>
                        <div className="pastel-card-purple p-3 rounded-4 h-100 d-flex flex-column justify-content-between">
                          <div>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="fw-bold text-dark small" style={{ fontSize: '0.82rem' }}>Hearth Health</span>
                              <span className="pastel-badge-purple"><i className="bi bi-heart-fill"></i></span>
                            </div>
                            <p className="text-muted small m-0" style={{ fontSize: '0.7rem', lineHeight: 1.3 }}>Enjoy Life to the Fullest</p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <span className="fw-bold text-dark small" style={{ fontSize: '0.75rem' }}>Check</span>
                            <i className="bi bi-arrow-right text-dark"></i>
                          </div>
                        </div>
                      </Col>

                      <Col xs={6}>
                        <div className="pastel-card-mint p-3 rounded-4 h-100 d-flex flex-column justify-content-between">
                          <div>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="fw-bold text-dark small" style={{ fontSize: '0.82rem' }}>Sleep quality</span>
                              <span className="pastel-badge-mint"><i className="bi bi-moon-stars-fill"></i></span>
                            </div>
                            <p className="text-muted small m-0" style={{ fontSize: '0.7rem', lineHeight: 1.3 }}>Check Your Sleep Quality</p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <span className="fw-bold text-dark small" style={{ fontSize: '0.75rem' }}>Check</span>
                            <i className="bi bi-arrow-right text-dark"></i>
                          </div>
                        </div>
                      </Col>

                      <Col xs={6}>
                        <div className="pastel-card-coral p-3 rounded-4 h-100 d-flex flex-column justify-content-between">
                          <div>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="fw-bold text-dark small" style={{ fontSize: '0.82rem' }}>IBM</span>
                              <span className="pastel-badge-coral"><i className="bi bi-person-standing"></i></span>
                            </div>
                            <p className="text-muted small m-0" style={{ fontSize: '0.7rem', lineHeight: 1.3 }}>Control Your Weight Body</p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <span className="fw-bold text-dark small" style={{ fontSize: '0.75rem' }}>Check</span>
                            <i className="bi bi-arrow-right text-dark"></i>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}

                {/* ── SCREEN 2: RECAPS & PROGRESS ── */}
                {appScreen === 2 && (
                  <div className="d-flex flex-column gap-3 pt-2">
                    {/* Your Progress Purple Gauge Card */}
                    <div className="pastel-card-lavender p-3 rounded-4 d-flex align-items-center justify-content-between">
                      <div>
                        <span className="small text-muted fw-bold d-block mb-1" style={{ fontSize: '0.75rem' }}>Your Progress</span>
                        <h2 className="fw-extrabold text-dark m-0" style={{ fontSize: '2rem' }}>95%</h2>
                        <span className="small text-muted" style={{ fontSize: '0.72rem' }}>19 November ∨</span>
                      </div>
                      <div className="gauge-circle-container">
                        <div className="gauge-circle">
                          <strong className="text-dark d-block" style={{ fontSize: '0.95rem' }}>1350</strong>
                          <span className="small text-muted" style={{ fontSize: '0.65rem' }}>Calories</span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Recaps Row */}
                    <Row className="g-2">
                      <Col xs={7}>
                        <div className="bg-white p-3 rounded-4 border shadow-sm h-100">
                          <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.82rem' }}>My Activity Recaps</h6>
                          <p className="text-muted small mb-2" style={{ fontSize: '0.68rem' }}>Everything you need to know about your health.</p>
                          <img
                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&auto=format&fit=crop&q=80"
                            alt="Yoga Activity"
                            className="img-fluid rounded-3 mb-2"
                            style={{ height: '80px', width: '100%', objectFit: 'cover' }}
                          />
                          <button className="btn btn-sm btn-dark w-100 rounded-pill py-1" style={{ fontSize: '0.72rem' }}>Get Started</button>
                        </div>
                      </Col>

                      <Col xs={5}>
                        <div className="d-flex flex-column gap-2 h-100">
                          <div className="bg-white p-2 rounded-4 border shadow-sm">
                            <span className="text-muted small d-block" style={{ fontSize: '0.68rem' }}>Current Weight</span>
                            <strong className="text-dark d-block" style={{ fontSize: '0.88rem' }}>1278 Kkal</strong>
                            <span className="text-danger small" style={{ fontSize: '0.65rem' }}>▼ 3 kg (-3.8%)</span>
                          </div>
                          <div className="bg-white p-2 rounded-4 border shadow-sm">
                            <span className="text-muted small d-block" style={{ fontSize: '0.68rem' }}>Today's Calories</span>
                            <strong className="text-dark d-block" style={{ fontSize: '0.88rem' }}>1278 Kkal</strong>
                            <span className="text-danger small" style={{ fontSize: '0.65rem' }}>▼ 3 kg (-3.8%)</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}

                {/* ── SCREEN 3: HEART HEALTH DETAILED CHART ── */}
                {appScreen === 3 && (
                  <div className="d-flex flex-column gap-3 pt-2">
                    {/* Time Filter Pills */}
                    <div className="d-flex justify-content-between bg-white p-1 rounded-pill border shadow-sm">
                      {['Days', 'Weeks', 'Months', 'Years'].map((t) => (
                        <button
                          key={t}
                          className={`btn btn-sm rounded-pill px-2 py-1 ${timeRange === t ? 'btn-dark' : 'btn-light text-muted'}`}
                          style={{ fontSize: '0.72rem', fontWeight: 600 }}
                          onClick={() => setTimeRange(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* Chart Container */}
                    <div className="bg-white p-3 rounded-4 border shadow-sm">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div>
                          <strong className="text-dark fs-5">88 bpm</strong>
                        </div>
                        <div className="small fw-bold text-muted" style={{ fontSize: '0.75rem' }}>
                          &lt; 20 August 2024 &gt;
                        </div>
                      </div>

                      {/* Interactive Heart Rate Graph Line */}
                      <div className="heart-chart-box position-relative my-3" style={{ height: '140px' }}>
                        <svg className="w-100 h-100" viewBox="0 0 300 120" preserveAspectRatio="none">
                          <path
                            d="M 0 80 Q 50 60, 100 85 T 200 40 T 300 70"
                            fill="none"
                            stroke="#0ea5e9"
                            strokeWidth="3"
                          />
                          <circle cx="200" cy="40" r="5" fill="#ef4444" />
                          <line x1="200" y1="40" x2="200" y2="120" stroke="#ef4444" strokeDasharray="3,3" strokeWidth="1.5" />
                        </svg>
                        <div className="d-flex justify-content-between text-muted small position-absolute bottom-0 w-100" style={{ fontSize: '0.65rem' }}>
                          <span>00.00</span>
                          <span>06.00</span>
                          <span>12.00</span>
                          <span>18.00</span>
                          <span>00.00</span>
                        </div>
                      </div>

                      {/* Stat Metrics Grid */}
                      <Row className="g-2">
                        <Col xs={4}>
                          <div className="pastel-card-purple p-2 rounded-3 text-center">
                            <span className="text-muted d-block" style={{ fontSize: '0.62rem' }}>Heart Rate Range</span>
                            <strong className="text-dark small">▼ 87 bpm</strong>
                          </div>
                        </Col>
                        <Col xs={4}>
                          <div className="bg-light p-2 rounded-3 text-center">
                            <span className="text-muted d-block" style={{ fontSize: '0.62rem' }}>Resting Heart Rate</span>
                            <strong className="text-dark small">▼ 92 bpm</strong>
                          </div>
                        </Col>
                        <Col xs={4}>
                          <div className="bg-light p-2 rounded-3 text-center">
                            <span className="text-muted d-block" style={{ fontSize: '0.62rem' }}>Resting Rate Alert</span>
                            <strong className="text-dark small">-- bp</strong>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Bottom Navigation Bar */}
              <div className="floating-bottom-nav">
                <button className="nav-item-btn active"><i className="bi bi-house-door-fill"></i></button>
                <button className="nav-item-btn"><i className="bi bi-bar-chart-line-fill"></i></button>
                <button className="nav-item-btn"><i className="bi bi-person-walking"></i></button>
                <button className="nav-item-btn"><i className="bi bi-activity"></i></button>
                <button className="nav-item-btn"><i className="bi bi-person-fill"></i></button>
              </div>
            </div>
          </div>
        );

      case 'hyperion-fivem-framework':
        // ── TENSORA GAMING VR LAUNCHER SHOWCASE (MATCHING USER OCULUS REFERENCE IMAGE) ──
        return (
          <div className="tensora-game-launcher my-3 rounded-4 overflow-hidden shadow-2xl" style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0' }}>
            {/* Top Navigation Window Header */}
            <div className="p-3 px-4 bg-white border-bottom d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-1 me-2">
                  <span className="dot-red"></span>
                  <span className="dot-yellow"></span>
                  <span className="dot-green"></span>
                </div>

                <div className="d-flex align-items-center gap-4">
                  <span className="fw-bold text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.92rem' }}>
                    <i className="bi bi-headset-vr text-primary me-1 fs-5"></i> Games
                  </span>
                  <span className="text-muted small fw-semibold">Experiences</span>
                  <span className="text-muted small fw-semibold">Store</span>
                </div>
              </div>

              {/* Center Logo */}
              <div className="d-flex align-items-center gap-2">
                <img src="/logo.png" alt="Tensora" style={{ height: '24px', filter: 'brightness(0.2)' }} />
                <span className="font-display fw-bold fs-6 tracking-tight text-dark">
                  TENSORA <span style={{ color: '#2563eb' }}>GAMING VR</span>
                </span>
              </div>

              {/* Hardware Headset Connected Status Badge */}
              <div className="d-flex align-items-center gap-2 bg-light p-2 px-3 rounded-pill border">
                <i className="bi bi-headset text-primary fs-5"></i>
                <div className="text-start">
                  <div className="fw-bold text-dark" style={{ fontSize: '0.75rem', lineHeight: 1 }}>Tensora VR Pro</div>
                  <span className="text-muted" style={{ fontSize: '0.65rem' }}>Gear VR Connected 🟢</span>
                </div>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Gamer" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', marginLeft: '4px' }} />
              </div>
            </div>

            {/* Sub-Header Categories */}
            <div className="p-4 px-5 d-flex align-items-center gap-4" style={{ background: '#f8fafc' }}>
              <h3 className="fw-extrabold text-dark m-0 fs-4">Most popular</h3>
              <span className="text-muted fw-bold fs-5" style={{ cursor: 'pointer' }}>Categories</span>
            </div>

            {/* Rotated 3D Parallax Game Cards Showcase */}
            <div className="px-4 px-md-5 pb-5 pt-3 overflow-auto">
              <div className="d-flex align-items-center justify-content-center gap-3 gap-md-4 min-w-max" style={{ minHeight: '360px' }}>
                {gamesList.map((g, idx) => {
                  const isAdrift = g.id === 'adrift';
                  return (
                    <div
                      key={g.id}
                      className={`game-vr-card p-3 rounded-4 text-white position-relative ${isAdrift ? 'active-featured-card' : ''}`}
                      style={{
                        background: g.bg,
                        width: isAdrift ? '260px' : '190px',
                        height: isAdrift ? '320px' : '250px',
                        transform: isAdrift ? 'translateY(-15px) scale(1.08)' : 'scale(0.96)',
                        boxShadow: isAdrift ? '0 30px 60px rgba(15, 23, 42, 0.4)' : '0 10px 25px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.35s ease'
                      }}
                      onClick={() => setSelectedGame(g.title)}
                    >
                      <span className="badge bg-white text-dark fw-bold position-absolute top-0 start-0 m-3" style={{ fontSize: '0.65rem' }}>
                        {g.badge}
                      </span>

                      {/* Game Image Background */}
                      <img
                        src={g.image}
                        alt={g.title}
                        className="img-fluid rounded-3 mb-2 w-100"
                        style={{ height: isAdrift ? '160px' : '110px', objectFit: 'cover' }}
                      />

                      <h5 className="fw-extrabold text-white mb-1 tracking-tight" style={{ fontSize: isAdrift ? '1.25rem' : '0.95rem' }}>
                        {g.title}
                      </h5>

                      <div className="small text-white-50 mb-3" style={{ fontSize: '0.72rem' }}>
                        <span>{g.rating}</span> • <span>{g.reviews} Reviews</span> • <span>{g.size}</span>
                      </div>

                      <div className="d-flex align-items-center justify-content-between mt-auto">
                        <span className="fw-extrabold text-white" style={{ fontSize: isAdrift ? '1.2rem' : '0.9rem' }}>{g.price}</span>
                        <button className="btn btn-sm btn-light text-dark fw-bold rounded-pill px-3 py-1" style={{ fontSize: '0.72rem' }}>
                          Play VR
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Game Overview Detail Banner (Matching Oculus Image) */}
            <div className="p-4 px-5 bg-white border-top d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <div className="d-flex align-items-center gap-3 mb-1">
                  <h2 className="fw-extrabold text-dark m-0">{selectedGame}</h2>
                  <span className="text-warning fs-5">★★★★☆</span>
                  <span className="text-muted small fw-bold">1329 Reviews</span>
                </div>
                <p className="text-muted m-0 small" style={{ maxWidth: '680px', lineHeight: 1.5 }}>
                  ADRIFT 12 is a Tensora VR multiplayer team-based shooter. We made it easy to join your friends in the game, and added a new elimination map!
                </p>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-primary btn-lg rounded-pill px-4 py-2 fw-bold"
                  onClick={() => setGameLaunched(true)}
                >
                  <i className="bi bi-play-circle-fill me-2"></i> Launch VR Experience
                </button>
              </div>
            </div>

            {gameLaunched && (
              <div className="p-3 bg-dark text-white text-center">
                🚀 Launching <strong>{selectedGame}</strong> on Tensora VR Headset Node... Hardware synced!
              </div>
            )}
          </div>
        );

      case 'quantum-hypercar-3d':
        return (
          <div className="p-4 rounded-4 my-3 text-center" style={{ background: '#090d16', border: '1px solid rgba(59, 123, 255, 0.3)' }}>
            <div className="d-flex align-items-center justify-content-between mb-4 border-bottom border-secondary pb-3">
              <span className="text-white fw-bold"><i className="bi bi-badge-3d text-cyan me-2"></i> WEBGL 3D CONFIGURATOR</span>
              <span className="badge bg-primary">60 FPS REALTIME SHADER</span>
            </div>

            <div className="hypercar-canvas-mockup rounded-4 p-5 mb-4 position-relative overflow-hidden" style={{ background: 'radial-gradient(circle, #1e293b 0%, #030712 100%)', minHeight: '340px' }}>
              <div className="car-glow-aura" style={{ backgroundColor: carColor }}></div>
              <img
                src={project.image}
                alt="3D Hypercar"
                className="img-fluid rounded-3 position-relative z-2"
                style={{ maxHeight: '280px', objectFit: 'cover', filter: `drop-shadow(0 20px 30px ${carColor})` }}
              />
            </div>

            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
              <span className="text-white fw-bold small">SELECT METALLIC FINISH:</span>
              {[
                { name: 'Cyber Blue', color: '#0284c7' },
                { name: 'Obsidian Black', color: '#0f172a' },
                { name: 'Electric Cyan', color: '#38bdf8' },
                { name: 'Crimson Red', color: '#ef4444' },
                { name: 'Emerald Green', color: '#10b981' }
              ].map((c) => (
                <button
                  key={c.name}
                  className="btn btn-sm rounded-pill px-3 py-1 text-white fw-semibold"
                  style={{
                    backgroundColor: c.color,
                    border: carColor === c.color ? '2px solid #ffffff' : '1px solid transparent',
                    boxShadow: carColor === c.color ? `0 0 15px ${c.color}` : 'none'
                  }}
                  onClick={() => setCarColor(c.color)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        // Default Web Dashboard
        return (
          <div className="taskgo-saas-showcase my-3 rounded-4 overflow-hidden shadow-lg" style={{ background: '#ffffff', color: '#0f172a' }}>
            <div className="taskgo-hero-section text-center p-4 p-md-5 position-relative" style={{ background: 'linear-gradient(180deg, #ede9fe 0%, #ffffff 100%)' }}>
              <span className="badge rounded-pill px-3 py-2 text-purple-dark fw-bold mb-3" style={{ background: 'rgba(124, 58, 237, 0.12)', border: '1px solid rgba(124, 58, 237, 0.25)' }}>
                ⚡ TaskGo SaaS v4.2 Engine
              </span>

              <h1 className="font-display fw-extrabold text-dark mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', letterSpacing: '-0.03em' }}>
                Simplify Task Management <br className="d-none d-md-block" />
                <span style={{ color: '#7c3aed' }}>Boost Productivity</span>
              </h1>
              <p className="text-muted mx-auto mb-4" style={{ maxWidth: '580px', fontSize: '1rem' }}>
                Easily manage tasks, streamline workflows, and enhance team productivity from start to finish.
              </p>

              <div className="d-flex justify-content-center align-items-center gap-3 mb-5">
                <button className="btn btn-purple-primary rounded-pill px-4 py-2 fw-bold" style={{ background: '#7c3aed', color: '#fff' }}>Get Started Free</button>
                <button className="btn btn-outline-dark rounded-pill px-4 py-2 fw-bold">Book a Demo</button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ backgroundColor: '#030712', minHeight: '100vh', color: '#ffffff' }}>
      {/* ── TOP BROWSER CHROME MOCKUP HEADER ── */}
      <div className="browser-chrome-bar px-4 py-3 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-1">
            <span className="dot-red"></span>
            <span className="dot-yellow"></span>
            <span className="dot-green"></span>
          </div>

          <div className="url-address-bar d-none d-md-flex align-items-center gap-2 px-3 py-1 rounded-pill small">
            <i className="bi bi-lock-fill text-success" style={{ fontSize: '0.75rem' }}></i>
            <span className="text-white-50" style={{ fontSize: '0.82rem' }}>https://demo.tensora.com/live/{project.id}</span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Badge bg="primary" className="px-3 py-2 text-uppercase font-display">
            LIVE INTERACTIVE SINGLE-PAGE DEMO
          </Badge>

          <Link to={`/projects/${project.id}`} className="btn btn-sm btn-outline-light rounded-pill px-3">
            <i className="bi bi-arrow-left me-1"></i> Exit Demo
          </Link>
        </div>
      </div>

      {/* ── MAIN DEMO CANVAS AREA ── */}
      <Container fluid="xl" className="py-4 py-md-5">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <span className="badge rounded-pill bg-primary bg-opacity-25 text-cyan border border-primary px-3 py-2 mb-2">
              {project.categoryLabel} • {project.client}
            </span>
            <h2 className="font-display fw-bold text-white mb-1" style={{ fontSize: '2rem' }}>
              {project.title}
            </h2>
            <p className="text-white-50 m-0 small" style={{ maxWidth: '700px' }}>
              {project.shortDescription}
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link to={`/contact?service=${encodeURIComponent(project.categoryLabel)}`} className="btn btn-tensora-primary rounded-pill px-4 py-2">
              <i className="bi bi-chat-left-dots-fill me-1"></i> Request Similar Solution
            </Link>
          </div>
        </div>

        {/* Dynamic Single-Page Dashboard Renderer */}
        {renderInteractiveDashboard()}

        {/* Project Key Features & Tech Stack Footer */}
        <div className="p-4 rounded-4 mt-4" style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Row className="g-3">
            <Col md={6}>
              <h6 className="text-white fw-bold mb-2"><i className="bi bi-check2-circle text-cyan me-2"></i>Verified Engineering Results:</h6>
              <ul className="text-white-50 small mb-0 ps-3">
                {project.results.map((res, i) => (
                  <li key={i} className="mb-1">{res}</li>
                ))}
              </ul>
            </Col>
            <Col md={6}>
              <h6 className="text-white fw-bold mb-2"><i className="bi bi-cpu text-cyan me-2"></i>Technologies & Stack:</h6>
              <div className="d-flex flex-wrap gap-2">
                {project.technologies.map((t, idx) => (
                  <span key={idx} className="badge bg-dark border border-secondary text-cyan px-3 py-2 small">
                    {t}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Custom Styles */}
      <style>{`
        .browser-chrome-bar {
          background: #090d16;
        }
        .dot-red { width: 12px; height: 12px; border-radius: 50%; background: #ef4444; }
        .dot-yellow { width: 12px; height: 12px; border-radius: 50%; background: #f59e0b; }
        .dot-green { width: 12px; height: 12px; border-radius: 50%; background: #10b981; }
        .url-address-bar {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .text-purple { color: #7c3aed !important; }
        .text-cyan { color: #38bdf8 !important; }
        .min-w-max { min-width: max-content; }
        .game-vr-card:hover {
          transform: translateY(-8px) scale(1.02) !important;
        }
      `}</style>
    </div>
  );
};
