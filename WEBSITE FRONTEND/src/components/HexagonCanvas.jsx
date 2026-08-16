import React, { useEffect, useRef } from 'react';

export const HexagonCanvas = () => {
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

    // Mouse Tracking State
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 220
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Hexagon Grid Parameters
    const hexRadius = 45; // Size of hexagon
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius;
    const sideLength = (3 / 2) * hexRadius;

    // Pulse nodes along grid vertices
    const glowPulses = [];
    const pulseCount = 12;

    for (let i = 0; i < pulseCount; i++) {
      glowPulses.push({
        col: Math.floor(Math.random() * (width / hexWidth + 2)),
        row: Math.floor(Math.random() * (height / sideLength + 2)),
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.015 + 0.008,
        growing: Math.random() > 0.5
      });
    }

    // Helper: Draw a single Hexagon
    const drawHexagon = (x, y, radius, hoverIntensity) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const hx = x + radius * Math.cos(angle);
        const hy = y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();

      // Base medium transparency grid lines (matching reference image)
      const baseAlpha = 0.15 + hoverIntensity * 0.55;
      const glowColor = hoverIntensity > 0.3
        ? `rgba(56, 189, 248, ${baseAlpha})`
        : `rgba(59, 123, 255, ${baseAlpha})`;

      ctx.strokeStyle = glowColor;
      ctx.lineWidth = hoverIntensity > 0.2 ? 1.8 : 1.0;
      ctx.stroke();

      // If mouse is hovering nearby, fill hexagon with subtle medium transparency blue glow
      if (hoverIntensity > 0.15) {
        ctx.fillStyle = `rgba(56, 189, 248, ${hoverIntensity * 0.08})`;
        ctx.fill();
      }
    };

    // Helper: Draw glowing node vertex point
    const drawVertexGlow = (x, y, intensity) => {
      ctx.save();
      const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, 12);
      glowGrad.addColorStop(0, `rgba(56, 189, 248, ${intensity * 0.9})`);
      glowGrad.addColorStop(0.4, `rgba(59, 123, 255, ${intensity * 0.5})`);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fill();

      // Sharp center core dot
      ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.95})`;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Main Animation Loop
    let animTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      animTime += 0.02;

      const numCols = Math.ceil(width / hexWidth) + 2;
      const numRows = Math.ceil(height / sideLength) + 2;

      // Update pulse intensity
      glowPulses.forEach((p) => {
        if (p.growing) {
          p.alpha += p.speed;
          if (p.alpha >= 0.95) p.growing = false;
        } else {
          p.alpha -= p.speed;
          if (p.alpha <= 0.15) p.growing = true;
        }
      });

      // Render Tiling Hexagonal Grid
      for (let r = -1; r < numRows; r++) {
        for (let c = -1; c < numCols; c++) {
          const xOffset = r % 2 !== 0 ? hexWidth / 2 : 0;
          const hexX = c * hexWidth + xOffset;
          const hexY = r * sideLength;

          // Calculate distance from mouse for interactive glow
          const dx = hexX - mouse.x;
          const dy = hexY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let hoverIntensity = 0;
          if (dist < mouse.radius) {
            hoverIntensity = (1 - dist / mouse.radius);
          }

          // Draw individual hexagon
          drawHexagon(hexX, hexY, hexRadius, hoverIntensity);

          // Random glowing vertices (matching the glowing nodes in user's image)
          if ((c + r * 3) % 7 === 0) {
            const pulse = glowPulses[(Math.abs(c + r) % glowPulses.length)];
            const activeIntensity = Math.max(hoverIntensity, pulse.alpha * 0.5);
            if (activeIntensity > 0.2) {
              drawVertexGlow(hexX, hexY - hexRadius, activeIntensity);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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
        opacity: 0.50,
        mixBlendMode: 'screen'
      }}
    />
  );
};
