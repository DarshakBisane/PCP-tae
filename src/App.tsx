import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PCPInput } from './components/PCPInput';
import { SolverControls } from './components/SolverControls';
import { SearchVisualizer } from './components/SearchVisualizer';
import { ResultCard } from './components/ResultCard';
import { Statistics } from './components/Statistics';
import { HowItWorks } from './components/HowItWorks';
import { ExampleSection } from './components/ExampleSection';
import { ComplexitySection } from './components/ComplexitySection';
import { AcademicInfo } from './components/AcademicInfo';
import { Footer } from './components/Footer';

import type { SequenceStep, SolverStatus, SolverResult, SolverStats } from './types/pcp';
import {
  generatePCPSequences,
  evaluateSequence,
  solvePCPSync,
  calculateSearchSpace,
  PRESET_DEMOS,
} from './logic/pcpSolver';

export const App: React.FC = () => {
  // Tile lists state - default canonical demo
  const [listA, setListA] = useState<string[]>(['a', 'ba']);
  const [listB, setListB] = useState<string[]>(['ab', 'a']);
  const [maxDepth, setMaxDepth] = useState<number>(5);
  const [speed, setSpeed] = useState<number>(200);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Search execution state
  const [status, setStatus] = useState<SolverStatus>('idle');
  const [currentStep, setCurrentStep] = useState<SequenceStep | null>(null);
  const [result, setResult] = useState<SolverResult | null>(null);

  // Statistics state
  const [stats, setStats] = useState<SolverStats>({
    sequencesChecked: 0,
    maxDepth: 5,
    depthExplored: 0,
    tilesCount: 2,
    totalSearchSpace: calculateSearchSpace(2, 5),
    statusText: 'Ready',
    timeElapsedMs: 0,
  });

  // Generator & Animation Refs
  const generatorRef = useRef<Generator<number[], void, unknown> | null>(null);
  const stepIndexRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);
  const isRunningRef = useRef<boolean>(false);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Update theoretical search space whenever tiles count or maxDepth changes
  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      maxDepth,
      tilesCount: listA.length,
      totalSearchSpace: calculateSearchSpace(listA.length, maxDepth),
    }));
  }, [listA.length, maxDepth]);

  // Tile modification handlers
  const handleUpdateTileA = (index: number, value: string) => {
    const updated = [...listA];
    updated[index] = value;
    setListA(updated);
    setSelectedPreset(null);
    setValidationError(null);
  };

  const handleUpdateTileB = (index: number, value: string) => {
    const updated = [...listB];
    updated[index] = value;
    setListB(updated);
    setSelectedPreset(null);
    setValidationError(null);
  };

  const handleAddTile = () => {
    if (listA.length >= 6) return;
    setListA([...listA, '']);
    setListB([...listB, '']);
    setSelectedPreset(null);
    setValidationError(null);
  };

  const handleRemoveTile = (index: number) => {
    if (listA.length <= 1) return;
    setListA(listA.filter((_, i) => i !== index));
    setListB(listB.filter((_, i) => i !== index));
    setSelectedPreset(null);
    setValidationError(null);
  };

  const handleApplyPreset = (presetIndex: number) => {
    const demo = PRESET_DEMOS[presetIndex];
    if (!demo) return;
    setListA([...demo.listA]);
    setListB([...demo.listB]);
    setMaxDepth(demo.maxDepth);
    setSelectedPreset(presetIndex);
    setValidationError(null);
    handleResetState();
  };

  // Helper to clear search results and stop timers
  const handleResetState = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    generatorRef.current = null;
    stepIndexRef.current = 0;
    isRunningRef.current = false;
    isPausedRef.current = false;
    setStatus('idle');
    setCurrentStep(null);
    setResult(null);
    setStats((prev) => ({
      ...prev,
      sequencesChecked: 0,
      depthExplored: 0,
      statusText: 'Ready',
      timeElapsedMs: 0,
    }));
  }, []);

  // Input Validation
  const validateInputs = (): boolean => {
    if (listA.length !== listB.length) {
      setValidationError('List A and List B must contain the same number of tiles.');
      return false;
    }
    if (listA.length === 0) {
      setValidationError('Please add at least one tile.');
      return false;
    }
    for (let i = 0; i < listA.length; i++) {
      const valA = listA[i].trim();
      const valB = listB[i].trim();
      if (!valA || !valB) {
        setValidationError(`Tile ${i + 1} cannot be empty in List A or List B.`);
        return false;
      }
    }
    if (maxDepth < 1 || maxDepth > 8) {
      setValidationError('Maximum search depth must be between 1 and 8.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleFullReset = () => {
    setListA(['a', 'ba']);
    setListB(['ab', 'a']);
    setMaxDepth(5);
    setSpeed(200);
    setSelectedPreset(0);
    setValidationError(null);
    handleResetState();
  };

  // Generator step execution
  const executeNextStep = useCallback((): boolean => {
    if (!generatorRef.current) return false;

    const trimmedA = listA.map((s) => s.trim());
    const trimmedB = listB.map((s) => s.trim());

    const next = generatorRef.current.next();
    if (next.done) {
      // Completed all sequences without a match
      const totalChecked = stepIndexRef.current;
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      const noMatchResult: SolverResult = {
        isMatch: false,
        totalSequencesChecked: totalChecked,
        depthReached: maxDepth,
        timeElapsedMs: elapsed,
        message: `No matching sequence found within the selected search depth.`,
      };
      setResult(noMatchResult);
      setStatus('not_found');
      isRunningRef.current = false;
      setStats((prev) => ({
        ...prev,
        sequencesChecked: totalChecked,
        depthExplored: maxDepth,
        statusText: 'No Match in Depth',
        timeElapsedMs: elapsed,
      }));
      return false;
    }

    const seq = next.value;
    stepIndexRef.current += 1;
    const step = evaluateSequence(seq, trimmedA, trimmedB, stepIndexRef.current);
    setCurrentStep(step);

    const elapsed = Math.round(performance.now() - startTimeRef.current);
    setStats((prev) => ({
      ...prev,
      sequencesChecked: stepIndexRef.current,
      depthExplored: seq.length,
      statusText: step.isMatch ? 'Match Found' : 'Searching...',
      timeElapsedMs: elapsed,
    }));

    if (step.isMatch) {
      // Match Found!
      const topFormula = step.topTiles.join(' + ');
      const bottomFormula = step.bottomTiles.join(' + ');
      const matchResult: SolverResult = {
        isMatch: true,
        solutionSequence1Based: step.sequence1Based,
        solutionSequence0Based: step.sequence0Based,
        matchingString: step.topString,
        topFormula,
        bottomFormula,
        totalSequencesChecked: stepIndexRef.current,
        depthReached: seq.length,
        timeElapsedMs: elapsed,
        message: 'MATCH FOUND',
      };
      setResult(matchResult);
      setStatus('found');
      isRunningRef.current = false;
      return false;
    }

    return true;
  }, [listA, listB, maxDepth]);

  // Loop runner with timer
  const scheduleNextStep = useCallback(() => {
    if (!isRunningRef.current || isPausedRef.current) return;

    const hasMore = executeNextStep();
    if (hasMore && isRunningRef.current && !isPausedRef.current) {
      timerRef.current = window.setTimeout(() => {
        scheduleNextStep();
      }, speed);
    }
  }, [executeNextStep, speed]);

  // Main Run Handler
  const handleRunSearch = () => {
    if (!validateInputs()) return;

    handleResetState();

    const trimmedA = listA.map((s) => s.trim());
    const trimmedB = listB.map((s) => s.trim());

    // Instant direct solve mode
    if (speed === 0) {
      const syncResult = solvePCPSync(trimmedA, trimmedB, maxDepth);
      setResult(syncResult);
      setStatus(syncResult.isMatch ? 'found' : 'not_found');

      if (syncResult.solutionSequence0Based) {
        const finalStep = evaluateSequence(
          syncResult.solutionSequence0Based,
          trimmedA,
          trimmedB,
          syncResult.totalSequencesChecked
        );
        setCurrentStep(finalStep);
      }

      setStats((prev) => ({
        ...prev,
        sequencesChecked: syncResult.totalSequencesChecked,
        depthExplored: syncResult.depthReached,
        statusText: syncResult.isMatch ? 'Match Found' : 'No Match in Depth',
        timeElapsedMs: syncResult.timeElapsedMs,
      }));
      return;
    }

    // Step-by-step animated search
    generatorRef.current = generatePCPSequences(trimmedA.length, maxDepth);
    stepIndexRef.current = 0;
    startTimeRef.current = performance.now();
    isRunningRef.current = true;
    isPausedRef.current = false;
    setStatus('searching');

    scheduleNextStep();
  };

  const handlePauseSearch = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    isPausedRef.current = true;
    isRunningRef.current = false;
    setStatus('paused');
  };

  const handleResumeSearch = () => {
    isPausedRef.current = false;
    isRunningRef.current = true;
    setStatus('searching');
    scheduleNextStep();
  };

  const handleStepSearch = () => {
    if (status === 'paused' || status === 'idle') {
      if (!generatorRef.current) {
        if (!validateInputs()) return;
        const trimmedA = listA.map((s) => s.trim());
        generatorRef.current = generatePCPSequences(trimmedA.length, maxDepth);
        stepIndexRef.current = 0;
        startTimeRef.current = performance.now();
      }
      isPausedRef.current = true;
      isRunningRef.current = false;
      setStatus('paused');
      executeNextStep();
    }
  };

  return (
    <div className="app-root">
      <Header />

      <main>
        <Hero />

        <div className="container" id="solver">
          {/* Main Solver Section */}
          <section className="solver-section" style={{ padding: '1rem 0 2rem' }}>
            <div className="section-header">
              <h2 className="section-title">PCP Solver</h2>
              <p className="section-subtitle">
                Enter two lists of string tiles and search for a matching sequence of indices.
              </p>
            </div>

            {/* Tile Input Panels */}
            <PCPInput
              listA={listA}
              listB={listB}
              onUpdateTileA={handleUpdateTileA}
              onUpdateTileB={handleUpdateTileB}
              onAddTile={handleAddTile}
              onRemoveTile={handleRemoveTile}
              onApplyPreset={handleApplyPreset}
              selectedPreset={selectedPreset}
              disabled={status === 'searching'}
              validationError={validationError}
            />

            {/* Controls Bar */}
            <SolverControls
              maxDepth={maxDepth}
              onDepthChange={setMaxDepth}
              speed={speed}
              onSpeedChange={setSpeed}
              status={status}
              tileCount={listA.length}
              onRunSearch={handleRunSearch}
              onPauseSearch={handlePauseSearch}
              onResumeSearch={handleResumeSearch}
              onStepSearch={handleStepSearch}
              onReset={handleFullReset}
            />

            {/* Visualizer */}
            <SearchVisualizer
              currentStep={currentStep}
              status={status}
              listA={listA}
              listB={listB}
            />

            {/* Result Card */}
            <ResultCard result={result} />

            {/* Statistics */}
            <Statistics stats={stats} />
          </section>

          {/* Educational Content Sections */}
          <HowItWorks />
          <ExampleSection />
          <ComplexitySection />
          <AcademicInfo />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
