import { checkCells } from '../utils/check-cells';
import { fillHints } from '../utils/fill-hints';
import { generateElement } from '../utils/generate-elem';
import { generateRow } from '../utils/generate-row-cells';
import { getHintsInfo } from '../utils/get-hints-info';
import { paintCell } from '../utils/paint-cell';
import { unpaintCell } from '../utils/unpaint-cell';
import { BurgerMenu } from './burger-menu';
import { Modal } from './modal';
import { Timer } from './timer';

export class GamePage {
  constructor(parentObject) {
    this.parent = parentObject;
    this.burger = new BurgerMenu(this.parent);
    this.modal = new Modal(this);
    this.renderGameLayout();
    this.timer = new Timer(this, this.timerNode);
    this.isMouseDown = false;
    this.mode = 'paint';
  }

  renderGameLayout() {
    const gameContainer = generateElement('div', ['game']);
    const gameMenuBurger = this.burger.node;

    const gameMenuButton = generateElement('button', ['game__button-menu'], 'Menu');

    gameMenuButton.addEventListener('click', () => {
      if (gameMenuBurger.classList.contains('burger_active')) {
        gameMenuBurger.classList.remove('burger_active');
        return;
      }
      gameMenuBurger.classList.add('burger_active');
    });

    const modal = this.modal.node;

    const gameHeader = generateElement('div', ['game__header']);
    const timer = generateElement('span', ['game__timer'], '00:00');
    gameHeader.append(timer, gameMenuButton);

    this.timerNode = timer;

    gameMenuButton.addEventListener('click', () => {
      if (this.timer.isPaused) {
        this.timer.resumeTimer();
        return;
      }
      this.timer.pauseTimer();
    });

    gameMenuBurger.addEventListener('click', () => {
      if (this.timer.isPaused) {
        this.timer.resumeTimer();
        return;
      }
    });

    const gameFieldContainer = generateElement('div', ['game__field-container']);
    const gameField = generateElement('div', ['game__field']);
    const gameFieldTop = generateElement('div', ['game__field_top']);
    const gameResult = generateElement('div', ['game__result-window']);
    const hintsRows = generateElement('div', ['game__hints', 'game__hints_rows']);

    gameFieldTop.append(gameResult, hintsRows);

    const gameFieldBottom = generateElement('div', ['game__field_bottom']);
    const hintsCols = generateElement('div', ['game__hints', 'game__hints_cols']);
    const cellsContainer = generateElement('div', ['game__cells-container']);

    cellsContainer.addEventListener('mouseleave', () => {
      this.isMouseDown = false;
      if (
        this.parent.state.currentGameState.paintedCells.length ===
        this.parent.state.currentGameState.cellsToPaint.length
      ) {
        if (
          checkCells(this.parent.state.currentGameState.paintedCells, this.parent.state.currentGameState.cellsToPaint)
        ) {
          this.timer.stopTimer();
          this.parent.parent.gameOver();
        }
      }
    });

    cellsContainer.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    cellsContainer.addEventListener('mousedown', (e) => {
      if (this.parent.state.currentGameState.isGameOver) {
        return;
      }

      if (e.button === 0) {
        this.mode = 'paint';
        if (e.target.classList.contains('painted')) {
          this.mode = 'unpaint';
        }
      } else if (e.button === 2) {
        this.mode = 'cross';
        if (e.target.classList.contains('crossed')) {
          this.mode = 'uncross';
        }
      } else {
        return;
      }

      this.isMouseDown = true;
      if (!this.timer.isStarted) {
        this.timer.isStarted = true;
        this.timer.startTimer();
      }
    });

    cellsContainer.addEventListener('mouseup', (e) => {
      if (this.parent.state.currentGameState.isGameOver) {
        return;
      }
      if (!this.isMouseDown) {
        return;
      }
      const target = e.target;

      if (target.classList.contains('cell') && !target.classList.contains('painted') && this.mode === 'paint') {
        this.parent.parent.audio.playPaintSound();
        this.parent.state.currentGameState = paintCell(target, this.parent.state.currentGameState, 'paint');
      }

      if (target.classList.contains('cell') && target.classList.contains('painted') && this.mode === 'unpaint') {
        this.parent.parent.audio.playUnpaintSound();
        this.parent.state.currentGameState = unpaintCell(target, this.parent.state.currentGameState, 'unpaint');
      }

      if (target.classList.contains('cell') && !target.classList.contains('crossed') && this.mode === 'cross') {
        this.parent.parent.audio.playCrossSound();
        this.parent.state.currentGameState = paintCell(target, this.parent.state.currentGameState, 'cross');
      }

      if (target.classList.contains('cell') && target.classList.contains('crossed') && this.mode === 'uncross') {
        this.parent.parent.audio.playUnpaintSound();
        this.parent.state.currentGameState = unpaintCell(target, this.parent.state.currentGameState, 'uncross');
      }

      if (
        this.parent.state.currentGameState.paintedCells.length ===
        this.parent.state.currentGameState.cellsToPaint.length
      ) {
        if (
          checkCells(this.parent.state.currentGameState.paintedCells, this.parent.state.currentGameState.cellsToPaint)
        ) {
          this.timer.stopTimer();
          this.parent.parent.gameOver();
        }
      }

      this.isMouseDown = false;
    });

    cellsContainer.addEventListener('mousemove', (e) => {
      if (this.parent.state.currentGameState.isGameOver) {
        return;
      }
      const target = e.target;

      if (!this.isMouseDown) {
        return;
      }

      if (target.classList.contains('cell') && !target.classList.contains('painted') && this.mode === 'paint') {
        this.parent.parent.audio.playPaintSound();
        this.parent.state.currentGameState = paintCell(target, this.parent.state.currentGameState, 'paint');
      }

      if (target.classList.contains('cell') && target.classList.contains('painted') && this.mode === 'unpaint') {
        this.parent.parent.audio.playUnpaintSound();
        this.parent.state.currentGameState = unpaintCell(target, this.parent.state.currentGameState, 'unpaint');
      }

      if (target.classList.contains('cell') && !target.classList.contains('crossed') && this.mode === 'cross') {
        this.parent.parent.audio.playCrossSound();
        this.parent.state.currentGameState = paintCell(target, this.parent.state.currentGameState, 'cross');
      }

      if (target.classList.contains('cell') && target.classList.contains('crossed') && this.mode === 'uncross') {
        this.parent.parent.audio.playUnpaintSound();
        this.parent.state.currentGameState = unpaintCell(target, this.parent.state.currentGameState, 'uncross');
      }
    });

    this.cellsContainer = cellsContainer;
    this.hintsRows = hintsRows;
    this.hintsCols = hintsCols;

    gameFieldBottom.append(hintsCols, cellsContainer);

    gameField.append(gameFieldTop, gameFieldBottom);
    gameFieldContainer.append(gameField);
    gameContainer.append(modal, gameMenuBurger, gameHeader, gameFieldContainer);

    this.node = gameContainer;
    return this;
  }

