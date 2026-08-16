import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { ServiceCard } from '../components/ServiceCard';
import { CTASection } from '../components/CTASection';
import { servicesData } from '../data/servicesData';

export const Services = () => {
  return (
    <div>
      <PageHeader
        badge="End-to-End Digital Capabilities"
        title="SERVICES & DIGITAL EXPERTISE"
        subtitle="Explore our six core disciplines engineered for corporate enterprises, modern brands, gaming communities, and creators."
        breadcrumbs={[{ label: 'Services' }]}
      />

      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl" className="py-lg-4">
          <Row className="g-4">
            {servicesData.map((service) => (
              <Col key={service.id} lg={4} md={6}>
                <ServiceCard service={service} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Why Our Service Model Works */}
      <section className="py-5 border-top border-secondary border-opacity-25" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <Container fluid="xl" className="py-lg-4">
          <Row className="align-items-center gy-4">
            <Col lg={8}>
              <span className="tensora-badge mb-2">Tailored Engagements</span>
              <h3 className="font-display fw-bold text-white mb-2">Need a Bespoke or Multi-Disciplinary Solution?</h3>
              <p className="text-silver-muted mb-0" style={{ maxWidth: '680px' }}>
                We frequently combine web development with custom 3D models, or build complete gaming servers with dedicated NUI interfaces and video launch campaigns.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Link to="/contact" className="btn-tensora-primary px-4 py-3">
                Request Custom Consultation
                <i className="bi bi-arrow-right"></i>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <CTASection />
    </div>
  );
};
