import React from 'react';

export const ComplexitySection: React.FC = () => {
  return (
    <section id="complexity" className="complexity-section" style={{ padding: '2rem 0' }}>
      <div className="section-header">
        <h2 className="section-title">Brute-Force Complexity</h2>
        <p className="section-subtitle">
          Mathematical analysis of sequence growth and computational limitations.
        </p>
      </div>

      <div className="complexity-grid">
        {/* Time Complexity Card */}
        <div className="complexity-card">
          <h3>⏱️ Growth of Sequence Space</h3>
          <p>
            If there are <strong>n</strong> corresponding tile pairs and maximum search depth is <strong>d</strong>, the number of sequences checked is:
          </p>
          <div className="complexity-formula">
            Total Sequences = n + n² + n³ + ... + nᵈ
          </div>
          <p style={{ marginTop: '0.75rem' }}>
            Therefore, the search space grows exponentially with respect to depth:
          </p>
          <div className="complexity-formula">
            O(n<sup>d</sup>)
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--subtle-brown)' }}>
            in terms of generated sequence evaluations.
          </p>
        </div>

        {/* Limitations & Bounded Search */}
        <div className="complexity-card">
          <h3>⚠️ Important Computational Limitations</h3>
          <p>
            Because brute-force search checks many possible sequences, larger tile sets and greater search depths can require significantly more computation.
          </p>
          <div style={{ backgroundColor: 'var(--bg-cream)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-warm)', marginTop: '0.5rem' }}>
            <strong style={{ fontSize: '0.85rem', color: 'var(--dark-brown)' }}>Why Bounded Depth is Required:</strong>
            <p style={{ fontSize: '0.825rem', color: 'var(--muted-brown)', marginTop: '0.25rem' }}>
              Unrestricted Post's Correspondence Problem is undecidable (Emil Post, 1946). Imposing a maximum search depth (<em>bounded PCP</em>) guarantees termination within finite time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
