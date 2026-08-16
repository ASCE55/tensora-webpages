import React from 'react';
import { Link } from 'react-router-dom';

export const BrandProfileCard = () => {
  return (
    <div
      className="brand-profile-card scroll-reveal"
      style={{
        borderRadius: '28px',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 123, 255, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        background: '#ffffff',
        position: 'relative'
      }}
    >
      {/* ── 1. Top Custom Banner (tensorabanner.png) ── */}
      <div
        style={{
          height: '185px',
          backgroundImage: 'url(/tensorabanner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          overflow: 'hidden'
        }}
      >
        {/* Subtle dark gradient overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.45) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Top-Right Header Text (Matching "Focus Starts Here") */}
        <div className="text-end position-relative" style={{ zIndex: 2 }}>
          <h3 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.95rem', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Future
          </h3>
          <span style={{ color: 'rgba(255, 255, 255, 0.90)', fontWeight: 300, fontSize: '1.45rem', letterSpacing: '-0.01em' }}>
            Starts Here
          </span>
        </div>
      </div>

      {/* ── 2. Bottom White Body Section (Matching Image 2 Body) ── */}
      <div
        style={{
          background: '#ffffff',
          padding: '18px 28px 28px 28px',
          position: 'relative',
          color: '#0f172a'
        }}
      >
        {/* Overlapping Circular Avatar with White Ring (Matching Image 2 Circle Logo) */}
        <div
          style={{
            width: '108px',
            height: '108px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0284c7 0%, #1d4ed8 100%)',
            border: '5px solid #ffffff',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.22)',
            position: 'absolute',
            top: '-54px',
            left: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
            overflow: 'hidden'
          }}
        >
          <img
            src="/logo.png"
            alt="Tensora Logo"
            style={{
              width: '68%',
              height: 'auto',
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))'
            }}
          />
        </div>

        {/* Top-Right Action Button (Matching Image 2 Black "Follow" Pill) */}
        <div className="d-flex justify-content-end mb-4">
          <Link
            to="/contact"
            style={{
              background: '#000000',
              color: '#ffffff',
              borderRadius: '9999px',
              padding: '0.65rem 2.2rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1d4ed8';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(29, 78, 216, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#000000';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.25)';
            }}
          >
            <span>Connect</span>
          </Link>
        </div>

        {/* Title, Verified Badge & Handle (Matching "Nimbro ✔ @Nimbro") */}
        <div style={{ marginTop: '10px' }}>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h4 style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.45rem', margin: 0, letterSpacing: '-0.025em' }}>
              Tensora Digital
            </h4>
            <i className="bi bi-patch-check-fill" style={{ color: '#1d4ed8', fontSize: '1.3rem' }} />
          </div>

          <p style={{ color: '#475569', fontWeight: 600, fontSize: '0.92rem', margin: '0 0 16px 0' }}>
            @tensoradigital
          </p>

          {/* Subtags / Capabilities Pills */}
          <div className="d-flex flex-wrap gap-2 pt-3 border-top" style={{ borderColor: '#f1f5f9' }}>
            {['Web Apps', 'FiveM Scripts', '3D CGI', 'Media Production'].map((tag, idx) => (
              <span
                key={idx}
                style={{
                  background: '#f8fafc',
                  color: '#1e293b',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '5px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
