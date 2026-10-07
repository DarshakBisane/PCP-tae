export interface SequenceStep {
  sequence1Based: number[];
  sequence0Based: number[];
  topTiles: string[];
  bottomTiles: string[];
  topString: string;
  bottomString: string;
  isMatch: boolean;
  stepIndex: number;
}

export type SolverStatus = 'idle' | 'searching' | 'paused' | 'found' | 'not_found';

export interface SolverResult {
  isMatch: boolean;
  solutionSequence1Based?: number[];
  solutionSequence0Based?: number[];
  matchingString?: string;
  topFormula?: string;
  bottomFormula?: string;
  totalSequencesChecked: number;
  depthReached: number;
  timeElapsedMs: number;
  message: string;
}

export interface SolverStats {
  sequencesChecked: number;
  maxDepth: number;
  depthExplored: number;
  tilesCount: number;
  totalSearchSpace: number;
  statusText: string;
  timeElapsedMs: number;
}

export interface PresetDemo {
  name: string;
  description: string;
  listA: string[];
  listB: string[];
  maxDepth: number;
}
