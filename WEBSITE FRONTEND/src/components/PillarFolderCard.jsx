import React from 'react';

export const PillarFolderCard = ({ pillar }) => {
  return (
    <div className="pillar-folder-card scroll-reveal">
      {/* ── Top Header Banner with Gradient ── */}
      <div 
        className="pillar-folder-header"
        style={{ background: pillar.gradient }}
      >
        {/* Subtle grid pattern overlay */}
        <div className="pillar-header-pattern" />

        {/* Top Right Floating Badge */}
        <div className="pillar-header-badge">
          <i className={`bi ${pillar.icon}`} />
        </div>

        {/* ── 3D Floating Stacked Cards peeking out ── */}
        <div className="floating-cards-stack">
          {pillar.cards && pillar.cards.map((card, idx) => (
            <div 
              key={idx} 
              className={`floating-stacked-card card-${3 - idx}`}
            >
              <div className="d-flex align-items-center justify-content-between mb-1">
                <div className="d-flex align-items-center gap-2">
                  <div 
                    className="stacked-card-icon"
                    style={{ color: pillar.accentColor }}
                  >
                    <i className={`bi ${card.icon}`} />
                  </div>
                  <span className="stacked-card-title">{card.label}</span>
                </div>
                <span className="stacked-card-tag">{card.tag}</span>
              </div>
              
              {/* Mini Skeleton Lines */}
              <div className="stacked-card-skeleton">
                <div className="skeleton-line line-full" />
                <div className="skeleton-line line-half" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dark Folder Pocket Container ── */}
      <div className="folder-pocket-container">
        {/* ── Folder Tab Top Bar (Full Width, No Cutout Gap) ── */}
        <div className="folder-pocket-tab-bar-full">
          <div>
            <h3 className="folder-pocket-title">{pillar.title}</h3>
            <span className="folder-pocket-subtitle">{pillar.subtitle}</span>
          </div>
          <div className="folder-action-dots">
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* ── Folder Main Content Body ── */}
        <div className="folder-pocket-body">
          <p className="folder-pocket-desc">
            {pillar.desc}
          </p>

          {/* ── Footer Info Row ── */}
          <div className="folder-pocket-footer">
            <div className="folder-file-count">
              <i className="bi bi-file-earmark-text-fill me-2" style={{ color: pillar.accentColor }} />
              <span>{pillar.count}</span>
            </div>

            <div className="folder-arrow-btn">
              <i className="bi bi-arrow-up-right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
