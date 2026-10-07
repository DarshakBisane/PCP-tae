import React from 'react';

export const AcademicInfo: React.FC = () => {
  return (
    <section id="academic-info" className="academic-info-section" style={{ padding: '2rem 0' }}>
      <div className="section-header">
        <h2 className="section-title">Academic & Project Details</h2>
        <p className="section-subtitle">
          B.Tech Project-Based Learning (PBL) submission details for evaluation and viva.
        </p>
      </div>

      <div className="academic-card">
        <div className="academic-grid">
          <div className="academic-item">
            <div className="academic-item-label">Student Name</div>
            <div className="academic-item-val">DARSHAK K. BISANE</div>
          </div>

          <div className="academic-item">
            <div className="academic-item-label">Roll Number</div>
            <div className="academic-item-val">CM25D004</div>
          </div>

          <div className="academic-item">
            <div className="academic-item-label">Project Topic</div>
            <div className="academic-item-val">PCP Visual Solver</div>
          </div>

          <div className="academic-item">
            <div className="academic-item-label">Algorithmic Approach</div>
            <div className="academic-item-val">Bounded Brute-Force Search</div>
          </div>

          <div className="academic-item">
            <div className="academic-item-label">Evaluation Phase</div>
            <div className="academic-item-val">TAE-1 (PBL)</div>
          </div>

          <div className="academic-item">
            <div className="academic-item-label">Project Type</div>
            <div className="academic-item-val">Individual Student Submission</div>
          </div>
        </div>
      </div>
    </section>
  );
};
