import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const StatsCounter = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 50, suffix: '+', label: 'Projects Delivered', desc: 'Across web, gaming & apps' },
    { value: 25, suffix: '+', label: 'Happy Clients', desc: 'Global enterprises & creators' },
    { value: 6, suffix: '+', label: 'Core Services', desc: 'End-to-end digital solutions' },
    { value: 24, suffix: '/7', label: 'Digital Support', desc: 'Uninterrupted client care' }
  ];

  return (
    <section
      ref={sectionRef}
      className="position-relative py-5 border-top border-bottom border-secondary border-opacity-25 scroll-reveal"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Container fluid="xl">
        <Row className="g-4 text-center">
          {stats.map((stat, idx) => (
            <Col key={idx} lg={3} sm={6} className="stat-card">
              <div className="p-3">
                <div
                  className="font-display fw-bold mb-1 text-silver-bright d-flex align-items-center justify-content-center"
                  style={{
                    fontSize: 'clamp(2.5rem, 4vw, 3.4rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1
                  }}
                >
                  <span className="text-blue-gradient">
                    {inView ? <CounterTo value={stat.value} /> : '0'}
                  </span>
                  <span className="text-blue-neon" style={{ fontSize: '0.8em' }}>
                    {stat.suffix}
                  </span>
                </div>
                <h6 className="font-display text-white fw-bold mb-1 mt-2" style={{ fontSize: '1rem' }}>
                  {stat.label}
                </h6>
                <p className="text-silver-muted small mb-0" style={{ fontSize: '0.82rem' }}>
                  {stat.desc}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

const CounterTo = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = value / (duration / 25);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
};
