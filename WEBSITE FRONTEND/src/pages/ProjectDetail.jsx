import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { PageHeader } from '../components/PageHeader';
import { projectsData } from '../data/projectsData';
import { CTASection } from '../components/CTASection';

export const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const galleryImages = project.gallery || [project.image];

  return (
    <div>
      <PageHeader
        badge={`Case Study • ${project.categoryLabel || project.category}`}
        title={project.title.toUpperCase()}
        subtitle={project.shortDescription}
        breadcrumbs={[
          { label: 'Projects', path: '/projects' },
          { label: project.title }
        ]}
      />

      {/* Main Project Overview & Case Study */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl" className="py-lg-4">
          {/* Main Hero Gallery Showcase */}
          <div className="mb-5">
            <div className="glass-card overflow-hidden p-2 p-md-3 border-blue">
              <img
                src={galleryImages[0]}
                alt={project.title}
                className="w-100 object-fit-cover rounded-3 shadow-lg"
                style={{ maxHeight: '520px', cursor: 'pointer' }}
                onClick={() => setSelectedImage(galleryImages[0])}
              />
            </div>

            {/* Gallery Thumbs if available */}
            {galleryImages.length > 1 && (
              <Row className="g-3 mt-1">
                {galleryImages.map((img, i) => (
                  <Col key={i} sm={4} xs={6}>
                    <div
                      className="glass-card p-1 overflow-hidden rounded-3 border-subtle h-100"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="w-100 object-fit-cover rounded-2 transition-transform"
                        style={{ height: '120px' }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </div>

          <Row className="gy-5">
            {/* Left Column: Case Study Details */}
            <Col lg={8}>
              <div className="pe-lg-4">
                <span className="tensora-badge mb-3">Executive Summary</span>
                <h2 className="font-display fw-bold text-white mb-4" style={{ fontSize: '2rem' }}>
                  Project Overview
                </h2>
                <p className="text-silver-bright mb-5" style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
                  {project.overview}
                </p>

                {/* Challenge Section */}
                <div className="glass-card p-4 p-md-5 mb-4 border-subtle">
                  <h4 className="font-display fw-bold text-white mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-exclamation-octagon-fill text-blue-bright"></i>
                    The Core Challenge
                  </h4>
                  <p className="text-silver-muted mb-0" style={{ fontSize: '1.05rem', lineHeight: '1.75' }}>
                    {project.challenge}
                  </p>
                </div>

                {/* Solution Section */}
                <div className="glass-card p-4 p-md-5 mb-5 border-blue">
                  <h4 className="font-display fw-bold text-white mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-gear-wide-connected text-blue-neon"></i>
                    Our Engineered Solution
                  </h4>
                  <p className="text-silver-bright mb-0" style={{ fontSize: '1.05rem', lineHeight: '1.75' }}>
                    {project.solution}
                  </p>
                </div>

                {/* Measurable Results */}
                {project.results && (
                  <div>
                    <h3 className="font-display fw-bold text-white mb-4">
                      <i className="bi bi-trophy-fill text-blue-neon me-2"></i>
                      Measurable Business Outcomes
                    </h3>
                    <div className="row g-3">
                      {project.results.map((res, idx) => (
                        <div key={idx} className="col-12">
                          <div className="glass-card p-3 p-md-4 d-flex align-items-center gap-3 border-subtle">
                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                              style={{
                                width: '38px',
                                height: '38px',
                                backgroundColor: 'rgba(0, 87, 255, 0.15)',
                                color: 'var(--blue-neon)'
                              }}
                            >
                              <i className="bi bi-check-lg fw-bold"></i>
                            </div>
                            <span className="text-silver-bright fw-semibold">{res}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Col>

            {/* Right Column: Project Meta Sidebar */}
            <Col lg={4}>
              <div className="sticky-top" style={{ top: '6rem', zIndex: 10 }}>
                <div className="glass-card p-4 p-xl-5 border-blue mb-4">
                  <h5 className="font-display fw-bold text-white mb-4 border-bottom border-secondary border-opacity-25 pb-3">
                    Project Specifications
                  </h5>

                  <div className="d-flex flex-column gap-3 mb-4">
                    <div>
                      <div className="text-silver-dark small text-uppercase font-display">Client</div>
                      <div className="text-white fw-bold">{project.client}</div>
                    </div>

                    <div>
                      <div className="text-silver-dark small text-uppercase font-display">Category</div>
                      <div className="text-blue-neon fw-bold">{project.categoryLabel || project.category}</div>
                    </div>

                    <div>
                      <div className="text-silver-dark small text-uppercase font-display">Duration</div>
                      <div className="text-white fw-bold">{project.duration}</div>
                    </div>

                    <div>
                      <div className="text-silver-dark small text-uppercase font-display">Delivery Year</div>
                      <div className="text-white fw-bold">{project.year}</div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4 pt-3 border-top border-secondary border-opacity-25">
                    <div className="text-silver-dark small text-uppercase font-display mb-2">Technologies Used</div>
                    <div className="d-flex flex-wrap gap-1">
                      {project.technologies.map((t, idx) => (
                        <span key={idx} className="tensora-badge-silver badge px-2 py-1 small">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex flex-column gap-2 pt-3 border-top border-secondary border-opacity-25">
                    {project.liveUrl && (
                      <Link
                        to={project.liveUrl}
                        className="btn-tensora-primary w-100 justify-content-center py-2"
                      >
                        <i className="bi bi-play-circle-fill me-1"></i>
                        Launch Interactive Live Demo
                      </Link>
                    )}
                    <Link
                      to="/contact"
                      className="btn-tensora-secondary w-100 justify-content-center py-2"
                    >
                      <i className="bi bi-lightning-charge-fill me-1 text-blue-neon"></i>
                      Start Similar Project
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Image Lightbox Modal */}
      <Modal
        show={!!selectedImage}
        onHide={() => setSelectedImage(null)}
        centered
        size="xl"
        contentClassName="bg-transparent border-0"
      >
        <Modal.Body className="p-0 text-center position-relative">
          <button
            onClick={() => setSelectedImage(null)}
            className="btn btn-dark position-absolute top-0 end-0 m-3 rounded-circle"
            style={{ zIndex: 10, width: '40px', height: '40px' }}
          >
            <i className="bi bi-x-lg text-white"></i>
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Expanded Preview"
              className="img-fluid rounded-3 shadow-elevated border border-primary border-opacity-50"
              style={{ maxHeight: '85vh' }}
            />
          )}
        </Modal.Body>
      </Modal>

      <CTASection />
    </div>
  );
};
