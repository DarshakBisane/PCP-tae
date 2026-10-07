import React from 'react';
import { PRESET_DEMOS } from '../logic/pcpSolver';

interface PCPInputProps {
  listA: string[];
  listB: string[];
  onUpdateTileA: (index: number, value: string) => void;
  onUpdateTileB: (index: number, value: string) => void;
  onAddTile: () => void;
  onRemoveTile: (index: number) => void;
  onApplyPreset: (presetIndex: number) => void;
  selectedPreset: number | null;
  disabled: boolean;
  validationError: string | null;
}

export const PCPInput: React.FC<PCPInputProps> = ({
  listA,
  listB,
  onUpdateTileA,
  onUpdateTileB,
  onAddTile,
  onRemoveTile,
  onApplyPreset,
  selectedPreset,
  disabled,
  validationError,
}) => {
  const maxTiles = 6;
  const canAdd = listA.length < maxTiles && !disabled;
  const canRemove = listA.length > 1 && !disabled;

  return (
    <div className="pcp-input-container">
      {/* Preset Demos Toolbar */}
      <div className="presets-container">
        <span className="presets-label">
          <span>📚</span> Quick Presets:
        </span>
        {PRESET_DEMOS.map((demo, idx) => (
          <button
            key={demo.name}
            type="button"
            className={`preset-chip ${selectedPreset === idx ? 'active' : ''}`}
            onClick={() => onApplyPreset(idx)}
            disabled={disabled}
            title={demo.description}
          >
            {demo.name}
          </button>
        ))}
      </div>

      {/* Validation Alert */}
      {validationError && (
        <div className="alert-box error" role="alert">
          <span>⚠️</span>
          <span>{validationError}</span>
        </div>
      )}

      {/* Side-by-side Tile Panels */}
      <div className="tiles-grid">
        {/* LIST A PANEL */}
        <div className="tile-panel">
          <div className="tile-panel-header">
            <div className="tile-panel-title">
              <span>🔤</span> LIST A
            </div>
            <span className="tile-panel-count">{listA.length} {listA.length === 1 ? 'tile' : 'tiles'}</span>
          </div>

          <div className="tile-row-list">
            {listA.map((tileVal, idx) => (
              <div key={`tile-a-${idx}`} className="tile-input-row">
                <div className="tile-index-badge">A{idx + 1}</div>
                <input
                  id={`input-tile-a-${idx + 1}`}
                  type="text"
                  className="tile-input"
                  placeholder={`Tile A${idx + 1}...`}
                  value={tileVal}
                  onChange={(e) => onUpdateTileA(idx, e.target.value)}
                  disabled={disabled}
                  aria-label={`Tile A${idx + 1}`}
                  maxLength={12}
                />
                <button
                  type="button"
                  className="tile-remove-btn"
                  onClick={() => onRemoveTile(idx)}
                  disabled={!canRemove}
                  title="Remove tile"
                  aria-label={`Remove tile ${idx + 1}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* LIST B PANEL */}
        <div className="tile-panel">
          <div className="tile-panel-header">
            <div className="tile-panel-title">
              <span>🔡</span> LIST B
            </div>
            <span className="tile-panel-count">{listB.length} {listB.length === 1 ? 'tile' : 'tiles'}</span>
          </div>

          <div className="tile-row-list">
            {listB.map((tileVal, idx) => (
              <div key={`tile-b-${idx}`} className="tile-input-row">
                <div className="tile-index-badge">B{idx + 1}</div>
                <input
                  id={`input-tile-b-${idx + 1}`}
                  type="text"
                  className="tile-input"
                  placeholder={`Tile B${idx + 1}...`}
                  value={tileVal}
                  onChange={(e) => onUpdateTileB(idx, e.target.value)}
                  disabled={disabled}
                  aria-label={`Tile B${idx + 1}`}
                  maxLength={12}
                />
                <button
                  type="button"
                  className="tile-remove-btn"
                  onClick={() => onRemoveTile(idx)}
                  disabled={!canRemove}
                  title="Remove tile"
                  aria-label={`Remove tile ${idx + 1}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Tile Action */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onAddTile}
          disabled={!canAdd}
          id="btn-add-tile"
        >
          + Add Tile (Max {maxTiles})
        </button>
      </div>
    </div>
  );
};
