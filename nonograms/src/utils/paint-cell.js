import { updateCellsState } from './update-cells-state';

export function paintCell(cellNode, cellsState, mode) {
  const state = cellsState;
  if (mode === 'paint') {
    cellNode.classList.add('painted');
    cellNode.classList.remove('crossed');
    state.paintedCells = updateCellsState(state.paintedCells, cellNode, 'add');
    state.crossedCells = updateCellsState(state.crossedCells, cellNode);
    return state;
  }
  cellNode.classList.add('crossed');
  cellNode.classList.remove('painted');
  state.crossedCells = updateCellsState(state.crossedCells, cellNode, 'add');
  state.paintedCells = updateCellsState(state.paintedCells, cellNode);
  return state;
}
