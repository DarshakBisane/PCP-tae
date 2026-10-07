import React from 'react';

export const ExampleSection: React.FC = () => {
  return (
    <section id="example" className="example-section" style={{ padding: '2rem 0' }}>
      <div className="section-header">
        <h2 className="section-title">PCP Example</h2>
        <p className="section-subtitle">
          Canonical 2-tile demonstration matching at index sequence [1, 2].
        </p>
      </div>

      <div className="example-card">
        <div className="example-grid">
          {/* Tile Configuration Box */}
          <div className="example-box">
            <h3 style={{ fontSize: '1rem', color: 'var(--dark-brown)', marginBottom: '0.75rem' }}>
              Given Lists:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-warm)' }}>
                <strong style={{ color: 'var(--dark-brown)', fontSize: '0.85rem' }}>List A:</strong>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  <div>1 &rarr; <code>"a"</code></div>
                  <div>2 &rarr; <code>"ba"</code></div>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-warm)' }}>
                <strong style={{ color: 'var(--dark-brown)', fontSize: '0.85rem' }}>List B:</strong>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  <div>1 &rarr; <code>"ab"</code></div>
                  <div>2 &rarr; <code>"a"</code></div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-warm)' }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--dark-brown)' }}>Sequence [1, 2]:</strong>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--dark-brown)', marginTop: '0.35rem' }}>
                <div>A: a + ba = <strong>aba</strong></div>
                <div>B: ab + a = <strong>aba</strong></div>
                <div style={{ color: 'var(--success-text)', fontWeight: 700, marginTop: '0.25rem' }}>
                  Therefore: aba = aba &rarr; MATCH FOUND
                </div>
              </div>
            </div>
          </div>

          {/* Sequential Brute Force Trace Box */}
          <div className="example-box">
            <h3 style={{ fontSize: '1rem', color: 'var(--dark-brown)', marginBottom: '0.75rem' }}>
              Brute-Force Candidate Trace:
            </h3>

            <div className="example-trace-row">
              <span>Seq <code>[1]</code>:</span>
              <span>"a" &ne; "ab"</span>
              <span style={{ color: 'var(--error-text)', fontSize: '0.8rem' }}>✗ Not Match</span>
            </div>

            <div className="example-trace-row">
              <span>Seq <code>[2]</code>:</span>
              <span>"ba" &ne; "a"</span>
              <span style={{ color: 'var(--error-text)', fontSize: '0.8rem' }}>✗ Not Match</span>
            </div>

            <div className="example-trace-row">
              <span>Seq <code>[1, 1]</code>:</span>
              <span>"aa" &ne; "abab"</span>
              <span style={{ color: 'var(--error-text)', fontSize: '0.8rem' }}>✗ Not Match</span>
            </div>

            <div className="example-trace-row match">
              <span>Seq <code>[1, 2]</code>:</span>
              <span>"a"+"ba" = "ab"+"a" = "aba"</span>
              <span style={{ color: 'var(--success-text)', fontSize: '0.85rem' }}>✓ MATCH FOUND</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
