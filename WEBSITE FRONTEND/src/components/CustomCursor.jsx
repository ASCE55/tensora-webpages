import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Only enable for pointer devices with fine cursor (desktop)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest(
        'a, button, input, select, textarea, .glass-card, [role="button"], .btn, .nav-link, .badge'
      );
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth Lerp loop for the outer electric ring
    const renderLoop = () => {
      const ease = 0.18; // smooth spring lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 999999 }}>
      {/* Precision White Dot Center */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`,
          willChange: 'transform'
        }}
      />

      {/* Electric Blue Trailing Glow Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? 'cursor-hover' : ''} ${
          isClicked ? 'cursor-clicked' : ''
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`,
          willChange: 'transform'
        }}
      />
    </div>
  );
};
