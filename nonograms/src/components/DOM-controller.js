import { baseLayout } from './constants';
import { GamePage } from './game-page';
import { MainMenu } from './main-menu';
import { NewGamePage } from './new-game-page';
import templates from '../templates.json';
import { getCellsToPaint } from '../utils/get-cells-to-paint';
import { checkDifficulty } from '../utils/check-difficulty';
import { RecordsPage } from './records-page';
import { Settings } from './settings';

export class DOMcontroller {
  constructor(parent) {
    this.parent = parent;
    this.state = parent.appState;
    this.viewState = 'menu';
    this.root = document.querySelector('.body');
    this.renderBaseStructure();
    this.recordsPage = new RecordsPage(this);
    this.mainPage = new MainMenu(this);
    this.newGamePage = new NewGamePage(this);
    this.gamePage = new GamePage(this);
    this.settingsPage = new Settings(this);
  }

  renderBaseStructure() {
    this.root.innerHTML = baseLayout;
    this.mainRoot = document.querySelector('.main__container');
    this.mainRoot.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    return this;
  }

  showRecordsPage() {
    this.mainRoot.childNodes.forEach((node) => {
      this.mainRoot.removeChild(node);
    });
    this.recordsPage.updateRecords();
    this.mainRoot.append(this.recordsPage.node);
  }

  showSettingsPage() {
    this.mainRoot.childNodes.forEach((node) => {
      this.mainRoot.removeChild(node);
    });
    this.mainRoot.append(this.settingsPage.node);
  }

  showMainMenuPage() {
    this.mainRoot.childNodes.forEach((node) => {
      this.mainRoot.removeChild(node);
    });
    this.mainRoot.append(this.mainPage.node);
    this.mainPage.checkAutoSave();
  }

  showNewGamePage() {
    this.mainRoot.childNodes.forEach((node) => {
      this.mainRoot.removeChild(node);
    });
    this.mainRoot.append(this.newGamePage.node);
  }

  showGamePage(mode = 'new') {
    this.mainRoot.childNodes.forEach((node) => {
      this.mainRoot.removeChild(node);
    });
    if (mode === 'new') {
      checkDifficulty(this.state.newGameSettings);

      let difficulty = this.state.newGameSettings.selectedDiff;
      let level = this.state.newGameSettings.selectedLevel;

      this.state.newGameSettings.selectedDesc = templates[difficulty][Number(level.slice(6, level.length)) - 1].desc;
      this.state.newGameSettings.selectedMatrix =
        templates[difficulty][Number(level.slice(6, level.length)) - 1].matrix;

      this.state.currentGameState = Object.assign({}, this.state.newGameSettings);
      this.state.currentGameState.cellsToPaint = getCellsToPaint(this.state.currentGameState.selectedMatrix);
      this.state.currentGameState.paintedCells = [];
      this.state.currentGameState.crossedCells = [];
    } else {
      this.state.currentGameState = JSON.parse(localStorage.getItem('40iqDataBase')).currentGameSave;
    }

    this.mainRoot.append(this.gamePage.node);
    this.gamePage.createCells(this.state.currentGameState.selectedDiff);
    this.cleanCells();
    this.gamePage.updateHints(this.state.currentGameState.selectedMatrix);
    this.gamePage.timer.stopTimer();
    this.gamePage.timer.timerNode.textContent = '00:00';

    if (mode === 'load') {
      this.gamePage.timer.loadTimer();
      this.loadFilledCells();
    }
    this.newGamePage.resetSettings();
  }

  loadFilledCells() {
    const cellsContainer = this.gamePage.cellsContainer;
    const crossedCells = this.state.currentGameState.crossedCells;
    const paintedCells = this.state.currentGameState.paintedCells;

    cellsContainer.childNodes.forEach((row) => {
      row.childNodes.forEach((cell) => {
        const cellRowIndex = Number(cell.getAttribute('data-row'));
        const cellColIndex = Number(cell.getAttribute('data-col'));
        if (
          paintedCells.some((elem) => {
            if (elem[0] === cellRowIndex && elem[1] === cellColIndex) {
              return true;
            }
          })
        ) {
          cell.classList.add('painted');
        }
        if (
          crossedCells.some((elem) => {
            if (elem[0] === cellRowIndex && elem[1] === cellColIndex) {
              return true;
            }
          })
        ) {
          cell.classList.add('crossed');
        }
      });
    });
  }

  cleanCells() {
    const cellsContainer = this.gamePage.cellsContainer;
    cellsContainer.childNodes.forEach((row) => {
      row.childNodes.forEach((cell) => {
        cell.classList.remove('painted');
        cell.classList.remove('crossed');
      });
    });
  }

  resetGameProgress() {
    this.cleanCells();
    this.gamePage.timer.stopTimer();
    this.gamePage.timer.timerNode.textContent = '00:00';
    this.gamePage.timer.currentValue = '00:00';
    this.state.currentGameState.currentTimerValue = '00:00';
    this.state.currentGameState.paintedCells = [];
    this.state.currentGameState.crossedCells = [];
  }

  showSolution() {
    this.state.currentGameState.isGameOver = true;
    this.gamePage.timer.stopTimer();
    this.state.currentGameState.gameResult = 'solution';
    this.cleanCells();
    const cellsContainer = this.gamePage.cellsContainer;
    const cellsToPaint = this.state.currentGameState.cellsToPaint;

    cellsContainer.childNodes.forEach((row) => {
      row.childNodes.forEach((cell) => {
        const cellRowIndex = Number(cell.getAttribute('data-row'));
        const cellColIndex = Number(cell.getAttribute('data-col'));
        if (
          cellsToPaint.some((elem) => {
            if (elem[0] === cellRowIndex && elem[1] === cellColIndex) {
              return true;
            }
          })
        ) {
          cell.classList.add('painted');
        }
      });
    });

    this.showModal();
  }

  showModal() {
    const modalWrapper = this.gamePage.modal.node;
    const nonogram = this.gamePage.modal.nonogramDescriptionNode;
    const time = this.gamePage.modal.timeDescriptionNode;
    const title = this.gamePage.modal.TitleNode;

    time.textContent = this.state.currentGameState.currentTimerValue
      ? this.state.currentGameState.currentTimerValue
      : '00:00';
    nonogram.textContent = this.state.currentGameState.selectedDesc;
    title.textContent = 'Great!';
    modalWrapper.classList.add('modal_active');

    if (this.state.currentGameState.gameResult) {
      title.textContent = 'Solution!';
    }
  }

  changeTheme() {
    this.root.classList.toggle('night-mode');
  }
}
