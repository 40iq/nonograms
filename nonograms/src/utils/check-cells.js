export function checkCells(paintedCells, cellsToPaint) {
  const arr1 = Array.from(paintedCells).sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    } else {
      return a[0] - b[0];
    }
  });

  const arr2 = Array.from(cellsToPaint).sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    } else {
      return a[0] - b[0];
    }
  });

  if (arr1.join('') === arr2.join('')) {
    return true;
  }

  return false;
}
