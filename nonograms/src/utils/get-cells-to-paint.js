export function getCellsToPaint(matrix) {
  const matrixLength = matrix[0].length;
  const matrixHeight = matrix.length;
  const result = [];
  for (let i = 0; i < matrixHeight; i += 1) {
    for (let j = 0; j < matrixLength; j += 1) {
      if (matrix[i][j] === 1) {
        result.push([i, j]);
      }
    }
  }
  return result;
}
