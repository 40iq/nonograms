export function fillHints(rowContainer, colContainer, hintsInfo) {
  const row = rowContainer.childNodes;
  const col = colContainer.childNodes;
  const hintsRow = [].concat(hintsInfo.rowsHints);
  const hintsCol = [].concat(hintsInfo.colHints);

  for (let i = row.length - 1; i >= 0; i -= 1) {
    const rowCells = row[i].childNodes;

    for (let j = 0; j < rowCells.length; j += 1) {
      if (hintsRow[j].length > 0) {
        rowCells[j].textContent = hintsRow[j][hintsRow[j].length - 1];
        hintsRow[j].pop();
      }
    }
  }

  for (let i = col.length - 1; i >= 0; i -= 1) {
    const colCells = col[i].childNodes;

    for (let j = 0; j < colCells.length; j += 1) {
      if (hintsCol[j].length > 0) {
        colCells[j].textContent = hintsCol[j][hintsCol[j].length - 1];
        hintsCol[j].pop();
      }
    }
  }
}