  createCells(difficulty) {
    this.cellsContainer.innerHTML = '';

    let numberOfCells;

    switch (difficulty) {
      case 'easy':
        numberOfCells = 5;
        break;
      case 'medium':
        numberOfCells = 10;
        break;
      default:
        numberOfCells = 15;
        break;
    }

    for (let i = 0; i < numberOfCells; i += 1) {
      const row = generateElement('div', ['row', `row_${i}`]);
      for (let j = 0; j < numberOfCells; j += 1) {
        const cell = generateElement('div', ['cell', `cell_${i * numberOfCells + j}`]);
        cell.setAttribute('data-row', i);
        cell.setAttribute('data-col', j);
        row.append(cell);
      }
      this.cellsContainer.append(row);
    }
    return this;
  }

  updateHints(matrix) {
    const hintsInfo = getHintsInfo(matrix);

    const hintsRowContainer = this.hintsRows;
    hintsRowContainer.innerHTML = '';

    for (let i = 0; i < hintsInfo.rowLength; i += 1) {
      const hintRow = generateRow('hints__row hints__row', i, 'hints__cell_row hints__cell_row', 0, matrix.length);
      hintsRowContainer.append(hintRow);
    }

    const hintsColContainer = this.hintsCols;
    hintsColContainer.innerHTML = '';

    for (let i = 0; i < hintsInfo.colLength; i += 1) {
      const hintCol = generateRow('hints__col hints__col', i, 'hints__cell_col hints__cell_col', 0, matrix.length);
      hintsColContainer.append(hintCol);
    }

    const hintsInfoCopy = JSON.parse(JSON.stringify(hintsInfo));

    fillHints(hintsRowContainer, hintsColContainer, hintsInfoCopy);
  }
}
