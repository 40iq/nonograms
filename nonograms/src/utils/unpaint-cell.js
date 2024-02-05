import { updateCellsState } from './update-cells-state';

export function unpaintCell(cellNode, cellsState, mode) {
  const state = cellsState;
  if (mode === 'unpaint') {
    cellNode.classList.remove('painted');
    state.paintedCells = updateCellsState(state.paintedCells, cellNode);
    return state;
  }
  cellNode.classList.remove('crossed');
  state.crossedCells = updateCellsState(state.crossedCells, cellNode);
  return state;
}
