export function getRandomDifficulty() {
  const diffIndex = Math.floor(Math.random() * 3);
  switch (diffIndex) {
    case 0:
      return 'easy';
    case 1:
      return 'medium';
    default:
      return 'hard';
  }
}
