import React from 'react';
import type { SolverResult } from '../types/pcp';

interface ResultCardProps {
  result: SolverResult | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  if (!result) return null;

  if (result.isMatch) {
    return (
      <div className="result-card success" role="region" aria-label="Search Result">
        <div className="result-title-row">
          <span>✓</span>
          <span>MATCH FOUND</span>
        </div>

        <p style={{ color: 'var(--success-text)', fontSize: '0.95rem', marginBottom: '1rem' }}>
          A valid sequence of tiles was found where the concatenated strings from List A and List B match.
        </p>

        <div className="result-details-grid">
          <div className="result-detail-box">
            <div className="result-detail-label">Matching Sequence</div>
            <div className="result-detail-val" style={{ color: 'var(--success-text)' }}>
              [{result.solutionSequence1Based?.join(', ')}]
            </div>
          </div>

          <div className="result-detail-box">
            <div className="result-detail-label">Matching String</div>
            <div className="result-detail-val">"{result.matchingString}"</div>
          </div>

          <div className="result-detail-box">
            <div className="result-detail-label">Sequence Length</div>
            <div className="result-detail-val">{result.depthReached} tiles</div>
          </div>

          <div className="result-detail-box">
            <div className="result-detail-label">Sequences Checked</div>
            <div className="result-detail-val">{result.totalSequencesChecked}</div>
          </div>
        </div>

        <div className="result-steps-breakdown">
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--muted-brown)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            Concatenation Result:
          </div>
          <div className="result-step-line">
            <strong>A:</strong> {result.topFormula} &rarr; <strong>"{result.matchingString}"</strong>
          </div>
          <div className="result-step-line">
            <strong>B:</strong> {result.bottomFormula} &rarr; <strong>"{result.matchingString}"</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="result-card no-solution" role="region" aria-label="Search Result">
      <div className="result-title-row">
        <span>✗</span>
        <span>No Matching Sequence Found</span>
      </div>

      <p style={{ color: 'var(--error-text)', fontSize: '0.95rem', marginBottom: '1rem' }}>
        No matching sequence found within the selected search depth ({result.depthReached}).
      </p>

      <div className="result-details-grid">
        <div className="result-detail-box">
          <div className="result-detail-label">Search Depth Checked</div>
          <div className="result-detail-val">{result.depthReached}</div>
        </div>

        <div className="result-detail-box">
          <div className="result-detail-label">Sequences Checked</div>
          <div className="result-detail-val">{result.totalSequencesChecked}</div>
        </div>

        <div className="result-detail-box">
          <div className="result-detail-label">Search Status</div>
          <div className="result-detail-val" style={{ color: 'var(--error-text)', fontSize: '0.95rem' }}>
            Exhausted to Depth {result.depthReached}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-warm)', fontSize: '0.85rem', color: 'var(--muted-brown)' }}>
        <em>Note:</em> The brute-force algorithm evaluated all possible sequences up to depth {result.depthReached}. (PCP is mathematically undecidable for unbounded depth).
      </div>
    </div>
  );
};
