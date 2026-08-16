import React, { useEffect, useRef } from 'react';

export const WaterRippleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const ripples = [];
    const mouse = { x: -1000, y: -1000, lastX: -1000, lastY: -1000 };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const dx = x - mouse.lastX;
      const dy = y - mouse.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 8) {
        ripples.push({
          x: x,
          y: y,
          radius: 5,
          maxRadius: Math.min(60 + dist * 1.5, 110),
          alpha: 0.55,
          lineWidth: 2.2
        });
        mouse.lastX = x;
        mouse.lastY = y;
      }
      mouse.x = x;
      mouse.y = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Background mouse water ambient glow
      if (mouse.x > 0 && mouse.y > 0) {
        const glow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 180
        );
        glow.addColorStop(0, 'rgba(56, 189, 248, 0.16)');
        glow.addColorStop(0.4, 'rgba(59, 123, 255, 0.08)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Visible expanding concentric water ripple rings
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 1.6;
        r.alpha -= 0.008;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Primary water wave ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${r.alpha})`;
        ctx.lineWidth = r.lineWidth * (1 - r.radius / r.maxRadius);
        ctx.stroke();

        // Secondary inner caustic wave ring
        if (r.radius > 15) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(96, 165, 250, ${r.alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }

      if (ripples.length > 25) ripples.shift();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        mixBlendMode: 'screen',
        opacity: 0.95
      }}
    />
  );
};
