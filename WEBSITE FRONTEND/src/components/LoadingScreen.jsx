import React, { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [fadeState, setFadeState] = useState(() => {
    return sessionStorage.getItem('tensora_initial_loaded') ? 'done' : 'active';
  });
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    if (fadeState === 'done') {
      if (onComplete) onComplete();
      return;
    }

    const timer1 = setTimeout(() => setProgress(100), 150);
    const timer2 = setTimeout(() => setFadeState('fading'), 350);
    const timer3 = setTimeout(() => {
      setFadeState('done');
      sessionStorage.setItem('tensora_initial_loaded', 'true');
      if (onComplete) onComplete();
    }, 550);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete, fadeState]);

  if (fadeState === 'done') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050505',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeState === 'fading' ? 0 : 1,
        transition: 'opacity 0.4s ease-out',
        pointerEvents: fadeState === 'fading' ? 'none' : 'auto'
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(0, 87, 255, 0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
          borderRadius: '50%'
        }}
      />

      <div className="text-center position-relative" style={{ zIndex: 1, padding: '1.5rem' }}>
        {/* Tensora Official Logo */}
        <div className="mb-4">
          <img
            src="/logo.png"
            alt="TENSORA DIGITAL SOLUTIONS"
            style={{
              maxHeight: '75px',
              width: 'auto',
              filter: 'drop-shadow(0 0 20px rgba(0, 107, 255, 0.5))',
              animation: 'pulseGlow 2s infinite ease-in-out'
            }}
          />
        </div>

        {/* Company Subtitle */}
        <h6
          className="font-display text-uppercase mb-3"
          style={{
            letterSpacing: '0.25em',
            fontSize: '0.8rem',
            color: 'var(--silver-metallic)'
          }}
        >
          Tensora Digital Solutions Pvt Ltd
        </h6>

        {/* Progress Line */}
        <div
          style={{
            width: '220px',
            height: '3px',
            backgroundColor: 'rgba(201, 206, 214, 0.1)',
            borderRadius: '4px',
            margin: '0 auto 1rem',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #0037A6, #0057FF, #00A8FF)',
              boxShadow: '0 0 12px #00A8FF',
              transition: 'width 0.35s ease-out'
            }}
          />
        </div>

        <p
          className="small text-silver-muted mb-0"
          style={{ letterSpacing: '0.1em', fontSize: '0.75rem' }}
        >
          INITIALIZING DIGITAL ENVIRONMENT...
        </p>
      </div>
    </div>
  );
};
