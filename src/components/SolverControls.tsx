import React from 'react';
import type { SolverStatus } from '../types/pcp';
import { calculateSearchSpace } from '../logic/pcpSolver';

interface SolverControlsProps {
  maxDepth: number;
  onDepthChange: (newDepth: number) => void;
  speed: number;
  onSpeedChange: (newSpeed: number) => void;
  status: SolverStatus;
  tileCount: number;
  onRunSearch: () => void;
  onPauseSearch: () => void;
  onResumeSearch: () => void;
  onStepSearch: () => void;
  onReset: () => void;
}

export const SolverControls: React.FC<SolverControlsProps> = ({
  maxDepth,
  onDepthChange,
  speed,
  onSpeedChange,
  status,
  tileCount,
  onRunSearch,
  onPauseSearch,
  onResumeSearch,
  onStepSearch,
  onReset,
}) => {
  const isRunning = status === 'searching';
  const isPaused = status === 'paused';
  const totalSearchSpace = calculateSearchSpace(tileCount, maxDepth);
  const isLargeSpace = totalSearchSpace > 40000;

  return (
    <div className="solver-controls-bar">
      {/* Settings Grid */}
      <div className="controls-settings-row">
        {/* Maximum Depth Setting */}
        <div className="control-item">
          <div className="control-label">
            <span>Maximum Search Depth: {maxDepth}</span>
            <span className="slider-value-badge">{maxDepth}</span>
          </div>
          <div className="depth-slider-container">
            <input
              id="depth-slider"
              type="range"
              min="1"
              max="8"
              step="1"
              value={maxDepth}
              onChange={(e) => onDepthChange(parseInt(e.target.value, 10))}
              disabled={isRunning}
              className="range-slider"
              aria-label="Maximum Search Depth slider"
            />
          </div>
          <span className="control-helper">
            Maximum length of the index sequence checked by brute force (1–8).
          </span>
        </div>

        {/* Theoretical Combinations Preview */}
        <div className="control-item">
          <div className="control-label">
            <span>Max Sequences to Check</span>
            <span className="slider-value-badge" style={{ minWidth: 'auto' }}>
              ~{totalSearchSpace.toLocaleString()}
            </span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--muted-brown)', marginTop: '0.2rem' }}>
            Sum: <code>&sum; n<sup>k</sup> (k=1..{maxDepth})</code> with n={tileCount}
          </div>
          {isLargeSpace && (
            <span style={{ fontSize: '0.75rem', color: 'var(--error-text)', fontWeight: 600 }}>
              ⚠️ Search space is large. Reduce the number of tiles or maximum depth.
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="controls-actions-row">
        <div className="actions-main-group">
          {!isRunning && !isPaused && (
            <button
              id="btn-run-search"
              type="button"
              className="btn btn-primary"
              onClick={onRunSearch}
            >
              ▶ Run Brute-Force Search
            </button>
          )}

          {isRunning && (
            <button
              id="btn-pause-search"
              type="button"
              className="btn btn-brown"
              onClick={onPauseSearch}
            >
              ⏸ Pause Search
            </button>
          )}

          {isPaused && (
            <>
              <button
                id="btn-resume-search"
                type="button"
                className="btn btn-primary"
                onClick={onResumeSearch}
              >
                ▶ Resume Search
              </button>
              <button
                id="btn-step-search"
                type="button"
                className="btn btn-secondary"
                onClick={onStepSearch}
                title="Evaluate next candidate sequence"
              >
                ⏭ Next Step
              </button>
            </>
          )}

          <button
            id="btn-reset"
            type="button"
            className="btn btn-secondary"
            onClick={onReset}
            disabled={isRunning}
          >
            🔄 Reset
          </button>
        </div>

        {/* Speed Adjustment */}
        <div className="speed-control-group">
          <label htmlFor="speed-select" className="speed-label">
            Animation Delay:
          </label>
          <select
            id="speed-select"
            className="speed-select"
            value={speed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value, 10))}
            disabled={isRunning}
          >
            <option value="300">300ms (Slow)</option>
            <option value="200">200ms (Normal)</option>
            <option value="60">60ms (Fast)</option>
            <option value="0">0ms (Instant)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
