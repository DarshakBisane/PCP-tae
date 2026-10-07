import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section animate-fade-in">
      <div className="container">
        <div className="hero-pill-group">
          <span className="badge-academic">TAE-1 | Project Based Learning</span>
          <span className="badge-academic badge-student">DARSHAK K. BISANE • CM25D004</span>
        </div>

        <h1 className="hero-title">Post's Correspondence Problem</h1>
        <h2 className="hero-subtitle">Brute-Force Solver</h2>
        <p className="hero-desc">
          Find a sequence of indices that makes the concatenated strings from List A and List B equal.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href="#solver" className="btn btn-primary">
            Try PCP Solver ↓
          </a>
          <a href="#how-it-works" className="btn btn-secondary">
            How It Works
          </a>
        </div>
      </div>
    </section>
  );
};
