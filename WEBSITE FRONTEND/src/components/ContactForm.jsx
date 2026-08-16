import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../services/api';

export const ContactForm = ({ defaultService = '' }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      service: defaultService || 'Web Development',
      budget: '$5,000 - $15,000'
    }
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api.submitInquiry(data);
      toast.success('Inquiry sent successfully! Our solutions team will contact you within 24 hours.', {
        position: 'top-right',
        autoClose: 5000
      });
      setSubmittedSuccess(true);
      reset();
    } catch (err) {
      toast.error('Failed to submit inquiry. Please verify your details or try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const servicesList = [
    'Web Development',
    'App Development',
    'Game Script Development',
    'Graphic Design',
    '3D Modelling',
    'Photo & Video Editing',
    'Other Custom Solution'
  ];

  const budgetRanges = [
    '< $5,000 (Small Sprint / Asset)',
    '$5,000 - $15,000 (Standard Commercial)',
    '$15,000 - $35,000 (Full Platform / App)',
    '$35,000+ (Enterprise Multi-phase)'
  ];

  return (
    <div className="glass-card p-4 p-md-5 border-blue">
      {submittedSuccess && (
        <div className="alert alert-dark bg-surface border-blue text-silver-bright mb-4 p-3 rounded-3 d-flex align-items-center gap-3">
          <i className="bi bi-check-circle-fill text-blue-neon fs-4"></i>
          <div>
            <div className="fw-bold text-white">Thank You for Reaching Out!</div>
            <div className="small text-silver-muted">Your project inquiry has been queued for evaluation.</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row g-3">
          {/* Full Name */}
          <div className="col-md-6">
            <label className="tensora-label">
              Full Name <span className="text-blue-neon">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Alexander Vance"
              className={`tensora-input ${errors.name ? 'border-danger' : ''}`}
              {...register('name', { required: 'Please enter your full name' })}
            />
            {errors.name && (
              <span className="text-danger small mt-1 d-block">{errors.name.message}</span>
            )}
          </div>

          {/* Email Address */}
          <div className="col-md-6">
            <label className="tensora-label">
              Corporate Email <span className="text-blue-neon">*</span>
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className={`tensora-input ${errors.email ? 'border-danger' : ''}`}
              {...register('email', {
                required: 'Please enter a valid email address',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && (
              <span className="text-danger small mt-1 d-block">{errors.email.message}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="col-md-6">
            <label className="tensora-label">Phone / WhatsApp (Optional)</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="tensora-input"
              {...register('phone')}
            />
          </div>

          {/* Company / Brand Name */}
          <div className="col-md-6">
            <label className="tensora-label">Company / Community Name</label>
            <input
              type="text"
              placeholder="e.g. Apex Holdings / Hyperion RP"
              className="tensora-input"
              {...register('company')}
            />
          </div>

          {/* Service Selector */}
          <div className="col-md-6">
            <label className="tensora-label">
              Primary Service Needed <span className="text-blue-neon">*</span>
            </label>
            <select
              className={`tensora-input ${errors.service ? 'border-danger' : ''}`}
              {...register('service', { required: 'Please choose a service' })}
            >
              {servicesList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.service && (
              <span className="text-danger small mt-1 d-block">{errors.service.message}</span>
            )}
          </div>

          {/* Estimated Budget Range */}
          <div className="col-md-6">
            <label className="tensora-label">Estimated Budget Range</label>
            <select className="tensora-input" {...register('budget')}>
              {budgetRanges.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Message / Scope */}
          <div className="col-12">
            <label className="tensora-label">
              Project Description & Requirements <span className="text-blue-neon">*</span>
            </label>
            <textarea
              rows={5}
              placeholder="Tell us about your project goals, technical expectations, timeline, or links to existing references..."
              className={`tensora-input ${errors.message ? 'border-danger' : ''}`}
              {...register('message', {
                required: 'Please provide a brief project summary',
                minLength: { value: 15, message: 'Please describe in at least 15 characters' }
              })}
            />
            {errors.message && (
              <span className="text-danger small mt-1 d-block">{errors.message.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-12 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn-tensora-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2"
              style={{ fontSize: '1rem' }}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Transmitting Encrypted Inquiry...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-send-fill"></i>
                  <span>Send Project Inquiry</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
