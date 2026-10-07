import React from 'react';
import type { SequenceStep, SolverStatus } from '../types/pcp';

interface SearchVisualizerProps {
  currentStep: SequenceStep | null;
  status: SolverStatus;
  listA: string[];
  listB: string[];
}

export const SearchVisualizer: React.FC<SearchVisualizerProps> = ({
  currentStep,
  status,
  listA,
  listB,
}) => {
  if (!currentStep && status === 'idle') {
    return (
      <div className="visualizer-card" id="search-visualization">
        <div className="visualizer-header">
          <div className="visualizer-title">
            <span>🔍</span> Brute-Force Search
          </div>
          <span className="status-badge idle">Ready</span>
        </div>
        <div style={{ textAlign: 'center', padding: '1.75rem 1rem', color: 'var(--subtle-brown)' }}>
          <p style={{ fontSize: '0.95rem' }}>
            Click <strong>"Run Brute-Force Search"</strong> to visually step through the evaluation of index sequences.
          </p>
        </div>
      </div>
    );
  }

  const getStatusBadge = () => {
    switch (status) {
      case 'searching':
        return <span className="status-badge searching">⚡ Searching...</span>;
      case 'paused':
        return <span className="status-badge paused">⏸ Paused</span>;
      case 'found':
        return <span className="status-badge found">✓ Match Found</span>;
      case 'not_found':
        return <span className="status-badge not_found">✗ No Match in Depth</span>;
      default:
        return <span className="status-badge idle">Idle</span>;
    }
  };

  // Helper to check if an index (1-based) is in the current sequence
  const isTileUsed = (index1Based: number) => {
    return currentStep?.sequence1Based.includes(index1Based) ?? false;
  };

  return (
    <div className="visualizer-card animate-fade-in" id="search-visualization">
      {/* Visualizer Top Header */}
      <div className="visualizer-header">
        <div className="visualizer-title">
          <span>🔍</span> Brute-Force Search
        </div>
        <div>{getStatusBadge()}</div>
      </div>

      {currentStep && (
        <>
          {/* Current Sequence Display */}
          <div className="current-sequence-panel">
            <div className="sequence-label">
              Current Sequence (Step #{currentStep.stepIndex})
            </div>
            <div className="sequence-chips-row">
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--muted-brown)' }}>[</span>
              {currentStep.sequence1Based.map((idxVal, i) => (
                <React.Fragment key={`chip-${i}-${idxVal}`}>
                  <span className="seq-chip">
                    {idxVal}
                  </span>
                  {i < currentStep.sequence1Based.length - 1 && <span className="seq-arrow">→</span>}
                </React.Fragment>
              ))}
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--muted-brown)' }}>]</span>
            </div>
          </div>

          {/* Tile Highlighting Panel */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--muted-brown)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Tile Highlighting for Sequence [{currentStep.sequence1Based.join(', ')}]:
            </div>

            <div className="tiles-grid" style={{ marginBottom: '0' }}>
              {/* List A Tiles with highlight */}
              <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-warm)' }}>
                <strong style={{ fontSize: '0.825rem', color: 'var(--dark-brown)' }}>List A:</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.4rem' }}>
                  {listA.map((val, idx) => {
                    const active = isTileUsed(idx + 1);
                    return (
                      <div
                        key={`hl-a-${idx}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.35rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: active ? 'var(--bg-cream)' : '#FFFFFF',
                          border: active ? '1.5px solid var(--primary-orange)' : '1px solid var(--border-warm)',
                          fontWeight: active ? 700 : 400,
                          fontSize: '0.875rem',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        <span>[{idx + 1}] "{val}"</span>
                        {active && <span style={{ fontSize: '0.75rem', color: 'var(--primary-orange-dark)', fontWeight: 700 }}>← Selected</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* List B Tiles with highlight */}
              <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-warm)' }}>
                <strong style={{ fontSize: '0.825rem', color: 'var(--dark-brown)' }}>List B:</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.4rem' }}>
                  {listB.map((val, idx) => {
                    const active = isTileUsed(idx + 1);
                    return (
                      <div
                        key={`hl-b-${idx}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.35rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: active ? 'var(--bg-cream)' : '#FFFFFF',
                          border: active ? '1.5px solid var(--primary-orange)' : '1px solid var(--border-warm)',
                          fontWeight: active ? 700 : 400,
                          fontSize: '0.875rem',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        <span>[{idx + 1}] "{val}"</span>
                        {active && <span style={{ fontSize: '0.75rem', color: 'var(--primary-orange-dark)', fontWeight: 700 }}>← Selected</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Active Tiles & String Breakdown Grid */}
          <div className="breakdown-grid">
            {/* Top List A Concatenation */}
            <div className="breakdown-box">
              <div className="breakdown-box-title">
                <span>Top Concatenation (List A)</span>
              </div>
              <div className="breakdown-formula">
                {currentStep.topTiles.join(' + ')}
              </div>
              <div className="breakdown-result-str">
                Concatenated A: <strong>"{currentStep.topString}"</strong>
              </div>
            </div>

            {/* Bottom List B Concatenation */}
            <div className="breakdown-box">
              <div className="breakdown-box-title">
                <span>Bottom Concatenation (List B)</span>
              </div>
              <div className="breakdown-formula">
                {currentStep.bottomTiles.join(' + ')}
              </div>
              <div className="breakdown-result-str">
                Concatenated B: <strong>"{currentStep.bottomString}"</strong>
              </div>
            </div>
          </div>

          {/* Comparison Bar */}
          <div className={`comparison-banner ${currentStep.isMatch ? 'match' : 'nomatch'}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{currentStep.isMatch ? '✓' : '✗'}</span>
              <span>
                Comparison: <code>"{currentStep.topString}"</code> {currentStep.isMatch ? '===' : '!=='} <code>"{currentStep.bottomString}"</code>
              </span>
            </div>
            <div>
              {currentStep.isMatch ? (
                <strong style={{ color: 'var(--success-text)' }}>✓ MATCH FOUND</strong>
              ) : (
                <span style={{ color: 'var(--muted-brown)' }}>✗ Not Match</span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
