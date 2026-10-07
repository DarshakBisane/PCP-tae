import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'Define Tile Lists',
      desc: 'Create two lists of string tiles: List A and List B of the same size.',
    },
    {
      num: 2,
      title: 'Generate Sequences',
      desc: 'Choose a sequence of indices [i₁, i₂, ..., iₖ] (indices may be repeated).',
    },
    {
      num: 3,
      title: 'Apply Same Sequence',
      desc: 'Use the EXACT same sequence of indices on both List A and List B.',
    },
    {
      num: 4,
      title: 'Concatenate Tiles',
      desc: 'Concatenate chosen tiles from A (Top string) and from B (Bottom string).',
    },
    {
      num: 5,
      title: 'Compare Strings',
      desc: 'Compare Top String === Bottom String for exact character match.',
    },
    {
      num: 6,
      title: 'Confirm Solution',
      desc: 'If they are equal, the sequence is a solution; otherwise continue searching.',
    },
  ];

  return (
    <section id="how-it-works" className="how-it-works-section" style={{ padding: '2rem 0' }}>
      <div className="section-header">
        <h2 className="section-title">How PCP Works</h2>
        <p className="section-subtitle">
          The step-by-step procedure of Post's Correspondence Problem decision algorithm.
        </p>
      </div>

      <div className="how-it-works-grid">
        {steps.map((s) => (
          <div key={s.num} className="how-step-card">
            <div className="how-step-num">{s.num}</div>
            <h3 className="how-step-title">{s.title}</h3>
            <p className="how-step-desc">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Formula Box */}
      <div className="formula-box">
        <div className="formula-title">PCP Matching Condition</div>
        <div className="formula-math">
          A[i₁] + A[i₂] + ... + A[iₖ] &nbsp;=&nbsp; B[i₁] + B[i₂] + ... + B[iₖ]
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted-brown)', marginTop: '0.75rem' }}>
          For an index sequence <code>[i₁, i₂, ..., iₖ]</code> with <code>1 &le; i<sub>j</sub> &le; n</code>.
        </p>
      </div>
    </section>
  );
};
