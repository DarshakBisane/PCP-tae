import type { SequenceStep, SolverResult } from '../types/pcp';

/**
 * Calculates the total number of candidate sequences from depth 1 to maxDepth for N tiles.
 * Sum_{k=1}^d N^k
 */
export function calculateSearchSpace(tileCount: number, maxDepth: number): number {
  if (tileCount <= 0 || maxDepth <= 0) return 0;
  if (tileCount === 1) return maxDepth;
  let total = 0;
  let current = tileCount;
  for (let d = 1; d <= maxDepth; d++) {
    total += current;
    current *= tileCount;
    if (total > 100_000_000) return 100_000_000;
  }
  return total;
}

/**
 * Generates all candidate sequences of 0-based indices from depth 1 to maxDepth in breadth-first / lexicographical order.
 * E.g., for N=2: [0], [1], [0,0], [0,1], [1,0], [1,1], [0,0,0], ...
 */
export function* generatePCPSequences(tileCount: number, maxDepth: number): Generator<number[], void, unknown> {
  if (tileCount <= 0 || maxDepth <= 0) return;

  for (let depth = 1; depth <= maxDepth; depth++) {
    const currentSeq: number[] = new Array(depth).fill(0);
    const totalCombinations = Math.pow(tileCount, depth);

    for (let count = 0; count < totalCombinations; count++) {
      yield [...currentSeq];

      for (let pos = depth - 1; pos >= 0; pos--) {
        if (currentSeq[pos] < tileCount - 1) {
          currentSeq[pos]++;
          break;
        } else {
          currentSeq[pos] = 0;
        }
      }
    }
  }
}

/**
 * Evaluates a single index sequence on lists A and B.
 */
export function evaluateSequence(
  sequence0Based: number[],
  listA: string[],
  listB: string[],
  stepIndex: number
): SequenceStep {
  const topTiles = sequence0Based.map((idx) => listA[idx] ?? '');
  const bottomTiles = sequence0Based.map((idx) => listB[idx] ?? '');

  const topString = topTiles.join('');
  const bottomString = bottomTiles.join('');

  const isMatch = topString.length > 0 && topString === bottomString;
  const sequence1Based = sequence0Based.map((idx) => idx + 1);

  return {
    sequence1Based,
    sequence0Based,
    topTiles,
    bottomTiles,
    topString,
    bottomString,
    isMatch,
    stepIndex,
  };
}

/**
 * Synchronous solver for instant results or automated testing.
 */
export function solvePCPSync(listA: string[], listB: string[], maxDepth: number): SolverResult {
  const startTime = performance.now();

  if (listA.length === 0 || listB.length === 0) {
    return {
      isMatch: false,
      totalSequencesChecked: 0,
      depthReached: 0,
      timeElapsedMs: 0,
      message: 'Tile lists cannot be empty.',
    };
  }

  if (listA.length !== listB.length) {
    return {
      isMatch: false,
      totalSequencesChecked: 0,
      depthReached: 0,
      timeElapsedMs: 0,
      message: 'List A and List B must contain the same number of tiles.',
    };
  }

  const generator = generatePCPSequences(listA.length, maxDepth);
  let checkedCount = 0;
  let maxDepthReached = 1;

  for (const seq of generator) {
    checkedCount++;
    if (seq.length > maxDepthReached) {
      maxDepthReached = seq.length;
    }

    const step = evaluateSequence(seq, listA, listB, checkedCount);
    if (step.isMatch) {
      const timeElapsedMs = Math.round(performance.now() - startTime);
      const topFormula = step.topTiles.join(' + ');
      const bottomFormula = step.bottomTiles.join(' + ');

      return {
        isMatch: true,
        solutionSequence1Based: step.sequence1Based,
        solutionSequence0Based: step.sequence0Based,
        matchingString: step.topString,
        topFormula,
        bottomFormula,
        totalSequencesChecked: checkedCount,
        depthReached: seq.length,
        timeElapsedMs,
        message: 'MATCH FOUND',
      };
    }
  }

  const timeElapsedMs = Math.round(performance.now() - startTime);
  return {
    isMatch: false,
    totalSequencesChecked: checkedCount,
    depthReached: maxDepth,
    timeElapsedMs,
    message: `No matching sequence found within the selected search depth.`,
  };
}

/**
 * Preset examples for instant testing during viva.
 */
export const PRESET_DEMOS = [
  {
    name: 'Default Demo [1, 2]',
    description: 'Canonical example with A=["a","ba"] and B=["ab","a"] matching at [1, 2] with "aba".',
    listA: ['a', 'ba'],
    listB: ['ab', 'a'],
    maxDepth: 5,
  },
  {
    name: 'Single Tile [1]',
    description: 'Immediate depth 1 match at sequence [1] with "x".',
    listA: ['x', 'y'],
    listB: ['x', 'z'],
    maxDepth: 4,
  },
  {
    name: 'Repeated Index [1, 1]',
    description: 'Repeated index 1: "a"+"a" == "a"+"a".',
    listA: ['a'],
    listB: ['a'],
    maxDepth: 4,
  },
  {
    name: 'No Solution Case',
    description: 'No matching sequence exists within selected depth.',
    listA: ['a', 'bb'],
    listB: ['b', 'aa'],
    maxDepth: 4,
  },
];
