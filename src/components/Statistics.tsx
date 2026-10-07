import React from 'react';
import type { SolverStats } from '../types/pcp';

interface StatisticsProps {
  stats: SolverStats;
}

export const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className="stats-container" style={{ marginBottom: '2.5rem' }}>
      <div className="section-header" style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--dark-brown)' }}>📊 Search Statistics</h3>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Sequences Checked</div>
          <div className="stat-value">{stats.sequencesChecked.toLocaleString()}</div>
          <div className="stat-sub">evaluated candidates</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Search Depth</div>
          <div className="stat-value">{stats.depthExplored} / {stats.maxDepth}</div>
          <div className="stat-sub">maximum sequence length</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Number of Tiles</div>
          <div className="stat-value">{stats.tilesCount}</div>
          <div className="stat-sub">tiles in A and B</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Search Status</div>
          <div className="stat-value" style={{ fontSize: '1.05rem', marginTop: '0.2rem' }}>
            {stats.statusText}
          </div>
          <div className="stat-sub">{stats.timeElapsedMs} ms</div>
        </div>
      </div>
    </div>
  );
};
