import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { testimonialsData } from '../data/testimonialsData';

export const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const item = testimonialsData[currentIndex];

  return (
    <div className="position-relative">
      <div className="glass-card p-4 p-md-5 border-blue position-relative overflow-hidden">
        {/* Large decorative quote mark */}
        <div
          className="position-absolute text-blue-neon opacity-10 font-display fw-bold"
          style={{
            top: '-20px',
            right: '30px',
            fontSize: '12rem',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          “
        </div>

        <Row className="align-items-center gy-4 position-relative" style={{ zIndex: 1 }}>
          <Col lg={4} className="text-center text-lg-start">
            <div className="d-flex flex-column align-items-center align-items-lg-start gap-3">
              <div className="position-relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-circle object-fit-cover shadow-glow"
                  style={{
                    width: '90px',
                    height: '90px',
                    border: '2px solid var(--border-blue-active)'
                  }}
                />
                <div
                  className="position-absolute bottom-0 end-0 bg-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'var(--blue-electric)',
                    border: '2px solid var(--bg-card)'
                  }}
                  title="Verified Client"
                >
                  <i className="bi bi-check-lg text-white small" style={{ fontSize: '0.75rem' }}></i>
                </div>
              </div>

              <div>
                <h5 className="font-display fw-bold text-white mb-0">{item.name}</h5>
                <p className="text-silver-muted small mb-1">{item.role}</p>
                <span className="tensora-badge-silver badge small">{item.company}</span>
              </div>

              {/* Star Rating */}
              <div className="d-flex align-items-center gap-1 text-blue-neon">
                {[...Array(item.rating)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill small"></i>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={8}>
            <div className="ps-lg-4 border-start-lg border-secondary border-opacity-25">
              <span className="tensora-badge mb-3">{item.tag} Case Verified</span>
              <p
                className="text-silver-bright font-display fst-italic mb-4"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', lineHeight: '1.7' }}
              >
                "{item.quote}"
              </p>

              {/* Controls */}
              <div className="d-flex align-items-center justify-content-between pt-3 border-top border-secondary border-opacity-25">
                <div className="d-flex gap-2">
                  {testimonialsData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className="border-0 rounded-pill transition-all"
                      style={{
                        width: currentIndex === idx ? '28px' : '8px',
                        height: '8px',
                        backgroundColor: currentIndex === idx ? 'var(--blue-neon)' : 'var(--silver-dark)',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="btn btn-tensora-secondary p-2 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '38px', height: '38px' }}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="btn btn-tensora-secondary p-2 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '38px', height: '38px' }}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
