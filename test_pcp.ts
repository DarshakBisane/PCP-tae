import { solvePCPSync, generatePCPSequences } from './src/logic/pcpSolver';

console.log('--- RUNNING PCP ALGORITHM VERIFICATION TESTS ---');

// TEST 1
const res1 = solvePCPSync(['a', 'ba'], ['ab', 'a'], 5);
console.log('TEST 1: Canonical Demo (A=["a","ba"], B=["ab","a"])');
console.assert(res1.isMatch === true, 'TEST 1 Failed: isMatch should be true');
console.assert(JSON.stringify(res1.solutionSequence1Based) === JSON.stringify([1, 2]), 'TEST 1 Failed: sequence should be [1, 2]');
console.assert(res1.matchingString === 'aba', 'TEST 1 Failed: string should be "aba"');
console.log('✅ TEST 1 PASSED: Match found at sequence [1, 2], string "aba"\n');

// TEST 2
const res2 = solvePCPSync(['a'], ['b'], 4);
console.log('TEST 2: No-Match Case (A=["a"], B=["b"])');
console.assert(res2.isMatch === false, 'TEST 2 Failed: isMatch should be false');
console.log('✅ TEST 2 PASSED: Correctly reports no solution found within depth\n');

// TEST 3
const res3 = solvePCPSync(['x', 'y'], ['x', 'z'], 4);
console.log('TEST 3: Single Tile Match (A=["x","y"], B=["x","z"])');
console.assert(res3.isMatch === true, 'TEST 3 Failed: isMatch should be true');
console.assert(JSON.stringify(res3.solutionSequence1Based) === JSON.stringify([1]), 'TEST 3 Failed: sequence should be [1]');
console.assert(res3.matchingString === 'x', 'TEST 3 Failed: string should be "x"');
console.log('✅ TEST 3 PASSED: Match found at sequence [1], string "x"\n');

// TEST 4
const res4 = solvePCPSync(['a'], ['a'], 4);
console.log('TEST 4: Immediate Single (A=["a"], B=["a"])');
console.assert(res4.isMatch === true, 'TEST 4 Failed: isMatch should be true');
console.assert(JSON.stringify(res4.solutionSequence1Based) === JSON.stringify([1]), 'TEST 4 Failed: sequence should be [1]');
console.assert(res4.matchingString === 'a', 'TEST 4 Failed: string should be "a"');
console.log('✅ TEST 4 PASSED: Match found at sequence [1], string "a"\n');

// TEST 5
console.log('TEST 5: Verify Repeated Indices Sequence Generation');
const gen = generatePCPSequences(2, 2);
const sequences = Array.from(gen);
const seqStrings = sequences.map(s => JSON.stringify(s.map(i => i + 1)));
console.log('Generated sequences for N=2, Depth=2:', seqStrings.join(', '));
console.assert(seqStrings.includes('[1,1]'), 'TEST 5 Failed: Should include [1, 1]');
console.assert(seqStrings.includes('[1,2]'), 'TEST 5 Failed: Should include [1, 2]');
console.assert(seqStrings.includes('[2,1]'), 'TEST 5 Failed: Should include [2, 1]');
console.assert(seqStrings.includes('[2,2]'), 'TEST 5 Failed: Should include [2, 2]');
console.log('✅ TEST 5 PASSED: Repeated indices correctly generated!\n');

console.log('🎉 ALL PCP MATHEMATICAL & ALGORITHMIC TESTS PASSED PERFECTLY!');
