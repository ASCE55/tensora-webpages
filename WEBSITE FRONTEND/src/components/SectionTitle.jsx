import React from 'react';

export const SectionTitle = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-5 scroll-reveal ${isCenter ? 'text-center' : 'text-start'} ${className}`}
      style={{ maxWidth: isCenter ? '780px' : '100%', margin: isCenter ? '0 auto 3.5rem' : '0 0 2.5rem' }}
    >
      {badge && (
        <div className="mb-3">
          <span className="tensora-badge" style={{ padding: '0.35rem 1rem' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--blue-neon)',
                boxShadow: '0 0 8px var(--blue-neon)',
                display: 'inline-block'
              }}
            />
            <span className="font-cursive ms-1" style={{ fontSize: '1.25rem', letterSpacing: '0.04em', textTransform: 'none' }}>
              {badge}
            </span>
          </span>
        </div>
      )}

      <h2
        className="font-display fw-bold mb-3"
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '-0.02em',
          color: 'var(--silver-bright)'
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="text-silver-muted mb-0"
          style={{
            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: isCenter ? '0 auto' : '0'
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
