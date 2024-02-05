import { DOMcontroller } from './DOM-controller';
import { AudioEffects } from './audio';
import { DEFAULTSETTINGS } from './constants';

export class App {
  constructor() {
    this.appState = {
      newGameSettings: Object.assign({}, DEFAULTSETTINGS),
    };
    this.DOMcontroller = new DOMcontroller(this);
    this.audio = new AudioEffects(this.DOMcontroller);
  }

  changeView() {
    this.DOMcontroller.showMainMenuPage();
  }

  startNewGame() {
    this.DOMcontroller.showGamePage('new');
  }

  gameOver() {
    if (this.appState.currentGameState.isGameOver) {
      return;
    }
    this.audio.winSound.play();
    this.appState.currentGameState.isGameOver = true;
    this.DOMcontroller.showModal();
    this.updateHistory();
  }

  autoSave() {
    const dataBase = JSON.parse(localStorage.getItem('40iqDataBase'));
    dataBase.currentGameSave = this.appState.currentGameState;
    localStorage.setItem('40iqDataBase', JSON.stringify(dataBase));
  }

  continueGame() {
    this.DOMcontroller.showGamePage('load');
  }

  updateHistory() {
    const dataBase = JSON.parse(localStorage.getItem('40iqDataBase'));
    dataBase.gamesHistory.push(this.appState.currentGameState);
    if (dataBase.gamesHistory.length === 6) {
      dataBase.gamesHistory.shift();
    }
    localStorage.setItem('40iqDataBase', JSON.stringify(dataBase));
  }
}
