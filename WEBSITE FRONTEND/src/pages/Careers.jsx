import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { PageHeader } from '../components/PageHeader';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';
import { careersData } from '../data/careersData';
import { api } from '../services/api';

export const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    'ALL',
    'Web Development',
    'App Development',
    'Game Developer',
    'Graphic Designer',
    '3D Artist',
    'Video Editor',
    'UI/UX Designer',
    'Marketing'
  ];

  const filteredJobs =
    activeCategory === 'ALL'
      ? careersData
      : careersData.filter((job) => job.category === activeCategory);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleApply = (job) => {
    setSelectedJob(job);
    reset();
  };

  const onSubmitApplication = async (data) => {
    setSubmitting(true);
    try {
      await api.submitJobApplication({
        ...data,
        jobId: selectedJob?.id,
        jobTitle: selectedJob?.title,
        department: selectedJob?.department
      });
      toast.success(`Application for "${selectedJob?.title}" submitted successfully! Our talent team will review your profile.`, {
        autoClose: 5000
      });
      setSelectedJob(null);
      reset();
    } catch (err) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        badge="Join The Vanguard"
        title="BUILD THE FUTURE WITH TENSORA."
        subtitle="We're always looking for creative minds, developers and talented professionals who want to build something meaningful."
        breadcrumbs={[{ label: 'Careers' }]}
      />

      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Container fluid="xl" className="py-lg-4">
          <SectionTitle
            badge="Open Opportunities"
            title="EXPLORE CURRENT ROLES"
            subtitle="Find your place among passionate engineers, designers, and multimedia visionaries."
          />

          {/* Department Filter Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn px-3 py-2 rounded-pill font-display small fw-semibold transition-all ${
                  activeCategory === cat
                    ? 'btn-tensora-primary shadow-glow'
                    : 'btn-tensora-secondary'
                }`}
                style={{ fontSize: '0.84rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Jobs Listing */}
          <Row className="g-4">
            {filteredJobs.map((job) => (
              <Col key={job.id} lg={6}>
                <div
                  className="glass-card p-4 p-xl-5 h-100 d-flex flex-column justify-content-between position-relative"
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-glass)'
                  }}
                >
                  <div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                      <span className="tensora-badge small">{job.department}</span>
                      <span className="tensora-badge-silver badge small">
                        <i className="bi bi-geo-alt me-1 text-blue-neon"></i>
                        {job.location}
                      </span>
                    </div>

                    <h4 className="font-display fw-bold text-silver-bright mb-2" style={{ fontSize: '1.35rem' }}>
                      {job.title}
                    </h4>

                    <div className="d-flex align-items-center gap-3 small text-silver-muted mb-3">
                      <span>
                        <i className="bi bi-clock me-1 text-blue-neon"></i>
                        {job.type}
                      </span>
                      <span>•</span>
                      <span>
                        <i className="bi bi-briefcase me-1 text-blue-neon"></i>
                        {job.experience}
                      </span>
                    </div>

                    <p className="text-silver-muted small mb-4" style={{ lineHeight: '1.65' }}>
                      {job.description}
                    </p>

                    {/* Requirements Preview */}
                    <div className="pt-3 border-top border-secondary border-opacity-25 mb-4">
                      <h6 className="font-display text-white text-uppercase small mb-2" style={{ fontSize: '0.75rem' }}>
                        Key Requirements:
                      </h6>
                      <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                        {job.requirements.slice(0, 3).map((req, i) => (
                          <li key={i} className="small text-silver-metallic d-flex align-items-start gap-2" style={{ fontSize: '0.84rem' }}>
                            <i className="bi bi-check2 text-blue-neon mt-1"></i>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-top border-secondary border-opacity-25">
                    <button
                      onClick={() => handleApply(job)}
                      className="btn-tensora-primary w-100 justify-content-center py-2"
                    >
                      <span>Apply For This Position</span>
                      <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Application Modal */}
      <Modal
        show={!!selectedJob}
        onHide={() => setSelectedJob(null)}
        centered
        size="lg"
        contentClassName="bg-tensora-dark border-blue glass-panel text-silver-bright"
      >
        <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-25">
          <div>
            <span className="tensora-badge small mb-1">Application Portal</span>
            <Modal.Title className="font-display fw-bold text-white fs-5">
              Apply for {selectedJob?.title}
            </Modal.Title>
          </div>
        </Modal.Header>

        <Modal.Body className="p-4">
          <form onSubmit={handleSubmit(onSubmitApplication)} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="tensora-label">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Elena Rostova"
                  className={`tensora-input ${errors.name ? 'border-danger' : ''}`}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <span className="text-danger small mt-1 d-block">{errors.name.message}</span>
                )}
              </div>

              <div className="col-md-6">
                <label className="tensora-label">Email Address *</label>
                <input
                  type="email"
                  placeholder="elena@example.com"
                  className={`tensora-input ${errors.email ? 'border-danger' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                  })}
                />
                {errors.email && (
                  <span className="text-danger small mt-1 d-block">{errors.email.message}</span>
                )}
              </div>

              <div className="col-md-6">
                <label className="tensora-label">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className={`tensora-input ${errors.phone ? 'border-danger' : ''}`}
                  {...register('phone', { required: 'Phone is required' })}
                />
                {errors.phone && (
                  <span className="text-danger small mt-1 d-block">{errors.phone.message}</span>
                )}
              </div>

              <div className="col-md-6">
                <label className="tensora-label">Portfolio / GitHub / ArtStation Link *</label>
                <input
                  type="url"
                  placeholder="https://github.com/username or artstation.com"
                  className={`tensora-input ${errors.portfolio ? 'border-danger' : ''}`}
                  {...register('portfolio', { required: 'Portfolio or GitHub URL is required' })}
                />
                {errors.portfolio && (
                  <span className="text-danger small mt-1 d-block">{errors.portfolio.message}</span>
                )}
              </div>

              <div className="col-12">
                <label className="tensora-label">Resume / CV Link or Drive URL *</label>
                <input
                  type="url"
                  placeholder="Google Drive, Dropbox, or LinkedIn PDF link"
                  className={`tensora-input ${errors.resumeLink ? 'border-danger' : ''}`}
                  {...register('resumeLink', { required: 'Resume link is required' })}
                />
                {errors.resumeLink && (
                  <span className="text-danger small mt-1 d-block">{errors.resumeLink.message}</span>
                )}
              </div>

              <div className="col-12">
                <label className="tensora-label">Why do you want to join Tensora? (Brief Introduction)</label>
                <textarea
                  rows={4}
                  placeholder="Highlight your relevant experience, technical strengths, or passion projects..."
                  className="tensora-input"
                  {...register('coverNote')}
                />
              </div>

              <div className="col-12 pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="btn btn-tensora-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-tensora-primary"
                >
                  {submitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <CTASection />
    </div>
  );
};
