export function getHintsInfo(matrix) {
  const arr = JSON.parse(JSON.stringify(matrix));

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[i].length; j += 1) {
      if (arr[i][j] === 0) {
        arr[i][j] = ' ';
      }
      if (arr[i][j] === ' ' && arr[i][j - 1] === ' ') {
        arr[i][j - 1] = '';
      }
    }
    arr[i] = arr[i]
      .join('')
      .trim()
      .split(' ')
      .map((item) => item.length);
  }

  const numberOfCols = arr
    .map((subArray) => subArray.length)
    .reduce((max, current) => {
      if (current > max) {
        return (max = current);
      }
      return max;
    }, 0);

  const rows = [];

  for (let i = 0; i < matrix[0].length; i += 1) {
    rows[i] = [];
    for (let j = 0; j < matrix.length; j += 1) {
      rows[i].push(matrix[j][i]);
    }
  }

  for (let i = 0; i < rows.length; i += 1) {
    let subArr = rows[i];

    for (let j = 0; j < subArr.length; j += 1) {
      if (subArr[j] === 0) {
        subArr[j] = ' ';
      }
      if (subArr[j] === ' ' && (subArr[j - 1] === ' ' || subArr[j - 1] === '')) {
        subArr[j - 1] = '';
      }
    }

    rows[i] = subArr
      .join('')
      .trim()
      .split(' ')
      .map((item) => item.length);
  }

  const numberOfRows = rows
    .map((subArray) => subArray.length)
    .reduce((max, current) => {
      if (current > max) {
        return (max = current);
      }
      return max;
    }, 0);

  return { rowsHints: rows, colHints: arr, rowLength: numberOfRows, colLength: numberOfCols };
}
