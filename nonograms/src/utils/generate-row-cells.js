import { generateElement } from './generate-elem';

export function generateRow(
  rowClasses = undefined,
  rowIndex = 0,
  cellClasses = undefined,
  cellIndex = 0,
  numberOfCells,
) {
  if (!numberOfCells) {
    return;
  }
  const rowClassArray = rowClasses.split(' ');
  const rowClass = rowClassArray[0];
  const rowSubClass = `${rowClassArray[1]}_${rowIndex}`;

  const cellClassArray = cellClasses.split(' ');
  const cellClass = cellClassArray[0];
  const cellSubClass = cellClassArray[1];

  const row = generateElement('div', [rowClass, rowSubClass]);
  for (let j = 0; j < numberOfCells; j += 1) {
    const cell = generateElement('div', [cellClass, `${cellSubClass}-${cellIndex + j}`]);
    row.append(cell);
  }
  return row;
}
