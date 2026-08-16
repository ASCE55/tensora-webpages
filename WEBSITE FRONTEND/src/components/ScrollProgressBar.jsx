import React, { useState, useEffect } from 'react';

export const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '3.5px',
        background: 'linear-gradient(90deg, #38BDF8 0%, #3B7BFF 50%, #60A5FA 100%)',
        boxShadow: '0 0 14px rgba(56, 189, 248, 0.9), 0 0 4px rgba(59, 123, 255, 0.8)',
        zIndex: 99999,
        transition: 'width 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none'
      }}
    />
  );
};
