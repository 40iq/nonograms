export function updateCellsState(state, el, mode) {
  const paintedCells = Array.from(state);
  const cellCoords = [];
  cellCoords.push(Number(el.getAttribute('data-row')));
  cellCoords.push(Number(el.getAttribute('data-col')));

  if (mode) {
    paintedCells.push(cellCoords);
    return paintedCells;
  }

  return paintedCells.filter((item) => {
    if (item[0] === cellCoords[0] && item[1] === cellCoords[1]) return false;

    return true;
  });
}
