import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PageHeader } from '../components/PageHeader';
import { ProjectCard } from '../components/ProjectCard';
import { CTASection } from '../components/CTASection';
import { projectsData } from '../data/projectsData';

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', label: 'All Projects' },
    { id: 'WEB', label: 'Web Development' },
    { id: 'APP', label: 'Mobile Apps' },
    { id: 'GAME', label: 'Game & FiveM' },
    { id: 'DESIGN', label: 'Brand & Graphic' },
    { id: '3D', label: '3D CGI' },
    { id: 'MEDIA', label: 'Photo & Video' }
  ];

  const filteredProjects =
    activeCategory === 'ALL'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <div>
      <PageHeader
        badge="Case Studies & Deployments"
        title="PORTFOLIO & FEATURED WORK"
        subtitle="Explore our verified projects across enterprise platforms, mobile architectures, FiveM multiplayer frameworks, 3D CGI, and digital media."
        breadcrumbs={[{ label: 'Projects' }]}
      />

      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl" className="py-lg-4">
          {/* Category Filter Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`btn px-3 py-2 rounded-pill font-display small fw-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'btn-tensora-primary shadow-glow'
                    : 'btn-tensora-secondary'
                }`}
                style={{ fontSize: '0.86rem' }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <Row className="g-4">
            {filteredProjects.map((project) => (
              <Col key={project.id} lg={4} md={6}>
                <ProjectCard project={project} />
              </Col>
            ))}
          </Row>

          {filteredProjects.length === 0 && (
            <div className="text-center py-5 glass-card border-subtle my-5">
              <i className="bi bi-folder-x text-silver-dark fs-1 mb-3 d-block"></i>
              <h5 className="text-white">No projects found in this category</h5>
              <p className="text-silver-muted small">Please choose another category or check back soon.</p>
              <button
                onClick={() => setActiveCategory('ALL')}
                className="btn btn-tensora-outline-blue btn-sm mt-2"
              >
                View All Projects
              </button>
            </div>
          )}
        </Container>
      </section>

      <CTASection />
    </div>
  );
};
