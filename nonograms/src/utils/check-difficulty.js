import { getRandomDifficulty } from './get-random-difficulty';
import { getRandomLevel } from './get-random-level';

export function checkDifficulty(state) {
  if (state.selectedDiff === 'random' || state.selectedLevel === 'level_11') {
    state.selectedLevel = getRandomLevel(1, 10);
  }
  if (state.selectedDiff === 'random') {
    state.selectedDiff = getRandomDifficulty();
  }
}
