import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialIcons = [
    { icon: 'bi-facebook', name: 'Facebook', url: 'https://facebook.com' },
    { icon: 'bi-instagram', name: 'Instagram', url: 'https://instagram.com' },
    { icon: 'bi-twitter-x', name: 'Twitter / X', url: 'https://twitter.com' },
    { icon: 'bi-envelope-fill', name: 'Email', url: 'mailto:contact@tensoradigital.com' },
    { icon: 'bi-youtube', name: 'YouTube', url: 'https://youtube.com' },
  ];

  return (
    <footer
      className="position-relative py-5 text-center"
      style={{
        backgroundColor: '#05070E',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#FFFFFF',
        zIndex: 2
      }}
    >
      <Container fluid="xl" className="py-4 d-flex flex-column align-items-center justify-content-center">

        <div className="mb-4">
          <Link to="/" className="text-decoration-none">
            <h1
              className="font-cursive"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 6.8rem)',
                fontWeight: 400,
                letterSpacing: '0.02em',
                color: '#FFFFFF',
                margin: 0,
                lineHeight: 1.1
              }}
            >
              Ten<span className="blink-s-blue">s</span>ora
            </h1>
          </Link>
        </div>

        {/* ── 2. Centered Navigation Menu Links ── */}
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 gap-md-4 mb-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                color: 'rgba(255, 255, 255, 0.80)',
                fontSize: '0.92rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#38BDF8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.80)')}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ── 3. Centered Circular White Social Icons + English Button ── */}
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mb-5">
          {socialIcons.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                color: '#05070E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.15rem',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#38BDF8';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#05070E';
                e.currentTarget.style.transform = 'scale(1.0)';
              }}
            >
              <i className={`bi ${s.icon}`} />
            </a>
          ))}

          {/* English Pill Button matching reference image */}
          <button
            type="button"
            style={{
              padding: '0.45rem 1.4rem',
              borderRadius: '9999px',
              backgroundColor: 'transparent',
              border: '1.5px solid #FFFFFF',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.88rem',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#05070E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            English
          </button>
        </div>

        {/* ── 4. Bottom Copyright Line ── */}
        <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.45)' }}>
          Copyright &copy; {new Date().getFullYear()} <span style={{ color: '#FFFFFF', fontWeight: 600 }}>TENSORA DIGITAL SOLUTIONS PVT LTD</span>. All Rights Reserved.
        </div>

      </Container>

      {/* CSS Keyframes for the Blinking Blue 'S' */}
      <style>{`
        @keyframes blinkBlueS {
          0%, 100% {
            color: #38BDF8;
            text-shadow: 0 0 16px rgba(56, 189, 248, 0.95), 0 0 32px rgba(59, 123, 255, 0.8);
            opacity: 1;
          }
          50% {
            color: #FFFFFF;
            text-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
            opacity: 0.35;
          }
        }
        .blink-s-blue {
          animation: blinkBlueS 1.6s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
    </footer>
  );
};
